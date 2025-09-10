import { Loader2, Rss } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogLoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  message?: string
  className?: string
}

export function BlogLoadingSpinner({
  size = "md",
  message = "Loading blog posts...",
  className,
}: BlogLoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const containerSizeClasses = {
    sm: "py-4",
    md: "py-8",
    lg: "py-12",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        containerSizeClasses[size],
        className
      )}
    >
      <div className="relative mb-4">
        <Rss
          className={cn("text-primary-200 absolute inset-0", sizeClasses[size])}
        />
        <Loader2
          className={cn("animate-spin text-primary-600", sizeClasses[size])}
        />
      </div>

      {message && (
        <p className="text-gray-600 text-sm font-medium">{message}</p>
      )}
    </div>
  )
}

interface BlogRefreshButtonProps {
  onRefresh: () => void
  isLoading?: boolean
  className?: string
}

export function BlogRefreshButton({
  onRefresh,
  isLoading = false,
  className,
}: BlogRefreshButtonProps) {
  return (
    <button
      onClick={onRefresh}
      disabled={isLoading}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <Loader2 className={cn("w-4 h-4", isLoading && "animate-spin")} />
      {isLoading ? "Refreshing..." : "Refresh Posts"}
    </button>
  )
}
