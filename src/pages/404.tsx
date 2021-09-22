import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const ColStyles = styled.div`
  --width-xs: 12;
  --offset-xs: 0;
  --width-sm: 10;
  --width-md: 8;
  --offset-md: 1;
  --width-lg: 6;
`;

const NotFoundPage = () => (
  <main>
    <section className="container not-found page-p-t section-p-b">
      <div className="row">
        <ColStyles className="col">
          <h1>404 Page Not Found</h1>
          <p>
            The page you are looking for does not exist. It may have been moved,
            or removed altogether. Perhaps you can return back to the site’s
            homepage and see if you can find what you are looking for.
          </p>
          <Link to="/" className="button">
            Back to Home
          </Link>
        </ColStyles>
      </div>
    </section>
  </main>
);

export default NotFoundPage;
