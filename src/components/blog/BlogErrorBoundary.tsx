import * as React from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { BlogError, BlogPost } from "@/types"

interface BlogErrorBoundaryState {
  hasError: boolean
  error?: BlogError | Error
  fallbackContent?: BlogPost[]
}

interface BlogErrorBoundaryProps {
  children: React.ReactNode
  fallbackContent?: BlogPost[]
  onRetry?: () => void
  className?: string
}

export class BlogErrorBoundary extends React.Component<
  BlogErrorBoundaryProps,
  BlogErrorBoundaryState
> {
  constructor(props: BlogErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): BlogErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Blog Error Boundary caught an error:", error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
    if (this.props.onRetry) {
      this.props.onRetry()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <BlogErrorFallback
          error={this.state.error}
          onRetry={this.handleRetry}
          fallbackContent={this.props.fallbackContent}
          className={this.props.className}
        />
      )
    }

    return this.props.children
  }
}

interface BlogErrorFallbackProps {
  error?: BlogError | Error
  onRetry?: () => void
  fallbackContent?: BlogPost[]
  className?: string
}

function BlogErrorFallback({
  error,
  onRetry,
  fallbackContent,
  className,
}: BlogErrorFallbackProps) {
  const getErrorMessage = () => {
    if (error instanceof Error && "code" in error) {
      const blogError = error as BlogError
      switch (blogError.code) {
        case "NETWORK_ERROR":
          return "Unable to connect to the blog service. Please check your internet connection."
        case "RATE_LIMIT":
          return "Too many requests. Please wait a moment before trying again."
        case "FETCH_ERROR":
          return "Failed to fetch blog posts. The service might be temporarily unavailable."
        case "PARSE_ERROR":
          return "Error processing blog content. Some posts might not display correctly."
        default:
          return "An unexpected error occurred while loading blog posts."
      }
    }
    return (
      error?.message || "An unexpected error occurred while loading blog posts."
    )
  }

  const getErrorTitle = () => {
    if (error instanceof Error && "code" in error) {
      const blogError = error as BlogError
      switch (blogError.code) {
        case "NETWORK_ERROR":
          return "Connection Error"
        case "RATE_LIMIT":
          return "Rate Limit Exceeded"
        case "FETCH_ERROR":
          return "Service Unavailable"
        case "PARSE_ERROR":
          return "Content Error"
        default:
          return "Something Went Wrong"
      }
    }
    return "Something Went Wrong"
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            {getErrorTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-4">{getErrorMessage()}</p>

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
        </CardContent>
      </Card>

      {fallbackContent && fallbackContent.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cached Posts (Last Updated)
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* This would render cached posts - implementation depends on BlogPostCard */}
            <p className="text-gray-600 col-span-full text-center py-8">
              {fallbackContent.length} cached posts available
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Hook for error boundary usage
export function useBlogErrorHandler() {
  const [error, setError] = React.useState<BlogError | null>(null)

  const handleError = React.useCallback((error: BlogError | Error) => {
    if (error instanceof Error && !("code" in error)) {
      // Convert regular errors to BlogError
      setError(new (Error as any)("FETCH_ERROR", error.message))
    } else {
      setError(error as BlogError)
    }
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}
