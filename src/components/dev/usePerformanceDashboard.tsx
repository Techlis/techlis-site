import React from "react"
import { PerformanceDashboard } from "./PerformanceDashboard"

/**
 * Performance Dashboard Hook
 * Manages the visibility and state of the performance dashboard
 */
export function usePerformanceDashboard() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Only show in development
    if (import.meta.env.DEV) {
      // Show dashboard after page load
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const show = () => setIsVisible(true)
  const hide = () => setIsVisible(false)
  const toggle = () => setIsVisible((prev) => !prev)

  return {
    isVisible,
    show,
    hide,
    toggle,
    PerformanceDashboard: isVisible ? (
      <PerformanceDashboard onClose={hide} />
    ) : null,
  }
}
