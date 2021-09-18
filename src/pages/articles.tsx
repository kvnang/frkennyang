import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { titleLine } from '../styles/Typography';
import SEO from '../components/Seo';

interface MarkdownProps {
  html: string;
}
interface Props {
  data: {
    allMarkdownRemark: {
      nodes: Array<MarkdownProps>;
    };
  };
}

const IntroStyles = styled.section`
  .inner {
    --width-xs: 12;
    --width-md: 6;
    --offset-md: 3;
  }
`;

const BodyStyles = styled.section`
  background-color: var(--offwhite);

  .inner {
    --width-xs: 12;
    --width-md: 6;
    --offset-md: 3;
  }

  .section-title {
    position: relative;
  }
`;

export default function ArticlesPage({ data }) {
  const posts = data.posts.nodes;

  return (
    <main>
      <SEO title="Articles" />
      <IntroStyles className="page-p-t section-p-b">
        <div className="container">
          <div className="row">
            <div className="col inner">
              <h2>My Articles</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem
                ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </div>
      </IntroStyles>
      <BodyStyles className="section-p-t section-p-b bg-light">
        <div className="container">
          <div className="row">
            <div className="col inner">
              <h2>Test</h2>
            </div>
          </div>
        </div>
      </BodyStyles>
    </main>
  );
}

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      limit: 9
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          format
          date(formatString: "MMMM D, YYYY")
          featuredImage {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1.777778)
            }
          }
        }
        fields {
          slug
          lang
        }
      }
    }
  }
`;
