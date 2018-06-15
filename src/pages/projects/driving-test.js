import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import AppStoreLink from '../../components/AppStoreLink';
import { IMAGES } from '../../constants';

const DrivingTest = (props) => (
    <div>
        <Helmet>
            <title>Driving Theory Tests</title>
            <meta name="description" content="Driving Theory Tests Page" />
        </Helmet>

        <div className="alt">
            <div className="inner">
                <header className="major">
                    <h1>DMV Driving Theory Test</h1>
                </header>
                <span className="image right"><img src={IMAGES.dmv_driving_icon} alt="" /></span>
                <p>Rewrite using React Native to deploy faster to both Android and iOS. The next version of driving test will cover all provinces of Canada, and all States of U.S.</p>
                <p>The best way to get on the road is by taking our driving practice tests, whether you’re preparing for your driver’s license test or just want to refresh your driving knowledge. Our wide range of driving practice tests is perfect for anywhere in the United States.</p>
                <p>Before you can take the behind-the-wheel test needed to obtain your driver's license, you'll need to take a written knowledge test. If you're nervous about passing, consider taking a practice test first. Our driver's license practice tests and those offered by our trusted partners are designed to give you a basic understanding of the questions you'll find on the DMV's written exam.</p>
                <p>The app is free to use! Also The benefits of taking a practice test before the DMV's actual written exam include:</p>
                <ul>
                    <li><strong>Saving money:</strong> In most states, if you fail your first written knowledge test, you'll have to pay a fee in order to retake the examination.</li>
                    <li><strong>Taking your driving test sooner:</strong> In most states, you must wait for some time before retaking a written knowledge test—meaning you have to wait even longer to take the behind-the-wheel exam for your driver's license.</li>
                    <li><strong>Getting comfortable with the format:</strong> The phrasing of the multiple-choice questions on your exam can take a while to get used to; a practice test can get you acclimated to the format of the DMV's written test.</li>
                    <li><strong>Helping you study:</strong> Taking a practice driver's license test can help you determine which sections of your state's driver's license manual will require some additional study time. </li>
                </ul>
                <AppStoreLink 
                    appleLink="https://itunes.apple.com/us/app/dmv-driving-license-test/id1395414539?mt=8"
                    googleLink="https://play.google.com/store/apps/details?id=com.techlis.USDrivingTestRN" />
            </div>

            <div className="inner">
                <header className="major">
                    <h1>ICBC Driving Theory Test</h1>
                </header>
                <p>Rewrite using React Native to deploy faster to both Android and iOS. The next version of driving test will cover all provinces of Canada, and all States of U.S.</p>
                <AppStoreLink 
                    googleLink="https://play.google.com/store/apps/details?id=com.binuapp.bcdrivingtest" />
            </div>
        </div>
    </div>
)

export default DrivingTest