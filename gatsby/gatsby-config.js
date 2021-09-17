import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  siteMetadata: {
    title: 'Fr. Kenny Ang',
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
        name: `post`,
        path: `${__dirname}/src/posts`,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-mdx',
    //   options: {
    //     // root: __dirname,
    //     extensions: [`.mdx`, `.md`],
    //   },
    // },
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
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        dataset: process.env.GATSBY_SANITY_DATASET,
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
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
  ],
};
