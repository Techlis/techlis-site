import type { JSX } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, MessageCircle, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ServicesCTAProps } from "@/types"

export function ServicesCTA({
  title,
  description,
  buttonText,
  onButtonClick,
}: ServicesCTAProps): JSX.Element {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600" />

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge
              variant="luxury"
              className="px-4 py-2 text-sm font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-sm"
            >
              <Sparkles className="size-4 mr-2" />
              Custom Solutions Available
            </Badge>
          </div>

          {/* Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Features list */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              "Free Consultation",
              "Custom Pricing",
              "Dedicated Team",
              "24/7 Support",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
              >
                <Star className="size-4 text-amber-400 fill-current" />
                <span className="text-white text-sm font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-50 hover:scale-105 shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold"
              onClick={onButtonClick}
            >
              <Link to="/contact">
                <MessageCircle className="size-5 mr-2" />
                {buttonText}
                <ArrowRight className="size-5 ml-2" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <Link to="/contact">
                View Portfolio
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/70 text-sm mb-4">
              Trusted by innovative companies worldwide
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {/* Placeholder for company logos */}
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-24 h-8 bg-white/20 rounded backdrop-blur-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
