import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import { Layout } from '../components'

export default class Blogs extends React.Component {
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark
    return (
      <Layout>
        <Helmet
          title="Techlis Systems Inc."
          meta={[
            {
              name: 'description',
              content: 'We build high quality mobile games and apps, with love',
            },
            {
              name: 'keywords',
              content:
                'software, web, mobile, development, consultant, consulting, contractor, techlis',
            },
          ]}
        ></Helmet>

        <div id="blogs">
          <section>
            <div className="inner">
              <header className="major">
                <h1>Techlis Blog</h1>
              </header>
              <div className="row">
                {posts
                  .filter(post => post.node.frontmatter.title.length > 0)
                  .map(({ node: post }) => {
                    return (
                      <div className="6u 12u$(small)" key={post.id}>
                        <h3 style={{ marginBottom: 0, color: '#006FC5' }}>
                          <Link to={post.frontmatter.path}>
                            {post.frontmatter.title}
                          </Link>
                        </h3>
                        <h6 style={{ marginBottom: 15 }}>
                          {post.frontmatter.date}
                        </h6>
                        <p style={{ paddingLeft: 25, paddingRight: 25 }}>
                          {post.excerpt}
                        </p>
                        <hr />
                      </div>
                    )
                  })}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
