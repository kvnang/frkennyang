import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  padding-top: 1rem;
  padding-bottom: 1rem;

  .col {
    --width-xs: 12;
  }

  p {
    text-align: right;
  }
`;

export default function Footer() {
  return (
    <>
      <FooterStyles>
        <div className="container">
          <div className="row">
            <div className="col">
              <p>
                <small>
                  &copy; {new Date().getFullYear()}. All rights reserved.
                </small>
              </p>
            </div>
          </div>
        </div>
      </FooterStyles>
    </>
  );
}
