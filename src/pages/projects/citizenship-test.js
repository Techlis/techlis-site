import React from 'react'
// import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../../components/layout'
import AppStoreLink from '../../components/AppStoreLink'
import { IMAGES } from '../../constants'

const CitizenshipTest = props => (
  <Layout>
    <Helmet>
      <title>Citizenship Tests</title>
      <meta name="description" content="Citizenship Tests Page" />
      <meta
        name="apple-itunes-app"
        content="app-id=1458665674, app-argument=citizenship>"
      ></meta>
      <link
        rel="manifest"
        href="https://raw.githubusercontent.com/Techlis/TechlisSite/master/static/manifest.json"
      ></link>
    </Helmet>

    <div id="main" className="alt">
      <div className="inner">
        <section id="canadian-citizenship-test">
          <header className="major">
            <h1>Canadian Citizenship Test</h1>
          </header>
          <span className="image right">
            <img src={IMAGES.canada_citizen_icon} alt="" />
          </span>
          <p>
            Failure rates for immigrants writing citizenship tests have soared
            when tougher questions and revamped rules made it harder for newcomers
            to become Canadian. This application is used to study and prepare you
            for the Canadian Citizenship Test. Intended to be plain simple and
            easy to learn; By using the app, you not only study fast, but also
            finish the real test as quick as possible. Records show that most
            people using the app only need 5 minutes to complete the real test.
          </p>
          <p>
            The practice test questions derived from the book Discover Canada, on
            which the test is based. All questions and answers have been selected
            carefully and verified as close as the real test. The actual
            Citizenship Exam consists of twenty multiple choice questions. You can
            use this application to practice answering the same multiple choice
            questions that may appear on the real citizenship test, or simply
            understand more about Canada. Keep practice makes perfect!
          </p>
          <p>
            * Please note: The app doesn't mean to be a study guide for your
            citizenship test. We encourage users to review the book as well. If
            you have any concern about the app, please do not hesitate to email us
            directly. We always listen.
          </p>
          <p>Highlight keys of features:</p>
          <ul>
            <li>
              All questions and answers have been selected carefully and verified
              as close as the 'real' test as well as updated frequently
            </li>
            <li>
              Randomly generate test questions for every test. Never do the same
              test again
            </li>
            <li>
              Determine whether you passed or failed the test and able to review
              wrong or all tested questions
            </li>
            <li>
              "Study Questions" Section helps you to learn all questions and
              answers easily and categorized base on test subjects.
            </li>
            <li>Keep track of the subjects that you need to improve</li>
            <li>Read online book 'Discover Canada' right in the app</li>
          </ul>
          <p>
            Canadian Citizenship Test
            <AppStoreLink
              appleLink="https://itunes.apple.com/us/app/canadian-citizenship-test-2018/id1271254723?mt=8"
              googleLink="https://play.google.com/store/apps/details?id=com.binuapp.react.CanadianCitizenshipTestRN"
            />
          </p>
        </section>
        <hr class="major" />
        <section id="australian-citizenship-test">
          <header className="major">
            <h1>Australian Citizenship Test</h1>
          </header>
          <span className="image right">
            <img src={IMAGES.australia_citizen_icon} alt="" />
          </span>
          <p>
            This application is used to study and prepare you for the "Australian
            Citizenship Test". The citizenship test is designed to assess whether
            you have an adequate knowledge of Australia and the responsibilities
            and privileges of Australian citizenship. English is our national
            language. Communicating in English helps you to play a more active
            role in Australian society. It helps you to take full advantage of
            education, employment and the other opportunities Australia has to
            offer. The actual Test consists of twenty multiple choice questions.
            You can use this application to practice answering the same multiple
            choice questions that may appear on the real citizenship test, or
            simply understand more about Australian. Keep practice makes perfect!
          </p>
          <p>
            * Please note: The app doesn't mean to be a study guide for your
            citizenship test. We encourage users to review the book as well. If
            you have any concern about the app, please do not hesitate to email us
            directly. We always listen.
          </p>
          <p>Highlight keys of features:</p>
          <ul>
            <li>
              All questions and answers have been selected carefully and verified
              as close as the 'real' test as well as updated frequently
            </li>
            <li>
              Randomly generate test questions for every test. Never do the same
              test again
            </li>
            <li>
              Determine whether you passed or failed the test and able to review
              wrong or all tested questions
            </li>
            <li>
              "Study Questions" Section helps you to learn all questions and
              answers easily and categorized base on test subjects.
            </li>
            <li>Keep track of the subjects that you need to improve</li>
            <li>Flash Cards help to memorize questions and answers</li>
            <li>Stats screen shows Area of Improvement</li>
            <li>
              Get more understand about the test/app and help from "Extras"
              Section
            </li>
          </ul>
          <p>
            Australian Citizenship Test
            <AppStoreLink
              appleLink="https://itunes.apple.com/us/app/australian-citizenship-test/id1278717266?mt=8"
              googleLink="https://play.google.com/store/apps/details?id=com.binuapp.react.AustralianCitizenshipTestRN"
            />
          </p>
        </section>
        <hr class="major" />
        <section id="life-in-uk-test">
          <header className="major">
            <h1>Life in the UK Test</h1>
          </header>
          <span className="image right">
            <img src={IMAGES.uk_citizen_icon} alt="" />
          </span>
          <p>
            This application is used to study and prepare you for the UK
            Citizenship or settlement, known as Life in the UK Test. The practice
            test consists of nearly thousand multiple choice questions derived
            from the book 'Life in the United Kindom: A Journey to Citizenship',
            on which the test is based. The actual Citizenship Exam consists of
            twenty four multiple choice questions. You can use this application to
            practice answering the same multiple choice questions that may appear
            on the real citizenship test, or simply understand more about UK. Keep
            practice makes perfect!
          </p>
          <p>
            * Please note: The app doesn't mean to be a study guide for your
            citizenship test. We encourage users to review the book as well. If
            you have any concern about the app, please do not hesitate to email us
            directly. We always listen.
          </p>
          <p>Highlight keys of features:</p>
          <ul>
            <li>
              All questions and answers have been selected carefully and verified
              as close as the 'real' test as well as updated frequently
            </li>
            <li>
              Randomly generate test questions for every test. Never do the same
              test again
            </li>
            <li>
              Determine whether you passed or failed the test and able to review
              wrong or all tested questions
            </li>
            <li>
              "Study Questions" Section helps you to learn all questions and
              answers easily and categorized base on test subjects.
            </li>
            <li>Keep track of the subjects that you need to improve</li>
            <li>Flash Cards help to memorize questions and answers</li>
            <li>Stats screen shows Area of Improvement</li>
            <li>
              Get more understand about the test/app and help from "Extras"
              Section
            </li>
          </ul>
          <p>
            Life in the UK Test
            <AppStoreLink
              appleLink="https://itunes.apple.com/us/app/life-in-the-uk-citizenship/id1278069642?mt=8"
              googleLink="https://play.google.com/store/apps/details?id=com.binuapp.react.LifeInTheUKTestRN"
            />
          </p>
        </section>
        <hr class="major" />
        <section id="us-citizenship-test">
          <header className="major">
            <h1>US Citizenship Naturalization Test</h1>
          </header>
          <span className="image right">
            <img src={IMAGES.us_citizen_icon} alt="" />
          </span>
          <p>
            Do you know what it takes to become an American citizen? Put your
            knowledge of America’s history and government to the test! Try to
            answer a sample of the questions people seeking American citizenship
            must answer to pass the government’s naturalization test.
          </p>
          <p>
            The practice test questions derived from the book Discover Canada, on
            which the test is based. All questions and answers have been selected
            carefully and verified as close as the real test. The actual
            Citizenship Exam consists of twenty multiple choice questions. You can
            use this application to practice answering the same multiple choice
            questions that may appear on the real citizenship test, or simply
            understand more about Canada. Keep practice makes perfect!
          </p>
          <p>
            * Please note: The app doesn't mean to be a study guide for your
            citizenship test. We encourage users to review the book as well. If
            you have any concern about the app, please do not hesitate to email us
            directly. We always listen.
          </p>
          <p>Highlight keys of features:</p>
          <ul>
            <li>
              All questions and answers have been selected carefully and verified
              as close as the 'real' test as well as updated frequently
            </li>
            <li>
              Randomly generate test questions for every test. Never do the same
              test again
            </li>
            <li>
              Determine whether you passed or failed the test and able to review
              wrong or all tested questions
            </li>
            <li>
              "Study Questions" Section helps you to learn all questions and
              answers easily and categorized base on test subjects.
            </li>
            <li>Keep track of the subjects that you need to improve</li>
            <li>
              "Online Materials" section will provide helpful information and more
              resource to prepare for the test.
            </li>
          </ul>
          <p>
            US Citizenship Naturalization Test
            <AppStoreLink
              appleLink="https://itunes.apple.com/us/app/us-citizenship-test/id1330348736?mt=8"
              googleLink="https://play.google.com/store/apps/details?id=com.binuapp.react.USCitizenshipTestRN"
            />
          </p>
        </section>
      </div>
    </div>
  </Layout>
)

export default CitizenshipTest
