import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../components/layout'
import AppStoreLink from '../../components/AppStoreLink'
import { IMAGES } from '../../constants'

const Novie = props => (
  <Layout>
    <Helmet>
      <title>NFB Film App</title>
      <meta name="description" content="National Film Board of Canada Mobile Film App" />
    </Helmet>

    <div className="alt">
      <div className="inner">
        <header className="major">
          <h1>NFB Film App</h1>
        </header>
        <span className="image main"><img src={IMAGES.nfb_film_app_thumb} alt="" /></span>
        {/* <span className="image right">
          <img src={IMAGES.nfb_film_app_thumb} alt="" />
        </span> */}
        <p>
          NFB Film App is mobile application by National Film Board of Canada.
          Great ways to enjoy thousands of NFB documentaries and animations for free on your Android & iOS devices.
        </p>
        <p>
          NFB Film App helps you keep track of your favorite films. See what film is hot right now. Watch related videos.
        </p>
        <p>The app is free to use! Main features include:</p>
        <ul>
          <li>Discover hot topics, Now Playing, Update Coming, Top Rated films, Featured, Interactive, and Blogs.</li>
          <li>Get detailed information about Films, Cast and Crew.</li>
          <li>Find similar films and films related to film or a certain actor.</li>
          <li>Download and watch films offline</li>
          <li>Chromecast and Airplay support</li>
          <li>Share using to social media</li>
          <li>Keep track and notifications of social NFB events at your local</li>
          <li>Get notifications and up-to-date with recent films, interactive projects, NFB blogs, and events</li>
          <li>Bilingual, subtitles, and multiple video quality settings</li>
        </ul>
        <AppStoreLink
          appleLink="https://apps.apple.com/ca/app/nfb-films/id378813687?ign-itsct=apps_box_link&ign-itscg=30200"
          googleLink="https://play.google.com/store/apps/details?id=com.nitobi.nfb&referrer=utm_source%3Dnfb_apps_page%26utm_medium%3Dpromo_page&hl=en"
        />
      </div>
    </div>
  </Layout>
)

export default Novie
