import React from 'react'
import PropTypes from 'prop-types';

const BannerLanding = (props) => (
    <section id="banner" className="style2">
        <div className="inner">
            <header className="major">
                <h1>{props.header}</h1>
            </header>
            <div className="content">
                {props.description}
            </div>
        </div>
    </section>
)

BannerLanding.PropTypes = {
    header: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default BannerLanding
