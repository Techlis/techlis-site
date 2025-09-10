import { motion } from "framer-motion"
import { Badge, Button } from "@/components/ui"
import { SEOHead } from "@/components/common"
import { Link } from "react-router-dom"
import { generatePageSEO } from "@/lib/seo"
import { COMPANY_DATA } from "@/lib/constants"
import { FileText, AlertTriangle, Clock, Mail } from "lucide-react"
import type { JSX } from "react"

function Terms(): JSX.Element {
  const seoData = generatePageSEO("terms")

  return (
    <>
      <SEOHead seoData={seoData} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="container mobile-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto"
            >
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-700 px-3 py-1.5 text-xs sm:text-sm"
              >
                <FileText className="w-4 h-4 mr-2 inline" />
                Terms of Service
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight px-2">
                Terms and
                <span className="bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Conditions
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-2">
                These Terms of Service govern your use of Techlis websites,
                mobile applications, and services. By accessing or using our
                services, you agree to be bound by these terms.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Last Updated: September 10, 2025</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Legal Notice */}
        <section className="section-padding bg-red-50">
          <div className="container mobile-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-2">
                      Important Legal Notice
                    </h3>
                    <p className="text-red-600 text-sm leading-relaxed">
                      Please read these Terms of Service carefully before using
                      Techlis websites, mobile applications, or services. By
                      accessing or using any of our services, you acknowledge
                      that you have read, understood, and agree to be bound by
                      these terms. If you do not agree to these terms, you may
                      not access or use our services.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="section-padding">
          <div className="container mobile-padding">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Definitions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  1. Definitions
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    In these Terms of Service, the following terms have the
                    meanings set forth below:
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <strong>"Techlis," "we," "us," or "our"</strong> refers to{" "}
                      {COMPANY_DATA.name} and its affiliates.
                    </li>
                    <li>
                      <strong>"Services"</strong> includes all websites, mobile
                      applications, software, consulting services, development
                      services, and any other products or services provided by
                      Techlis.
                    </li>
                    <li>
                      <strong>"Website(s)"</strong> refers to techlis.com and
                      any subdomains or related web properties.
                    </li>
                    <li>
                      <strong>"Mobile Applications"</strong> refers to any iOS,
                      Android, or other mobile applications published by
                      Techlis.
                    </li>
                    <li>
                      <strong>"User," "you," or "your"</strong> refers to any
                      individual or entity accessing or using our Services.
                    </li>
                    <li>
                      <strong>"Client"</strong> refers to users who have engaged
                      Techlis for consulting or development services.
                    </li>
                    <li>
                      <strong>"Content"</strong> includes text, graphics,
                      images, software, code, and other materials provided
                      through our Services.
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Acceptance of Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2. Acceptance of Terms
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    By accessing or using any Techlis Services, including our
                    websites, mobile applications, or consulting services, you
                    acknowledge that you have read, understood, and agree to be
                    bound by these Terms of Service and our Privacy Policy.
                  </p>
                  <p>
                    If you are using our Services on behalf of an organization,
                    you represent and warrant that you have authority to bind
                    that organization to these terms, and "you" and "your" will
                    refer to that organization.
                  </p>
                  <p>
                    You may not use our Services if you are not of legal age to
                    form a binding contract with Techlis, or if you are
                    prohibited from receiving services under applicable laws.
                  </p>
                </div>
              </motion.div>

              {/* Changes to Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  3. Changes to Terms
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    We reserve the right to modify or update these Terms of
                    Service at any time. We will notify you of material changes
                    by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Posting the updated terms on this page with a new "Last
                      Updated" date
                    </li>
                    <li>
                      Sending you an email notification if you have provided us
                      with your email address
                    </li>
                    <li>Displaying a notice when you access our Services</li>
                  </ul>
                  <p>
                    Your continued use of our Services after any changes
                    signifies your acceptance of the updated terms. If you do
                    not agree to the changes, you must stop using our Services.
                  </p>
                </div>
              </motion.div>

              {/* Use of Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  4. Use of Services
                </h2>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  4.1 Website and Mobile Apps
                </h3>
                <div className="text-gray-600 space-y-4 mb-6">
                  <p>
                    You may access and use our websites and mobile applications
                    for your personal or internal business purposes, subject to
                    these Terms of Service. All rights not expressly granted to
                    you are reserved by Techlis.
                  </p>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Mobile App Downloads:
                  </h4>
                  <p>
                    Our mobile applications are distributed through Apple App
                    Store and Google Play Store. Additional terms from Apple or
                    Google may apply to your use of these applications.
                  </p>
                  <p>
                    You are responsible for any fees charged by your mobile
                    carrier for data usage. Techlis is not responsible for any
                    charges, fees, or expenses incurred by you related to your
                    use of our mobile applications.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  4.2 Consulting and Development Services
                </h3>
                <div className="text-gray-600 space-y-4 mb-6">
                  <p>
                    When you engage Techlis for consulting or development
                    services, additional terms and conditions may apply as
                    specified in your service agreement or statement of work.
                  </p>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Service Levels and Deliverables:
                  </h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Service specifications, timelines, and deliverables will
                      be defined in individual service agreements
                    </li>
                    <li>
                      All project costs and payment terms will be specified in
                      written agreements
                    </li>
                    <li>
                      Intellectual property rights will be defined per
                      individual agreements
                    </li>
                  </ul>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Third-Party Services:
                  </h4>
                  <p>
                    Our services may involve or require access to third-party
                    platforms, services, or APIs (e.g., AWS, Azure, Google
                    Cloud, Apple App Store, Google Play Store). You are
                    responsible for complying with any third-party terms of
                    service.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  4.3 User Obligations
                </h3>
                <p className="text-gray-600 mb-4">
                  When using our Services, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>
                    Notify us immediately of any unauthorized use of your
                    account
                  </li>
                  <li>Use our Services only for lawful purposes</li>
                  <li>Not interfere with or disrupt our Services or servers</li>
                  <li>
                    Not attempt to gain unauthorized access to our systems or
                    networks
                  </li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </motion.div>

              {/* Intellectual Property */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  5. Intellectual Property
                </h2>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  5.1 Techlis Property
                </h3>
                <div className="text-gray-600 space-y-4 mb-6">
                  <p>
                    All content, software, technology, and materials provided
                    through our websites and mobile applications, including but
                    not limited to text, graphics, logos, icons, images, audio
                    clips, downloads, and software, are the exclusive property
                    of Techlis or its licensors and are protected by
                    international copyright, trademark, patent, trade secret,
                    and other intellectual property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, create derivative
                    works of, publicly display, publicly perform, republish,
                    download, store, or transmit any of our content without our
                    prior written consent, except as expressly permitted in
                    these Terms.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  5.2 Client Work Product
                </h3>
                <div className="text-gray-600 space-y-4 mb-6">
                  <p>
                    Intellectual property rights in custom work product created
                    for clients through our consulting and development services
                    shall be governed by individual service agreements. Unless
                    otherwise specified in a written agreement, Techlis retains
                    ownership of all:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pre-existing intellectual property</li>
                    <li>Frameworks, libraries, and reusable components</li>
                    <li>General methodologies and processes</li>
                    <li>Generic training materials and documentation</li>
                  </ul>
                  <p>
                    Clients retain ownership of their proprietary information,
                    specifications, and business data provided to us for project
                    purposes.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  5.3 Third-Party Content
                </h3>
                <p className="text-gray-600">
                  Our Services may include third-party content or links to
                  third-party websites. We do not control and are not
                  responsible for any third-party content. Your use of
                  third-party content is at your own risk and subject to the
                  third party's terms and conditions.
                </p>
              </motion.div>

              {/* User Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  6. User Content
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    You may be able to submit, upload, post, or otherwise make
                    available content through our Services ("User Content"). You
                    retain ownership of your User Content, but you grant Techlis
                    a non-exclusive, royalty-free, worldwide, transferable,
                    sub-licensable license to use, copy, modify, create
                    derivative works based upon, distribute, publicly display,
                    publicly perform, and otherwise exploit your User Content in
                    connection with operating and providing our Services.
                  </p>
                  <p>
                    You represent and warrant that your User Content does not
                    and will not violate any third-party rights, including
                    intellectual property rights, privacy rights, or publicity
                    rights, and is not otherwise unlawful or objectionable.
                  </p>
                  <p>
                    We reserve the right (but have no obligation) to remove,
                    edit, or modify any User Content that we determine violates
                    these Terms.
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Client Confidential Information
                  </h3>
                  <p>
                    When providing consulting services, we maintain strict
                    confidentiality of all client information and data. We will
                    not disclose your confidential information to third parties
                    without your consent, except as required by law.
                  </p>
                </div>
              </motion.div>

              {/* App Store and Platform Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  7. App Store and Platform Terms
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    When you download or use our mobile applications from
                    third-party platforms, you acknowledge that additional terms
                    from the platform provider may apply:
                  </p>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    7.1 Apple App Store
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-600">
                      If you downloaded our iOS application from Apple's App
                      Store, you acknowledge that:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>
                        Apple is not responsible for our mobile application or
                        its content
                      </li>
                      <li>
                        Your use of our iOS application must comply with Apple's
                        App Store Terms of Service
                      </li>
                      <li>
                        We, not Apple, are solely responsible for providing
                        support and maintenance for our iOS application
                      </li>
                      <li>
                        Apple shall have no obligation to provide any
                        maintenance and support services
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    7.2 Google Play Store
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-600">
                      If you downloaded our Android application from Google Play
                      Store, you acknowledge that:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>
                        Google is not responsible for our mobile application or
                        its content
                      </li>
                      <li>
                        Your use of our Android application must comply with
                        Google Play Terms of Service
                      </li>
                      <li>
                        We, not Google, are solely responsible for providing
                        support and maintenance for our Android application
                      </li>
                      <li>
                        Google shall have no obligation to provide any warranty
                        or support services
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    7.3 Platform Guidelines
                  </h3>
                  <p className="text-gray-600">
                    Our applications must comply with platform-specific
                    development guidelines, privacy policies, and content
                    policies. We reserve the right to modify our applications to
                    ensure compliance with platform requirements.
                  </p>
                </div>
              </motion.div>

              {/* Payment Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  8. Payment Terms
                </h2>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  8.1 Pricing and Payment
                </h3>
                <div className="text-gray-600 space-y-4 mb-6">
                  <p>
                    Prices for our consulting and development services are
                    quoted in the service agreement or statement of work. All
                    prices are exclusive of applicable taxes unless otherwise
                    specified.
                  </p>
                  <p>
                    Payment terms, schedules, and methods will be specified in
                    your service agreement. Late payments may incur interest
                    charges as specified in your agreement.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  8.2 In-App Purchases and Subscriptions
                </h3>
                <div className="text-gray-600 space-y-4 mb-6">
                  <p>
                    Our mobile applications may offer additional features,
                    content, or services through in-app purchases. All in-app
                    purchases are processed through the respective platform's
                    payment system (Apple App Store or Google Play Store).
                  </p>
                  <p>
                    <strong>Subscription Terms:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Subscriptions automatically renew unless canceled prior to
                      the renewal date
                    </li>
                    <li>Payment is charged through your platform account</li>
                    <li>
                      Subscriptions can be managed and cancelled through your
                      device settings
                    </li>
                    <li>
                      No refunds are provided for partially used subscription
                      periods
                    </li>
                    <li>
                      All pricing is subject to change with notice as required
                      by platform policies
                    </li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  8.3 Dispute Resolution
                </h3>
                <p className="text-gray-600">
                  Any billing disputes must be reported within 30 days of the
                  transaction date. For app store transactions, you must contact
                  the platform provider directly as we cannot process refunds
                  for platform-moderated transactions.
                </p>
              </motion.div>

              {/* Disclaimer and Limitation of Liability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  9. Disclaimer and Limitation of Liability
                </h2>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  9.1 Disclaimer of Warranties
                </h3>
                <div className="text-gray-600 space-y-4 mb-6">
                  <p>
                    OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                    WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING
                    BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
                    FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT.
                  </p>
                  <p>
                    WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED,
                    ERROR-FREE, VIRUS-FREE, OR SECURE, OR THAT ANY CONTENT WILL
                    BE ACCURATE, COMPLETE, OR RELIABLE. YOUR USE OF OUR SERVICES
                    IS AT YOUR OWN RISK.
                  </p>
                  <p>
                    FOR MOBILE APPLICATIONS, WE CANNOT GUARANTEE COMPATIBILITY
                    WITH ALL DEVICES OR OPERATING SYSTEM VERSIONS. APP STORE
                    AVAILABILITY AND FUNCTIONALITY MAY VARY BY REGION AND
                    DEVICE.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  9.2 Limitation of Liability
                </h3>
                <div className="text-gray-600 space-y-4 mb-6">
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, TECHLIS AND ITS
                    AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, SUPPLIERS, OR
                    LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                    SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES,
                    INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS,
                    GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES.
                  </p>
                  <p>
                    IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE GREATER OF:
                    (A) THE AMOUNT YOU PAID FOR THE SERVICES DURING THE SIX
                    MONTHS PRIOR TO THE CLAIM; OR (B) $1,000 USD.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  9.3 Applicability
                </h3>
                <p className="text-gray-600">
                  THESE LIMITATIONS APPLY EVEN IF TECHLIS HAS BEEN ADVISED OF
                  THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF THE LEGAL
                  THEORY ON WHICH ANY CLAIM IS BASED.
                </p>
              </motion.div>

              {/* Confidentiality and Non-Disclosure */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  10. Confidentiality and Non-Disclosure
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    During the course of providing services, Techlis may have
                    access to confidential information of clients and users. We
                    maintain strict confidentiality of all such information.
                  </p>
                  <p>
                    <strong>Confidential Information includes:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Business plans, strategies, and financial information
                    </li>
                    <li>Customer data and personal information</li>
                    <li>Software code, designs, and specifications</li>
                    <li>Proprietary processes and methodologies</li>
                    <li>Project documentation and requirements</li>
                  </ul>
                  <p>
                    We will not disclose confidential information except as
                    required by law or with your explicit consent. This
                    obligation continues even after termination of our services.
                  </p>
                </div>
              </motion.div>

              {/* Termination and Suspension */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  11. Termination and Suspension
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    We may terminate or suspend your access to our Services
                    immediately, without prior notice or liability, for any
                    reason, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Breach of these Terms of Service</li>
                    <li>Violation of applicable laws or regulations</li>
                    <li>Unauthorized access or use of our Services</li>
                    <li>Non-payment of fees when due</li>
                    <li>Request by law enforcement or government agencies</li>
                    <li>Discontinuation of our Services</li>
                  </ul>
                  <p>
                    Upon termination, your right to use the Services will
                    immediately cease. For consulting services, termination will
                    be governed by individual service agreements.
                  </p>
                  <p>
                    Sections that by their nature should survive termination
                    (including but not limited to intellectual property rights,
                    limitation of liability, indemnity, and governing law) shall
                    survive termination.
                  </p>
                </div>
              </motion.div>

              {/* Indemnification */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  12. Indemnification
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    You agree to defend, indemnify, and hold harmless Techlis
                    and its affiliates, and their respective officers,
                    directors, employees, and agents, from any claims,
                    liabilities, damages, losses, and expenses, including
                    reasonable attorneys' fees, arising out of or in any way
                    connected with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your access to or use of our Services</li>
                    <li>Your violation of these Terms of Service</li>
                    <li>
                      Your violation of any third-party rights, including
                      intellectual property rights
                    </li>
                    <li>Your violation of applicable laws or regulations</li>
                    <li>Your User Content or any content you submit</li>
                    <li>Your negligence, misconduct, or fraudulent acts</li>
                  </ul>
                  <p>
                    We reserve the right, at our own expense, to assume the
                    exclusive defense and control of any matter otherwise
                    subject to indemnification by you, and you agree to
                    cooperate with our defense of such claims.
                  </p>
                </div>
              </motion.div>

              {/* Governing Law and Jurisdiction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  13. Governing Law and Jurisdiction
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    These Terms of Service shall be governed by and construed in
                    accordance with the laws of the Province of British
                    Columbia, Canada, without regard to its conflict of law
                    provisions.
                  </p>
                  <p>
                    You agree to submit to the exclusive jurisdiction of the
                    courts located in Vancouver, British Columbia, Canada, for
                    any disputes arising out of or relating to these Terms of
                    Service or your use of our Services.
                  </p>
                  <p>
                    <strong>International Users:</strong> If you are using our
                    Services from outside Canada, you are responsible for
                    complying with local laws. These Terms do not limit any
                    consumer rights you may have under applicable laws.
                  </p>
                </div>
              </motion.div>

              {/* Dispute Resolution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  14. Dispute Resolution
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    <strong>Negotiation:</strong> Before initiating any formal
                    legal proceedings, you agree to first negotiate with us in
                    good faith for at least 30 days to resolve any dispute.
                    Please contact us at hello@techlis.com to initiate
                    negotiations.
                  </p>
                  <p>
                    <strong>Mediation:</strong> If negotiation fails, disputes
                    shall be submitted to non-binding mediation under the rules
                    of the British Columbia Mediator Roster Society.
                  </p>
                  <p>
                    <strong>Binding Arbitration:</strong> If mediation fails,
                    disputes shall be resolved by binding arbitration under the
                    Commercial Arbitration Rules of the ADR Institute of Canada,
                    Inc., to be held in Vancouver, British Columbia.
                  </p>
                  <p>
                    <strong>Exception:</strong> Nothing in this section prevents
                    either party from seeking injunctive relief or taking action
                    to stop actual or threatened infringement, misappropriation,
                    or violation of intellectual property rights.
                  </p>
                </div>
              </motion.div>

              {/* Severability and Waiver */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  15. Severability and Waiver
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    <strong>Severability:</strong> If any provision of these
                    Terms of Service is found to be unenforceable or invalid
                    under any applicable law, such unenforceability or
                    invalidity shall not render these Terms unenforceable or
                    invalid as a whole. The unenforceable or invalid provision
                    will be replaced with a valid and enforceable provision that
                    most closely matches the intent of the original provision.
                  </p>
                  <p>
                    <strong>Waiver:</strong> No waiver of any term or condition
                    set forth herein shall be deemed a further or continuing
                    waiver of such term or condition or a waiver of any other
                    term or condition, and any failure of Techlis to assert a
                    right or provision under these Terms shall not constitute a
                    waiver of such right or provision.
                  </p>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="bg-gray-50 rounded-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-gray-600" />
                  Contact Information
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    <strong>Legal Department:</strong>
                    <br />
                    Techlis Legal Team
                    <br />
                    Email:{" "}
                    <a
                      href="mailto:hello@techlis.com"
                      className="text-primary-600 hover:underline"
                    >
                      hello@techlis.com
                    </a>
                  </p>

                  <p>
                    <strong>Mailing Address:</strong>
                    <br />
                    Techlis
                    <br />
                    Attention: Legal Department
                    <br />
                    Vancouver, BC
                    <br />
                    Canada
                  </p>

                  <p>
                    <strong>Response Time:</strong> We aim to respond to all
                    legal inquiries within 10 business days of receiving your
                    correspondence.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg mt-6">
                    <p className="text-sm text-blue-800">
                      <strong>Important:</strong> For privacy-related inquiries,
                      please contact our Privacy Team at{" "}
                      <a
                        href="mailto:hello@techlis.com"
                        className="text-blue-600 hover:underline"
                      >
                        hello@techlis.com
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Entire Agreement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  16. Entire Agreement
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    These Terms of Service, together with our Privacy Policy and
                    any additional agreements you enter into with us, constitute
                    the entire agreement between you and Techlis regarding your
                    use of our Services and supersede all prior or
                    contemporaneous communications and proposals (whether oral,
                    written, or electronic).
                  </p>
                  <p>
                    Any ambiguities in the interpretation of these Terms shall
                    not be construed against the drafting party.
                  </p>
                  <p>
                    These Terms may be translated into other languages for
                    convenience. In case of any inconsistency or discrepancy
                    between the English version and any translated version, the
                    English version shall prevail.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-gray-800 via-blue-900 to-purple-900">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-8 max-w-4xl mx-auto"
            >
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                Ready to Get Started?
              </Badge>

              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Let's Work
                <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  {" "}
                  Together
                </span>
              </h2>

              <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                Ready to transform your business with AI and cutting-edge
                technology solutions? Contact us to discuss your project
                requirements.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="xl"
                  variant="luxury"
                  className="group shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40"
                  asChild
                >
                  <Link to="/contact">
                    Get Started Today
                    <Mail className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  asChild
                >
                  <a href="mailto:hello@techlis.com">
                    Contact Legal Team
                    <Mail className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Terms
export { Terms }
