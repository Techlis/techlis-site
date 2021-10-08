import React from 'react'
// import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../../components/layout'
import AppStoreLink from '../../components/AppStoreLink'
import { IMAGES } from '../../constants'

const TurnOffTV = props => (
  <Layout>
    <Helmet>
      <title>Turn off the TV</title>
      <meta name="description" content="Turn off the TV Page" />
    </Helmet>

    <div className="alt">
      <div className="inner">
        <header className="major">
          <h1>Turn off the TV</h1>
        </header>
        <span className="image right">
          <img src={IMAGES.turn_off_tv_icon} alt="" />
        </span>
        <p>
          The idea is to learn something meaning full than wasting time in front
          of the TV. Instead of wasting your life watching TV, spent few minutes
          a day to watch something mind-opening and educational. New educational
          videos have been updated daily to help you learn or gain a new
          perspective.
        </p>
        <blockquote>
          "You watch television to turn your brain off and you work on your
          computer when you want to turn your brain on."
        </blockquote>
        <p>
          -- Steve Jobs, co-founder of Apple Computer and Pixar, in Macworld
          Magazine, February 2004
        </p>
        <blockquote>
          "They put an off button on the TV for a reason. Turn it off . . . I
          really don't watch much TV."
        </blockquote>
        <p>-- President George W. Bush, C-SPAN interview, January 2005</p>
        <AppStoreLink googleLink="https://play.google.com/store/apps/details?id=com.binuapp.instaedutv" />
      </div>
    </div>
  </Layout>
)

export default TurnOffTV
