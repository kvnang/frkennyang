import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface FormMessageTypes {
  status: string;
  message?: string;
  open: boolean;
}

export interface PostProps {
  id: number;
  excerpt: string;
  frontmatter: {
    title: string;
    format: string;
    date: string;
    featuredImage: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    youtube?: string;
    category?: string[];
  };
  html: string;
  fields: {
    slug: string;
    lang: string;
  };
  timeToRead: number;
}
