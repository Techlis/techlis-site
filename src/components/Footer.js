import React from 'react'
import { Link } from 'gatsby'

const Footer = (props) => (
    <footer id="footer">
        <div className="inner">
            <ul className="icons">
                <li><a href="/privacy-policy" className="icon alt fa-twitter" target="_blank" rel="noreferrer"><span className="label">Twitter</span></a></li>
                <li><a href="/privacy-policy" className="icon alt fa-facebook" target="_blank" rel="noreferrer"><span className="label">Facebook</span></a></li>
                <li><a href="/terms-of-use" className="icon alt fa-instagram" target="_blank" rel="noreferrer"><span className="label">Instagram</span></a></li>
                <li><a href="https://github.com/techlis" className="icon alt fa-github" target="_blank" rel="noreferrer"><span className="label">GitHub</span></a></li>
                <li><a href="https://www.linkedin.com/in/jonny-nguyen/" className="icon alt fa-linkedin" target="_blank" rel="noreferrer"><span className="label">LinkedIn</span></a></li>
            </ul>
            <ul className="copyright">
                <li>&copy; 2021 Techlis Systems Inc.</li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-of-use">Terms of Use</Link></li>
                <li>Sitemap</li>
            </ul>
        </div>
    </footer>
)

export default Footer
