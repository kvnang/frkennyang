import { graphql, HeadProps } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import getYouTubeId from 'get-youtube-id';
import { GatsbyImage } from 'gatsby-plugin-image';
import LangSwitcher from '../components/LangSwitcher';
import { PostProps } from '../types';
import SEO from '../components/Seo';
import SocialShare from '../components/SocialShare';
import { LangContext, LangType } from '../components/LangContext';
import { IndonesiaFlag, UsFlag } from '../components/Flags';
import { formatDate } from '../utils/helpers';

interface DataProps {
  post: PostProps;
}

interface PageContextProps {
  lang: LangType;
}
interface Props {
  location: Location;
  data: DataProps;
  pageContext: PageContextProps;
}

export default function SinglePost({
  location,
  data: { post },
  pageContext: { lang: pageLang },
}: Props) {
  const { lang, setLang } = useContext(LangContext);

  const url = location.href ? location.href : '';
  const categories = post.frontmatter.category;
  const contentLang = post.frontmatter.lang || pageLang;

  let featuredImage;

  useEffect(() => {
    // Only set lang if the content lang is consistent with the page lang
    if (pageLang && pageLang === contentLang) {
      setLang(pageLang);
    }
  }, [pageLang]); // eslint-disable-line react-hooks/exhaustive-deps

  if (post.frontmatter.youtube) {
    featuredImage = (
      <div className="youtube-iframe-wrapper">
        <iframe
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          width="640"
          height="360"
          src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(
            post.frontmatter.youtube
          )}`}
        />
      </div>
    );
  } else if (post.frontmatter.featuredImage) {
    featuredImage = (
      <GatsbyImage
        image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
        alt={post.frontmatter.title}
      />
    );
  } else {
    featuredImage = '';
  }
  const meta = [];
  if (post.frontmatter.date) meta.push(formatDate(post.frontmatter.date));
  if (categories?.length) meta.push(categories.join(', '));

  useEffect(() => {
    if (contentLang) {
      document.documentElement.setAttribute(
        'lang',
        pageLang === contentLang ? contentLang : lang || contentLang
      );
    }
  }, [contentLang]);

  return (
    <main className="page-p-t page-p-b single-post">
      <section className="container">
        <div className="inner">
          {post.frontmatter.lang && post.frontmatter.lang !== lang && (
            <div className="only-available-in">
              {post.frontmatter.lang === 'en' && <UsFlag />}
              {post.frontmatter.lang === 'id' && <IndonesiaFlag />}
              {lang === 'en' && (
                <p>
                  This article is only available in{' '}
                  <strong>Bahasa Indonesia</strong>.
                </p>
              )}
              {lang === 'id' && (
                <p>
                  Artikel ini hanya tersedia di dalam{' '}
                  <strong>bahasa Ingris</strong>.
                </p>
              )}
            </div>
          )}
          <div className="post-header">
            <div className="post-header__inner">
              <LangSwitcher vertical />
              <h1 className="post-title">{post.frontmatter.title}</h1>
            </div>
            <div className="post-byline">
              <div className="post-meta">
                <p>
                  <small>{meta.join(' ∙ ')}</small>
                </p>
              </div>
              <SocialShare title={post.frontmatter.title} url={url} />
            </div>
          </div>
          <div className="post-img">{featuredImage}</div>
          <div className="post-content text-content">
            {post.html ? (
              // eslint-disable-next-line react/no-danger
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            ) : (
              ''
            )}
          </div>
          <div className="post-footer">
            <SocialShare
              title={post.frontmatter.title}
              url={url}
              label="Share:"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export function Head({
  location: { pathname },
  data: { post },
  pageContext: { lang: pageLang },
}: HeadProps<DataProps, PageContextProps>) {
  return (
    <SEO
      title={post.frontmatter.title}
      description={
        post.frontmatter.excerpt ? post.frontmatter.excerpt : post.excerpt || ''
      }
      image={post.frontmatter.featuredImage?.publicURL}
      pathname={pathname}
    />
  );
}

export const pageQuery = graphql`
  query ($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        format
        date(formatString: "YYYY-MM-DDTHH:mm:ss.SSS")
        category
        youtube
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1.6667
              layout: CONSTRAINED
              placeholder: BLURRED
              width: 896
            )
          }
          publicURL
        }
        excerpt
        lang
      }
      excerpt
    }
  }
`;
