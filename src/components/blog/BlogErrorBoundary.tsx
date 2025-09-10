import * as React from "react"
import { BlogErrorFallback } from "./BlogErrorFallback"
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

// Hook for error boundary usage
export function useBlogErrorHandler() {
  const [error, setError] = React.useState<BlogError | null>(null)

  const handleError = React.useCallback((error: BlogError | Error) => {
    if (error instanceof Error && !("code" in error)) {
      // Convert regular errors to BlogError
      setError({ code: "FETCH_ERROR", message: error.message } as BlogError)
    } else {
      setError(error as BlogError)
    }
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}
