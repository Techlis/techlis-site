import * as React from "react"
import { AlertTriangle, RefreshCw, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "./ErrorBoundary"
import type { CompanyData } from "@/types"

interface AboutErrorFallbackProps {
  error?: Error
  errorInfo?: React.ErrorInfo
  onRetry?: () => void
  onGoHome?: () => void
  className?: string
  fallbackCompanyData?: Partial<CompanyData>
}

function AboutErrorFallback({
  error,
  errorInfo,
  onRetry,
  onGoHome,
  className,
  fallbackCompanyData,
}: AboutErrorFallbackProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            About Information Temporarily Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-4">
            We're having trouble loading our company information. This might be
            due to a temporary issue with our content system.
          </p>

          <div className="flex gap-2 flex-wrap">
            {onRetry && (
              <Button
                variant="outline"
                onClick={onRetry}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload About Page
              </Button>
            )}

            {onGoHome && (
              <Button
                variant="default"
                onClick={onGoHome}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Users className="w-4 h-4 mr-2" />
                Go to Home Page
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {fallbackCompanyData && (
        <div className="space-y-6">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">
                About Techlis (Cached Information)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fallbackCompanyData.mission && (
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    Our Mission
                  </h3>
                  <p className="text-yellow-700">
                    {fallbackCompanyData.mission}
                  </p>
                </div>
              )}

              {fallbackCompanyData.vision && (
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    Our Vision
                  </h3>
                  <p className="text-yellow-700">
                    {fallbackCompanyData.vision}
                  </p>
                </div>
              )}

              {fallbackCompanyData.values &&
                fallbackCompanyData.values.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">
                      Our Values
                    </h3>
                    <ul className="list-disc list-inside text-yellow-700 space-y-1">
                      {fallbackCompanyData.values.map((value, index) => (
                        <li key={index}>{value}</li>
                      ))}
                    </ul>
                  </div>
                )}

              <p className="text-yellow-600 text-xs mt-4">
                This is cached information and may not be up to date.
              </p>
            </CardContent>
          </Card>

          {fallbackCompanyData.founder && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">Leadership</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-yellow-800">
                    {fallbackCompanyData.founder.name}
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    {fallbackCompanyData.founder.title}
                  </p>
                  {fallbackCompanyData.founder.bio && (
                    <p className="text-yellow-700 text-sm">
                      {fallbackCompanyData.founder.bio}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {(!fallbackCompanyData ||
        Object.keys(fallbackCompanyData).length === 0) && (
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Company Information Unavailable
              </h3>
              <p className="text-gray-600 mb-4">
                We're a professional AI software development company
                specializing in:
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Enterprise AI & Machine Learning Solutions</p>
                <p>• Cloud Architecture & DevOps Services</p>
                <p>• Custom Web & Mobile Development</p>
                <p>• Technology Consulting & Strategy</p>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                Please contact us directly for more detailed information about
                our company and team.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface AboutErrorBoundaryProps {
  children: React.ReactNode
  fallbackCompanyData?: Partial<CompanyData>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  onRetry?: () => void
  className?: string
}

export function AboutErrorBoundary({
  children,
  fallbackCompanyData,
  onError,
  onRetry,
  className,
}: AboutErrorBoundaryProps) {
  const handleGoHome = () => {
    window.location.href = "/"
  }

  return (
    <ErrorBoundary
      onError={onError}
      onRetry={onRetry}
      className={className}
      fallbackComponent={(props) => (
        <AboutErrorFallback
          {...props}
          fallbackCompanyData={fallbackCompanyData}
          onGoHome={handleGoHome}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
