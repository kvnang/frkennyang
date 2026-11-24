import { DurableObject } from "cloudflare:workers";
import openNext from "./.open-next/worker.js";

export { DOQueueHandler, DOShardedTagCache } from "./.open-next/worker.js";

const renderPath = "/api/cv-render/";
const downloadRoute = /^\/(?:en|id)\/cv\/download\/(pdf|docx|html)$/;

export class CvRenderer extends DurableObject {
  render(origin, format, method) {
    const request = new Request(new URL(renderPath + format, origin), { method });
    return openNext.fetch(request, this.env, this.ctx);
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
      return openNext.fetch(request, env, ctx);
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

    return tagDownload(await env.ASSETS.fetch(request), "static-fallback");
  },
};
