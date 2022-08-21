import { graphql, useStaticQuery } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { LangContext } from './LangContext';
import LangSwitcher from './LangSwitcher';
import { PostProps } from '../types';
import PostEntry from './PostEntry';
import Carousel from './Carousel';
import { useWindowSize } from '../hooks/useWindowSize';

export default function HomeWydFeatured() {
  const data = useStaticQuery(graphql`
    query MdPostsQueryTwo {
      postsEN: allMarkdownRemark(
        limit: 12
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fields: { showInLang: { in: "en" } }
          frontmatter: { category: { in: "WYD23" } }
        }
      ) {
        nodes {
          ...MarkdownRemarkFields
        }
      }
      postsID: allMarkdownRemark(
        limit: 12
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fields: { showInLang: { in: "id" } }
          frontmatter: { category: { in: "WYD23" } }
        }
      ) {
        nodes {
          ...MarkdownRemarkFields
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
    <section className="bg-light section-p-t section-p-b featured-section featured-section--wyd">
      <div className="wyd">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 280 331"
        >
          <g stroke="#FBC112" strokeMiterlimit="10">
            <path d="M139.3 278.8H21.2C3.7 278.8.4 275.6.5 258.4c0-27.6-.2-55.2.5-82.7.3-11 2.1-22.2 4.8-32.9C13.7 111.9 34 92.4 65.1 87c46.7-8.1 94.1-7.5 140.6-.9 48.3 6.9 72 37.6 73.3 87 .8 30.4.2 60.7.3 91.1 0 8.7-4.4 13.4-12.7 14.2-5.8.6-11.8.4-17.6.4-36.5.1-73.1 0-109.7 0Z" />
            <path d="M100.9.6c10.6 0 21.2.3 31.8-.1 7.3-.2 11.6 2.5 13.6 9.7 2.7 9.8 5.3 19.9 9.6 29.1 2.1 4.4 7.8 9.4 12.2 9.7 3.5.3 9.2-5.3 11.1-9.5 4.3-9.2 6.8-19.2 9.9-29 2.1-6.7 6-10.2 13.6-10.1 21.2.3 42.4 0 63.7.2 12 .1 15.2 5 11.8 17.1-21.6 75-44.2 149.8-64.4 225.3-5.1 18.9-3.3 39.8-3.7 59.8-.5 26.6 2.8 27.5-26.8 27.1-15.7-.2-31.5-.2-47.2 0-9.2.1-14.3-4.6-13.3-13.4 6.8-60.1-14.3-115.2-29.9-171.3-11.7-41.8-23.7-83.6-35.5-125.4C53.2 4.9 56.6.6 72.4.6h28.5Z" />
          </g>
        </svg>
      </div>

      <div className="container">
        <div className="row">
          <div className="title col">
            <div className="inner">
              <h2 className="title-line">
                <div className="logo">
                  <StaticImage
                    src="../assets/images/wyd-2023-logo.png"
                    alt="World Youth Day 2023"
                    layout="fullWidth"
                    placeholder="none"
                  />
                </div>
                World Youth Day 2023
              </h2>
              <p>Special articles for the World Youth Day 2023.</p>
              <div className="posts-language-switcher">
                <LangSwitcher shouldNavigate={false} />
              </div>
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
                      <PostEntry
                        key={post.id}
                        post={post}
                        showImage
                        siteLang={lang}
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
