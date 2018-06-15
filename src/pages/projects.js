import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import BannerLanding from '../components/BannerLanding';
import { IMAGES } from '../constants';
import pic08 from '../assets/images/pic08.jpg';
import pic09 from '../assets/images/pic09.jpg';
import pic10 from '../assets/images/pic10.jpg';

const Projects = (props) => (
    <div>
        <Helmet>
            <title>Our Projects</title>
            <meta name="description" content="Projects Page" />
        </Helmet>

        <BannerLanding 
            header="Our Projects"
            description={<p>We love creating. We love problem solving.<br />And we love turning ideas into successful products.</p>} />

        <div id="projects">
            <section>
                <div className="inner" style={{ margin: 40 }}>
                    <header className="major">
                        <h2>Take a Peek at Some of Our Projects</h2>
                    </header>
                    <p>Our clients come from over 20 different industries, ranging from startup to enterprise. Below are a select few from our extensive list of 100+ successful projects.</p>
                </div>
            </section>
            <section className="spotlights">
                <section>
                    <Link to="/projects/open-video/" className="image">
                        <img src={IMAGES.open_video_thumb} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>OpenVideo</h3>
                            </header>
                            <p>Available on Android and iOS. Working on a Netflix-like application using React Native/Expo/Redux. The app will stream video from open source APIs.</p>
                            <ul className="actions">
                                <li><Link to="/projects/open-video/" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/projects/driving-test" className="image">
                        <img src={IMAGES.dmv_driving_thumb} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Driving Theory Quiz</h3>
                            </header>
                            <p>Using this convenience app to test your knowledge of driving theory. The app will be available in U.S., Canada, UK, Australia, etc. Available on Google Play and Apple AppStore.</p>
                            <ul className="actions">
                                <li><Link to="/projects/driving-test" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/projects/citizenship-test" className="image">
                        <img src={IMAGES.canada_citizen_thumb} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Citizenship Test</h3>
                            </header>
                            <p>Multiple choice test base application using React Native from my original native Android and native iOS (Swift) apps. The base code is highly scalable and reusable so that it can be used and extends to many multiple choice app such as:</p>
                            <ul>
                                <li><Link to="/projects/citizenship-test#canadian-citizenship-test">Canadian Citizenship Test</Link></li>
                                <li><Link to="/projects/citizenship-test#australian-citizenship-test">Australian Citizenship Test</Link></li>
                                <li><Link to="/projects/citizenship-test#us-citizenship-test">US Citizenship Naturalization Test</Link></li>
                                <li><Link to="/projects/citizenship-test#life-in-uk-test">Life in the UK Test</Link></li>
                            </ul>
                            <ul className="actions">
                                <li><Link to="/projects/citizenship-test" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/projects/catch-them/" className="image">
                        <img src={IMAGES.catch_them_thumb} alt="" />
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
                    <Link to="/projects/family-channels" className="image">
                        <img src={IMAGES.family_channels_thumb} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Family Video Channels</h3>
                            </header>
                            <p>A good collection of Youtube channels that is useful and resourceful for family. A safe and fun environment that is suitable for home family use. App is available on Google Play only.</p>
                            <ul className="actions">
                                <li><Link to="/projects/family-channels" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/projects/top-best-youtube-channels" className="image">
                        <img src={pic08} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Top Best Youtube Channels</h3>
                            </header>
                            <p>Utilized Youtube APIs to design a good collections of best available Youtube channels. And Android native app</p>
                            <ul className="actions">
                                <li><Link to="/projects/top-best-youtube-channels" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="/projects/turn-off-tv" className="image">
                        <img src={IMAGES.turn_off_tv_thumb} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Turn of the TV</h3>
                            </header>
                            <p>Watch these useful videos instead of seating hours watch TV. Available on Google Play</p>
                            <ul className="actions">
                                <li><Link to="/projects/turn-off-tv" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <a href="https://decalhoangoanh.com/" target="_blank" className="image">
                        <img src={pic09} alt="" />
                    </a>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Decal Hoang Oanh</h3>
                            </header>
                            <p>Create Decal Hoang Oanh website to showcase their products and services using Wordpress</p>
                            <ul className="actions">
                                <li><a href="https://decalhoangoanh.com/" target="_blank" className="button">Learn more</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to="#" className="image">
                        <img src={pic10} alt="" />
                    </Link>
                    <div className="content">
                        <div className="inner">
                            <header className="major">
                                <h3>Jo2u - College Classified Site</h3>
                            </header>
                            <p>Build a classified site when I were in College using ASP.NET and C#</p>
                            <ul className="actions">
                                <li><Link to="#" className="button">Learn more</Link></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
        </div>

    </div>
)

export default Projects