import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { graphql, HeadProps } from 'gatsby';
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemHead,
} from '../components/Accordions';
import SEO from '../components/Seo';

interface CvArrayProps {
  title: string;
  titleLink?: string;
  items: Array<{
    title?: string;
    subtitle?: string;
    meta?: string;
    description?: string;
  }>;
}

interface MdElementProps {
  children?: Array<MdElementProps>;
  properties?: any;
  tagName?: string;
  value?: string;
  type: string;
}
interface Props {
  data: {
    cv: {
      html: string;
    };
    cvList: {
      htmlAst: {
        children: Array<MdElementProps>;
        data: {
          quirksMode: boolean;
        };
        type: string;
      };
    };
  };
}

export default function CvPage({ data }: Props) {
  if (!data.cv?.html) {
    return;
  }

  const { html } = data.cv;
  const introHTML = html;

  // CV List
  const { htmlAst } = data.cvList;
  const cvArray: Array<CvArrayProps> = [];

  let i = 0;
  htmlAst.children.forEach((firstLevel) => {
    if (firstLevel.tagName === 'h2' && firstLevel.children?.length) {
      const titleText = firstLevel.children.find((a) => a.type === 'text');
      const titleLink = firstLevel.children.find((a) => a.tagName === 'a');
      cvArray.push({
        title: titleText?.value || '',
        titleLink: titleLink?.properties?.href || null,
        items: [],
      });
    }

    if (firstLevel.tagName === 'ul') {
      firstLevel.children?.forEach((secondLevel) => {
        if (secondLevel.tagName === 'li') {
          let title;
          let subtitle;
          let meta;
          let description;

          secondLevel.children?.forEach((thirdLevel) => {
            if (thirdLevel.tagName === 'h3' && thirdLevel.children?.length) {
              const text = thirdLevel.children.find((a) => a.type === 'text');
              title = text?.value || '';
            }
            if (thirdLevel.tagName === 'h4' && thirdLevel.children?.length) {
              const text = thirdLevel.children.find((a) => a.type === 'text');
              subtitle = text?.value || '';
            }
            if (thirdLevel.tagName === 'h5' && thirdLevel.children?.length) {
              const text = thirdLevel.children.find((a) => a.type === 'text');
              meta = text?.value || '';
            }
            if (thirdLevel.tagName === 'p' && thirdLevel.children?.length) {
              const text = thirdLevel.children.find((a) => a.type === 'text');
              description = text?.value || '';
            } else if (thirdLevel.type === 'text') {
              description = thirdLevel.value || '';
            }
          });
          const obj = {
            title,
            subtitle,
            meta,
            description,
          };

          cvArray[i].items.push(obj);
        }
      });
      i += 1;
    }
  });

  return (
    <main>
      <section className="page-p-t section-p-b intro">
        <div className="inner">
          <div className="container">
            <div className="row">
              <div className="img col">
                <div className="img-inner">
                  <StaticImage src="../assets/images/frk-cv.jpg" alt="" />
                </div>
              </div>
              <div className="text col">
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: introHTML }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-p-b body">
        <div className="container">
          <div className="row">
            <div className="col inner">
              {cvArray.map((cvGroup, j) => (
                <Accordion key={`accordion-${j}`}>
                  <AccordionItem
                    key={`accordion-cv-${j}`}
                    id={
                      cvGroup.titleLink
                        ? cvGroup.titleLink.replace('#', '')
                        : `accordion-cv-${j}`
                    }
                  >
                    <AccordionItemHead>
                      <h3>{cvGroup.title}</h3>
                    </AccordionItemHead>
                    <AccordionItemBody>
                      <ul className="cv-list">
                        {cvGroup.items.map((cvItem, k) => (
                          <li key={`accordion-cv-li-${k}`}>
                            {(cvItem.title || cvItem.subtitle) && (
                              <h4>
                                {cvItem.title}
                                {cvItem.title && cvItem.subtitle ? (
                                  <span> / {cvItem.subtitle}</span>
                                ) : null}
                                {!cvItem.title && cvItem.subtitle ? (
                                  <span>{cvItem.subtitle}</span>
                                ) : null}
                              </h4>
                            )}
                            {cvItem.meta && <h6>{cvItem.meta}</h6>}
                            {cvItem.description &&
                              /\S/.test(cvItem.description) && (
                                <p className="small">{cvItem.description}</p>
                              )}
                          </li>
                        ))}
                      </ul>
                    </AccordionItemBody>
                  </AccordionItem>
                </Accordion>
              ))}
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
      title="Curriculum Vitae"
      description="Fr. Kenny's online Curriculum Vitae features his biograhical data and educational history, as well as professional experience."
      pathname={pathname}
    />
  );
}

export const query = graphql`
  query {
    cv: markdownRemark(
      fields: { collection: { eq: "data" }, slug: { eq: "/cv/" } }
    ) {
      html
    }
    cvList: markdownRemark(
      fields: { collection: { eq: "data" }, slug: { eq: "/cvList/" } }
    ) {
      htmlAst
    }
  }
`;
