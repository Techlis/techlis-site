import React from 'react'

const Banner = props => (
  <section id="banner" className="major">
    <div className="inner">
      <header className="major">
        <h1>Techlis Systems Inc.</h1>
      </header>
      <div className="content">
        <p>
          Techlis is a software development & consulting company
          <br />
          We build high quality mobile games and apps, with love
        </p>
        <ul className="actions">
          <li>
            <a href="#recent-work" className="button next scrolly">
              Our recent work
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
)

export default Banner
