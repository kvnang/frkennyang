import { NextRequest } from "next/server";
import { renderCvDownload } from "../render";

export const dynamic = "force-static";

export function generateStaticParams() {
  return ["en", "id"].flatMap((lang) =>
    ["docx", "html"].map((format) => ({ lang, format })),
  );
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ format: string }> },
) {
  const { format } = await params;
  if (format === "pdf") {
    return new Response("CV PDF generation requires the Cloudflare Worker.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
  if (format !== "docx" && format !== "html") {
    return new Response(null, { status: 307, headers: { Location: "./pdf" } });
  }
  return renderCvDownload(format);
}
