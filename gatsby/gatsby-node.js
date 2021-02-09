import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function turnPostsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const postTemplate = path.resolve('./src/templates/SinglePost.tsx');
  // 2. Query all posts
  const { data } = await graphql(`
    query {
      posts: allSanityPost {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza
  data.posts.nodes.forEach((post) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `post/${post.slug.current}`,
      component: postTemplate,
      context: {
        slug: post.slug.current,
      },
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([turnPostsIntoPages(params)]);
}
