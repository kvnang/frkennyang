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

const AboutStyles = styled.main`
  h1 {
    font-size: var(--font-size-h2);
  }
  h2 {
    font-size: var(--font-size-h3);
    ${titleLine()}
  }
`;

const IntroStyles = styled.section`
  padding-top: var(--section-padding-sm);
  padding-bottom: var(--section-padding);

  .img {
    --width-xs: 6;
    --offset-xs: 0;
    --width-sm: 3;
    --width-md: 4;
    --offset-md: 1;

    margin-bottom: 2.5rem;

    .img-inner {
      position: relative;
      z-index: 0;

      &::before {
        content: '';
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: -1;
        bottom: -1rem;
        right: -1rem;
        background-color: var(--grey);
        opacity: 0.25;
      }
    }
  }
  .text {
    --width-xs: 12;
    --offset-xs: 0;
    --width-sm: 8;
    --offset-sm: 1;
    --width-md: 5;
    --offset-md: 1;
  }
`;

const BodyStyles = styled.section`
  padding-bottom: var(--section-padding);

  .inner {
    --width-xs: 12;
    --width-md: 6;
    --offset-md: 3;
  }

  .section-title {
    position: relative;
  }
`;

export default function AboutPage({ data }: Props) {
  if (!data.allMarkdownRemark.nodes.length) {
    return;
  }

  const { html } = data.allMarkdownRemark.nodes[0];
  const splitHTML = html.split('<hr>');
  const introHTML = splitHTML[0];
  splitHTML.shift(); // Remove intro / first element of the array
  const bodyHTML = splitHTML.join('');

  return (
    <AboutStyles>
      <SEO title="About" />
      <IntroStyles>
        <div className="container">
          <div className="row">
            <div className="img col">
              <div className="img-inner">
                <StaticImage src="../assets/images/frk-bio.jpg" alt="" />
              </div>
            </div>
            <div className="text col">
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: introHTML }}
                className="text-content"
              />
            </div>
          </div>
        </div>
      </IntroStyles>
      <BodyStyles>
        <div className="container">
          <div className="row">
            <div className="col inner">
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: bodyHTML }}
                className="text-content"
              />
            </div>
          </div>
        </div>
      </BodyStyles>
    </AboutStyles>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {
        fields: { collection: { eq: "data" }, slug: { eq: "/about/" } }
      }
      limit: 1
    ) {
      nodes {
        html
      }
    }
  }
`;
