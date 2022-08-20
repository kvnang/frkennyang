import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { LangContext } from './LangContext';
import { unleadingSlashIt, untrailingSlashIt } from '../utils/helpers';

interface Props {
  children?: React.ReactNode;
  pathname: string;
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
}

export default function SEO({
  children,
  pathname,
  title,
  description,
  canonical,
  image,
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

  const { siteUrl } = site.siteMetadata;

  const metaDescription = description || site.siteMetadata.description;
  const metaKeywords = site.siteMetadata.keywords.join(', ');
  const url = `${siteUrl}${pathname}`;
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : url;

  const mainFavicon =
    process.env.NODE_ENV === 'development' ? 'favicon-dev' : 'favicon';

  let cardImage;

  if (image) {
    cardImage = image.includes('http') ? image : `${siteUrl}${image}`;
  }

  const siteName = site.siteMetadata.title;
  const seoTitle = title || siteName;

  const localizedPathname = pathname.startsWith('/id/')
    ? pathname.replace('/id', '')
    : `/id${pathname}`;

  const { lang } = useContext(LangContext);

  return (
    <>
      {/* Primary Meta Tags */}
      <title key="document-title">{`${seoTitle} | ${site.siteMetadata.title}`}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      {/* Language */}
      <link
        rel="alternate"
        hrefLang={lang === 'id' ? 'en' : 'id'}
        href={`${untrailingSlashIt(siteUrl)}/${unleadingSlashIt(
          localizedPathname
        )}`}
      />
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
      <meta property="og:title" content={seoTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      {/* twitter */}
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:card" content="summary" />
      <meta
        property="twitter:image"
        content={cardImage || `${site.siteMetadata.siteUrl}/opengraph.jpg`}
      />
      {children}
    </>
  );
}
