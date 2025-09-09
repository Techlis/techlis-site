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

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50/50",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <IconComponent className="size-6" />
          </div>
          <Badge variant="luxury" className="text-xs font-semibold">
            {service.pricing}
          </Badge>
        </div>

        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
          {service.title}
        </CardTitle>

        <p className="text-gray-600 text-sm leading-relaxed mt-2">
          {service.description}
        </p>
      </CardHeader>

      <CardContent className="relative space-y-6">
        {/* Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">
            Key Features
          </h4>
          <ul className="space-y-2">
            {service.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="size-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
            {service.features.length > 4 && (
              <li className="text-xs text-gray-500 ml-6">
                +{service.features.length - 4} more features
              </li>
            )}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {service.technologies.slice(0, 4).map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
              >
                {tech}
              </Badge>
            ))}
            {service.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{service.technologies.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative pt-0">
        <Button
          variant="outline"
          className="w-full group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300"
        >
          Learn More
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardFooter>
    </Card>
  )
}
