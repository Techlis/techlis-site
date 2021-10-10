import React from 'react'
import { Link } from 'gatsby'

const ProjectSection = ({ link, thumb, title, children }) => (
  <section>
    <Link to={link} className="image">
      <img src={thumb} alt="" />
    </Link>
    <div className="content">
      <div className="inner">
        <header className="major">
          <h3>{title}</h3>
        </header>
        {children}
        <ul className="actions">
          <li>
            <Link to={link} className="button">
              Learn more
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </section>
)

export default ProjectSection
