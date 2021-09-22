import { graphql } from 'gatsby';
import React from 'react';
import getYouTubeId from 'get-youtube-id';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

// import { getGatsbyImageData } from 'gatsby-source-sanity';
import { formatDate } from '../utils/helpers';
import { breakpoints } from '../styles/breakpoints';
import LangSwitcher from '../components/LangSwitcher';
import { PostProps } from '../types';
import SEO from '../components/Seo';
import SocialShare from '../components/SocialShare';

interface Props {
  location: Location;
  data: {
    post: PostProps;
  };
}

const TitleStyles = styled.div`
  position: relative;

  .language-switcher {
    margin-bottom: 1rem;

    @media ${breakpoints.tabletL} {
      position: absolute;
      left: -3rem;
      top: 0.5rem;
    }
  }
  .post-title {
    margin-top: 0 !important;
  }
`;

const SinglePostStyles = styled.main`
  .inner {
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;
  }

  .post-header,
  .post-img {
    margin-bottom: 1.5rem;

    @media ${breakpoints.laptop} {
      margin-bottom: 3rem;
    }
  }

  .post-title {
    margin-bottom: 1rem;
  }

  .post-byline {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-items: center;
    margin: -0.75rem;
  }

  .post-meta,
  .post-share {
    padding: 0.75rem;
  }

  .post-img {
    margin-right: -5vw;
    margin-left: -5vw;

    @media ${breakpoints.tablet} {
      margin-right: -3rem;
      margin-left: -3rem;
    }
  }

  .gatsby-image-wrapper,
  .youtube-iframe-wrapper {
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  .youtube-iframe-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;

    iframe {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  .post-footer {
    display: flex;
    justify-content: flex-end;
    /* padding-top: 0.625rem; */
    margin-top: 1.5rem;
    border-top: 1px solid var(--grey);

    .post-share {
      padding-right: 0;
      padding-left: 0;
    }
  }
`;

const PostContentStyles = styled.div`
  p,
  li {
    line-height: 1.75;
  }

  h2 {
    font-size: var(--font-size-h3);
  }
  h3 {
    font-size: var(--font-size-h4);
  }
  h4 {
    font-size: var(--font-size-h5);
  }
  h5 {
    font-size: var(--font-size-h6);
  }

  .book {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--dark-grey);
    position: relative;
    z-index: 0;

    @media ${breakpoints.tablet} {
      flex-direction: row;
    }

    &:not(:last-child) {
      margin-bottom: var(--p-spacing);
    }

    &__img,
    &__text {
      flex: 0 0 50%;
      padding: 1.25rem;

      @media ${breakpoints.tablet} {
        padding: 2rem;
      }
    }

    &__img {
      background-color: var(--dark-grey);

      &__inner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .gatsby-resp-image-figure {
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.32);
          width: 6.25rem;
          transition: box-shadow var(--transition);

          @media ${breakpoints.tablet} {
            width: 8.75rem;
          }
        }
      }
    }

    &__text {
      h5 {
        margin-bottom: 0;

        + h6 {
          margin-top: 0.5em;
        }

        + p {
          margin-top: 1em;
        }
      }

      a {
        /* text-decoration: none; */

        &::after {
          content: '';
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        &::before {
          content: '';
          height: 1rem;
          width: 1rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='%23e2a93a'%3E%3Cpath d='M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z'/%3E%3C/svg%3E");
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          position: absolute;
          right: 0.5rem;
          bottom: 0.5rem;
          opacity: 0.5;
          transition: opacity var(--transition);
        }

        &:hover {
          &::before {
            opacity: 1;
          }
          .gatsby-resp-image-figure {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.64);
          }
        }
      }

      p {
        position: relative;
        z-index: 1;
      }
    }
  }
`;

export default function SinglePost({ location, data: { post } }: Props) {
  const url = location.href ? location.href : '';
  const categories = post.frontmatter.category;
  let featuredImage;
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

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={
          post.frontmatter.excerpt
            ? post.frontmatter.excerpt
            : post.excerpt || ''
        }
        image={post.frontmatter.featuredImage?.publicURL}
      />
      <SinglePostStyles className="page-p-t page-p-b">
        <section className="container">
          <div className="inner">
            <div className="post-header">
              <TitleStyles>
                <LangSwitcher vertical />
                <h1 className="h2 post-title">{post.frontmatter.title}</h1>
              </TitleStyles>
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
            <PostContentStyles className="text-content">
              {post.html ? (
                // eslint-disable-next-line react/no-danger
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
              ) : (
                ''
              )}
            </PostContentStyles>
            <div className="post-footer">
              <SocialShare
                title={post.frontmatter.title}
                url={url}
                label="Share:"
              />
            </div>
          </div>
        </section>
      </SinglePostStyles>
    </>
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
        date
        category
        youtube
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1.6667
              layout: FULL_WIDTH
              placeholder: BLURRED
            )
          }
          publicURL
        }
      }
      excerpt
    }
  }
`;
