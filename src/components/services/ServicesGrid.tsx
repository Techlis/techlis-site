import type { JSX } from "react"
import type { ServicesGridProps } from "@/types"
import { ServiceCard } from "./ServiceCard"
import { cn } from "@/lib/utils"

export function ServicesGrid({ services }: ServicesGridProps): JSX.Element {
  return (
    <div className="w-full">
      {/* Grid container with responsive breakpoints */}
      <div
        className={cn(
          "grid gap-8",
          // Mobile: 1 column
          "grid-cols-1",
          // Tablet: 2 columns
          "md:grid-cols-2",
          // Desktop: 3 columns
          "lg:grid-cols-3",
          // Large screens: maintain 3 columns with better spacing
          "xl:gap-10"
        )}
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            className="h-full" // Ensure cards stretch to equal height
          />
        ))}
      </div>

      {/* Empty state - if no services */}
      {services.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Services Available
            </h3>
            <p className="text-gray-600">
              Services will be displayed here once they are added to the system.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
