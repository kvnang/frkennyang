import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';
import { createFilePath } from 'gatsby-source-filesystem';

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

async function turnMdPostsIntoPages({ graphql, actions, reporter }) {
  // 1. Get a template for this page
  const postTemplate = path.resolve('./src/templates/SinglePostMd.tsx');
  // 2. Query all posts
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "post" } } }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  // 3. Catch errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  // 4. Create pages
  result.data.allMarkdownRemark.edges.forEach((post, i) => {
    actions.createPage({
      path: post.node.fields.slug,
      component: postTemplate,
      context: {
        // additional data can be passed via context
        slug: post.node.fields.slug,
      },
    });
  });
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  // await Promise.all([turnPostsIntoPages(params)]);
  await Promise.all([turnMdPostsIntoPages(params)]);
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    // if my posts have a slug in the frontmatter, it means I've specified what I want it to be. Otherwise I want to create one automatically
    // This is where we add our own custom fields to each node
    const generatedSlug = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: node.frontmatter.slug
        ? `/${node.frontmatter.slug}/`
        : `post${generatedSlug}`,
    });

    // Add it to a collection
    createNodeField({
      name: `collection`,
      node,
      value: getNode(node.parent).sourceInstanceName,
    });
  }
};
