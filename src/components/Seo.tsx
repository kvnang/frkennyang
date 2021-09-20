import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router'; // eslint-disable-line import/no-unresolved
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  children?: React.ReactNode;
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  lang?: string;
}

export default function SEO({
  children,
  title,
  description,
  canonical,
  image,
  lang = 'en',
}: Props) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          keywords
          siteUrl
        }
      }
    }
  `);
  const { pathname } = useLocation() || '';

  const metaDescription = description || site.siteMetadata.description;
  const metaKeywords = site.siteMetadata.keywords.join(', ');
  const url = `${site.siteMetadata.siteUrl}${pathname}`;
  const canonicalUrl = canonical
    ? `${site.siteMetadata.siteUrl}${canonical}`
    : url;

  const mainFavicon =
    process.env.NODE_ENV === 'development' ? 'favicon-dev' : 'favicon';

  let cardImage;

  if (image) {
    cardImage = image.includes('http')
      ? image
      : `${site.siteMetadata.siteUrl}${image}`;
  }
  return (
    <Helmet
      htmlAttributes={{ lang }}
      titleTemplate={`%s - ${site.siteMetadata.title}`}
    >
      <html lang="en" />
      {/* Primary Meta Tags */}
      <title>{title || site.siteMetadata.title}</title>
      <meta name="title" content={title || site.siteMetadata.title} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      {/* Favicons */}
      <link rel="icon" type="image/svg+xml" href={`/${mainFavicon}.svg`} />
      <link rel="icon" href={`/${mainFavicon}.ico`} sizes="32x32" />
      <link rel="icon" href="/favicon-128.png" sizes="128x128" />
      <link rel="icon" href="/favicon-192.png" sizes="192x192" />
      {/* Android */}
      <link rel="shortcut icon" href="/favicon-196.png" sizes="196x196" />
      {/* iOS */}
      <link rel="apple-touch-icon" href="/favicon-120.png" sizes="120x120" />
      <link rel="apple-touch-icon" href="/favicon-152.png" sizes="152x152" />
      <link rel="apple-touch-icon" href="/favicon-180.png" sizes="180x180" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} key="ogurl" />
      <meta
        property="og:image"
        content={cardImage || `${site.siteMetadata.siteUrl}/opengraph.jpg`}
      />
      <meta property="og:title" content={title || site.siteMetadata.title} />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      {/* twitter */}
      <meta
        property="twitter:title"
        content={title || site.siteMetadata.title}
      />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:card" content="summary" />
      <meta
        property="twitter:image"
        content={cardImage || `${site.siteMetadata.siteUrl}/opengraph.jpg`}
      />
      {children}
    </Helmet>
  );
}
