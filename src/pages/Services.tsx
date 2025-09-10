import React, { useState, useEffect } from "react"
import { Sparkles, Target, Zap } from "lucide-react"
import { Badge, ServiceGridSkeleton, useToast } from "@/components/ui"
import { ServicesGrid, ServicesCTA } from "@/components/services"
import { ServicesErrorBoundary, SEOHead } from "@/components/common"
import { generatePageSEO, generateServicesListStructuredData } from "@/lib/seo"
import type { Service } from "@/types"
import type { JSX } from "react"
import servicesData from "@/content/data/services.json"

function Services(): JSX.Element {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { error: showError } = useToast()

  // Generate SEO data with services structured data
  const seoData = React.useMemo(() => {
    const baseSEO = generatePageSEO("services")
    return {
      ...baseSEO,
      structuredData:
        services.length > 0
          ? generateServicesListStructuredData(services)
          : generateServicesListStructuredData(servicesData as Service[]),
    }
  }, [services])

  useEffect(() => {
    // Load services data immediately without unnecessary delay or toast
    const loadServices = async () => {
      try {
        setIsLoading(true)
        setServices(servicesData as Service[])
      } catch (err) {
        setError("Failed to load services. Please try again later.")
        showError("Failed to load services. Please try again later.")
        console.error("Error loading services:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [showError])

  const handleCTAClick = () => {
    // Analytics or other tracking can be added here
    console.log("Services CTA clicked")
  }

  const handleRetry = () => {
    setError(null)
    setIsLoading(true)
    // Reload the page to reset state
    window.location.reload()
  }

  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.error("Services page error:", error, errorInfo)
    // In production, send to error reporting service
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <Target className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <ServicesErrorBoundary
      fallbackServices={servicesData as Service[]}
      onError={handleError}
      onRetry={handleRetry}
    >
      <SEOHead seoData={seoData} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white"
          aria-labelledby="services-hero-title"
        >
          {/* Background decoration */}
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative container mx-auto mobile-padding section-padding">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <Badge
                  variant="luxury"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold"
                >
                  <Sparkles className="size-3 sm:size-4 mr-1.5 sm:mr-2" />
                  Enterprise Solutions
                </Badge>
              </div>

              {/* Title */}
              <h1
                id="services-hero-title"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2"
              >
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
                  Services
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                Transform your business with our comprehensive suite of
                AI-powered solutions, cloud architecture, and cutting-edge
                development services designed for enterprise scale.
              </p>

              {/* Stats */}
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 max-w-2xl mx-auto"
                role="region"
                aria-label="Company statistics"
              >
                {[
                  { number: "50+", label: "Projects Delivered" },
                  { number: "99.9%", label: "Uptime Guarantee" },
                  { number: "24/7", label: "Support Available" },
                ].map((stat, index) => (
                  <div key={index} className="text-center py-2">
                    <div
                      className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1"
                      aria-label={`${stat.number} ${stat.label}`}
                    >
                      {stat.number}
                    </div>
                    <div
                      className="text-xs sm:text-sm text-gray-600"
                      aria-hidden="true"
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section
          className="section-padding"
          aria-labelledby="services-grid-title"
        >
          <div className="container mx-auto mobile-padding">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <div className="flex justify-center mb-3 sm:mb-4">
                <Badge
                  variant="outline"
                  className="px-2.5 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm"
                  role="img"
                  aria-label="Services section"
                >
                  <Zap
                    className="size-3 sm:size-4 mr-1.5 sm:mr-2"
                    aria-hidden="true"
                  />
                  What We Offer
                </Badge>
              </div>
              <h2
                id="services-grid-title"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2"
              >
                Comprehensive Technology Solutions
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">
                From AI development to cloud architecture, we provide end-to-end
                solutions that drive innovation and accelerate your digital
                transformation.
              </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <ServiceGridSkeleton count={6} />
            ) : (
              <ServicesGrid services={services} />
            )}
          </div>
        </section>

        {/* CTA Section */}
        <ServicesCTA
          title="Need a Custom Solution?"
          description="Every business is unique. Let's discuss how we can create a tailored solution that perfectly fits your specific requirements and goals."
          buttonText="Get Free Consultation"
          onButtonClick={handleCTAClick}
        />
      </div>
    </ServicesErrorBoundary>
  )
}
export default Services
export { Services }
