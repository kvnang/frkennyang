import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

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

export default function AboutPage() {
  return (
    <>
      <IntroStyles>
        <div className="container">
          <div className="row">
            <div className="img col">
              <div className="img-inner">
                <StaticImage src="../assets/images/frk-bio.jpg" alt="" />
              </div>
            </div>
            <div className="text col">
              <h1 className="h2">About Fr. Kenny</h1>
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
              <p>
                Ut ipsa ducimus harum aut sed est et. Tempore possimus placeat
                officiis eum illo. Itaque optio maiores eaque quia ea
                accusantium eaque. Qui neque vel qui. Magni sed culpa non est
                doloribus et earum amet.
              </p>
            </div>
          </div>
        </div>
      </IntroStyles>
      <BodyStyles>
        <div className="container">
          <div className="row">
            <div className="col inner">
              <h2 className="h3 title-line">Subtitle 123</h2>
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
              <h2 className="h3 title-line">Subtitle 123</h2>
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
            </div>
          </div>
        </div>
      </BodyStyles>
    </>
  );
}
