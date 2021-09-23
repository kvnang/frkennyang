import { StaticImage, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { MdFormatAlignLeft, MdPlayArrow } from 'react-icons/md';
import styled from 'styled-components';
import { breakpoints } from '../styles/breakpoints';
import { PostProps } from '../types';
import { formatDate } from '../utils/helpers';

interface SkeletonProps {
  showImage?: boolean;
  format?: 'default' | 'list';
}

interface Props {
  post: PostProps;
  showImage?: boolean;
  format?: 'default' | 'list';
}

const PostStyles = styled.article`
  padding: calc(var(--post-gap) * 2) var(--post-gap);

  .post-img,
  .post-title,
  .post-excerpt {
    margin-bottom: 0.5em;
  }

  .post-inner {
    display: flex;
    flex-direction: column;
    transition: color var(--transition);

    &:hover,
    &:focus {
      color: var(--gold);

      .post-img {
        .gatsby-image-wrapper {
          transform: translate(-0.5rem, -0.5rem);
        }
        .post-img-inner {
          &::before {
            opacity: 0.7;
          }
        }
      }
    }
  }

  .post-details {
    flex: 1;
  }

  .post-img {
    .post-img-inner {
      width: 100%;
      height: 0;
      position: relative;
      padding-bottom: 56.25%;
      z-index: 0;

      &::before {
        content: '';
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        background: var(--grey);
        opacity: 0.2;
        transition: var(--transition);
      }

      &.skeleton-bg {
        &::before {
          content: none;
        }
      }
    }

    .gatsby-image-wrapper {
      width: 100%;
      transition: transform var(--transition);
    }

    .post-format {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2.5rem;
      width: 2.5rem;
      background-color: var(--black);
      padding: 0.5rem;
      z-index: 1;
      transform: translateZ(0);

      svg {
        color: var(--white);
        height: 100%;
        width: auto;
      }
    }
  }

  .post-excerpt,
  .post-meta {
    color: var(--black);
  }

  .post-excerpt {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .post-meta {
    &.skeleton-bg {
      width: 50%;
    }
  }

  &.format-list {
    .post-inner {
      flex-direction: row;
    }
    .post-img {
      order: 1;
      width: 100px;
      min-width: 100px;
      margin-left: 1.5rem;
      margin-bottom: 0;

      @media ${breakpoints.tablet} {
        width: 200px;
        min-width: 200px;
        margin-left: 1.5rem;
      }
    }
    .post-title {
      @media ${breakpoints.mobileOnly} {
        font-size: var(--font-size-h4);
      }
    }
    .post-excerpt {
      -webkit-line-clamp: 2;
      @media ${breakpoints.mobileOnly} {
        display: none;
      }
    }
  }

  .skeleton-bg {
    background: var(--offwhite-light);
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-image: linear-gradient(
        90deg,
        hsla(0, 100%, 100%, 0) 0,
        hsla(0, 100%, 100%, 0.25) 30%,
        hsla(0, 100%, 100%, 0.5) 60%,
        hsla(0, 100%, 100%, 0) 100%
      );
      z-index: 1;
      animation: shimmer 1.5s infinite;
      transform: translateX(-100%);
    }
  }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

export default function PostEntry({
  post,
  showImage = true,
  format = 'default',
}: Props) {
  let icon;
  switch (post.frontmatter.format.toLowerCase()) {
    case 'video':
      icon = <MdPlayArrow title="video" />;
      break;
    case 'article':
      icon = <MdFormatAlignLeft title="article" />;
      break;
    default:
      icon = '';
  }

  const meta = [];
  if (post.frontmatter.date) {
    meta.push(formatDate(post.frontmatter.date));
  }
  if (format === 'list' && post.frontmatter.format) {
    meta.push(post.frontmatter.format);
  }
  if (post.timeToRead) {
    meta.push(`${post.timeToRead.toString()} min read`);
  }

  return (
    <PostStyles className={`post format-${format}`}>
      <a href={`${post.fields.slug}`} className="post-inner">
        {showImage && (
          <div className="post-img">
            <div className="post-img-inner">
              {post.frontmatter.featuredImage ? (
                <GatsbyImage
                  image={
                    post.frontmatter.featuredImage.childImageSharp
                      .gatsbyImageData
                  }
                  alt={post.frontmatter.title}
                />
              ) : (
                <StaticImage
                  src="../assets/images/placeholder.jpg"
                  alt={post.frontmatter.title}
                  layout="fullWidth"
                />
              )}
              {post.frontmatter.format && format === 'default' && (
                <div className="post-format">{icon}</div>
              )}
            </div>
          </div>
        )}
        <div className="post-details">
          <h3 className="post-title">{post.frontmatter.title}</h3>
          <div className="post-excerpt">
            <p>
              {post.frontmatter.excerpt
                ? post.frontmatter.excerpt
                : post.excerpt || ''}
            </p>
          </div>
          <p className="post-meta">
            <small>{meta.join(' ∙ ')}</small>
          </p>
        </div>
      </a>
    </PostStyles>
  );
}

export function PostEntrySkeleton({
  showImage = true,
  format = 'default',
}: SkeletonProps) {
  return (
    <PostStyles className={`post format-${format}`}>
      <div className="post-inner">
        {showImage && (
          <div className="post-img">
            <div className="post-img-inner skeleton-bg" />
          </div>
        )}
        <div className="post-details">
          <h3 className="post-title skeleton-bg">&nbsp;</h3>
          <div className="post-excerpt skeleton-bg">
            &nbsp;
            <br />
            &nbsp;
          </div>
          <p className="post-meta skeleton-bg">
            <small>&nbsp;</small>
          </p>
        </div>
      </div>
    </PostStyles>
  );
}
