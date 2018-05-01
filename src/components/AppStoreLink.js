import React from 'react'
import Link from 'gatsby-link'
import appleStore from '../assets/images/icons/apple_app_store.png'
import googleStore from '../assets/images/icons/google_play_store.png'

const AppStoreLink = (props) => (
    <ul className="actions">
        <li><a href={props.appleLink} className="image" target="_blank"><img src={appleStore} alt="Apple App Store" /></a></li>
        <li><a href={props.googleLink} className="image" target="_blank"><img src={googleStore} alt="Google Play Store" /></a></li>
    </ul>
)

export default AppStoreLink