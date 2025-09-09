import type { JSX } from "react"
import { useState, useEffect } from "react"
import { Sparkles, Target, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ServicesGrid, ServicesCTA } from "@/components/services"
import type { Service } from "@/types"
import servicesData from "@/content/data/services.json"

export function Services(): JSX.Element {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading state for better UX
    const loadServices = async () => {
      try {
        setIsLoading(true)
        // Small delay to show loading state
        await new Promise((resolve) => setTimeout(resolve, 300))
        setServices(servicesData as Service[])
      } catch (err) {
        setError("Failed to load services. Please try again later.")
        console.error("Error loading services:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  const handleCTAClick = () => {
    // Analytics or other tracking can be added here
    console.log("Services CTA clicked")
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <Badge
                variant="luxury"
                className="px-4 py-2 text-sm font-semibold"
              >
                <Sparkles className="size-4 mr-2" />
                Enterprise Solutions
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
                Services
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your business with our comprehensive suite of AI-powered
              solutions, cloud architecture, and cutting-edge development
              services designed for enterprise scale.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {[
                { number: "50+", label: "Projects Delivered" },
                { number: "99.9%", label: "Uptime Guarantee" },
                { number: "24/7", label: "Support Available" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex justify-center mb-4">
              <Badge variant="outline" className="px-3 py-1">
                <Zap className="size-4 mr-2" />
                What We Offer
              </Badge>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-lg text-gray-600">
              From AI development to cloud architecture, we provide end-to-end
              solutions that drive innovation and accelerate your digital
              transformation.
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-96 bg-gray-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
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
  )
}
