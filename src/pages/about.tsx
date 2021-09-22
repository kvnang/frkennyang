import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { titleLine } from '../styles/Typography';
import SEO from '../components/Seo';

interface Props {
  data: {
    markdownRemark: {
      html: string;
    };
  };
}

const AboutStyles = styled.main`
  h2 {
    ${titleLine()}
  }
`;

const IntroStyles = styled.section`
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
  if (!data.markdownRemark?.html) {
    return;
  }

  const { html } = data.markdownRemark;
  const splitHTML = html.split('<hr>');
  const introHTML = splitHTML[0];
  splitHTML.shift(); // Remove intro / first element of the array
  const bodyHTML = splitHTML.join('');

  return (
    <AboutStyles>
      <SEO
        title="About"
        description="Fr. Kenny Ang is a Catholic priest from Indonesia who was ordained in 2019 and has spoken in numerous occasions across Asia and America."
      />
      <IntroStyles className="page-p-t section-p-b">
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
      <BodyStyles className="section-p-b">
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
    markdownRemark(
      fields: { collection: { eq: "data" }, slug: { eq: "/about/" } }
    ) {
      html
    }
  }
`;
