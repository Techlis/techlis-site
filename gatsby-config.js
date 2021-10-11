module.exports = {
  siteMetadata: {
    title: "Techlis System Inc.",
    author: "Luan Nguyen",
    description: "software development & consulting company"
  },
  plugins: [
    'gatsby-plugin-react-helmet',
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
    'gatsby-plugin-sass',
    'gatsby-plugin-offline'
  ],
}
