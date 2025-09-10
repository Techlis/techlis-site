/**
 * Lazy-loaded page components for better code splitting
 */

import { lazyLoadComponent, LazyWrapper } from "@/lib/lazy-loading"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import type { JSX } from "react"

// Lazy load page components
export const LazyHome = lazyLoadComponent(() => import("@/pages/Home"))
export const LazyAbout = lazyLoadComponent(() => import("@/pages/About"))
export const LazyServices = lazyLoadComponent(() => import("@/pages/Services"))
export const LazyBlog = lazyLoadComponent(() => import("@/pages/Blog"))
export const LazyContact = lazyLoadComponent(() => import("@/pages/Contact"))

// Loading fallback component
function PageLoadingFallback(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading page...</p>
      </div>
    </div>
  )
}

// Error fallback component
function PageErrorFallback({
  error,
  retry,
}: {
  error: Error
  retry: () => void
}): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Page Failed to Load
        </h2>
        <p className="text-gray-600 mb-4">
          We encountered an error while loading this page. Please try again.
        </p>
        <button
          onClick={retry}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Retry
        </button>
        {import.meta.env.DEV && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Error Details
            </summary>
            <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

// Wrapped lazy components with error boundaries
export function LazyHomeWrapper(): JSX.Element {
  return (
    <LazyWrapper
      fallback={<PageLoadingFallback />}
      errorFallback={PageErrorFallback}
    >
      <LazyHome />
    </LazyWrapper>
  )
}

export function LazyAboutWrapper(): JSX.Element {
  return (
    <LazyWrapper
      fallback={<PageLoadingFallback />}
      errorFallback={PageErrorFallback}
    >
      <LazyAbout />
    </LazyWrapper>
  )
}

export function LazyServicesWrapper(): JSX.Element {
  return (
    <LazyWrapper
      fallback={<PageLoadingFallback />}
      errorFallback={PageErrorFallback}
    >
      <LazyServices />
    </LazyWrapper>
  )
}

export function LazyBlogWrapper(): JSX.Element {
  return (
    <LazyWrapper
      fallback={<PageLoadingFallback />}
      errorFallback={PageErrorFallback}
    >
      <LazyBlog />
    </LazyWrapper>
  )
}

export function LazyContactWrapper(): JSX.Element {
  return (
    <LazyWrapper
      fallback={<PageLoadingFallback />}
      errorFallback={PageErrorFallback}
    >
      <LazyContact />
    </LazyWrapper>
  )
}
