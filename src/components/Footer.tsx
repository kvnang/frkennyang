import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../styles/breakpoints';
import Menu from './Menu';

const FooterStyles = styled.footer`
  .container {
    padding-top: 1rem;
    padding-bottom: 2.5rem;
    border-top: 1px solid var(--dark-grey);
  }

  .col {
    --width-xs: 12;
  }

  p {
    text-align: right;
  }

  .page-contents & {
    background-color: var(--offwhite);

    .container {
      border-color: var(--offwhite-light);
    }

    a,
    a:hover,
    a:focus {
      color: var(--black);
    }
  }

  .page-home & {
    @media ${breakpoints.laptop} {
      background-color: var(--offwhite);

      a,
      a:hover,
      a:focus {
        color: var(--black);
      }
      .container {
        border-top: 0;
      }
    }

    .col {
      --width-xs: 12;
      --width-md: 10;
      --offset-md: 1;
    }
  }
`;

export default function Footer() {
  return (
    <FooterStyles>
      <div className="container">
        <div className="row">
          <div className="col">
            {/* <p>
                <small>
                  &copy; {new Date().getFullYear()}. All rights reserved.
                </small>
              </p> */}
            <Menu isFooter />
          </div>
        </div>
      </div>
    </FooterStyles>
  );
}
