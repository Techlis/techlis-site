import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Banner from '../components/Banner'

import pic01 from '../assets/images/thumbs/OpenVideo.png'
import pic02 from '../assets/images/pic02.jpg'
import pic03 from '../assets/images/thumbs/canada-test.png'
import pic04 from '../assets/images/pic04.jpg'
import pic05 from '../assets/images/pic05.jpg'
import pic06 from '../assets/images/thumbs/CatchThem2.png'
import weDesign from '../assets/images/we-design.png'
import weDevelop from '../assets/images/we-develop.png'
import weDeliver from '../assets/images/we-deliver.png'

class HomeIndex extends React.Component {
    render() {
        const siteTitle = this.props.data.site.siteMetadata.title
        const siteDescription = this.props.data.site.siteMetadata.description

        return (
            <div>
                <Helmet>
                    <title>{siteTitle}</title>
                    <meta name="description" content={siteDescription} />
                </Helmet>

                <Banner />

                <div id="main">
                    <section id="one" className="tiles">
                        <article style={{backgroundImage: `url(${pic01})`}}>
                            <header className="major">
                                <h3>OpenVideo</h3>
                                <p>Working on a Netflix-like application using React Native/Expo/Redux. The app will stream video from open source APIs</p>
                            </header>
                            <Link to="/projects" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic02})`}}>
                            <header className="major">
                                <h3>MDV Driving Test</h3>
                                <p>One app fits all to theory driving test for US, Canada, UK</p>
                            </header>
                            <Link to="/projects" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic03})`}}>
                            <header className="major">
                                <h3>Citizenship Test</h3>
                                <p>Rewrite a multiple choice test base application using React Native from my original native Android and native iOS (Swift) apps. The base code is highly scalable and reusable so that it can be used and extends to many multiple choice app such as Canadian/US/UK/Australia Citizenship Tests.</p>
                            </header>
                            <Link to="/projects" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic04})`}}>
                            <header className="major">
                                <h3>Turn Off the TV</h3>
                                <p>Watch these useful videos instead of seating hours watch TV</p>
                            </header>
                            <Link to="/projects" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic05})`}}>
                            <header className="major">
                                <h3>Family TV Channels</h3>
                                <p>A Safe environment for family to watch youtube channels</p>
                            </header>
                            <Link to="/projects" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${pic06})`}}>
                            <header className="major">
                                <h3>Catch Them Game</h3>
                                <p>A mini game that was created using Unity</p>
                            </header>
                            <Link to="/projects/catch-them/" className="link primary"></Link>
                        </article>
                    </section>
                    <section id="two">
                        <div className="inner">
                            <header className="major">
                                <h2>Who We Are</h2>
                            </header>
                            <p>We design, develop amd deliver world class software and mobile apps for startups and enterprise companies. We make the magic happen while you take on the world.</p>
                            <div className="row">
                                <div className="4u 12u(small)">
                                    <h4><u>We Design</u></h4>
                                    <img className="image fit" src={weDesign} alt="" />
                                </div>
                                <div className="4u 12u(small)">
                                    <h4><u>We Develop</u></h4>
                                    <img className="image fit" src={weDevelop} alt="" />
                                </div>
                                <div className="4u 12u(small)">
                                    <h4><u>We Deliver</u></h4>
                                    <img className="image fit" src={weDeliver} alt="" />
                                </div>
                            </div>
                            <ul className="actions">
                                <li><Link to="/projects" className="button next">Full Portfolio</Link></li>
                            </ul>
                        </div>
                    </section>
                </div>

            </div>
        )
    }
}

export default HomeIndex

export const pageQuery = graphql`
    query PageQuery {
        site {
            siteMetadata {
                title
                description
            }
        }
    }
`