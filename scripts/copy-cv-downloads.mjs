import { appendFile, copyFile, mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";

// Keep prerendered responses available when on-demand rendering fails.
const headers = [];
for (const lang of ["en", "id"]) {
  for (const format of ["docx", "pdf", "html"]) {
    const route = `${lang}/cv/download/${format}`;
    const source = join(".next/server/app", route);
    const asset = join(".open-next/assets", route);
    const meta = JSON.parse(await readFile(`${source}.meta`, "utf8"));
    const responseHeaders = new Headers(meta.headers);
    const contentType = responseHeaders.get("content-type");
    if (!contentType) throw new Error(`Missing Content-Type for /${route}`);

    await mkdir(dirname(asset), { recursive: true });
    await copyFile(`${source}.body`, asset);
    headers.push(`/${route}\n  Content-Type: ${contentType}\n`);

    const disposition = responseHeaders.get("content-disposition");
    if (disposition) headers.push(`  Content-Disposition: ${disposition}\n`);
  }
}

await appendFile(".open-next/assets/_headers", `\n${headers.join("")}`);
