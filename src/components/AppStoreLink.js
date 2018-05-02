import React from 'react'
import Link from 'gatsby-link'
import appleStore from '../assets/images/icons/apple_app_store.png'
import googleStore from '../assets/images/icons/google_play_store.png'

const AppStoreLink = (props) => (
    <ul className="actions">
        { props.appleLink ? <li><a href={props.appleLink} className="image" target="_blank"><img src={appleStore} alt="Apple App Store" /></a></li> : null }
        { props.googleLink ? <li><a href={props.googleLink} className="image" target="_blank"><img src={googleStore} alt="Google Play Store" /></a></li> : null }
    </ul>
)

export default AppStoreLink