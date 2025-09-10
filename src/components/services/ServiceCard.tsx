import type { JSX } from "react"
import {
  Brain,
  Cloud,
  Globe,
  Smartphone,
  Target,
  Database,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ServiceCardProps } from "@/types"
import { cn } from "@/lib/utils"
import { handleKeyboardNavigation } from "@/lib/accessibility"

// Icon mapping for services
const iconMap = {
  Brain,
  Cloud,
  Globe,
  Smartphone,
  Target,
  Database,
} as const

export function ServiceCard({
  service,
  className,
}: ServiceCardProps): JSX.Element {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Target

  const handleCardClick = () => {
    // Handle service card interaction
    console.log(`Service card clicked: ${service.title}`)
  }

  const handleCardKeyDown = (event: React.KeyboardEvent) => {
    handleKeyboardNavigation(event, handleCardClick)
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20 sm:hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50/50 touch-target focus-visible-ring cursor-pointer",
        className
      )}
      role="article"
      aria-labelledby={`service-title-${service.id}`}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />

      <CardHeader className="relative p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div
            className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg group-hover:shadow-xl sm:group-hover:scale-110 transition-all duration-300"
            aria-hidden="true"
          >
            <IconComponent className="size-5 sm:size-6" />
          </div>
          <Badge
            variant="luxury"
            className="text-xs font-semibold px-2 py-1"
            aria-label={`Pricing: ${service.pricing}`}
          >
            {service.pricing}
          </Badge>
        </div>

        <CardTitle
          id={`service-title-${service.id}`}
          className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300"
        >
          {service.title}
        </CardTitle>

        <p className="text-gray-600 text-sm leading-relaxed mt-2">
          {service.description}
        </p>
      </CardHeader>

      <CardContent className="relative space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
        {/* Features */}
        <div>
          <h4
            className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm"
            id={`features-${service.id}`}
          >
            Key Features
          </h4>
          <ul
            className="space-y-1.5 sm:space-y-2"
            aria-labelledby={`features-${service.id}`}
          >
            {service.features.slice(0, 4).map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs sm:text-sm"
              >
                <CheckCircle
                  className="size-3.5 sm:size-4 text-green-500 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-gray-700 leading-relaxed">{feature}</span>
              </li>
            ))}
            {service.features.length > 4 && (
              <li
                className="text-xs text-gray-500 ml-5 sm:ml-6"
                aria-label={`${service.features.length - 4} additional features available`}
              >
                +{service.features.length - 4} more features
              </li>
            )}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <h4
            className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm"
            id={`technologies-${service.id}`}
          >
            Technologies
          </h4>
          <div
            className="flex flex-wrap gap-1 sm:gap-1.5"
            role="list"
            aria-labelledby={`technologies-${service.id}`}
          >
            {service.technologies.slice(0, 4).map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                role="listitem"
              >
                {tech}
              </Badge>
            ))}
            {service.technologies.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs px-1.5 py-0.5 sm:px-2 sm:py-1"
                role="listitem"
                aria-label={`${service.technologies.length - 4} additional technologies`}
              >
                +{service.technologies.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative pt-0 p-4 sm:p-6">
        <Button
          variant="outline"
          className="w-full touch-button group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300 text-sm"
          onClick={() => {
            window.location.href = `/contact?service=${service.id}`
          }}
        >
          Learn More
          <ArrowRight className="size-3.5 sm:size-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardFooter>
    </Card>
  )
}
