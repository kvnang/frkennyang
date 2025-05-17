import { SanityImageAssetDocument } from "@sanity/client";
import { TypedObject } from "@sanity/types";

export type LangType = "en" | "id";

export interface FormMessageTypes {
  status: string;
  message?: string;
  open: boolean;
}

export interface PostEntryProps {
  _id: string;
  _score?: number;
  title: {
    en: string;
    id?: string;
  };
  excerpt: {
    en: string;
    id?: string;
  };
  slug: { current: string };
  publishedAt: string;
  mainImage?: SanityImageAssetDocument;
  categories: { title: string; slug: { current: string } }[];
  format: { title: string };
}

export interface PostProps extends PostEntryProps {
  // id: number;
  // excerpt: string;
  // frontmatter: FrontmatterProps;
  // html: string;
  // fields: {
  //   slug: string;
  //   lang: string;
  // };
  // timeToRead: number;
  // parent?: {
  //   modifiedTime?: string;
  // };
  intro: {
    en: any[];
    id?: any[];
  };
  content: {
    en: any[];
    id?: any[];
  };
}

export interface CvSection {
  title: { en: string };
  items: Array<CvItem>;
}

export interface CvItem {
  title: { en: string };
  subtitle?: { en: string };
  institution?: { en: string };
  location?: { en: string };
  date?: string;
  link?: string;
  description?: { en: TypedObject[] };
  badges?: string[];
  active?: boolean;
}
