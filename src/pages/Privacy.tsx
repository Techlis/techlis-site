import { motion } from "framer-motion"
import { Badge, Button } from "@/components/ui"
import { SEOHead } from "@/components/common"
import { Link } from "react-router-dom"
import { generatePageSEO } from "@/lib/seo"
import { COMPANY_DATA } from "@/lib/constants"
import { Shield, Mail, Calendar } from "lucide-react"
import type { JSX } from "react"

function Privacy(): JSX.Element {
  const seoData = generatePageSEO("privacy")

  return (
    <>
      <SEOHead seoData={seoData} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div data-testid="mobile-padding" className="container mobile-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto"
            >
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 px-3 py-1.5 text-xs sm:text-sm"
              >
                <Shield className="w-4 h-4 mr-2 inline" />
                Privacy Policy
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight px-2">
                Your Privacy is Our
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Priority
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-2">
                Techlis is committed to protecting your privacy and ensuring the
                security of your personal data. This Privacy Policy explains how
                we collect, use, and safeguard your information.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="section-padding">
          <div data-testid="mobile-padding" className="container mobile-padding">
            <div className="max-w-3xl mx-auto space-y-12">
              {/* Last Updated */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <Calendar className="w-6 h-6 text-gray-500 mx-auto mb-3" />
                <p className="text-sm text-gray-600">
                  <strong>Last Updated:</strong> September 10, 2025
                </p>
              </motion.div>

              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Introduction
                </h2>
                <div className="text-gray-600 space-y-4">
                  <p>
                    Welcome to Techlis ({COMPANY_DATA.name}). We are committed
                    to protecting your personal information and your right to
                    privacy. This Privacy Policy applies to our website
                    (techlis.com), mobile applications, and services across the
                    globe.
                  </p>
                  <p>
                    When you visit our website, use our mobile applications, or
                    engage our consulting and development services, you trust us
                    with your personal information. We take your privacy very
                    seriously. This Privacy Policy explains what information we
                    collect, how we use it, and what rights you have in relation
                    to it.
                  </p>
                </div>
              </motion.div>

              {/* Information We Collect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Information We Collect
                </h2>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Personal Information
                </h3>
                <p className="text-gray-600 mb-4">
                  We collect personal information that you voluntarily provide
                  to us when you:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li>Register on our website or mobile applications</li>
                  <li>Contact us through forms, email, or chat</li>
                  <li>Request a consultation or quote for our services</li>
                  <li>
                    Sign up for our newsletter or marketing communications
                  </li>
                  <li>Use our mobile applications (iOS/Android)</li>
                  <li>Engage our consulting or development services</li>
                </ul>

                <p className="text-gray-600 mb-4">
                  The personal information we collect may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li>
                    <strong>Identity Data:</strong> First name, last name,
                    username or similar identifier, title, date of birth
                  </li>
                  <li>
                    <strong>Contact Data:</strong> Email address, telephone
                    numbers, mailing address, company name
                  </li>
                  <li>
                    <strong>Technical Data:</strong> Internet protocol (IP)
                    address, login data, browser type and version, time zone
                    setting and location, browser plug-in types and versions,
                    operating system and platform, and other technology on the
                    devices you use to access our services
                  </li>
                  <li>
                    <strong>Usage Data:</strong> How you use our website,
                    products and services
                  </li>
                  <li>
                    <strong>Marketing and Communications Data:</strong> Your
                    preferences in receiving marketing from us and your
                    communication preferences
                  </li>
                  <li>
                    <strong>Business Data:</strong> Information about your
                    projects, requirements, and specifications when engaging our
                    services
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Mobile App Data
                </h3>
                <p className="text-gray-600 mb-4">
                  When you use our mobile applications on iOS or Android, we may
                  collect:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li>
                    Device information (model, operating system version, unique
                    device identifiers)
                  </li>
                  <li>App usage analytics and crash reports</li>
                  <li>Location data (if you grant permission)</li>
                  <li>Push notification tokens</li>
                  <li>In-app purchase history</li>
                </ul>
              </motion.div>

              {/* How We Use Your Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-gray-600 mb-4">
                  We use your personal information for the following purposes:
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Service Delivery
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li>
                    To deliver and fulfill our services, including AI
                    development, cloud architecture, web/mobile development, and
                    consulting
                  </li>
                  <li>
                    To manage your relationship with us, including billing and
                    account management
                  </li>
                  <li>
                    To provide customer support and respond to your inquiries
                  </li>
                  <li>To deliver personalized content and recommendations</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Mobile App Functionality
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li>To provide app functionality and features</li>
                  <li>To send push notifications (with your consent)</li>
                  <li>To improve app performance and user experience</li>
                  <li>To process in-app purchases and subscriptions</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Business Operations
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li>To improve our website, applications, and services</li>
                  <li>To conduct analytics and research</li>
                  <li>
                    To communicate with you about changes to our services,
                    terms, or policies
                  </li>
                  <li>To detect and prevent fraud and abuse</li>
                  <li>To comply with legal obligations</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Marketing
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    To send you marketing communications (with your consent)
                  </li>
                  <li>
                    To personalize your experience and deliver targeted
                    advertising
                  </li>
                  <li>
                    To measure the effectiveness of our marketing campaigns
                  </li>
                </ul>
              </motion.div>

              {/* Lawful Basis for Processing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Lawful Basis for Processing
                </h2>
                <p className="text-gray-600 mb-4">
                  We process your personal information under the following legal
                  bases:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Contract:</strong> Processing is necessary for the
                    performance of a contract with you or to take steps at your
                    request before entering into a contract
                  </li>
                  <li>
                    <strong>Legitimate Interests:</strong> Processing is
                    necessary for our legitimate interests in running our
                    business, provided your rights don't override these
                    interests
                  </li>
                  <li>
                    <strong>Consent:</strong> You have given clear consent for
                    us to process your personal data for specific purposes (such
                    as marketing)
                  </li>
                  <li>
                    <strong>Legal Obligation:</strong> Processing is necessary
                    for compliance with a legal obligation to which we are
                    subject
                  </li>
                </ul>
              </motion.div>

              {/* Data Sharing and Third Parties */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Data Sharing and Third Parties
                </h2>
                <p className="text-gray-600 mb-4">
                  We do not sell your personal information. We may share your
                  information with:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li>
                    <strong>Service Providers:</strong> Third-party vendors who
                    provide services on our behalf (payment processing, cloud
                    hosting, analytics, email delivery)
                  </li>
                  <li>
                    <strong>App Stores:</strong> Apple App Store and Google Play
                    Store for app distribution and in-app purchases
                  </li>
                  <li>
                    <strong>Business Partners:</strong> Partners with whom we
                    collaborate to provide services
                  </li>
                  <li>
                    <strong>Legal Authorities:</strong> When required by law or
                    to protect our legal rights
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with any
                    merger, sale of company assets, financing, or acquisition of
                    all or a portion of our business
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  App Store Data
                </h3>
                <p className="text-gray-600 mb-4">
                  When you download our mobile applications, some data may be
                  processed by:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Apple Inc. (for iOS apps and in-app purchases)</li>
                  <li>Google LLC (for Android apps and in-app purchases)</li>
                  <li>Analytics providers (with your consent)</li>
                </ul>
              </motion.div>

              {/* International Transfers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  International Data Transfers
                </h2>
                <p className="text-gray-600 mb-4">
                  We operate globally with offices in Vancouver, BC (Canada) and
                  Ho Chi Minh City (Vietnam). Your personal information may be
                  transferred to and processed in countries outside of your
                  jurisdiction, including Canada and Vietnam.
                </p>
                <p className="text-gray-600">
                  We ensure appropriate safeguards are in place for
                  international transfers, including standard contractual
                  clauses approved by the European Commission and other
                  appropriate mechanisms to protect your data.
                </p>
              </motion.div>

              {/* Data Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Data Security
                </h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure development practices for our applications</li>
                  <li>Regular backups and disaster recovery procedures</li>
                  <li>Employee training on data protection</li>
                  <li>Vendor security assessments</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Mobile App Security
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>App Store security review processes</li>
                  <li>Secure communication with our servers (HTTPS/TLS)</li>
                  <li>Local data encryption on mobile devices</li>
                  <li>Biometric authentication where supported</li>
                  <li>Regular security updates and patches</li>
                </ul>
              </motion.div>

              {/* Data Retention */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Data Retention
                </h2>
                <p className="text-gray-600 mb-4">
                  We retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this policy:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Client Data:</strong> Retained for the duration of
                    our business relationship plus 7 years for legal and
                    accounting purposes
                  </li>
                  <li>
                    <strong>Marketing Data:</strong> Retained until you
                    unsubscribe or request deletion
                  </li>
                  <li>
                    <strong>Mobile App Data:</strong> Retained while you
                    maintain an active account or as needed for app
                    functionality
                  </li>
                  <li>
                    <strong>Analytics Data:</strong> Retained for 26 months
                    typically
                  </li>
                </ul>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Your Rights
                </h2>
                <p className="text-gray-600 mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li>
                    <strong>Right to Access:</strong> Request a copy of your
                    personal data
                  </li>
                  <li>
                    <strong>Right to Rectification:</strong> Correct inaccurate
                    or incomplete data
                  </li>
                  <li>
                    <strong>Right to Erasure:</strong> Request deletion of your
                    data (right to be forgotten)
                  </li>
                  <li>
                    <strong>Right to Restrict Processing:</strong> Limit how we
                    use your data
                  </li>
                  <li>
                    <strong>Right to Data Portability:</strong> Receive your
                    data in a structured, machine-readable format
                  </li>
                  <li>
                    <strong>Right to Object:</strong> Object to certain types of
                    processing
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> Withdraw consent
                    at any time where processing is based on consent
                  </li>
                  <li>
                    <strong>Right to Lodge a Complaint:</strong> File a
                    complaint with your local data protection authority
                  </li>
                </ul>

                <p className="text-gray-600">
                  To exercise these rights, contact us at{" "}
                  <a
                    href="mailto:hello@techlis.com"
                    className="text-primary-600 hover:underline"
                  >
                    hello@techlis.com
                  </a>
                </p>
              </motion.div>

              {/* Children's Privacy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Children's Privacy
                </h2>
                <p className="text-gray-600">
                  Our website, applications, and services are not intended for
                  children under 13 years of age. We do not knowingly collect
                  personal information from children under 13. If we discover
                  that we have collected personal information from a child under
                  13, we will promptly delete that information.
                </p>
              </motion.div>

              {/* Cookies and Tracking Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-gray-600 mb-4">
                  We use cookies, web beacons, and similar technologies to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    Remember your preferences and personalize your experience
                  </li>
                  <li>Analyze site traffic and user behavior</li>
                  <li>Deliver targeted advertising</li>
                  <li>Improve our website and services</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  You can control cookie settings through your browser
                  preferences. Mobile app users can manage tracking preferences
                  in their device settings or app permissions.
                </p>
              </motion.div>

              {/* Third-Party Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Third-Party Services
                </h2>
                <p className="text-gray-600 mb-4">
                  Our website and applications may contain links to third-party
                  websites, plug-ins, and applications. We also use third-party
                  services for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Analytics and performance monitoring</li>
                  <li>Payment processing and billing</li>
                  <li>Customer support and communication</li>
                  <li>Marketing and advertising</li>
                  <li>Hosting and infrastructure</li>
                </ul>
                <p className="text-gray-600">
                  Clicking on those links or enabling those connections may
                  allow third parties to collect or share data about you. We do
                  not control these third-party websites and are not responsible
                  for their privacy statements. Please consult the privacy
                  policies of any third-party services you access through our
                  platforms.
                </p>
              </motion.div>

              {/* Changes to This Policy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-gray-600 mb-4">
                  We may update this Privacy Policy from time to time in
                  response to changing legal, technical, or business
                  developments. When we update our policy, we will:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>
                    Post the updated policy on this page with a new "Last
                    Updated" date
                  </li>
                  <li>
                    Notify you via email or prominent notice if changes are
                    significant
                  </li>
                  <li>Request your consent if required by applicable law</li>
                </ul>
                <p className="text-gray-600">
                  We encourage you to review this Privacy Policy periodically to
                  stay informed about how we are protecting your information.
                </p>
              </motion.div>

              {/* Contact Us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="bg-blue-50 rounded-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-blue-600" />
                  Contact Us
                </h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us:
                </p>

                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>Data Protection Officer:</strong>
                    <br />
                    Techlis Privacy Team
                    <br />
                    Mail:{" "}
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
                    Attention: Privacy Team
                    <br />
                    Vancouver, BC
                    <br />
                    Canada
                  </p>

                  <p>
                    <strong>Response Time:</strong> We aim to respond to all
                    privacy-related inquiries within 30 days of receiving your
                    request.
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-blue-200">
                  <p className="text-sm text-gray-500">
                    If you have any concerns about our use of your personal
                    information, you have the right to make a complaint to your
                    local data protection authority. We would, however,
                    appreciate the chance to deal with your concerns before you
                    approach the authorities.
                  </p>
                </div>
              </motion.div>

              {/* Jurisdiction-Specific Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Jurisdiction-Specific Rights
                </h2>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  California Residents (CCPA)
                </h3>
                <p className="text-gray-600 mb-4">
                  California residents have additional rights under the
                  California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li>
                    Right to know what personal information is collected, used,
                    shared, or sold
                  </li>
                  <li>
                    Right to delete personal information held by businesses
                  </li>
                  <li>Right to opt-out of the sale of personal information</li>
                  <li>
                    Right to non-discrimination for exercising CCPA rights
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  EU Residents (GDPR)
                </h3>
                <p className="text-gray-600 mb-4">
                  EU residents have rights under the General Data Protection
                  Regulation (GDPR) as outlined above. We process personal data
                  lawfully, fairly, and transparently.
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Canadian Residents (PIPEDA)
                </h3>
                <p className="text-gray-600">
                  Canadian residents are protected under the Personal
                  Information Protection and Electronic Documents Act (PIPEDA).
                  We obtain consent for collection, use, and disclosure of
                  personal information.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
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
                Have Questions?
              </Badge>

              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                We're Here to
                <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  {" "}
                  Help
                </span>
              </h2>

              <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                If you have any questions about our privacy practices or need
                assistance, don't hesitate to reach out to our privacy team.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="xl"
                  variant="luxury"
                  className="group shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40"
                  asChild
                >
                  <Link to="/contact">
                    Contact Privacy Team
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
                    <Mail className="mr-2 h-5 w-5" />
                    Email Directly
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

export default Privacy
export { Privacy }
