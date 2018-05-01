import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import AppStoreLink from '../../components/AppStoreLink'
import catchThem from '../../assets/images/thumbs/CatchThem2.png'
import catchThemIcon from '../../assets/images/icons/catch-them.png'

const CatchThem = (props) => (
    <div>
        <Helmet>
            <title>Catch Them! Catch Them All!</title>
            <meta name="description" content="Catch Them Game Page" />
        </Helmet>

        <div id="main" className="alt">
            <div className="inner">
                <header className="major">
                    <h1>Catch Them! Catch Them All!</h1>
                </header>
                <span className="image main"><img src={catchThem} alt="" /></span>
                <p>
                {/* <span className="image right"><img src={catchThemIcon} alt="" /></span> */}
                Catch as much fruits as you could before the time runs out, but avoid bombing. See who got the highest score in town.</p>
                <p>Game rule:</p>
                <ul>
                <li>Initial time is 50 seconds.</li>
                <li>Each caught fruit will increase 1 score and 1 second of your time.</li>
                <li>Avoid bombing or the game will be over.</li>
                </ul>
                <p>As simple as that! See how highest score you get.</p>
                <AppStoreLink 
                    appleLink="https://itunes.apple.com/us/app/catch-them-catch-them-all/id1279621980?mt=8"
                    googleLink="https://play.google.com/store/apps/details?id=com.pocpix.catchthem" />
            </div>
        </div>

    </div>
)

export default CatchThem