import dotenv from 'dotenv';
import path from 'path';

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
