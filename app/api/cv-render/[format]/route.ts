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
  if (format !== "docx" && format !== "pdf" && format !== "html") {
    return new Response(null, { status: 404 });
  }
  return renderCvDownload(format);
}
