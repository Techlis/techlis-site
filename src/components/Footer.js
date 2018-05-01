import React from 'react'
import Link from 'gatsby-link'

const Footer = (props) => (
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                <li><a href="#" className="icon alt fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="#" className="icon alt fa-facebook"><span className="label">Facebook</span></a></li>
                <li><a href="#" className="icon alt fa-instagram"><span className="label">Instagram</span></a></li>
                <li><a href="#" className="icon alt fa-github"><span className="label">GitHub</span></a></li>
                <li><a href="#" className="icon alt fa-linkedin"><span className="label">LinkedIn</span></a></li>
            </ul>
            <ul className="copyright">
                <li>&copy; 2018 Techlis System Inc.</li>
                <li>Designed by: <a href="https://jonnyn.com">JonnyN</a></li>
                <li><Link to="/privacy-policy/">Privacy Policy</Link></li>
                <li><Link to="/terms-of-use/">Terms of Use</Link></li>
                <li>Sitemap</li>
            </ul>
        </div>
    </footer>
)

export default Footer
