import { StaticImage, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { MdFormatAlignLeft, MdPlayArrow } from 'react-icons/md';
import styled from 'styled-components';
import { PostProps } from '../types';

interface Props {
  post: PostProps;
  showImage?: boolean;
}

const PostStyles = styled.article`
  padding: var(--post-gap);

  .post-img,
  .post-title,
  .post-excerpt {
    margin-bottom: 0.5rem;
  }
`;

const PostInnerStyles = styled.a`
  display: flex;
  flex-direction: column;

  &:hover,
  &:focus {
    .post-title {
      color: var(--gold);
    }
    .post-img {
      .gatsby-image-wrapper {
        transform: translate(-0.5rem, -0.5rem);
      }
      &::before {
        opacity: 0.7;
      }
    }
  }
`;

const PostImageStyles = styled.div`
  position: relative;

  .gatsby-image-wrapper {
    transition: var(--transition);
  }

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

  .post-format {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2.5rem;
    width: 2.5rem;
    background-color: var(--black);
    padding: 0.5rem;

    svg {
      color: var(--white);
      height: 100%;
      width: auto;
    }
  }
`;

const PostTitleStyles = styled.h3`
  transition: var(--transition);
`;

const PostExcerptStyles = styled.p`
  color: var(--black);
`;

export default function PostEntry({ post, showImage = true }: Props) {
  let icon;
  switch (post.frontmatter.format.toLowerCase()) {
    case 'video':
      icon = <MdPlayArrow />;
      break;
    case 'article':
      icon = <MdFormatAlignLeft />;
      break;
    default:
      icon = '';
  }

  return (
    <PostStyles key={post.id} className="post">
      <PostInnerStyles href={`${post.fields.slug}`} className="post-inner">
        <PostImageStyles className="post-img">
          {post.frontmatter.featuredImage ? (
            <GatsbyImage
              image={
                post.frontmatter.featuredImage.childImageSharp.gatsbyImageData
              }
              alt={post.frontmatter.title}
            />
          ) : (
            <StaticImage
              src="../assets/images/placeholder.jpg"
              alt={post.frontmatter.title}
            />
          )}
          {post.frontmatter.format ? (
            <div className="post-format">{icon}</div>
          ) : (
            ''
          )}
        </PostImageStyles>
        <div className="post-details">
          <PostTitleStyles className="post-title h4">
            {post.frontmatter.title}
          </PostTitleStyles>
          <PostExcerptStyles className="post-excerpt">
            {post.excerpt ? post.excerpt : ''}
          </PostExcerptStyles>
          <p className="post-date">
            <small>{post.frontmatter.date}</small>
          </p>
        </div>
      </PostInnerStyles>
    </PostStyles>
  );
}
