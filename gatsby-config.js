const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Blipp Web Application`,
    description: `Web application for Blipp`,
    author: `@WeApp`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `blipp-web`,
        short_name: `blipp`,
        start_url: `/`,
        background_color: `#C14F4C`,
        theme_color: `#C14F4C`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~components': path.join(
          __dirname,
          'src/components'
        ),
        '~pages': path.join(__dirname, 'src/pages'),
        '~images': path.join(__dirname, 'src/images'),
        '~utils': path.join(__dirname, 'src/utils'),
        '~graphql': path.join(__dirname, 'src/graphql'),
        '~contexts': path.join(__dirname, 'src/contexts'),
        '~types': path.join(__dirname, 'src/types/index'),
      },
    },
  ],
};
