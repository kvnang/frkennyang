export async function renderCvDownload(format: "docx" | "html") {
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

  const { generateDocx } = await import("./[format]/generate-docx");
  const buffer = await generateDocx();

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `inline; filename=${filename}.docx`,
    },
  });
}
