import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Button, Badge, AboutSectionSkeleton, useToast } from "@/components/ui"
import {
  CompanyInfo,
  // FounderProfile,
  TeamStructure,
} from "@/components/sections"
import { AboutErrorBoundary, SEOHead } from "@/components/common"
import { generatePageSEO } from "@/lib/seo"
import { COMPANY_DATA } from "@/lib/constants"
import type { JSX } from "react"

function About(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState(true)
  const { error: showError } = useToast()

  const seoData = generatePageSEO("about")

  React.useEffect(() => {
    // Load company data immediately without unnecessary delay or toast
    const loadCompanyData = () => {
      try {
        setIsLoading(true)
        // Data is already available, no need for async loading
        setIsLoading(false)
      } catch (err) {
        showError("Failed to load company information")
        console.error("Error loading company data:", err)
        setIsLoading(false)
      }
    }

    loadCompanyData()
  }, [showError])

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error("About page error:", error, errorInfo)
    showError("An error occurred while loading the page")
    // In production, send to error reporting service
  }

  const handleRetry = () => {
    // Reload the page to reset state
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container">
            <AboutSectionSkeleton />
          </div>
        </section>
      </div>
    )
  }

  return (
    <AboutErrorBoundary
      fallbackCompanyData={COMPANY_DATA}
      onError={handleError}
      onRetry={handleRetry}
    >
      <SEOHead seoData={seoData} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          className="section-padding bg-gradient-to-br from-blue-50 via-white to-purple-50"
          aria-labelledby="about-hero-title"
        >
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
                role="img"
                aria-label="About section"
              >
                About Techlis
              </Badge>
              <h1
                id="about-hero-title"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight px-2"
              >
                Transforming Ideas Into{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered Solutions
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-2">
                Since {COMPANY_DATA.established}, we've been at the forefront of
                AI innovation, helping businesses harness the power of
                artificial intelligence to drive growth, efficiency, and
                competitive advantage.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Background */}
        <section className="section-padding">
          <div data-testid="mobile-padding" className="container mobile-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 px-2">
                Our Story
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
                Founded with a vision to democratize AI technology, Techlis
                bridges the gap between cutting-edge artificial intelligence and
                practical business solutions. We believe that every
                organization, regardless of size, should have access to the
                transformative power of AI.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <CompanyInfo
                mission={COMPANY_DATA.mission}
                vision={COMPANY_DATA.vision}
                values={COMPANY_DATA.values}
              />
            </motion.div>
          </div>
        </section>

        {/* Founder Profile */}
        {/* <section className="section-padding bg-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <FounderProfile founder={COMPANY_DATA.founder} />
            </motion.div>
          </div>
        </section> */}

        {/* Team Structure */}
        <section className="section-padding">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <TeamStructure teamInfo={COMPANY_DATA.team} />
            </motion.div>
          </div>
        </section>

        {/* Unique Value Proposition */}
        <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-8 max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                What Makes Us Different
              </h2>

              <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Innovation First
                  </h3>
                  <p className="text-gray-600">
                    We stay ahead of the curve, constantly exploring and
                    implementing the latest AI technologies and methodologies.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Partnership Approach
                  </h3>
                  <p className="text-gray-600">
                    We don't just deliver solutions; we become your long-term
                    technology partner, growing alongside your business.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Rapid Delivery
                  </h3>
                  <p className="text-gray-600">
                    Our hybrid team structure enables us to deliver high-quality
                    solutions faster without compromising on excellence.
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-lg text-gray-600 mb-6">
                  <strong>Global Presence:</strong> With offices in{" "}
                  {COMPANY_DATA.locations.join(", ")}, we combine local
                  expertise with global reach.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-8 max-w-4xl mx-auto"
            >
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                Ready to Work Together?
              </Badge>

              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Let's Build Something{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                  Amazing
                </span>
              </h2>

              <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                Ready to transform your business with AI? Let's discuss your
                project and explore how we can help you achieve your goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="xl"
                    variant="luxury"
                    className="group shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40"
                    asChild
                  >
                    <Link to="/contact">
                      Get Started Today
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="xl"
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                    asChild
                  >
                    <Link to="/contact">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Schedule a Call
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </AboutErrorBoundary>
  )
}
export default About
export { About }
