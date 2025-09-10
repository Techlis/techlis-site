import * as React from "react"
import { AlertTriangle, RefreshCw, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "./ErrorBoundary"
import type { Service } from "@/types"

interface ServicesErrorFallbackProps {
  error?: Error
  errorInfo?: React.ErrorInfo
  onRetry?: () => void
  onGoHome?: () => void
  className?: string
  fallbackServices?: Service[]
}

function ServicesErrorFallback({
  onRetry,
  onGoHome,
  className,
  fallbackServices,
}: ServicesErrorFallbackProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            Services Temporarily Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-4">
            We're having trouble loading our services information. This might be
            due to a temporary issue with our data source.
          </p>

          <div className="flex gap-2 flex-wrap">
            {onRetry && (
              <Button
                variant="outline"
                onClick={onRetry}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Services
              </Button>
            )}

            {onGoHome && (
              <Button
                variant="default"
                onClick={onGoHome}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Settings className="w-4 h-4 mr-2" />
                View Other Pages
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {fallbackServices && fallbackServices.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Available Services (Cached)
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fallbackServices.map((service) => (
              <Card key={service.id} className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-800">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-700 text-sm mb-2">
                    {service.description}
                  </p>
                  <p className="text-yellow-600 text-xs">
                    This is cached information and may not be up to date.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {(!fallbackServices || fallbackServices.length === 0) && (
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Services Information Unavailable
              </h3>
              <p className="text-gray-600 mb-4">
                Please contact us directly to learn about our services:
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• AI & Machine Learning Solutions</p>
                <p>• Cloud Architecture & DevOps</p>
                <p>• Web & Mobile Development</p>
                <p>• Technology Consulting</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface ServicesErrorBoundaryProps {
  children: React.ReactNode
  fallbackServices?: Service[]
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  onRetry?: () => void
  className?: string
}

export function ServicesErrorBoundary({
  children,
  fallbackServices,
  onError,
  onRetry,
  className,
}: ServicesErrorBoundaryProps) {
  const handleGoHome = () => {
    window.location.href = "/"
  }

  return (
    <ErrorBoundary
      onError={onError}
      onRetry={onRetry}
      className={className}
      fallbackComponent={(props) => (
        <ServicesErrorFallback
          {...props}
          fallbackServices={fallbackServices}
          onGoHome={handleGoHome}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
