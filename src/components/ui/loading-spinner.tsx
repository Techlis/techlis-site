import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  message?: string
  className?: string
  variant?: "default" | "primary" | "secondary"
}

export function LoadingSpinner({
  size = "md",
  message,
  className,
  variant = "default",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  }

  const variantClasses = {
    default: "text-gray-600",
    primary: "text-primary-600",
    secondary: "text-secondary-600",
  }

  const containerSizeClasses = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
    xl: "gap-6",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        containerSizeClasses[size],
        className
      )}
    >
      <Loader2
        className={cn(
          "animate-spin",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />

      {message && (
        <p className="text-gray-600 text-sm font-medium">{message}</p>
      )}
    </div>
  )
}

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
  className?: string
}

export function LoadingOverlay({
  isVisible,
  message = "Loading...",
  className,
}: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
        className
      )}
    >
      <div className="bg-white rounded-lg p-6 shadow-xl">
        <LoadingSpinner size="lg" message={message} />
      </div>
    </div>
  )
}

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  children: React.ReactNode
}

export function LoadingButton({
  isLoading = false,
  loadingText,
  children,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-opacity",
        isLoading && "opacity-75 cursor-not-allowed",
        className
      )}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {isLoading && loadingText ? loadingText : children}
    </button>
  )
}
