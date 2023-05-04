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
  mainImageUrl?: string;
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
  content: {
    en: any[];
    id?: any[];
  };
}
