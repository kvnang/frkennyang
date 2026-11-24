import { DurableObject } from "cloudflare:workers";
import openNext, {
  DOQueueHandler as OpenNextQueue,
} from "./.open-next/worker.js";

export { DOShardedTagCache } from "./.open-next/worker.js";

const renderPath = "/api/cv-render/";
const downloadRoute = /^\/(?:en|id)\/cv\/download\/(pdf|docx|html)$/;
const pdfMaxAge = 60 * 60 * 1000;
const pdfRetryDelay = 60 * 1000;

function withSelfReference(env, ctx) {
  // Service bindings from a Worker Preview resolve to production. Use the
  // Preview's own entrypoint for OpenNext's internal revalidation requests.
  return env.WORKER_SELF_REFERENCE
    ? env
    : { ...env, WORKER_SELF_REFERENCE: ctx.exports.default };
}

export class DOQueueHandler extends OpenNextQueue {
  constructor(ctx, env) {
    super(ctx, withSelfReference(env, ctx));
  }
}

function pdfHeaders(date) {
  const day = new Date(date).toISOString().slice(0, 10);
  return {
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline; filename=kennyang_cv_${day}.pdf`,
  };
}

export class CvRenderer extends DurableObject {
  pdfRefresh;

  render(origin, format, method) {
    if (format === "pdf") return this.renderPdf(origin, method);

    const request = new Request(new URL(renderPath + format, origin), {
      method,
    });
    return openNext.fetch(
      request,
      withSelfReference(this.env, this.ctx),
      this.ctx,
    );
  }

  async renderPdf(origin, method) {
    const cached = await this.ctx.storage.get("pdf");
    let pdf = cached;
    if (!cached || Date.now() - cached.generatedAt >= pdfMaxAge) {
      this.pdfRefresh ??= this.refreshPdf(origin).finally(() => {
        this.pdfRefresh = undefined;
      });
      pdf = (await this.pdfRefresh) ?? cached;
    }

    if (!pdf) return new Response(null, { status: 503 });
    return new Response(method === "HEAD" ? null : pdf.bytes, {
      headers: pdfHeaders(pdf.generatedAt),
    });
  }

  async refreshPdf(origin) {
    const retryAt = await this.ctx.storage.get("pdf-retry-at");
    if (retryAt && retryAt > Date.now()) return;

    // Save the cooldown before contacting Browser Run so an outage or eviction
    // cannot cause every subsequent download to retry the browser.
    await this.ctx.storage.put("pdf-retry-at", Date.now() + pdfRetryDelay);
    try {
      const request = new Request(new URL(renderPath + "pdf", origin));
      const html = await openNext.fetch(
        request,
        withSelfReference(this.env, this.ctx),
        this.ctx,
      );
      if (!html.ok) {
        await html.body?.cancel();
        throw new Error(`Printable CV returned ${html.status}`);
      }

      const response = await this.env.BROWSER.quickAction("pdf", {
        html: await html.text(),
        pdfOptions: {
          preferCSSPageSize: true,
          printBackground: true,
          tagged: true,
        },
      });
      if (
        !response.ok ||
        !response.headers.get("content-type")?.startsWith("application/pdf")
      ) {
        await response.body?.cancel();
        throw new Error(
          `Browser Run did not return a PDF (${response.status})`,
        );
      }

      const pdf = {
        bytes: await response.arrayBuffer(),
        generatedAt: Date.now(),
      };
      await this.ctx.storage.put("pdf", pdf);
      return pdf;
    } catch (error) {
      console.error("CV PDF refresh failed", String(error));
    }
  }
}

function tagDownload(response, source) {
  const download = new Response(response.body, response);
  download.headers.set("Cache-Control", "no-store");
  download.headers.set("X-CV-Source", source);
  return download;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // The renderer route is reached through the Durable Object's RPC method.
    if (url.pathname.startsWith(renderPath)) {
      return new Response(null, { status: 404 });
    }

    const format = downloadRoute.exec(url.pathname)?.[1];
    if (!format || (request.method !== "GET" && request.method !== "HEAD")) {
      return openNext.fetch(request, withSelfReference(env, ctx), ctx);
    }

    try {
      const response = await env.CV_RENDERER.getByName(format).render(
        url.origin,
        format,
        request.method,
      );
      if (response.ok) return tagDownload(response, "durable-object");

      console.error("CV rendering returned an error", {
        format,
        status: response.status,
      });
      await response.body?.cancel();
    } catch (error) {
      console.error("CV rendering failed", { format, error: String(error) });
    }

    if (format === "pdf") {
      const message =
        "The CV PDF is temporarily unavailable. Please try again in a minute.";
      return new Response(request.method === "HEAD" ? null : message, {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
          "Retry-After": String(pdfRetryDelay / 1000),
        },
      });
    }

    return tagDownload(await env.ASSETS.fetch(request), "static-fallback");
  },
};
