import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { StaticImage } from 'gatsby-plugin-image'
import { Layout, Banner, AppStoreLink } from '../components'
import { IMAGES } from '../constants'

export default class HomeIndex extends React.Component {
  render() {
    // console.log('siteMetadata', this.props.data.site.siteMetadata)
    // const siteTitle = this.props.data.site.siteMetadata.title
    // const siteDescription = this.props.data.site.siteMetadata.description
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

        <Banner />

        <div id="main">
          <section id="recent-work" className="tiles">
            <article
              // style={{ backgroundImage: `url(${IMAGES.nfb_film_app_thumb})` }}
              style={{ display: 'grid' }}
            >
              <StaticImage
                style={{
                  gridArea: '1/1',
                  // You can set a maximum height for the image, if you wish.
                  // maxHeight: 600,
                }}
                layout="fullWidth"
                // You can optionally force an aspect ratio for the generated image
                // aspectRatio={3 / 1}
                // This is a presentational image, so the alt should be an empty string
                alt=""
                src={'../assets/images/thumbs/clarity1.png'}
              />
              <header className="major">
                <h3>Clarity - The App for Your Love Life</h3>
                <p>
                  Our mission is to help you thrive through happier and
                  healthier relationships.
                </p>
              </header>
              <Link to="/projects/clarity/" className="link primary"></Link>
            </article>
            <article
              style={{ backgroundImage: `url(${IMAGES.nfb_film_app_thumb})` }}
            >
              <header className="major">
                <h3>National Film Board of Canada - NFB Film App</h3>
                <p>
                  Great ways to enjoy thousands of NFB Canadian documentaries
                  and animations for free on your Android & iOS devices.
                </p>
              </header>
              <Link
                to="/projects/nfb-film-app/"
                className="link primary"
              ></Link>
            </article>
            <article
              style={{ backgroundImage: `url(${IMAGES.novie_thumb_2})` }}
            >
              <header className="major">
                <h3>Novie: The Movie Hub</h3>
                <p>
                  Getting movie information. Working on a Netflix-like
                  application using React Native/Expo/Redux.
                </p>
              </header>
              <Link to="/projects/novie/" className="link primary"></Link>
            </article>
            <article
              style={{ backgroundImage: `url(${IMAGES.dmv_driving_thumb})` }}
            >
              <header className="major">
                <h3>Driving License Knowledge Test</h3>
                <p>
                  One app fits all to theory driving tests for US, Canada, UK
                </p>
              </header>
              <Link
                to="/projects/driving-test/"
                className="link primary"
              ></Link>
            </article>
            <article
              style={{ backgroundImage: `url(${IMAGES.canada_citizen_thumb})` }}
            >
              <header className="major">
                <h3>Citizenship Test</h3>
                <p>
                  Rewrite a multiple choice test base application using React
                  Native from my original native Android and native iOS (Swift)
                  apps. The base code is highly scalable and reusable so that it
                  can be used and extends to many multiple choice app such as
                  Canadian/US/UK/Australia Citizenship Tests.
                </p>
              </header>
              <Link
                to="/projects/citizenship-test/"
                className="link primary"
              ></Link>
            </article>
            <article
              style={{ backgroundImage: `url(${IMAGES.turn_off_tv_thumb})` }}
            >
              <header className="major">
                <h3>Turn Off the TV</h3>
                <p>
                  Watch these useful videos instead of seating hours watch TV
                </p>
              </header>
              <Link to="/projects/turn-off-tv/" className="link primary"></Link>
            </article>
            <article
              style={{
                backgroundImage: `url(${IMAGES.family_channels_thumb})`,
              }}
            >
              <header className="major">
                <h3>Family TV Channels</h3>
                <p>A Safe environment for family to watch Youtube channels</p>
              </header>
              <Link
                to="/projects/family-channels/"
                className="link primary"
              ></Link>
            </article>
            <article
              style={{ backgroundImage: `url(${IMAGES.catch_them_thumb})` }}
            >
              <header className="major">
                <h3>Catch Them Game</h3>
                <p>A mini game that was created using Unity</p>
              </header>
              <Link to="/projects/catch-them/" className="link primary"></Link>
            </article>
          </section>
          <section id="our-services">
            <div className="inner">
              <header className="major">
                <h2>Our Services</h2>
              </header>
              <p>
                We design, develop amd deliver world class software and mobile
                apps for startups and enterprise companies. We make the magic
                happen while you take on the world.
              </p>
              <div className="grid-wrapper">
                <div className="col-3">
                  <h4>
                    <u>We Design</u>
                  </h4>
                  <StaticImage
                    className="image"
                    src="../assets/images/we-design.png"
                    alt="We Design"
                  />
                </div>
                <div className="col-6">
                  <h4>
                    <u>We Develop</u>
                  </h4>
                  <StaticImage
                    className="image"
                    src="../assets/images/we-develop.png"
                    alt="We Develop"
                  />
                </div>
                <div className="col-3">
                  <h4>
                    <u>We Deliver</u>
                  </h4>
                  <StaticImage
                    className="image"
                    src="../assets/images/we-deliver.png"
                    alt="We Deliver"
                  />
                </div>
              </div>
            </div>
          </section>
          <section id="explore-our-projects">
            <div className="inner">
              <header className="major">
                <h2>Exploring</h2>
              </header>
              <p>Get to know us more from our App Stores</p>
              <ul className="actions">
                <li>
                  <AppStoreLink
                    appleLink="https://itunes.apple.com/us/developer/techlis-systems-inc/id987066377?mt=8"
                    googleLink="https://play.google.com/store/apps/developer?id=Techlis+Systems+Inc."
                    otherLink="https://play.google.com/store/apps/developer?id=BinuApp"
                  />
                </li>
              </ul>
              <div className="row">
                <ul className="actions">
                  <li>
                    <Link to="/projects" className="button next">
                      Full Portfolio
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section id="our-blogs">
            <div className="inner">
              <header className="major">
                <h2>Our Blogs</h2>
              </header>
              <p>Get to know what is going on</p>
              <div className="grid-wrapper">
                {posts
                  .filter(post => post.node.frontmatter.title.length > 0)
                  .slice(0, 3)
                  .map(({ node: post }) => {
                    return (
                      <div className="col-4" key={post.id}>
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
              <ul className="actions">
                <li>
                  <Link to="/blogs" className="button next">
                    Full Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query HomeQuery {
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
