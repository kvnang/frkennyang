import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Slider from 'react-slick';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { MdFormatAlignLeft, MdPlayArrow } from 'react-icons/md';
import { HomeFeaturedStyles } from '../styles/HomeFeaturedStyles';

interface PostProps {
  id: number;
  excerpt: string;
  frontmatter: {
    title: string;
    format: string;
    date: string;
    featuredImage: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
  fields: {
    slug: string;
  };
}

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
          }
        }
      }
    }
  `);

  console.log(data);

  const posts = data.posts.nodes;

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
    <HomeFeaturedStyles className="bg-light">
      <div className="container">
        <div className="title col">
          <div className="inner">
            <h2 className="title-line">Featured Contents</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
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
                          ''
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
    </HomeFeaturedStyles>
  );
}
