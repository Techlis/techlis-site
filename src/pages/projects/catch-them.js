import React from 'react'
import Helmet from 'react-helmet'
import { StaticImage } from 'gatsby-plugin-image'
import { Layout, AppStoreLink } from '../../components'

const CatchThem = props => (
  <Layout>
    <Helmet>
      <title>Catch Them! Catch Them All!</title>
      <meta name="description" content="Catch Them Game Page" />
    </Helmet>

    <div className="alt">
      <div className="inner">
        <header className="major">
          <h1>Catch Them! Catch Them All!</h1>
        </header>
        <span className="image main">
          <StaticImage
            src={'../../assets/images/thumbs/CatchThem2.png'}
            alt=""
          />
        </span>
        <p>
          {/* <span className="image right"><img src={IMAGES.catch_them_icon} alt="" /></span> */}
          Catch as much fruits as you could before the time runs out, but avoid
          bombing. See who got the highest score in town.
        </p>
        <p>Game rule:</p>
        <ul>
          <li>Initial time is 50 seconds.</li>
          <li>
            Each caught fruit will increase 1 score and 1 second of your time.
          </li>
          <li>Avoid bombing or the game will be over.</li>
        </ul>
        <p>As simple as that! See how highest score you get.</p>
        <AppStoreLink
          appleLink="https://itunes.apple.com/us/app/catch-them-catch-them-all/id1279621980?mt=8"
          googleLink="https://play.google.com/store/apps/details?id=com.pocpix.catchthem"
        />
      </div>
    </div>
  </Layout>
)

export default CatchThem
