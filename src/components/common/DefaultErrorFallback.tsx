import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ErrorFallbackProps } from "./ErrorBoundary"

export function DefaultErrorFallback({
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
