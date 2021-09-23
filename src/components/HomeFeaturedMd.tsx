import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
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

  .slick-slider {
    width: 100%;

    .slick-track {
      display: flex;
    }

    .slick-dots {
      list-style: none;
      padding-left: 0;
      text-align: right;
      margin: 1rem -0.5rem 0;

      @media (hover: none) and (pointer: coarse) {
        display: none !important;
      }

      li {
        display: inline-block;
        padding: 0.5rem;
        line-height: 1;

        button {
          color: transparent;
          text-indent: -9999px;
          height: 0.75rem;
          width: 0.75rem;
          line-height: 1;
          background-color: var(--grey);
          border-radius: 50%;
          padding: 0;
          transition: var(--transition);

          &:hover,
          &:focus {
            background-color: var(--gold);
          }
        }

        &.slick-active {
          button {
            background-color: var(--black);
          }
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

let firstClientX: number;
let clientX: number;

const preventTouch = (e: TouchEvent) => {
  const minValue = 5; // threshold

  clientX = e.touches[0].clientX - firstClientX;

  // Vertical scrolling does not work when you start swiping horizontally.
  if (Math.abs(clientX) > minValue) {
    e.preventDefault();
    // e.returnValue = false;

    // return false;
  }
};

const touchStart = (e: TouchEvent) => {
  firstClientX = e.touches[0].clientX;
};

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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElement = containerRef.current;

    if (containerElement) {
      containerElement.addEventListener('touchstart', touchStart);
      containerElement.addEventListener('touchmove', preventTouch, {
        passive: false,
      });
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener('touchstart', touchStart);
        containerElement.removeEventListener('touchmove', preventTouch);
      }
    };
  });

  // New
  const { width } = useWindowSize();
  const [carouselItemCount, setCarouselItemCount] = useState(5);

  useEffect(() => {
    if (width) {
      if (width <= 767) {
        if (carouselItemCount !== 1) {
          setCarouselItemCount(1);
        }
      } else if (width <= 1024) {
        if (carouselItemCount !== 2) {
          setCarouselItemCount(2);
        }
      } else if (carouselItemCount !== 3) {
        setCarouselItemCount(3);
      }
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
              <div className="posts" ref={containerRef}>
                {/* <Slider {...settings}>
                {posts.map((post: PostProps) => (
                  <PostEntry key={post.id} post={post} showImage />
                ))}
              </Slider> */}
                <Carousel show={carouselItemCount}>
                  {posts.map((post: PostProps) => (
                    <PostEntry key={post.id} post={post} showImage />
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeFeaturedStyles>
  );
}
