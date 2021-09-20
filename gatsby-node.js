const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { default: algoliasearch } = require('algoliasearch');
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
        nodes {
          fields {
            slug
            lang
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
  result.data.allMarkdownRemark.nodes.forEach((post, i) => {
    actions.createPage({
      path: post.fields.slug,
      component: postTemplate,
      context: {
        // additional data can be passed via context
        slug: post.fields.slug,
        lang: post.fields.lang,
      },
    });
  });
}

async function importAlgoliaIndex({ graphql, reporter }) {
  // 0. Don't need to run this on dev
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  // 1. Query posts
  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fields: { collection: { eq: "post" } } }
      ) {
        nodes {
          id
          excerpt
          frontmatter {
            category
            date
            format
            title
            youtube
            featuredImage {
              childImageSharp {
                gatsbyImageData(aspectRatio: 1.777778, layout: FULL_WIDTH)
              }
            }
          }
          fields {
            slug
            lang
          }
          rawMarkdownBody
        }
      }
    }
  `);

  // 2. Catch errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // 3. Transform to Algolia Search Object

  const transformed = result.data.posts.nodes.map((node) => ({
    objectID: node.fields.slug,
    dateTimestamp: node.frontmatter.date
      ? Date.parse(node.frontmatter.date)
      : null,
    ...node,
  }));

  // 4. Initialize Algolia Client
  const client = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID || '',
    process.env.ALGOLIA_API_KEY || ''
  );

  // 5. Initialize the index with the index name
  const index = client.initIndex('Posts');

  // 6. Save the objects!
  // await index.clearObjects();
  const algoliaResponse = await index.saveObjects(transformed);

  // check the output of the response in the console
  console.log(
    `🎉 Sucessfully added ${algoliaResponse.objectIDs.length} records to Algolia search.`
  );
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
  await Promise.all([
    turnMdPostsIntoPages(params),
    // importAlgoliaIndex(params)
  ]);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      featuredImage: String
      format: String!
      date: Date!
      youtube: String
      category: [String!]
    }
  `;
  createTypes(typeDefs);
};
