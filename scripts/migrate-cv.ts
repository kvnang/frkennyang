import { baseCvList } from "@/app/[lang]/cv/cvList";
import fs from "node:fs/promises";

async function main() {
  const sections = [];

  for (const section of baseCvList) {
    sections.push({
      title: { en: section.title },
      items: section.items.map((item) => ({
        title: {
          en: item.title,
        },
        subtitle: item.subtitle ? { en: item.subtitle } : undefined,
        date: item.date,
        institution: item.institution ? { en: item.institution } : undefined,
        location: item.location ? { en: item.location } : undefined,
        badges: item.badges,
        link: item.link,
        description: item.description
          ? {
              en: [
                {
                  style: "normal",
                  _type: "block",
                  markDefs: [],
                  children: [{ _type: "span", text: item.description }],
                },
              ],
            }
          : undefined,
        active: item.active,
      })),
    });
  }

  const json = {
    _id: `${new Date().getTime()}-kennyang`,
    _type: "cv",
    title: "Kenny Ang",
    intro: { en: undefined },
    sections,
  };

  const ndJson = JSON.stringify(json);

  await fs.writeFile("./cv.ndjson", ndJson, "utf-8");
}

main();
