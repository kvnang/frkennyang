import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Slider from 'react-slick';
import {GatsbyImage, IGatsbyImageData} from 'gatsby-plugin-image';
import { MdFormatAlignLeft, MdPlayArrow } from 'react-icons/md';
import toPlainText from '../utils/sanityBlockToPlainText';
import formatDate from '../utils/formatDate';
import { HomeFeaturedStyles } from '../styles/HomeFeaturedStyles';

interface PostProps {
  id: number;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  title: string;
  publishedAt: string;
  body: string;
  format: string;
}

export default function HomeFeatured() {
  const data = useStaticQuery(graphql`
    query PostsQuery {
      posts: allSanityPost(
        limit: 9
        sort: { fields: publishedAt, order: DESC }
      ) {
        nodes {
          id
          slug {
            current
          }
          title
          format
          mainImage {
            asset {
              gatsbyImageData
            }
          }
          _rawBody(resolveReferences: { maxDepth: 10 })
          body {
            _key
            _rawChildren
            _type
            children {
              marks
              text
              _key
              _type
            }
            list
            style
          }
          publishedAt
        }
      }
    }
  `);

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
                switch (post.format) {
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
                    <a
                      href={`/post/${post.slug.current}`}
                      className="post-inner"
                    >
                      <div className="post-img">
                        {post.mainImage ? (
                          <GatsbyImage
                            image={post.mainImage.asset.gatsbyImageData}
                            alt={post.title}
                          />
                        ) : (
                          ''
                        )}
                        {post.format ? (
                          <div className="post-format">{icon}</div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="post-details">
                        <h3 className="post-title h4">{post.title}</h3>
                        <p className="post-excerpt">
                          {post.body
                            ? `${toPlainText(post.body)
                                .split(' ')
                                .splice(0, 20)
                                .join(' ')}\u00A0...`
                            : ''}
                        </p>
                        <p className="post-date">
                          <small>{formatDate(post.publishedAt)}</small>
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
