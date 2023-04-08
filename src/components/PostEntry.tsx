import { graphql } from 'gatsby';
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { MdFormatAlignLeft, MdPlayArrow } from 'react-icons/md';
import { PostProps } from '../types';
import { LangType } from './LangContext';

interface SkeletonProps {
  showImage?: boolean;
  format?: 'default' | 'list';
}

interface Props {
  post: PostProps;
  showImage?: boolean;
  format?: 'default' | 'list';
  siteLang?: LangType | null;
}

export default function PostEntry({
  post,
  showImage = true,
  format = 'default',
  siteLang,
}: Props) {
  let icon;
  switch (post.frontmatter.format?.toLowerCase()) {
    case 'video':
      icon = <MdPlayArrow title="video" />;
      break;
    case 'article':
      icon = <MdFormatAlignLeft title="article" />;
      break;
    default:
      icon = '';
  }

  const onlyAvailableInLabel =
    post.fields.lang === 'en' ? 'Only in' : 'Hanya dalam bahasa';

  const meta = [];
  if (post.frontmatter.date) {
    meta.push(post.frontmatter.date);
  }
  if (format === 'list' && post.frontmatter.format) {
    meta.push(post.frontmatter.format);
  }
  if (post.timeToRead) {
    meta.push(`${post.timeToRead.toString()} min read`);
  }

  return (
    <article className={`post-entry format-${format}`}>
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
              {post.frontmatter.lang && post.frontmatter.lang !== siteLang && (
                <div className="post-lang">
                  <small>
                    {onlyAvailableInLabel}{' '}
                    <strong>{post.frontmatter.lang.toUpperCase()}</strong>
                  </small>
                </div>
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
    </article>
  );
}

export function PostEntrySkeleton({
  showImage = true,
  format = 'default',
}: SkeletonProps) {
  return (
    <article className={`post-entry format-${format}`}>
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
    </article>
  );
}

export const query = graphql`
  fragment MarkdownRemarkFields on MarkdownRemark {
    id
    excerpt
    frontmatter {
      title
      format
      date(formatString: "MMM D")
      excerpt
      featuredImage {
        childImageSharp {
          gatsbyImageData(
            aspectRatio: 1.777778
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 480
          )
        }
      }
      lang
    }
    fields {
      slug
      lang
    }
    timeToRead
  }
`;
