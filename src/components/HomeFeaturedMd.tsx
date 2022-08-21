import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';
import { LangContext } from './LangContext';
import LangSwitcher from './LangSwitcher';
import { PostProps } from '../types';
import PostEntry from './PostEntry';
import Carousel from './Carousel';
// import { useWindowSize } from '../hooks/useWindowSize';

export default function HomeFeaturedMd() {
  const data = useStaticQuery(graphql`
    query MdPostsQuery {
      postsEN: allMarkdownRemark(
        limit: 6
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fields: { showInLang: { eq: "en" } }
          frontmatter: { category: { nin: "WYD23" } }
        }
      ) {
        nodes {
          ...MarkdownRemarkFields
        }
      }
      postsID: allMarkdownRemark(
        limit: 6
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fields: { showInLang: { eq: "id" } }
          frontmatter: { category: { nin: "WYD23" } }
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
  // const { width } = useWindowSize();
  const width = 1024;
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
    <section className="bg-light section-p-t section-p-b featured-section">
      <div className="container">
        <div className="row">
          <div className="title col">
            <div className="inner">
              <h2 className="title-line">Featured Contents</h2>
              <p>
                Browse my latest works. Some of them are available in both
                English and Bahasa Indonesia.
              </p>
              <div className="posts-language-switcher">
                <LangSwitcher shouldNavigate={false} />
                <Link to="/contents/" className="button">
                  View All
                </Link>
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
                      <PostEntry key={post.id} post={post} showImage />
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
