import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemHead,
} from '../components/Accordions';
import { breakpoints } from '../styles/breakpoints';
import cv from '../data/cv';

const IntroStyles = styled.section`
  padding-top: var(--section-padding-sm);
  padding-bottom: var(--section-padding);
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

const BioDataStyles = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
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

  h5,
  h6 {
    margin-bottom: 0.35rem;
  }

  h5 {
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

export default function AboutPage() {
  return (
    <main>
      <Helmet bodyAttributes={{ class: 'page-cv' }} />
      <IntroStyles>
        <div className="container">
          <div className="row">
            <div className="img col">
              <div className="img-inner">
                <StaticImage src="../assets/images/frk-cv.jpg" alt="" />
              </div>
            </div>
            <div className="text col">
              <h1 className="h2">Curriculum Vitae</h1>
              <p>
                Neque rerum consequatur qui laboriosam culpa ipsam. Quia
                voluptatem modi dolor. In id vero veniam fuga exercitationem et
                unde architecto. Ad et quis qui veritatis libero.
              </p>
              <p>
                Excepturi temporibus incidunt aut qui non. Iusto doloremque
                quidem labore vel rerum. Facere aut nam voluptas nulla magnam
                illo laboriosam praesentium. Atque voluptatem et sit non
                architecto sunt.
              </p>
              <p>
                Quia sit dolorem eos nisi modi quia. Nisi in est sunt est
                aliquam voluptas. In porro voluptates sint repellat quaerat
                sequi sit. Aspernatur nisi voluptates tenetur unde consequatur
                et. Culpa facere illum ut.
              </p>
              <BioDataStyles>
                <li>
                  <strong>Nationality</strong> / Indonesian
                </li>
                <li>
                  <strong>Birth</strong> / Jakarta, 16 January 1992
                </li>
                <li>
                  <strong>Priestly Ordination</strong> / Surabaya, 14 May 2019
                </li>
                <li>
                  <strong>Incardination</strong> / Diocese of Surabaya
                </li>
              </BioDataStyles>
            </div>
          </div>
        </div>
      </IntroStyles>
      <BodyStyles>
        <div className="container">
          <div className="row">
            <div className="col inner">
              {cv.map((cvGroup, i) => (
                <Accordion>
                  <AccordionItem
                    key={`accordion-cv-${i}`}
                    id={`accordion-cv-${i}`}
                  >
                    <AccordionItemHead>
                      <h3>{cvGroup.title}</h3>
                    </AccordionItemHead>
                    <AccordionItemBody>
                      <CvUListStyles>
                        {cvGroup.items.map((cvItem, j) => (
                          <li key={`accordion-cv-li-${j}`}>
                            {(cvItem.title || cvItem.subtitle) && (
                              <h5>
                                {cvItem.title}
                                {cvItem.title && cvItem.subtitle ? (
                                  <span> / {cvItem.subtitle}</span>
                                ) : null}
                                {!cvItem.title && cvItem.subtitle ? (
                                  <span>{cvItem.subtitle}</span>
                                ) : null}
                              </h5>
                            )}
                            {cvItem.meta && <h6>{cvItem.meta}</h6>}
                            {cvItem.description && (
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
