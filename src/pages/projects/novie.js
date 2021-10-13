import React from 'react'
import Helmet from 'react-helmet'
import { Layout, AppStoreLink } from '../../components'
import { IMAGES } from '../../constants'

const Novie = props => (
  <Layout>
    <Helmet>
      <title>Novie: The Movie Hub</title>
      <meta name="description" content="Novie: The Movie Hub Page" />
    </Helmet>

    <div className="alt">
      <div className="inner">
        <header className="major">
          <h1>Novie: The Movie Hub</h1>
        </header>
        {/* <span className="image main"><img src={IMAGES.novie_full} alt="" /></span> */}
        <span className="image right">
          <img src={IMAGES.novie_icon} alt="" />
        </span>
        <p>
          Novie is the best way to manage movies you want to watch/watched and
          discover new movies. With gorgeous edge-to-edge posters and unique
          features like bonus scene indicators, cast profiles, release
          notifications, and much more, you will experience movies like never
          before.
        </p>
        <p>
          Novie: The Movie Hub helps you keep track of your favorite movies. See
          what movie is hot right now. Watch related movie videos.
        </p>
        <p>The app is free to use! Main features include:</p>
        <ul>
          <li>
            Discover Popular, Now Playing, Update Coming, and Top Rated movies.
          </li>
          <li>Get detailed information about Movies, Cast and Crew.</li>
          <li>
            Find similar movies and movies related to movie or a certain actor.
          </li>
          <li>Watch movie trailers inline.</li>
          <li>Share using Twitter, Facebook, Mail or Messages.</li>
          <li>Print, Save to Camera Roll and Copy supported.</li>
          <li>Free text search TMDb for Movies.</li>
          <li>Fully supports the TMDb 3.0 API.</li>
          <li>Enjoy the app and It's always free.</li>
        </ul>
        <AppStoreLink
          appleLink="https://itunes.apple.com/us/app/novie/id1408910546?mt=8"
          googleLink="https://play.google.com/store/apps/details?id=com.techlis.novie"
        />
      </div>
      <div className="inner">
        <header className="major">
          <h1>Reddu: Watch Free Movie Online</h1>
        </header>
        <span className="image right">
          <img src={IMAGES.reddu_icon} alt="" />
        </span>
        <p>
          Watch amazing movies for free. No subscription fees, and no credit
          cards.
        </p>
        <p>
          Enjoy watching movies online for free. No account, no subscription, no
          credit cards, no payment. Movies updated daily. Just thousands of
          hours of streaming video content.
        </p>
        <AppStoreLink expoLink="https://expo.io/@jonnyn/reddu_movie_rn" />
      </div>
    </div>
  </Layout>
)

export default Novie
