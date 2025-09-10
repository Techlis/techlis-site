import * as React from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallbackComponent?: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  onRetry?: () => void
  className?: string
}

interface ErrorFallbackProps {
  error?: Error
  errorInfo?: React.ErrorInfo
  onRetry?: () => void
  onGoHome?: () => void
  className?: string
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo)

    // Log error to external service in production
    if (process.env.NODE_ENV === "production") {
      this.logErrorToService(error, errorInfo)
    }

    this.setState({
      error,
      errorInfo,
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  private logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
    // In a real application, you would send this to an error reporting service
    // like Sentry, LogRocket, or Bugsnag
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    console.error("Error logged:", errorData)

    // Example: Send to error reporting service
    // errorReportingService.captureException(error, { extra: errorData })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    if (this.props.onRetry) {
      this.props.onRetry()
    }
  }

  handleGoHome = () => {
    window.location.href = "/"
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent =
        this.props.fallbackComponent || DefaultErrorFallback

      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
          className={this.props.className}
        />
      )
    }

    return this.props.children
  }
}

function DefaultErrorFallback({
  error,
  errorInfo,
  onRetry,
  onGoHome,
  className,
}: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <div
      className={cn(
        "min-h-[400px] flex items-center justify-center p-4",
        className
      )}
    >
      <Card className="max-w-lg w-full border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            Something Went Wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-red-600">
            We're sorry, but something unexpected happened. Please try
            refreshing the page or go back to the home page.
          </p>

          {isDevelopment && error && (
            <details className="bg-red-100 p-3 rounded border border-red-200">
              <summary className="cursor-pointer text-sm font-medium text-red-700 mb-2">
                Error Details (Development Only)
              </summary>
              <div className="text-xs text-red-600 space-y-2">
                <div>
                  <strong>Message:</strong> {error.message}
                </div>
                {error.stack && (
                  <div>
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1 text-xs">
                      {error.stack}
                    </pre>
                  </div>
                )}
                {errorInfo?.componentStack && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1 text-xs">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <div className="flex gap-2 flex-wrap">
            {onRetry && (
              <Button
                variant="outline"
                onClick={onRetry}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}

            {onGoHome && (
              <Button
                variant="default"
                onClick={onGoHome}
                className="bg-red-600 hover:bg-red-700"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for programmatic error handling
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const handleError = React.useCallback((error: Error) => {
    console.error("Error handled:", error)
    setError(error)
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  const throwError = React.useCallback((error: Error) => {
    // This will trigger the nearest error boundary
    throw error
  }, [])

  return { error, handleError, clearError, throwError }
}
