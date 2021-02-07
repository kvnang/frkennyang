import { graphql, Link } from 'gatsby';
import React from 'react';
import PortableText from '@sanity/block-content-to-react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
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
};

const SinglePostStyles = styled.div`
  padding: var(--section-padding) 0;

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
    color: var(--dark-grey);
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
          padding: 0.5rem;
          &:hover,
          &:focus {
            svg {
              fill: var(--yellow);
            }
          }
        }

        svg {
          height: 1.25rem;
          width: auto;
          transition: var(--transition);
        }
      }
    }
  }

  .post-img {
    margin-right: -1rem;
    margin-left: -1rem;

    @media ${breakpoints.tablet} {
      margin-right: -3rem;
      margin-left: -3rem;
    }
    @media ${breakpoints.laptop} {
      margin-right: -6rem;
      margin-left: -6rem;
    }
  }
`;

export default function SinglePost({ location, data: { post } }) {
  const url = location.href ? location.href : '';
  console.log(url);
  const categories = Object.values(post.categories).map((cat) => cat.title);
  return (
    <SinglePostStyles>
      <div className="in-grid">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
            <div className="post-header">
              <h1 className="h2 post-title">{post.title}</h1>
              <div className="post-byline">
                <div className="post-meta">
                  <p className="small">
                    {formatDate(post.publishedAt)} ∙ {categories.join(', ')}
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
                        <FaFacebook />
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
                        <FaLinkedin />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="post-img">
              {post.mainImage ? (
                <Img fluid={post.mainImage.asset.fluid} alt={post.title} />
              ) : (
                <img src={PostPlaceholder} alt={post.title} />
              )}
            </div>
            <PortableText blocks={post._rawBody} serializers={serializers} />
          </div>
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
      publishedAt
      slug {
        current
      }
      title
    }
  }
`;
