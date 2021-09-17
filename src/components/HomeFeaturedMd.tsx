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
    --post-gap: 0.33rem;
    display: flex;
    margin: 0 calc(var(--post-gap) * -1);

    @media ${breakpoints.tablet} {
      --post-gap: 0.5rem;
    }
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

  .post {
    width: 35%;
    flex: 0 0 35%;
    padding: 0 var(--post-gap);

    .post-inner {
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
    }

    .post-img {
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
    }

    .post-img,
    .post-title,
    .post-excerpt {
      margin-bottom: 0.5rem;
    }

    .post-title {
      transition: var(--transition);
    }

    .post-excerpt {
      color: var(--black);
    }
  }
`;

export default function HomeFeaturedMd() {
  const data = useStaticQuery(graphql`
    query MdPostsQuery {
      posts: allMarkdownRemark(
        limit: 9
        sort: { fields: [frontmatter___date], order: DESC }
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

  // console.log(data);
  const rawPosts = data.posts.nodes;
  const { lang } = useContext(LangContext);

  const posts = rawPosts.filter((p: PostProps) => p.fields.lang === lang);

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
                {posts.map((post: PostProps) => {
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
                    <div key={post.id} className="post">
                      <a href={`${post.fields.slug}`} className="post-inner">
                        <div className="post-img">
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
                            />
                          )}
                          {post.frontmatter.format ? (
                            <div className="post-format">{icon}</div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="post-details">
                          <h3 className="post-title h4">
                            {post.frontmatter.title}
                          </h3>
                          <p className="post-excerpt">
                            {post.excerpt ? post.excerpt : ''}
                          </p>
                          <p className="post-date">
                            <small>{post.frontmatter.date}</small>
                          </p>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </HomeFeaturedStyles>
  );
}
