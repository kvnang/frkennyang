import type { Metadata, ResolvedMetadata } from "next";
import { BASE_URL } from "./constants";

const baseUrl = BASE_URL;

const defaultDescription =
  "Father Kenny Ang is a Catholic priest, author, and professor of theology specializing in Thomistic thought. He has published a book and numerous scholarly articles.";

export const defaultMetadata: Metadata = {
  title: {
    default: "Priest, Professor, & Author | Fr. Kenny Ang",
    template: "%s | Fr. Kenny Ang",
  },
  description: defaultDescription,
  keywords: ["catholic", "priest", "professor"],
  creator: "Fr. Kenny Ang",
  openGraph: {
    title: "Fr. Kenny Ang",
    description: defaultDescription,
    type: "website",
    url: "/",
    siteName: "Fr. Kenny Ang",
    locale: "en-US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fr. Kenny Ang",
    description: defaultDescription,
  },
  metadataBase: baseUrl ? new URL(baseUrl) : undefined,
};

export const getMetadata = (
  {
    pathname = "/",
    title,
    description,
    image,
  }: {
    pathname?: string;
    title?: string;
    description?: string;
    image?: {
      url: string;
      alt?: string;
    };
  },
  parent: ResolvedMetadata
): Metadata => ({
  title,
  description,
  openGraph: {
    ...parent.openGraph,
    title,
    description,
    url: pathname,
    images: image
      ? [
          {
            url: image.url,
            width: 1200,
            height: 628,
            alt: image.alt,
          },
        ]
      : parent.openGraph?.images?.filter((i) => {
          // URL must be URL object or string
          if (typeof i === "string" || i instanceof URL) {
            return true;
          }

          if (!i.url) {
            return false;
          }
          if (typeof i.url !== "string" && !(i.url instanceof URL)) {
            return false;
          }
          return true;
        }),
  },
  twitter: {
    ...parent.twitter,
    site: parent.twitter?.site || undefined,
    siteId: parent.twitter?.siteId || undefined,
    creator: parent.twitter?.creator || undefined,
    creatorId: parent.twitter?.creatorId || undefined,
    title,
    description,
    images: image
      ? {
          url: image.url,
          alt: "Fr. Kenny Ang",
        }
      : parent.twitter?.images?.filter((i) => {
          // URL must be URL object or string
          if (!i.url) {
            return false;
          }
          if (typeof i.url !== "string" && !(i.url instanceof URL)) {
            return false;
          }
          return true;
        }),
  },
  alternates: {
    canonical: new URL(pathname, baseUrl).toString(),
    languages: {
      id: new URL(`/id${pathname}`, baseUrl).toString(),
      en: new URL(`/en${pathname}`, baseUrl).toString(),
    },
  },
  metadataBase: baseUrl ? new URL(baseUrl) : undefined,
});
