import { graphql, Link } from 'gatsby';
import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
// import { getGatsbyImageData } from 'gatsby-source-sanity';
import formatDate from '../utils/formatDate';
import { breakpoints } from '../styles/breakpoints';

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
  const categories = post.frontmatter.category;
  let featuredImage;
  if (post.frontmatter.mediaUrl) {
    featuredImage = (
      <YouTube
        videoId={getYouTubeId(post.frontmatter.mediaUrl)}
        containerClassName="youtube-iframe-wrapper"
      />
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
  if (post.publishedAt) meta.push(formatDate(post.publishedAt));
  if (categories?.length) meta.push(categories.join(', '));
  return (
    <SinglePostStyles>
      <div className="container">
        <div className="inner">
          <div className="post-header">
            <h1 className="h2 post-title">{post.frontmatter.title}</h1>
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
                      aria-label="Share on Facebook"
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`http://twitter.com/share?text=${post.title}&url=${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/?text=${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on WhatsApp"
                    >
                      <FaWhatsapp />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="post-img">{featuredImage}</div>
          <div />
          {post.html ? (
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          ) : (
            ''
          )}
        </div>
      </div>
    </SinglePostStyles>
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
        date(formatString: "MMMM D, YYYY")
        category

        featuredImage {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1.6667, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
