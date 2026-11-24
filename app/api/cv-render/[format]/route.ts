import { renderCvDownload } from "@/app/[lang]/cv/download/render";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ format: string }> },
) {
  // The custom entry point calls OpenNext with a DurableObjectState.
  try {
    if (!("id" in getCloudflareContext().ctx)) {
      return new Response(null, { status: 404 });
    }
  } catch {
    return new Response(null, { status: 404 });
  }

  const { format } = await params;
  if (format === "pdf") {
    const [{ renderPrintableCv }, { getCvList }] = await Promise.all([
      import("@/app/[lang]/cv/download/[format]/print-cv"),
      import("@/app/[lang]/cv/cvList"),
    ]);
    const { sections, updatedAt } = await getCvList();
    return new Response(
      await renderPrintableCv({ data: sections, updatedAt }),
      {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      },
    );
  }
  if (format !== "docx" && format !== "html") {
    return new Response(null, { status: 404 });
  }
  return renderCvDownload(format);
}
