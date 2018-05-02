import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import AppStoreLink from '../../components/AppStoreLink'
import catchThem from '../../assets/images/thumbs/CatchThem2.png'
import catchThemIcon from '../../assets/images/icons/catch-them.png'

const DrivingTest = (props) => (
    <div>
        <Helmet>
            <title>Driving Theory Test ICBC</title>
            <meta name="description" content="Driving Theory Test ICBC Page" />
        </Helmet>

        <div className="alt">
            <div className="inner">
                <header className="major">
                    <h1>Driving Theory Test ICBC</h1>
                </header>
                <p>Coming Soon...</p>
                <p>Rewrite using React Native to deploy faster to both Android and iOS. The next version of driving test will cover all provinces of Canada, and all States of U.S.</p>
                <AppStoreLink 
                    googleLink="https://play.google.com/store/apps/details?id=com.binuapp.bcdrivingtest" />
            </div>
        </div>

    </div>
)

export default DrivingTest