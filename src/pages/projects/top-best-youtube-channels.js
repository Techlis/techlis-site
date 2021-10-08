import React from 'react'
// import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../../components/layout'
import AppStoreLink from '../../components/AppStoreLink'

const TopYoutubeChannels = props => (
  <Layout>
    <Helmet>
      <title>Top Best Youtube Channels</title>
      <meta name="description" content="Top Best Youtube Channels Page" />
    </Helmet>

    <div className="alt">
      <div className="inner">
        <header className="major">
          <h1>Top Best Youtube Channels</h1>
        </header>
        <p>
          A convenience way to check out what is going on and only see what
          matters on Youtube.
        </p>
        <AppStoreLink googleLink="https://play.google.com/store/apps/details?id=com.binuapp.topbestyoutubechannels" />
      </div>
    </div>
  </Layout>
)

export default TopYoutubeChannels
