import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import AppStoreLink from '../../components/AppStoreLink'
import catchThem from '../../assets/images/thumbs/CatchThem2.png'
import catchThemIcon from '../../assets/images/icons/catch-them.png'

const OpenVideo = (props) => (
    <div>
        <Helmet>
            <title>OpenVideo</title>
            <meta name="description" content="OpenVideo Page" />
        </Helmet>

        <div className="alt">
            <div className="inner">
                <header className="major">
                    <h1>OpenVideo</h1>
                </header>
                {/* <span className="image main"><img src={catchThem} alt="" /></span> */}
                <p>Coming Soon...</p>
            </div>
        </div>

    </div>
)

export default OpenVideo