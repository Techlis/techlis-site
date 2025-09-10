/**
 * Lazy Loading Utilities
 * Provides utilities for lazy loading components, images, and other resources
 */

import * as React from "react"
import type { JSX } from "react"

/**
 * Lazy load a React component with loading and error states
 */
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
): React.LazyExoticComponent<T> {
  const LazyComponent = React.lazy(async () => {
    const start = performance.now()
    try {
      const module = await importFn()
      const end = performance.now()
      console.debug(`⚡ Lazy loaded component in ${(end - start).toFixed(2)}ms`)
      return module
    } catch (error) {
      const end = performance.now()
      console.error(
        `❌ Failed to lazy load component in ${(end - start).toFixed(2)}ms:`,
        error
      )
      throw error
    }
  })

  // Add display name for debugging
  LazyComponent.displayName = `LazyComponent(${importFn.toString().slice(0, 50)}...)`

  return LazyComponent
}

/**
 * Lazy loading wrapper component with enhanced error boundary
 */
interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  errorFallback?: React.ComponentType<{ error: Error; retry: () => void }>
  onError?: (error: Error) => void
}

export function LazyWrapper({
  children,
  fallback,
  errorFallback: ErrorFallback,
  onError,
}: LazyWrapperProps): JSX.Element {
  const defaultFallback = React.createElement("div", null, "Loading...")
  const [error, setError] = React.useState<Error | null>(null)
  const [retryCount, setRetryCount] = React.useState(0)

  const retry = React.useCallback(() => {
    setError(null)
    setRetryCount((prev) => prev + 1)
  }, [])

  const handleError = React.useCallback(
    (error: Error) => {
      setError(error)
      onError?.(error)
      console.error("LazyWrapper error:", error)
    },
    [onError]
  )

  if (error && ErrorFallback) {
    return React.createElement(ErrorFallback, { error, retry })
  }

  if (error) {
    return React.createElement(
      "div",
      { className: "p-4 border border-red-200 rounded-lg bg-red-50" },
      React.createElement(
        "p",
        { className: "text-red-600 mb-2" },
        "Failed to load component"
      ),
      React.createElement(
        "button",
        {
          onClick: retry,
          className:
            "px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200",
        },
        "Retry"
      )
    )
  }

  return React.createElement(
    React.Suspense,
    { fallback: fallback || defaultFallback, key: retryCount },
    React.createElement(ErrorBoundary, { onError: handleError }, children)
  )
}

/**
 * Error boundary for lazy loading
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: {
    children: React.ReactNode
    onError: (error: Error) => void
  }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }

  componentDidCatch(error: Error): void {
    this.props.onError(error)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return null // Let parent handle error display
    }

    return this.props.children
  }
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLElement>, boolean] {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options])

  return [ref, isIntersecting]
}

/**
 * Lazy image component with intersection observer
 */
interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  placeholder?: string
  className?: string
  onLoad?: () => void
  onError?: () => void
}

export function LazyImage({
  src,
  alt,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg==",
  className = "",
  onLoad,
  onError,
  ...props
}: LazyImageProps): JSX.Element {
  const [ref, isIntersecting] = useIntersectionObserver()
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [currentSrc, setCurrentSrc] = React.useState(placeholder)

  React.useEffect(() => {
    if (isIntersecting && !isLoaded && !hasError) {
      const img = new Image()

      img.onload = () => {
        setCurrentSrc(src)
        setIsLoaded(true)
        onLoad?.()
      }

      img.onerror = () => {
        setHasError(true)
        onError?.()
      }

      img.src = src
    }
  }, [isIntersecting, isLoaded, hasError, src, onLoad, onError])

  return React.createElement("img", {
    ref,
    src: currentSrc,
    alt,
    className: `transition-opacity duration-300 ${
      isLoaded ? "opacity-100" : "opacity-70"
    } ${className}`,
    loading: "lazy",
    ...props,
  })
}

/**
 * Lazy content component that loads when visible
 */
interface LazyContentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export function LazyContent({
  children,
  fallback,
  className = "",
  threshold = 0.1,
  rootMargin = "50px",
}: LazyContentProps): JSX.Element {
  const defaultFallback = React.createElement("div", {
    className: "animate-pulse bg-gray-200 h-32 rounded",
  })
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin,
  })
  const [shouldRender, setShouldRender] = React.useState(false)

  React.useEffect(() => {
    if (isIntersecting && !shouldRender) {
      setShouldRender(true)
    }
  }, [isIntersecting, shouldRender])

  return React.createElement(
    "div",
    { ref, className },
    shouldRender ? children : fallback || defaultFallback
  )
}

/**
 * Preload resources utility
 */
export class ResourcePreloader {
  private preloadedResources = new Set<string>()

  /**
   * Preload an image
   */
  preloadImage(src: string): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        this.preloadedResources.add(src)
        resolve()
      }
      img.onerror = reject
      img.src = src
    })
  }

  /**
   * Preload multiple images
   */
  async preloadImages(sources: string[]): Promise<void> {
    const promises = sources.map((src) => this.preloadImage(src))
    await Promise.all(promises)
  }

  /**
   * Check if resource is preloaded
   */
  isPreloaded(resource: string): boolean {
    return this.preloadedResources.has(resource)
  }

  /**
   * Get preloaded resources count
   */
  getPreloadedCount(): number {
    return this.preloadedResources.size
  }
}

/**
 * Global resource preloader instance
 */
export const resourcePreloader = new ResourcePreloader()

/**
 * Hook for preloading resources on component mount
 */
export function usePreloadResources(resources: { images?: string[] }): {
  isLoading: boolean
  error: Error | null
} {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const preload = async () => {
      try {
        setIsLoading(true)
        setError(null)

        if (resources.images) {
          await resourcePreloader.preloadImages(resources.images)
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    preload()
  }, [resources])

  return { isLoading, error }
}
