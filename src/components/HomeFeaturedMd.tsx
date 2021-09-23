import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { LangContext } from './LangContext';
import LangSwitcher from './LangSwitcher';
import { breakpoints } from '../styles/breakpoints';
import { PostProps } from '../types';
import PostEntry from './PostEntry';
import Carousel from './Carousel';
import { useWindowSize } from '../hooks/useWindowSize';

const HomeFeaturedStyles = styled.section`
  width: 100%;
  overflow-x: hidden;

  .title {
    --width-xs: 12;
    --width-md: 10;
    --offset-md: 1;

    .inner {
      @media ${breakpoints.laptop} {
        padding-left: 50%;
      }
    }
  }

  .posts-wrapper {
    --width-xs: 12;
    --width-md: 10;
    --offset-md: 1;
    margin-top: 2.5rem;
  }

  .posts {
    display: flex;
    margin: calc(var(--post-gap) * -2) calc(var(--post-gap) * -1);
  }

  .posts-carousel {
    width: 100%;
    max-width: 100%;

    &:not(.initialized) {
      .carousel-content > * {
        width: 100%;

        @media ${breakpoints.tablet} {
          width: 50%;
        }
        @media ${breakpoints.laptop} {
          width: 33.333%;
        }
      }
    }
  }
`;

const SwitcherLinkStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function HomeFeaturedMd() {
  const data = useStaticQuery(graphql`
    query MdPostsQuery {
      postsEN: allMarkdownRemark(
        limit: 6
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fields: { lang: { eq: "en" } } }
      ) {
        nodes {
          id
          excerpt
          frontmatter {
            title
            format
            date
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  aspectRatio: 1.777778
                  layout: FULL_WIDTH
                  placeholder: BLURRED
                )
              }
            }
          }
          fields {
            slug
            lang
          }
          timeToRead
        }
      }
      postsID: allMarkdownRemark(
        limit: 6
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fields: { lang: { eq: "id" } } }
      ) {
        nodes {
          id
          excerpt
          frontmatter {
            title
            format
            date
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  aspectRatio: 1.777778
                  layout: FULL_WIDTH
                  placeholder: BLURRED
                )
              }
            }
          }
          fields {
            slug
            lang
          }
          timeToRead
        }
      }
    }
  `);

  const postsEN = data.postsEN.nodes;
  const postsID = data.postsID.nodes;

  const { lang } = useContext(LangContext);

  const posts = lang === 'id' ? postsID : postsEN;

  // New
  const { width } = useWindowSize();
  function getItemCount(windowWidth: number) {
    if (windowWidth <= 767) {
      return 1;
    }
    if (windowWidth <= 1024) {
      return 2;
    }
    return 3;
  }

  const [carouselItemCount, setCarouselItemCount] = useState(
    width ? getItemCount(width) : null
  );

  useEffect(() => {
    if (width) {
      const itemCount = getItemCount(width);
      setCarouselItemCount(itemCount);
    }
  }, [width]);

  return (
    <HomeFeaturedStyles className="bg-light section-p-t section-p-b">
      <div className="container">
        <div className="row">
          <div className="title col">
            <div className="inner">
              <h2 className="title-line">Featured Contents</h2>
              <p>
                Browse my latest works. Some of them are available in both
                English and Bahasa Indonesia.
              </p>
              <SwitcherLinkStyles>
                <LangSwitcher shouldNavigate={false} />
                <Link to="/contents/" className="button">
                  View All
                </Link>
              </SwitcherLinkStyles>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <div className="container">
          <div className="row">
            <div className="posts-wrapper col">
              <div className="posts">
                <div
                  className={`posts-carousel ${
                    carouselItemCount ? 'initialized' : ''
                  }`}
                >
                  <Carousel show={carouselItemCount || 3}>
                    {posts.map((post: PostProps) => (
                      <PostEntry key={post.id} post={post} showImage />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeFeaturedStyles>
  );
}
