import type { Metadata } from "next";

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

export const getMetadata = ({
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
}) => ({
  title,
  description,
  openGraph: {
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
      : undefined,
  },
  twitter: {
    url: pathname,
    description,
    images: image
      ? {
          url: image.url,
          alt: "Fr. Kenny Ang",
        }
      : undefined,
  },
});
