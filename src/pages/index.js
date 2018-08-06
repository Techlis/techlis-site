import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Banner from '../components/Banner'
import AppStoreLink from '../components/AppStoreLink';
import { IMAGES } from '../constants';

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
                    <section id="recent-work" className="tiles">
                        <article style={{backgroundImage: `url(${IMAGES.novie_thumb_2})`}}>
                            <header className="major">
                                <h3>Novie: The Movie Hub</h3>
                                <p>Getting movie information. Working on a Netflix-like application using React Native/Expo/Redux.</p>
                            </header>
                            <Link to="/projects/novie/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${IMAGES.dmv_driving_thumb})`}}>
                            <header className="major">
                                <h3>Driving License Knowledge Test</h3>
                                <p>One app fits all to theory driving tests for US, Canada, UK</p>
                            </header>
                            <Link to="/projects/driving-test/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${IMAGES.canada_citizen_thumb})`}}>
                            <header className="major">
                                <h3>Citizenship Test</h3>
                                <p>Rewrite a multiple choice test base application using React Native from my original native Android and native iOS (Swift) apps. The base code is highly scalable and reusable so that it can be used and extends to many multiple choice app such as Canadian/US/UK/Australia Citizenship Tests.</p>
                            </header>
                            <Link to="/projects/citizenship-test/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${IMAGES.turn_off_tv_thumb})`}}>
                            <header className="major">
                                <h3>Turn Off the TV</h3>
                                <p>Watch these useful videos instead of seating hours watch TV</p>
                            </header>
                            <Link to="/projects/turn-off-tv/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${IMAGES.family_channels_thumb})`}}>
                            <header className="major">
                                <h3>Family TV Channels</h3>
                                <p>A Safe environment for family to watch Youtube channels</p>
                            </header>
                            <Link to="/projects/family-channels/" className="link primary"></Link>
                        </article>
                        <article style={{backgroundImage: `url(${IMAGES.catch_them_thumb})`}}>
                            <header className="major">
                                <h3>Catch Them Game</h3>
                                <p>A mini game that was created using Unity</p>
                            </header>
                            <Link to="/projects/catch-them/" className="link primary"></Link>
                        </article>
                    </section>
                    <section id="who-we-are">
                        <div className="inner">
                            <header className="major">
                                <h2>Who We Are</h2>
                            </header>
                            <p>We design, develop amd deliver world class software and mobile apps for startups and enterprise companies. We make the magic happen while you take on the world.</p>
                            <div className="row">
                                <div className="4u 12u(small)">
                                    <h4><u>We Design</u></h4>
                                    <img className="image fit" src={IMAGES.weDesign} alt="" />
                                </div>
                                <div className="4u 12u(small)">
                                    <h4><u>We Develop</u></h4>
                                    <img className="image fit" src={IMAGES.weDevelop} alt="" />
                                </div>
                                <div className="4u 12u(small)">
                                    <h4><u>We Deliver</u></h4>
                                    <img className="image fit" src={IMAGES.weDeliver} alt="" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="explore-our-projects">
                        <div className="inner">
                            <header className="major">
                                <h2>Exploring...</h2>
                            </header>
                            <p>Get to know us more from our App Stores</p>
                            <ul className="actions">
                                <li><AppStoreLink 
                                        appleLink="https://itunes.apple.com/us/developer/techlis-systems-inc/id987066377?mt=8"
                                        googleLink="https://play.google.com/store/apps/developer?id=Techlis+Systems+Inc."
                                        otherLink="https://play.google.com/store/apps/developer?id=BinuApp" />
                                </li>
                            </ul>
                            <div className="row">
                                <ul className="actions">
                                    <li><Link to="/projects" className="button next">Full Portfolio</Link></li>
                                </ul>
                                <ul></ul>
                                <ul className="actions">
                                    <li><Link to="/blogs" className="button next">Or Our Blogs</Link></li>
                                </ul>
                            </div>
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