const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  siteMetadata: {
    title: 'Fr. Kenny Ang',
    description: `Fr. Kenny Ang's Personal Website`,
    keywords: ['Catholic', 'priest'],
    siteUrl:
      process.env.NODE_ENV === 'development'
        ? process.env.URL || 'http://localhost:3000/'
        : process.env.URL || 'https://frkennyang.netlify.app/',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1660,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, 'avif'],
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google: [
            {
              family: 'Playfair Display',
              variants: ['700'],
              // subsets: ['latin'],
              // fontDisplay: 'swap',
              // strategy: 'selfHosted', // 'base64' || 'cdn'
            },
            {
              family: 'Montserrat',
              variants: ['400', '600'],
              // subsets: ['latin'],
              // fontDisplay: 'swap',
              // strategy: 'selfHosted', // 'base64' || 'cdn'
            },
          ],
        },
      },
    },
    {
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application
        // Tip: use Search API key with GATSBY_ prefix to access the service from within components
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries: [
          {
            query: `
            posts: allMarkdownRemark(filter: { fields: { collection: { eq: "post" } } }) {
              nodes {
                id
                frontmatter {
                  category
                  date
                  format
                  title
                  youtube
                }
                fields {
                  slug
                  lang
                }
                rawMarkdownBody
              }
            }
          `,
            transformer: ({ data }) => data.posts.nodes, // optional
            // indexName: 'Posts', // overrides main index name, optional
            settings: {
              // optional, any index settings
              // Note: by supplying settings, you will overwrite all existing settings on the index
            },
            // matchFields: ['slug', 'modified'], // Array<String> overrides main match fields, optional
          },
        ],
        // chunkSize: 10000, // default: 1000
        // settings: {
        //   // optional, any index settings
        //   // Note: by supplying settings, you will overwrite all existing settings on the index
        // },
        // enablePartialUpdates: true, // default: false
        // matchFields: ['slug', 'modified'], // Array<String> default: ['modified']
        // concurrentQueries: false, // default: true
        // skipIndexing: true, // default: false, useful for e.g. preview deploys or local development
        // continueOnFailure: false, // default: false, don't fail the build if algolia indexing fails
      },
    },
  ],
};
