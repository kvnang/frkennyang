import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface FormMessageTypes {
  status: string;
  message?: string;
  open: boolean;
}

export interface FrontmatterProps {
  title: string;
  format: string;
  date: string;
  featuredImage?: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
    publicURL: string;
  };
  youtube?: string;
  category?: string[];
  excerpt?: string;
  slug?: string;
}

export interface PostProps {
  id: number;
  excerpt: string;
  frontmatter: FrontmatterProps;
  html: string;
  fields: {
    slug: string;
    lang: string;
  };
  timeToRead: number;
  parent?: {
    modifiedTime?: string;
  };
}
