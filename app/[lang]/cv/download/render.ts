export async function renderCvDownload(format: "pdf" | "docx" | "html") {
  const lastUpdated = new Date().toISOString().split("T")[0];
  const filename = `kennyang_cv_${lastUpdated}`;

  if (format === "html") {
    const [{ generateDocx }, { default: mammoth }] = await Promise.all([
      import("./[format]/generate-docx"),
      import("mammoth"),
    ]);
    const docx = await generateDocx();
    const res = await mammoth.convertToHtml({ buffer: docx });
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
      },
    });
  }

  if (format === "pdf") {
    const [{ generatePdf }, { getCvList }] = await Promise.all([
      import("./[format]/generate-pdf"),
      import("../cvList"),
    ]);
    const cvList = await getCvList();
    const buffer = await generatePdf({
      data: cvList.sections || [],
      updatedAt: cvList.updatedAt,
    });
    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=${filename}.pdf`,
      },
    });
  }

  const { generateDocx } = await import("./[format]/generate-docx");
  const buffer = await generateDocx();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `inline; filename=${filename}.docx`,
    },
  });
}
