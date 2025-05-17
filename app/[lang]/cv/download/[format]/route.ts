import { NextRequest } from "next/server";
import { generateDocx } from "./generate-docx";
import { generatePdf } from "./generate-pdf";
import mammoth from "mammoth";
import { getCvList } from "../../cvList";

type Format = "docx" | "pdf" | "html";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ format: string }> },
) {
  const _format = (await params).format as string | undefined;
  const format: Format =
    _format && ["docx", "pdf", "html"].includes(_format)
      ? (_format as Format)
      : "pdf";
  const lastUpdated = new Date().toISOString().split("T")[0];
  const filename = `kennyang_cv_${lastUpdated}`;

  const cvList = await getCvList();

  if (format === "html") {
    const pdfBuffer = await generateDocx();
    const res = await mammoth.convertToHtml({ buffer: pdfBuffer });
    const html = res.value;
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kenny Ang CV</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;
    return new Response(fullHtml, {
      headers: {
        "Content-Type": "text/html",
        // "Content-Disposition": `inline; filename=${filename}.pdf`,
      },
    });
  }

  if (format === "pdf") {
    const buffer = await generatePdf({ data: cvList.sections || [] });
    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=${filename}.pdf`,
      },
    });
  }

  const buffer = await generateDocx();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `inline; filename=${filename}.docx`,
    },
  });
}
