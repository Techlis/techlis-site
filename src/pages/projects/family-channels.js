import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import AppStoreLink from '../../components/AppStoreLink'
import catchThem from '../../assets/images/thumbs/CatchThem2.png'
import catchThemIcon from '../../assets/images/icons/catch-them.png'

const FamilyChannels = (props) => (
    <div>
        <Helmet>
            <title>Home Family TV Channels</title>
            <meta name="description" content="Home Family TV Channels Page" />
        </Helmet>

        <div className="alt">
            <div className="inner">
                <header className="major">
                    <h1>Home Family TV Channels</h1>
                </header>
                {/* <span className="image right"><img src={catchThemIcon} alt="" /></span> */}
                <p>Educational and fun On Demand TV and online network for families, features award-winning family's videos, colouring, games, and video sharing for babies, Pre-k, big kids, and parents. Collection of best family TV channels on Youtube.</p>
                <AppStoreLink 
                    googleLink="https://play.google.com/store/apps/details?id=com.binuapp.kidstv" />
            </div>
        </div>

    </div>
)

export default FamilyChannels