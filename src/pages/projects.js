import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import BannerLanding from '../components/BannerLanding'

import pic08 from '../assets/images/pic08.jpg'
import pic09 from '../assets/images/pic09.jpg'
import pic10 from '../assets/images/pic10.jpg'

const Landing = (props) => (
    <div>
        <Helmet>
            <title>Our Projects</title>
            <meta name="description" content="Projects Page" />
        </Helmet>

        <BannerLanding 
            header="Our Projects"
            description={<p>We love creating. We love problem solving.<br />And we love turning ideas into successful products.</p>} />

        <div id="main">
            <section id="one">
                <div className="inner">
                    <header className="major">
                        <h2>Take a Peek at Some of Our Projects</h2>
                    </header>
                    <p>Our clients come from over 20 different industries, ranging from startup to enterprise. Below are a select few from our extensive list of 100+ successful projects.</p>
                </div>
            </section>
            <section id="two" className="spotlights">
                <section>
                    <Link to="/open-video" className="image">
                        <img src={pic08} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>OpenVideo</h3>
                            </header>
                            <p>Available on Android and iOS. Working on a Netflix-like application using React Native/Expo/Redux. The app will stream video from open source APIs.</p>
                            <ul className="actions">
                                <li><Link to="/open-video" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/driving-test" className="image">
                        <img src={pic09} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Driving Theory Quiz</h3>
                            </header>
                            <p>Using this convenience app to test your knowledge of driving theory. The app will be available in U.S., Canada, UK, Australia, etc. Available on Google Play and Apple AppStore.</p>
                            <ul className="actions">
                                <li><Link to="/driving-test" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/citizenship-test" className="image">
                        <img src={pic10} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Citizenship Test</h3>
                            </header>
                            <p>Multiple choice test base application using React Native from my original native Android and native iOS (Swift) apps. The base code is highly scalable and reusable so that it can be used and extends to many multiple choice app such as Canadian/US/UK/Australia Citizenship Tests.</p>
                            <ul className="actions">
                                <li><Link to="/citizenship-test" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/catch-them" className="image">
                        <img src={pic09} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Catch Them Game</h3>
                            </header>
                            <p>A mini game to release some stress :) Trying to catch as many fruits as you could while avoiding bombing. The highest score player wins the prize. The game is available on Google Play and Apple AppStore.</p>
                            <ul className="actions">
                                <li><Link to="/projects/catch-them/" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/family-channels" className="image">
                        <img src={pic10} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Family Video Channels</h3>
                            </header>
                            <p>A good collection of Youtube channels that is useful and resourceful for family. A safe and fun environment that is suitable for home family use. App is available on Google Play only.</p>
                            <ul className="actions">
                                <li><Link to="/family-channels" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/top-best-youtube-channels" className="image">
                        <img src={pic09} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Top Best Youtube Channels</h3>
                            </header>
                            <p>Utilized Youtube APIs to design a good collections of best available Youtube channels. And Android native app</p>
                            <ul className="actions">
                                <li><Link to="/top-best-youtube-channels" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/turn-off-tv" className="image">
                        <img src={pic10} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Turn of the TV</h3>
                            </header>
                            <p>Watch these useful videos instead of seating hours watch TV. Available on Google Play</p>
                            <ul className="actions">
                                <li><Link to="/turn-off-tv" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
        </div>

    </div>
)

export default Landing