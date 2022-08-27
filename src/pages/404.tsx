import React from 'react';
import { HeadProps, Link } from 'gatsby';
import SEO from '../components/Seo';

export default function NotFoundPage() {
  return (
    <main className="page-404">
      <section className="container not-found page-p-t section-p-b">
        <div className="row">
          <div className="col">
            <h1>404 Page Not Found</h1>
            <p>
              The page you are looking for does not exist. It may have been
              moved, or removed altogether. Perhaps you can return back to the
              site’s homepage and see if you can find what you are looking for.
            </p>
            <Link to="/" className="button">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export function Head({ location: { pathname } }: HeadProps) {
  return (
    <SEO
      title="404 Page Not Found"
      description="The page you are looking for does not exist."
      pathname={pathname}
    />
  );
}
