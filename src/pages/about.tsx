import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { graphql, HeadProps } from 'gatsby';
import SEO from '../components/Seo';

interface Props {
  data: {
    markdownRemark: {
      html: string;
    };
  };
}

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
    <main>
      <section className="page-p-t section-p-b intro">
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
      </section>
      <section className="section-p-b body">
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
      </section>
    </main>
  );
}

export function Head({ location: { pathname } }: HeadProps) {
  return (
    <SEO
      title="About"
      description="Fr. Kenny Ang is a Catholic priest from Indonesia who was ordained in 2019 and has spoken in numerous occasions across Asia and America."
      pathname={pathname}
    />
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
