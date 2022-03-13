import type { GatsbyConfig } from 'gatsby';
import dotenv from 'dotenv';
import type { PostProps } from './src/types';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Fr. Kenny Ang',
    description: `Fr. Kenny Ang is a Catholic priest from Indonesia who was ordained in 2019 and has spoken in numerous occasions across Asia and America.`,
    keywords: ['Catholic', 'priest'],
    siteUrl:
      process.env.NODE_ENV === 'development'
        ? process.env.URL || 'http://localhost:3000/'
        : process.env.URL || 'https://www.fatherkenny.com/',
  },
  plugins: [
    'gatsby-plugin-sitemap',
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
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1800,
              showCaptions: ['title'],
              // markdownCaptions: true,
              withWebp: true,
              withAvif: true,
            },
          },
          {
            resolve: `gatsby-remark-image-attributes`,
            options: {
              dataAttributes: true,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
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
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#e2a93a`,
        showSpinner: false,
      },
    },
    {
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application
        // Tip: use Search API key with GATSBY_ prefix to access the service from within components
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries: [
          {
            query: `{
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
                        gatsbyImageData(aspectRatio: 1.777778, layout: FULL_WIDTH, placeholder: BLURRED)
                      }
                    }
                  }
                  fields {
                    slug
                    lang
                  }
                  timeToRead
                  rawMarkdownBody
                  parent {
                    ... on File {
                      modifiedTime
                    }
                  }
                }
              }
            }`,
            transformer: ({
              data,
            }: {
              data: { posts: { nodes: PostProps[] } };
            }) =>
              data.posts.nodes.map((node) => ({
                objectID: node.fields.slug,
                dateTimestamp: node.frontmatter.date
                  ? Date.parse(node.frontmatter.date)
                  : null,
                modified: node.parent?.modifiedTime
                  ? Date.parse(node.parent.modifiedTime)
                  : null,
                ...node,
              })), // optional
            // indexName: 'index name to target', // overrides main index name, optional
            // settings: {
            //   // optional, any index settings
            //   // Note: by supplying settings, you will overwrite all existing settings on the index
            // },
            // matchFields: ['slug', 'modified'], // Array<String> overrides main match fields, optional
          },
        ],
        // chunkSize: 10000, // default: 1000
        // settings: {
        //   // optional, any index settings
        //   // Note: by supplying settings, you will overwrite all existing settings on the index
        // },
        enablePartialUpdates: true, // default: false
        // matchFields: ['slug', 'modified'], // Array<String> default: ['modified']
        // concurrentQueries: false, // default: true
        skipIndexing: process.env.BRANCH !== 'main', // default: false, useful for e.g. preview deploys or local development
        // continueOnFailure: false, // default: false, don't fail the build if algolia indexing fails
      },
    },
  ],
};

export default config;
