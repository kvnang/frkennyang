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
        path: path.join(__dirname, `src`, 'assets', `images`),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
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
