import { Badge } from "@/components/Badge";
import { titleCase } from "@/studio/plugins/productionUrl/utils";
import { ArrowUpRightIcon, LandmarkIcon, MapPinIcon } from "lucide-react";
import { TableOfContentsInner } from "../blog/(single)/[slug]/TableOfContentsInner";
import { slugify } from "@/utils/helpers";

export const getOrcidToken = async () => {
  const obj = {
    client_id: process.env.ORCID_CLIENT_ID,
    client_secret: process.env.ORCID_CLIENT_SECRET,
    grant_type: "client_credentials",
    scope: "/read-public",
  };
  const formData = new URLSearchParams();

  Object.keys(obj).map((key) => {
    formData.append(key, obj[key as keyof typeof obj] as string);
  });
  const authRes = await fetch("https://orcid.org/oauth/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });
  return await authRes.json();
};

const getOrcidData = async () => {
  const ORCID_ID = `0000-0001-6563-8863`;

  // const tok = await getOrcidToken();
  // console.log(tok);

  const url = `https://pub.orcid.org/v3.0/${ORCID_ID}/record`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ORCID_CLIENT_ACCESS_TOKEN}`,
    },
  });
  const json = await res.json();
  return json;
};

interface ExternalId {
  "external-id-type": "doi" | string;
  /** @example "10.12775/BPTh.2025.001" */
  "external-id-value": string;
  "external-id-normalized": {
    value: string;
    transient: boolean;
  };
  "external-id-normalized-error": null;
  "external-id-url": { value: string };
  "external-id-relationship": "self" | string;
}

export async function CvListSection() {
  const { cvList } = await import("./cvList");
  const data = await getOrcidData();

  const works = data["activities-summary"].works as {
    "last-modified-date": { value: number };
    group: Array<{
      "last-modified-date": { value: number };
      "external-ids": {
        "external-id": Array<ExternalId>;
      };
      "work-summary": Array<{
        "put-code": number;
        "created-date": { value: number };
        "last-modified-date": { value: number };
        source: {
          "source-orcid": null;
          "source-client-id": {
            uri: string;
            path: string;
            host: "orcid.org" | null;
          };
          "source-name": {
            value: "Crossref" | null;
          };
          "assertion-origin-orcid": null;
          "assertion-origin-client-id": null;
          "assertion-origin-name": null;
        };
        title: {
          title: {
            value: string;
          };
          subtitle: string | null;
          "translated-title": string | null;
        };
        "external-ids": {
          "external-id": Array<ExternalId>;
        };
        url: {
          value: string;
        };
        type:
          | "journal-article"
          | "magazine-article"
          | "conference-paper"
          | "conference-presentation"
          | "book"
          | "book-review"
          | null;
        "publication-date": {
          year: {
            value: string | null;
          } | null;
          month: {
            value: string | null;
          } | null;
          day: {
            value: string | null;
          } | null;
        };
        "journal-title": {
          value: string;
        };
        visibility: "public";
        path: string;
        "display-index": string;
      }>;
    }>;
  };

  cvList.push({
    title: "Works",
    items: works.group.map((w) => {
      const work = w["work-summary"][0];

      const pubDate = work["publication-date"];
      const ymd = `${pubDate.year?.value || new Date().getFullYear()}-${pubDate.month?.value || "01"}-${pubDate.day?.value || "01"}`;
      const date = new Date(ymd).toLocaleDateString("en-US", {
        year: "numeric",
        month: pubDate.month?.value ? "short" : undefined,
        day: pubDate.day?.value ? "numeric" : undefined,
      });

      const subtitle = work.title.subtitle || "";
      const type = work.type;
      const typeString = type?.replace(/\-/g, " ");

      return {
        title: work.title.title.value,
        subtitle: work["journal-title"].value,
        date: [date],
        link: work.url.value,
        description: subtitle,
        badges: [titleCase(typeString || "")],
      };
    }),
  });

  return (
    <section className="container pb-section">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_12rem] gap-x-8 max-w-6xl mx-auto">
        <div className="">
          <div className="grid grid-cols-1 gap-16">
            {cvList.map((cvGroup, j) => (
              <div key={`accordion-${j}`}>
                <div
                  key={`accordion-cv-${j}`}
                  id={cvGroup.title}
                  className="grid grid-cols-1 gap-8"
                >
                  <div>
                    <h3
                      id={`_heading-ref-${slugify(cvGroup.title)}`}
                      className="text-xl font-serif"
                    >
                      {cvGroup.title}
                    </h3>
                  </div>
                  <div>
                    <ul className="grid grid-cols-1 gap-8">
                      {cvGroup.items.map((cvItem, k) => {
                        const title = "title" in cvItem ? cvItem.title : "";
                        const subtitle =
                          "subtitle" in cvItem ? cvItem.subtitle : "";
                        const description =
                          "description" in cvItem ? cvItem.description : "";
                        const institution =
                          "institution" in cvItem ? cvItem.institution : "";
                        const location =
                          "location" in cvItem ? cvItem.location : "";
                        const date = "date" in cvItem ? cvItem.date : null;
                        const badges =
                          "badges" in cvItem ? cvItem.badges : null;
                        const active =
                          "active" in cvItem ? cvItem.active : false;
                        const link =
                          "link" in cvItem ? (cvItem.link as string) : null;

                        return (
                          <li
                            key={`accordion-cv-li-${k}`}
                            className="grid grid-cols-1 gap-2.5"
                          >
                            <div className="flex justify-between gap-6 items-start">
                              <div className="grid grid-cols-1 gap-1.5">
                                {(title || subtitle) && (
                                  <h4 className="font-semibold inline-flex items-center flex-wrap text-md gap-">
                                    {active ? (
                                      <div className="shrink-0 size-4 mr-2 flex items-center justify-center">
                                        <div className="size-1.5 rounded-full bg-green-500"></div>
                                      </div>
                                    ) : null}
                                    <span>{title}</span>
                                  </h4>
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
                                        <span className="opacity-80">
                                          {institution}
                                        </span>
                                      </div>
                                    ) : null}
                                    {location ? (
                                      <div className="inline-flex items-center">
                                        <MapPinIcon className="size-4 mr-2 opacity-50" />
                                        <span className="opacity-80">
                                          {location}
                                        </span>
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
                                  {date.map((d, i) => (
                                    <span key={i} className="whitespace-nowrap">
                                      {d}
                                    </span>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                            {description && /\S/.test(description) && (
                              <div className="prose prose-white opacity-80 prose-sm max-w-3xl">
                                <p>{description}</p>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-lg:-order-1 py-4">
          <nav className="lg:sticky lg:top-4 lg:border-l lg:border-l-gray lg:pl-8">
            <div className="w-full">
              <TableOfContentsInner
                label={"Contents"}
                headings={cvList.map((item, i) => {
                  return {
                    _key: `${slugify(item.title)}`,
                    _type: "block",
                    children: [
                      {
                        text: item.title,
                        _key: `${i}-child`,
                        _type: "span",
                        marks: [],
                      },
                    ],
                    style: "",
                    // subheadings?: HeadingBlock[];
                  };
                })}
              />
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

function UrlMeta({ children }: { children: string }) {
  const url = children;
  const urlObject = new URL(url);
  const host = urlObject.host.replace(/^www./, "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center opacity-80 hover:opacity-100 transition-colors"
    >
      {host}
      <ArrowUpRightIcon className="size-3.5 ml-1.5 text-accent" />
    </a>
  );
}
