import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Menu = (props) => (
  <nav id="menu">
    <div className="inner">
      <ul className="links">
      <li><Link onClick={props.onToggleMenu} to="/">Home</Link></li>
        <li><Link onClick={props.onToggleMenu} to="/#our-services">Our Services</Link></li>
        <li><Link onClick={props.onToggleMenu} to="/projects">Our Projects</Link></li>
        <li><Link onClick={props.onToggleMenu} to="/blogs">Our Blogs</Link></li>
        <li><Link onClick={props.onToggleMenu} to="/#contact">Contact Us</Link></li>
      </ul>
      {/* <ul className="actions vertical">
        <li><a href="#" className="button special fit">Get Started</a></li>
        <li><a href="#" className="button fit">Log In</a></li>
      </ul> */}
    </div>
    <a className="close" onClick={props.onToggleMenu} href="#top">Close</a>
  </nav>
)

Menu.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Menu
