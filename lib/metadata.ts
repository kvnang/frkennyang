import type { Metadata, ResolvedMetadata } from "next";

const protocol =
  process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_VERCEL_URL
    ? "https"
    : "http";
const host =
  process.env.NEXT_PUBLIC_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  "localhost:3000";
const baseUrl = `${protocol}://${host}`;

const defaultDescription =
  "Fr. Kenny Ang is a Catholic priest from Indonesia who was ordained in 2019 and has spoken in numerous occasions across Asia and America.";

export const defaultMetadata: Metadata = {
  title: {
    default: "A Catholic Priest serving the Universal Church | Fr. Kenny Ang",
    template: "%s | Fr. Kenny Ang",
  },
  description: defaultDescription,
  keywords: ["catholic", "priest", "indonesia"],
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
      : parent.openGraph?.images,
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
      : parent.twitter?.images,
  },
});
