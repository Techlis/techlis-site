/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
 
exports.createPages = async ({ actions, graphql }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    console.log(result.errors)
    reject(result.errors)
  }
  result.data.allMarkdownRemark.edges.forEach(edge => {
    actions.createPage({
      path: edge.node.frontmatter.path,
      component: require.resolve("./src/templates/blog-post.js")
    })
  })
}
