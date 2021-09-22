import React from 'react';
import styled from 'styled-components';
import Menu from './Menu';

const FooterStyles = styled.footer`
  .container {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-top: 1px solid var(--dark-grey);
  }

  .col {
    --width-xs: 12;
  }

  p {
    text-align: right;
  }

  .footer-light & {
    background-color: var(--offwhite);
    color: var(--black);

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
    .container {
      border-top: 0;
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
