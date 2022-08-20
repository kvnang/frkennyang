import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { graphql, HeadProps } from 'gatsby';
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemHead,
} from '../components/Accordions';
import { breakpoints } from '../styles/breakpoints';
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

const IntroStyles = styled.section`
  position: relative;
  z-index: 0;

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

    // Different from About page
    padding-bottom: 2.5rem;
    position: relative;

    @media ${breakpoints.laptop} {
      padding-bottom: 4.5rem;
    }

    * {
      color: var(--black);
    }

    &::before {
      content: '';
      position: absolute;
      height: calc(100% + 7.5rem);
      width: 200%;
      top: -7.5rem;
      left: -50%;
      z-index: -1;
      background-color: var(--offwhite);

      @media ${breakpoints.tablet} {
        height: calc(100% + 2rem);
        width: calc(200% + 20%);
        top: -2rem;
        left: -20%;
      }
      @media ${breakpoints.laptop} {
        height: calc(100% + 20rem);
        width: calc(200% + 50%);
        top: -20rem;
        left: -50%;
      }
    }
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
`;

const BodyStyles = styled.section`
  .inner {
    --width-xs: 12;
    --width-md: 8;
    --offset-md: 2;
    --width-lg: 6;
    --offset-lg: 3;
  }

  .section-title {
    position: relative;
  }
`;

const CvUListStyles = styled.ul`
  list-style: none;
  padding: 0;

  li {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  h4,
  h5 {
    margin-bottom: 0.35rem !important;
  }

  h4 {
    span {
      font-weight: 400;
    }
  }

  h6 {
    opacity: 0.8;
  }

  p {
    color: var(--white);
  }
`;

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
      <IntroStyles className="page-p-t section-p-b">
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
      </IntroStyles>
      <BodyStyles className="section-p-b">
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
                      <CvUListStyles>
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
                      </CvUListStyles>
                    </AccordionItemBody>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </BodyStyles>
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
