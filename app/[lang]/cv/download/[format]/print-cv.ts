import { ORCID_ID } from "@/lib/constants";
import { loadFont } from "@/lib/load-font";
import type { CvItem, CvSection } from "@/types";

const printStyles = `
  @page {
    size: A4;
    margin: 40pt;
    @bottom-left { content: "Kenny Ang / Curriculum Vitæ"; }
    @bottom-right { content: "Updated " var(--cv-updated); }
  }
  @page {
    @bottom-left {
      vertical-align: top; padding-top: 5pt;
      color: #666; font: 7pt/10pt "Geist Mono", monospace; text-transform: uppercase;
    }
    @bottom-right {
      vertical-align: top; padding-top: 5pt;
      color: #666; font: 7pt/10pt "Geist Mono", monospace; text-transform: uppercase;
    }
  }
  * { box-sizing: border-box; }
  html { print-color-adjust: exact; }
  body { margin: 0; color: #000; font: 10pt/14pt Inter, sans-serif; }
  h1, h2, h3, p { margin: 0; }
  h1, h2 { font-family: "DM Serif Display", serif; font-weight: 400; }
  h1 { font-size: 30pt; line-height: 42pt; margin-bottom: 12pt; }
  h2 { font-size: 18pt; line-height: 27pt; margin-bottom: 8pt; }
  h3 {
    font-size: 12pt; line-height: 18pt; font-weight: 600;
    position: relative; top: 3pt;
    border-bottom: .5pt solid #ddd; padding-bottom: 2pt; margin-bottom: 8pt;
  }
  .contact { margin-bottom: 20pt; }
  .contact p + p { margin-top: 8pt; }
  a, a:visited { color: #444; text-decoration: underline; }
  .mono { font-family: "Geist Mono", monospace; }
  .section + .section { margin-top: 20pt; }
  .group + .group { margin-top: 16pt; }
  .section:has(.group) h2 { margin-bottom: 12pt; }
  .keep-together, .entry { break-inside: avoid; }
  .entry {
    display: grid; grid-template-columns: minmax(0, 1fr) auto;
    column-gap: 14pt;
  }
  .entry, .keep-together { margin-bottom: 12pt; }
  .section > :last-child, .group > :last-child, .keep-together > :last-child {
    margin-bottom: 0;
  }
  .entry-title { margin-bottom: 2pt; font-weight: 600; hyphens: auto; }
  .entry-detail { font-size: 9pt; }
  .entry-detail + .entry-detail { margin-top: 4pt; }
  .entry-detail + .entry-link { margin-top: 0; }
  .entry-date { font-size: 9pt; padding-top: 1pt; white-space: nowrap; }
  .badges { display: flex; gap: 2pt; }
  .badge { padding: 2pt 4pt; background: #f3f3f3; color: #666; line-height: 11.25pt; }
  .description { color: #666; }
`;

function description(item: CvItem) {
  return item.description?.en
    ?.filter((block) => block._type === "block")
    .map((block) => {
      const children: unknown = block.children;
      if (!Array.isArray(children)) return "";
      return children
        .filter((child) => child?._type === "span")
        .map((child) => {
          const value: unknown = child.text;
          if (typeof value === "string") return value;
          if (value && typeof value === "object" && "value" in value) {
            return typeof value.value === "string" ? value.value : "";
          }
          return "";
        })
        .join("");
    })
    .join(" ");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function entry(item: CvItem, hideBadges: boolean) {
  const institution = [item.institution?.en, item.location?.en]
    .filter(Boolean)
    .join(" / ");
  const details = description(item);
  const link = item.link ? URL.parse(item.link) : null;
  // CMS links become clickable PDF annotations. Only include web destinations.
  const webLink =
    link && ["http:", "https:"].includes(link.protocol) ? link : null;
  const badges = hideBadges
    ? ""
    : (item.badges ?? [])
        .map((badge) => `<span class="badge">${escapeHtml(badge)}</span>`)
        .join("");

  return `<article class="entry">
    <div>
      <p class="entry-title">${escapeHtml(item.title.en)}</p>
      ${badges ? `<p class="entry-detail badges">${badges}</p>` : ""}
      ${institution ? `<p class="entry-detail">${escapeHtml(institution)}</p>` : ""}
      ${item.subtitle ? `<p class="entry-detail">${escapeHtml(item.subtitle.en)}</p>` : ""}
      ${webLink ? `<p class="entry-detail entry-link"><a href="${escapeHtml(webLink.href)}">${escapeHtml(webLink.hostname)}</a></p>` : ""}
      ${details ? `<p class="entry-detail description">${escapeHtml(details)}</p>` : ""}
    </div>
    ${item.date ? `<div class="mono entry-date">${escapeHtml(item.date)}</div>` : ""}
  </article>`;
}

function group(title: string, items: CvItem[]) {
  const [first, ...rest] = items;
  return `<div class="group">
    <div class="keep-together"><h3>${escapeHtml(title)}</h3>${first ? entry(first, true) : ""}</div>
    ${rest.map((item) => entry(item, true)).join("")}
  </div>`;
}

function section(section: CvSection) {
  const body = section.subsections?.length
    ? section.subsections
        .map(({ title, items }) => group(title.en, items))
        .join("")
    : section.items.map((item) => entry(item, false)).join("");

  return `<section class="section"><h2>${escapeHtml(section.title.en)}</h2>${body}</section>`;
}

export async function renderPrintableCv({
  data,
  updatedAt,
}: {
  data: CvSection[];
  updatedAt: string;
}) {
  // Embed the same font files as the previous renderer so the browser can print
  // them immediately and the PDF does not depend on external font requests.
  const fonts = [
    { family: "Inter", weight: 400 },
    { family: "Inter", weight: 600 },
    { family: "DM Serif Display", weight: 400 },
    { family: "Geist Mono", weight: 400 },
  ];
  const fontCss = await Promise.all(
    fonts.map(async ({ family, weight }) => {
      const font = Buffer.from(await loadFont({ family, weight })).toString(
        "base64",
      );
      return `@font-face {
      font-family: "${family}"; font-weight: ${weight};
      src: url(data:font/ttf;base64,${font}) format("truetype");
    }`;
    }),
  );

  const date = new Date(`${updatedAt}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Kenny Ang / Curriculum Vitæ</title>
        <style>${fontCss.join("\n")}${printStyles}:root { --cv-updated: ${JSON.stringify(date)}; }</style>
      </head>
      <body>
        <header class="contact">
          <h1>Kenny Ang</h1>
          <p><strong>Pontifical University of the Holy Cross</strong><br>Via dei Farnesi 83, Rome 00186, Italy</p>
          <p>
            k.ang@pusc.it<br>
            <a href="https://www.fatherkenny.com">www.fatherkenny.com</a><br>
            <a href="https://orcid.org/${ORCID_ID}">ORCID <span class="mono">${ORCID_ID}</span></a>
          </p>
        </header>
        <main>${data.map(section).join("")}</main>
      </body>
    </html>`;
}
