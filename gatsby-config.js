module.exports = {
  siteMetadata: {
    siteUrl: 'https://hkon.me',
    title: 'Håkon Ellingsen',
    titleTemplate: '%s - Håkon Ellingsen',
    description: 'A full-stack web developer who slings code, pushes pixels, and sometimes write.',
    image: '',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/assets`,
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-preset-env')({ stage: 0 })],
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: 'Håkon Ellingsen',
    //     short_name: 'hkon.me',
    //     start_url: '/',
    //     background_color: '#E8EDEF',
    //     theme_color: '#E8EDEF',
    //     display: 'minimal-ui',
    //     icon: 'src/assets/images/gatsby-icon.png', // This path is relative to the root of the site.
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
