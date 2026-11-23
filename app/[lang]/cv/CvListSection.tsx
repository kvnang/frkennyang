import { Badge } from "@/components/Badge";
import { ArrowUpRightIcon, LandmarkIcon, MapPinIcon } from "lucide-react";
import { TableOfContentsInner } from "../blog/(single)/[slug]/TableOfContentsInner";
import { slugify } from "@/utils/helpers";
import { ButtonLink } from "@/components/Button";
import { CvItem, CvSection } from "@/types";
import { CvPortableText } from "./cv-portable-text";

export async function CvListSection({
  sections,
}: {
  sections: Array<CvSection & { _key: string }>;
}) {
  return (
    <section className="container pb-section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_12rem] gap-x-8 max-w-6xl mx-auto">
        <div className="">
          <div className="grid grid-cols-1 gap-16">
            {sections.map((cvGroup, j) => (
              <div key={`accordion-${j}`}>
                <div
                  key={`accordion-cv-${j}`}
                  id={cvGroup.title?.en || j.toString()}
                  className="grid grid-cols-1 gap-8"
                >
                  <div>
                    <h3
                      id={`_heading-ref-${slugify(cvGroup.title?.en || j.toString())}`}
                      className="text-xl font-serif"
                    >
                      {cvGroup.title?.en}
                    </h3>
                  </div>
                  <div>
                    {cvGroup.subsections?.length ? (
                      <div className="grid grid-cols-1 gap-12">
                        {cvGroup.subsections.map((sub) => (
                          <div
                            key={sub.title.en}
                            className="grid grid-cols-1 gap-6"
                          >
                            <h4
                              id={`_heading-ref-${slugify(sub.title.en)}`}
                              className="text-lg font-serif opacity-80 border-b border-medium-gray pb-2"
                            >
                              {sub.title.en}
                            </h4>
                            <CvItemList items={sub.items} heading="h5" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <CvItemList items={cvGroup.items} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-lg:-order-1 py-4">
          <div className="lg:sticky lg:top-12 lg:max-h-[calc(100vh-6rem)] lg:overflow-x-hidden lg:overflow-y-auto lg:border-l lg:border-l-medium-gray lg:pl-8 grid grid-cols-1 gap-8">
            <nav className="w-full">
              {sections?.length ? (
                <TableOfContentsInner
                  label={"Contents"}
                  headings={sections?.map((item, i) => {
                    return {
                      _key: `${slugify(item.title.en)}`,
                      _type: "block",
                      children: [
                        {
                          text: item.title.en,
                          _key: `${i}-child`,
                          _type: "span",
                          marks: [],
                        },
                      ],
                      style: "",
                      subheadings: item.subsections?.map((sub, si) => ({
                        _key: slugify(sub.title.en),
                        _type: "block",
                        children: [
                          {
                            text: sub.title.en,
                            _key: `${i}-${si}-child`,
                            _type: "span",
                            marks: [],
                          },
                        ],
                        style: "",
                      })),
                    };
                  })}
                  collapseSubheadings
                />
              ) : null}
            </nav>
            <div>
              <ButtonLink
                href="/cv/download/pdf"
                className="inline-flex items-center"
                target="_blank"
              >
                Download PDF <ArrowUpRightIcon className="size-4 ml-2" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CvItemList({
  items,
  heading: Heading = "h4",
}: {
  items: Array<CvItem>;
  heading?: "h4" | "h5";
}) {
  return (
    <ul className="grid grid-cols-1 gap-8">
      {items.map((cvItem, k) => {
        const title = cvItem.title?.en;
        const subtitle = cvItem.subtitle?.en;
        const description = cvItem.description?.en;
        const institution = cvItem.institution?.en;
        const location = cvItem.location?.en;
        const date = cvItem.date;
        const badges = cvItem.badges;
        const active = cvItem.active;
        const link = cvItem.link;

        return (
          <li key={`accordion-cv-li-${k}`} className="grid grid-cols-1 gap-2.5">
            <div className="flex justify-between gap-6 items-start">
              <div className="grid grid-cols-1 gap-1.5">
                {(title || subtitle) && (
                  <Heading className="font-semibold inline-flex items-center flex-wrap text-md gap-">
                    {active ? (
                      <div className="shrink-0 size-4 mr-2 flex items-center justify-center">
                        <div className="size-1.5 rounded-full bg-green-500"></div>
                      </div>
                    ) : null}
                    <span>{title}</span>
                  </Heading>
                )}
                {badges?.length ? (
                  <div className="inline-flex flex-wrap gap-2">
                    {badges.map((b) => (
                      <Badge key={b}>{b}</Badge>
                    ))}
                  </div>
                ) : null}
                {subtitle ? (
                  <div className="font-normal opacity-80 italic">
                    {subtitle}
                  </div>
                ) : null}
                {institution || location ? (
                  <div className="flex flex-wrap gap-2 items-center">
                    {institution ? (
                      <div className="inline-flex items-center">
                        <LandmarkIcon className="size-4 mr-2 opacity-50" />
                        <span className="opacity-80">{institution}</span>
                      </div>
                    ) : null}
                    {location ? (
                      <div className="inline-flex items-center">
                        <MapPinIcon className="size-4 mr-2 opacity-50" />
                        <span className="opacity-80">{location}</span>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {link ? (
                  <div>
                    <UrlMeta>{link}</UrlMeta>
                  </div>
                ) : null}
              </div>
              {date ? (
                <div className="text-right grid grid-cols-1 gap-0.5 items-start font-normal opacity-80 shrink-0 py-1">
                  {date.split(" | ").map((d, i) => (
                    <span
                      key={i}
                      className="whitespace-nowrap font-mono text-base"
                    >
                      {d.trim()}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            {description ? (
              <div className="prose prose-white opacity-80 prose-sm max-w-3xl">
                <CvPortableText value={description} />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

// Friendlier names for common link targets; anything else shows its domain.
const LINK_LABELS: Array<[domain: string, label: string]> = [
  ["doi.org", "DOI"],
  ["researchgate.net", "ResearchGate"],
  ["academia.edu", "Academia.edu"],
  ["orcid.org", "ORCID"],
];

function UrlMeta({ children }: { children: string }) {
  const url = children;
  const urlObject = new URL(url);
  const host = urlObject.host.replace(/^www\./, "");
  const label =
    LINK_LABELS.find(([d]) => host === d || host.endsWith(`.${d}`))?.[1] ??
    host;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center opacity-80 hover:opacity-100 transition-colors"
    >
      {label}
      <ArrowUpRightIcon className="size-3.5 ml-1.5 text-accent" />
    </a>
  );
}
