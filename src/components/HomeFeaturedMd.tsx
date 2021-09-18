import { graphql, useStaticQuery } from 'gatsby';
import React, { useContext } from 'react';
import Slider from 'react-slick';
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
} from 'gatsby-plugin-image';
import { MdFormatAlignLeft, MdPlayArrow } from 'react-icons/md';
import styled from 'styled-components';
import { LangContext } from './LangContext';
import LangSwitcher from './LangSwitcher';
import { breakpoints } from '../styles/breakpoints';
import { PostProps } from '../types';
import PostEntry from './PostEntry';

const HomeFeaturedStyles = styled.div`
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
    margin: 0 calc(var(--post-gap) * -1);
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

      li {
        display: inline-block;
        padding: 0.5rem;

        button {
          color: transparent;
          text-indent: -9999px;
          height: 0.5rem;
          width: 0.5rem;
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
            date(formatString: "MMMM D, YYYY")
            featuredImage {
              childImageSharp {
                gatsbyImageData(aspectRatio: 1.777778)
              }
            }
          }
          fields {
            slug
            lang
          }
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
            date(formatString: "MMMM D, YYYY")
            featuredImage {
              childImageSharp {
                gatsbyImageData(aspectRatio: 1.777778)
              }
            }
          }
          fields {
            slug
            lang
          }
        }
      }
    }
  `);

  const postsEN = data.postsEN.nodes;
  const postsID = data.postsID.nodes;

  const { lang } = useContext(LangContext);

  const posts = lang == 'id' ? postsID : postsEN;

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

  return (
    <HomeFeaturedStyles className="bg-light section-p-t section-p-b">
      <div className="container">
        <div className="row">
          <div className="title col">
            <div className="inner">
              <h2 className="title-line">Featured Contents</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Content
                available in English and Bahasa Indonesia.
              </p>
              <LangSwitcher shouldNavigate={false} />
            </div>
          </div>
          <div className="posts-wrapper col">
            <div className="posts">
              <Slider {...settings}>
                {posts.map((post: PostProps) => (
                  <PostEntry post={post} showImage />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </HomeFeaturedStyles>
  );
}
