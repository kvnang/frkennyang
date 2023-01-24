import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useContext, useState } from 'react';
import { LangContext } from './LangContext';
import LangSwitcher from './LangSwitcher';
import { PostProps } from '../types';
import PostEntry from './PostEntry';
import { Slider } from './Slider';
// import { useWindowSize } from '../hooks/useWindowSize';

export default function HomeFeaturedMd() {
  const data = useStaticQuery(graphql`query MdPostsQuery {
  postsEN: allMarkdownRemark(
    limit: 6
    sort: {frontmatter: {date: DESC}}
    filter: {fields: {showInLang: {eq: "en"}}, frontmatter: {category: {nin: "WYD23"}}}
  ) {
    nodes {
      ...MarkdownRemarkFields
    }
  }
  postsID: allMarkdownRemark(
    limit: 6
    sort: {frontmatter: {date: DESC}}
    filter: {fields: {showInLang: {eq: "id"}}, frontmatter: {category: {nin: "WYD23"}}}
  ) {
    nodes {
      ...MarkdownRemarkFields
    }
  }
}`);

  const postsEN = data.postsEN.nodes;
  const postsID = data.postsID.nodes;

  const { lang } = useContext(LangContext);

  const posts = lang === 'id' ? postsID : postsEN;

  const [ref, setRef] = useState<HTMLUListElement | null>(null);

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
      <div className="slider-wrapper">
        <Slider setRef={setRef}>
          {posts.map((post: PostProps) => (
            <PostEntry key={post.id} post={post} showImage />
          ))}
        </Slider>
      </div>
    </section>
  );
}
