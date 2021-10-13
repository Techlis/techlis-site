import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Layout } from '../components'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout>
        <Helmet
          title="Techlis Systems Inc."
          meta={[
            { name: 'description', content: "We build high quality mobile games and apps, with love" },
            { name: 'keywords', content: 'software, web, mobile, development, consultant, consulting, contractor, techlis' },
          ]}
        >
        </Helmet>
        <div className="alt">
          <section>
            <div className="inner">
              <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
              <div className="row">
                <div className="3u 12u$(small)">
                  <p></p>
                </div>
                <div className="6u 12u$(small)">
                  <h1>{post.frontmatter.title}</h1>
                  <p>{post.frontmatter.date}</p>
                  <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
                <div className="3u 12u$(small)">
                  <p></p>
                </div>
              </div>
              <hr className="major" />
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
