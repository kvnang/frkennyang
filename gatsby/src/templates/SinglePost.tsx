import { graphql, Link } from 'gatsby';
import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import PortableText from '@sanity/block-content-to-react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { getFluidGatsbyImage } from 'gatsby-source-sanity';
import formatDate from '../utils/formatDate';
import { breakpoints } from '../styles/breakpoints';

const link = ({ mark, children }) => {
  const target = mark.blank ? '_blank' : '_self';
  if (target === '_blank') {
    return (
      <a href={mark.href} target={target} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <Link to={mark.href}>{children}</Link>;
};

const serializers = {
  marks: {
    link,
  },
  types: {
    youtube: ({ node }) => {
      const { url } = node;
      const id = getYouTubeId(url);
      return (
        <YouTube videoId={id} containerClassName="youtube-iframe-wrapper" />
      );
    },
    inlineImage: ({ node }) => {
      const { asset, alt } = node;
      const sanityConfig = {
        projectId: process.env.SANITY_PROJECT_ID,
        dataset: process.env.SANITY_DATASET,
      };
      const fluidProps = getFluidGatsbyImage(
        asset.id,
        { maxWidth: 1024 },
        sanityConfig
      );
      return <Img fluid={fluidProps} alt={alt} />;
    },
  },
};

const SinglePostStyles = styled.div`
  padding: var(--section-padding) 0;

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
    margin: -0.75rem 0;
  }

  .post-meta {
    padding: 0.75rem 0;
  }

  .post-share {
    margin-left: auto;
    padding: 0.75rem 0;
    ul {
      display: flex;
      list-style: none;
      margin: -0.75rem;

      li {
        padding: 0.25rem;
        a {
          display: flex;
          padding: 0.5rem;
          &:hover,
          &:focus {
            svg {
              color: var(--gold);
            }
          }
        }

        svg {
          height: 1rem;
          width: auto;
          transition: var(--transition);
        }
      }
    }
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

  a {
    text-decoration: underline;
    text-decoration-color: var(--gold);
    text-decoration-thickness: 1px;
    text-underline-offset: 5px;
    transition: color var(--transition);

    &:hover,
    &:focus {
      color: var(--gold);
    }
  }
`;

export default function SinglePost({ location, data: { post } }) {
  const url = location.href ? location.href : '';
  const categories = Object.values(post.categories).map((cat) => cat.title);
  let featuredImg;
  if (post.mediaUrl) {
    featuredImg = (
      <YouTube
        videoId={getYouTubeId(post.mediaUrl)}
        containerClassName="youtube-iframe-wrapper"
      />
    );
  } else if (post.mainImage) {
    featuredImg = <Img fluid={post.mainImage.asset.fluid} alt={post.title} />;
  } else {
    featuredImg = '';
  }
  const meta = [];
  if (post.publishedAt) meta.push(formatDate(post.publishedAt));
  if (categories.length) meta.push(categories.join(', '));
  return (
    <SinglePostStyles>
      <div className="container">
        <div className="inner">
          <div className="post-header">
            <h1 className="h2 post-title">{post.title}</h1>
            <div className="post-byline">
              <div className="post-meta">
                <p>
                  <small>{meta.join(' ∙ ')}</small>
                </p>
              </div>
              <div className="post-share">
                <ul>
                  <li>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share of Facebook"
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`http://twitter.com/share?text=${post.title}&url=${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share of Twitter"
                    >
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share of LinkedIn"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="post-img">{featuredImg}</div>
          {post._rawBody ? (
            <PortableText blocks={post._rawBody} serializers={serializers} />
          ) : (
            ''
          )}
        </div>
      </div>
    </SinglePostStyles>
  );
}

export const query = graphql`
  query($slug: String!) {
    post: sanityPost(slug: { current: { eq: $slug } }) {
      id
      _rawBody(resolveReferences: { maxDepth: 10 })
      categories {
        id
        title
      }
      mainImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
      }
      mediaUrl
      publishedAt
      slug {
        current
      }
      title
    }
  }
`;
