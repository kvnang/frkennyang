const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
// const fetch = require('isomorphic-fetch');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

async function turnMdPostsIntoPages({ graphql, actions, reporter }) {
  // 1. Get a template for this page
  const postTemplate = path.resolve('./src/templates/SinglePostMd.tsx');
  // 2. Query all posts
  const result = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { collection: { eq: "post" } } }) {
        edges {
          node {
            fields {
              slug
              lang
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
  // 4. Create single pages
  result.data.allMarkdownRemark.edges.forEach((post, i) => {
    actions.createPage({
      path: post.node.fields.slug,
      component: postTemplate,
      context: {
        // additional data can be passed via context
        slug: post.node.fields.slug,
        lang: post.node.fields.lang,
      },
    });
  });
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    // if my posts have a slug in the frontmatter, it means I've specified what I want it to be. Otherwise I want to create one automatically
    // This is where we add our own custom fields to each node
    // const generatedSlug = createFilePath({ node, getNode });

    if (getNode(node.parent).sourceInstanceName === 'post') {
      let fileName = path.basename(node.fileAbsolutePath, '.md');
      const lang = fileName.endsWith('.id') ? 'id' : 'en';

      if (fileName === 'index' || fileName === 'index.id') {
        const folderName = path.basename(path.dirname(node.fileAbsolutePath));
        fileName = fileName.replace('index', folderName);
      }

      const generatedSlug =
        lang === 'id'
          ? `id/post/${slugify(fileName.replace(new RegExp('.id$'), ''))}`
          : `post/${slugify(fileName)}`;

      createNodeField({
        name: `slug`,
        node,
        value: node.frontmatter.slug
          ? `/post/${node.frontmatter.slug}/`
          : `/${generatedSlug}/`,
      });

      createNodeField({
        name: `lang`,
        node,
        value: lang,
      });
    } else {
      const slug = createFilePath({ node, getNode });
      createNodeField({
        name: `slug`,
        node,
        value: slug,
      });
    }

    // Add it to a collection
    createNodeField({
      name: `collection`,
      node,
      value: getNode(node.parent).sourceInstanceName,
    });
  }
};

exports.createPages = async (params) => {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  // await Promise.all([turnPostsIntoPages(params)]);
  await Promise.all([turnMdPostsIntoPages(params)]);
};
