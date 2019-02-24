import React from 'react'

const Contact = (props) => (
    <section id="contact">
        <div className="inner">
            <section>
                <h3>Have a project in mind? <br/>Let's create something together.</h3>
                <p></p>
                <form action="https://formspree.io/contact@techlis.com" method="POST">
                    <input type="hidden" name="_subject" value="Contact from techlis.com" />
                    <input type="hidden" name="_cc" value="jonnyn@live.com" />
                    <div className="field half first">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="field half">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" />
                    </div>
                    <div className="field">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" rows="6"></textarea>
                    </div>
                    <ul className="actions">
                        <li><input type="submit" value="Send Message" className="special" /></li>
                        <li><input type="reset" value="Clear" /></li>
                    </ul>
                </form>
            </section>
            <section className="split">
                <section>
                    <div className="contact-method">
                        <span className="icon alt fa-envelope"></span>
                        <h3>Email</h3>
                        <a href="mailto:contact@techlis.com">contact@techlis.com</a>
                    </div>
                </section>
                <section>
                    <div className="contact-method">
                        <span className="icon alt fa-phone"></span>
                        <h3>Phone</h3>
                        <span>(778) 896-5826<br/>(604) 635-3855</span>
                    </div>
                </section>
                {/* <section>
                    <div className="contact-method">
                        <span className="icon alt fa-home"></span>
                        <h3>Address</h3>
                        <span>3502 Princeton Ave<br />
                        Coquitlam, BC V3E 0K3<br />
                        Canada</span>
                    </div>
                </section> */}
            </section>
        </div>
    </section>
)

export default Contact
