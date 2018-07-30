import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import GoogleAd from "../components/GoogleAd";

export default class Blogs extends React.Component {
    render() {
        const { edges: posts } = this.props.data.allMarkdownRemark;
        return (
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
                                    <h3 style={{ marginBottom: 0, color: '#006FC5' }}><Link to={post.frontmatter.path}>{post.frontmatter.title}</Link></h3>
                                    <h6 style={{ marginBottom: 15 }}>{post.frontmatter.date}</h6>
                                    <p style={{ paddingLeft: 25, paddingRight: 25 }}>{post.excerpt}</p>
                                    <hr />
                                </div>
                            );
                        })}
                        </div>
                        <GoogleAd client="ca-pub-6411689155905256" slot="" />
                    </div>
                </section>
            </div>
        );
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
`;