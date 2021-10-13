module.exports = {
  siteMetadata: {
    title: "Techlis System Inc.",
    author: "Luan Nguyen",
    description: "We build high quality mobile games and apps, with love"
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: "posts",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'techlis',
        short_name: 'techlis',
        start_url: '/',
        background_color: '#191919',
        theme_color: '#191919',
        display: 'minimal-ui',
        icon: 'src/assets/images/website-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-sass',
    'gatsby-plugin-offline'
  ],
}
