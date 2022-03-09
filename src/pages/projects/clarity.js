import React from 'react'
import Helmet from 'react-helmet'
import { StaticImage } from 'gatsby-plugin-image'
import { Layout, AppStoreLink } from '../../components'

const Clarity = props => (
  <Layout>
    <Helmet>
      <title>Clarity</title>
      <meta name="description" content="Clarity - The App for Your Love Life" />
    </Helmet>

    <div className="alt">
      <div className="inner">
        <header className="major">
          <h1>Clarity - The App for Your Love Life</h1>
        </header>
        <span className="image main">
          <StaticImage src={'../../assets/images/thumbs/clarity1.png'} alt="" />
        </span>
        {/* <span className="image right">
          <img src={IMAGES.nfb_film_app_thumb} alt="" />
        </span> */}
        <p>
          Relationship wellness is the core pillar of our mental and emotional
          well-being. Our love lives can be hard to navigate in today&apos;s
          world—the right resources, guidance, and support can make all the
          difference. <br />
          Our mission is to help you thrive through happier and healthier
          relationships.
        </p>
        <p>
          Do you need clarity in your love life? We all do. Dating and
          relationships can be complicated in today&apos;s world, but we&apos;re
          here to help.
        </p>
        <p>
          Relationship wellness is the core pillar of our mental and emotional
          well-being. Our love lives can be hard to navigate in today&apos;s
          world—the right resources, guidance, and support can make all the
          difference.
          <br />
          Our mission is to help you thrive through happier and healthier
          relationships.
        </p>
        <p>
          Should you send that text? Ask our community. Have a question
          you&apos;re too embarrassed to ask your friends? We&apos;ve got you.
          Think of Clarity as your virtual brunch table. Oh and by the way, we
          invited over 50 of the world&apos;s best dating/relationship experts
          to the table, too.
        </p>
        <p>
          Clarity is a safe and discreet space to ask, share advice, and vent
          about whatever is going on in your love life. We built Clarity upon
          the idea that sharing is healing. Be anonymous or your real self, and
          confide in a judgment-free zone.
        </p>
        <p>
          Sick of spending countless hours scouring the internet for credible
          info to improve your love life? Yeah, so were we. So we curated an
          ever-growing library of 300+ bite-sized lessons from the world&apos;s
          leading experts on a multitude of areas including: dating in the “new
          normal,” the art of texting, love and money, conflict resolution, NLP,
          Gottman&apos;s Theory, astrology, reiki, tantra, and so much more.
        </p>
        <p>
          We’ve partnered with the world’s top psychologists, neuroscientists,
          love biologists, astrologists, sexologists, marriage and family
          counselors, cognitive and behavioral therapists, reiki specialists,
          tantra practitioners, dating coaches, finance experts, and more.
        </p>
        <AppStoreLink
          appleLink="https://apps.apple.com/us/app/clarity-the-social-network/id1519345252"
          googleLink="https://play.google.com/store/apps/details?id=io.clarityapp.app&hl=en_US&gl=US"
        />
      </div>
    </div>
  </Layout>
)

export default Clarity
