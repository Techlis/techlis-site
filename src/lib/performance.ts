/**
 * Performance Monitoring and Metrics
 * Provides utilities for tracking performance metrics and optimizing user experience
 */

export interface PerformanceMetrics {
  pageLoadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
  firstInputDelay: number
  bundleSize: number
  cacheHitRate: number
  apiResponseTime: number
}

export interface CacheMetrics {
  hits: number
  misses: number
  totalRequests: number
  hitRate: number
  averageResponseTime: number
}

/**
 * Performance Monitor class for tracking and reporting metrics
 */
export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}
  private cacheMetrics: CacheMetrics = {
    hits: 0,
    misses: 0,
    totalRequests: 0,
    hitRate: 0,
    averageResponseTime: 0,
  }
  private responseTimes: number[] = []

  /**
   * Initialize performance monitoring
   */
  init(): void {
    if (typeof window === "undefined") return

    // Monitor Core Web Vitals
    this.observeWebVitals()

    // Monitor page load performance
    this.observePageLoad()

    // Monitor bundle size
    this.calculateBundleSize()
  }

  /**
   * Observe Core Web Vitals metrics
   */
  private observeWebVitals(): void {
    // First Contentful Paint (FCP)
    this.observePerformanceEntry("paint", (entry) => {
      if (entry.name === "first-contentful-paint") {
        this.metrics.firstContentfulPaint = entry.startTime
      }
    })

    // Largest Contentful Paint (LCP)
    this.observePerformanceEntry("largest-contentful-paint", (entry) => {
      this.metrics.largestContentfulPaint = entry.startTime
    })

    // Cumulative Layout Shift (CLS)
    this.observePerformanceEntry("layout-shift", (entry) => {
      if (!(entry as any).hadRecentInput) {
        this.metrics.cumulativeLayoutShift =
          (this.metrics.cumulativeLayoutShift || 0) + (entry as any).value
      }
    })

    // First Input Delay (FID)
    this.observePerformanceEntry("first-input", (entry) => {
      this.metrics.firstInputDelay =
        (entry as any).processingStart - entry.startTime
    })
  }

  /**
   * Observe specific performance entry types
   */
  private observePerformanceEntry(
    type: string,
    callback: (entry: PerformanceEntry) => void
  ): void {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(callback)
      })
      observer.observe({ type, buffered: true })
    } catch (error) {
      console.warn(`Failed to observe ${type} performance entries:`, error)
    }
  }

  /**
   * Monitor page load performance
   */
  private observePageLoad(): void {
    if (document.readyState === "complete") {
      this.calculatePageLoadTime()
    } else {
      window.addEventListener("load", () => {
        this.calculatePageLoadTime()
      })
    }
  }

  /**
   * Calculate page load time
   */
  private calculatePageLoadTime(): void {
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming
    if (navigation) {
      this.metrics.pageLoadTime =
        navigation.loadEventEnd - navigation.fetchStart
    }
  }

  /**
   * Calculate bundle size from loaded resources
   */
  private calculateBundleSize(): void {
    const resources = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[]
    let totalSize = 0

    resources.forEach((resource) => {
      if (resource.name.includes(".js") || resource.name.includes(".css")) {
        totalSize += resource.transferSize || 0
      }
    })

    this.metrics.bundleSize = totalSize
  }

  /**
   * Record cache hit
   */
  recordCacheHit(responseTime: number = 0): void {
    this.cacheMetrics.hits++
    this.cacheMetrics.totalRequests++
    this.responseTimes.push(responseTime)
    this.updateCacheMetrics()
  }

  /**
   * Record cache miss
   */
  recordCacheMiss(responseTime: number): void {
    this.cacheMetrics.misses++
    this.cacheMetrics.totalRequests++
    this.responseTimes.push(responseTime)
    this.updateCacheMetrics()
  }

  /**
   * Update cache metrics calculations
   */
  private updateCacheMetrics(): void {
    this.cacheMetrics.hitRate =
      this.cacheMetrics.totalRequests > 0
        ? (this.cacheMetrics.hits / this.cacheMetrics.totalRequests) * 100
        : 0

    this.cacheMetrics.averageResponseTime =
      this.responseTimes.length > 0
        ? this.responseTimes.reduce((sum, time) => sum + time, 0) /
          this.responseTimes.length
        : 0
  }

  /**
   * Record API response time
   */
  recordApiResponseTime(responseTime: number): void {
    this.metrics.apiResponseTime = responseTime
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics & { cache: CacheMetrics } {
    return {
      ...this.metrics,
      cache: this.cacheMetrics,
    } as PerformanceMetrics & { cache: CacheMetrics }
  }

  /**
   * Get performance score based on Core Web Vitals
   */
  getPerformanceScore(): {
    score: number
    grade: "A" | "B" | "C" | "D" | "F"
    recommendations: string[]
  } {
    const recommendations: string[] = []
    let score = 100

    // LCP should be <= 2.5s
    if (
      this.metrics.largestContentfulPaint &&
      this.metrics.largestContentfulPaint > 2500
    ) {
      score -= 20
      recommendations.push(
        "Optimize Largest Contentful Paint (should be ≤ 2.5s)"
      )
    }

    // FID should be <= 100ms
    if (this.metrics.firstInputDelay && this.metrics.firstInputDelay > 100) {
      score -= 15
      recommendations.push("Optimize First Input Delay (should be ≤ 100ms)")
    }

    // CLS should be <= 0.1
    if (
      this.metrics.cumulativeLayoutShift &&
      this.metrics.cumulativeLayoutShift > 0.1
    ) {
      score -= 15
      recommendations.push("Reduce Cumulative Layout Shift (should be ≤ 0.1)")
    }

    // Page load time should be <= 3s
    if (this.metrics.pageLoadTime && this.metrics.pageLoadTime > 3000) {
      score -= 20
      recommendations.push("Optimize page load time (should be ≤ 3s)")
    }

    // Bundle size should be reasonable
    if (this.metrics.bundleSize && this.metrics.bundleSize > 200000) {
      score -= 10
      recommendations.push("Reduce bundle size (currently > 200KB)")
    }

    // Cache hit rate should be high
    if (this.cacheMetrics.hitRate < 70) {
      score -= 10
      recommendations.push("Improve cache hit rate (currently < 70%)")
    }

    // API response time should be fast
    if (this.metrics.apiResponseTime && this.metrics.apiResponseTime > 1000) {
      score -= 10
      recommendations.push("Optimize API response time (currently > 1s)")
    }

    const grade =
      score >= 90
        ? "A"
        : score >= 80
          ? "B"
          : score >= 70
            ? "C"
            : score >= 60
              ? "D"
              : "F"

    return { score: Math.max(0, score), grade, recommendations }
  }

  /**
   * Log performance metrics to console (development only)
   */
  logMetrics(): void {
    if (import.meta.env.DEV) {
      const metrics = this.getMetrics()
      const score = this.getPerformanceScore()

      console.group("🚀 Performance Metrics")
      console.log("📊 Core Web Vitals:")
      console.log(
        `  • First Contentful Paint: ${metrics.firstContentfulPaint?.toFixed(2)}ms`
      )
      console.log(
        `  • Largest Contentful Paint: ${metrics.largestContentfulPaint?.toFixed(2)}ms`
      )
      console.log(
        `  • Cumulative Layout Shift: ${metrics.cumulativeLayoutShift?.toFixed(3)}`
      )
      console.log(
        `  • First Input Delay: ${metrics.firstInputDelay?.toFixed(2)}ms`
      )
      console.log(`📦 Bundle Size: ${(metrics.bundleSize / 1024).toFixed(2)}KB`)
      console.log(`⏱️ Page Load Time: ${metrics.pageLoadTime?.toFixed(2)}ms`)
      console.log(`🗄️ Cache Metrics:`)
      console.log(`  • Hit Rate: ${metrics.cache.hitRate.toFixed(1)}%`)
      console.log(`  • Total Requests: ${metrics.cache.totalRequests}`)
      console.log(
        `  • Average Response Time: ${metrics.cache.averageResponseTime.toFixed(2)}ms`
      )
      console.log(`🎯 Performance Score: ${score.score}/100 (${score.grade})`)
      if (score.recommendations.length > 0) {
        console.log("💡 Recommendations:")
        score.recommendations.forEach((rec) => console.log(`  • ${rec}`))
      }
      console.groupEnd()
    }
  }

  /**
   * Export metrics for analytics
   */
  exportMetrics(): string {
    const metrics = this.getMetrics()
    const score = this.getPerformanceScore()

    return JSON.stringify({
      timestamp: new Date().toISOString(),
      metrics,
      score,
      userAgent: navigator.userAgent,
      url: window.location.href,
    })
  }
}

/**
 * Global performance monitor instance
 */
export const performanceMonitor = new PerformanceMonitor()

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
  if (typeof window !== "undefined") {
    performanceMonitor.init()

    // Log metrics after page load
    window.addEventListener("load", () => {
      setTimeout(() => {
        performanceMonitor.logMetrics()
      }, 2000)
    })
  }
}

/**
 * Performance measurement decorator for functions
 */
export function measurePerformance<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: any[]) => {
    const start = performance.now()
    const result = fn(...args)

    if (result instanceof Promise) {
      return result.finally(() => {
        const end = performance.now()
        console.debug(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`)
      })
    } else {
      const end = performance.now()
      console.debug(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`)
      return result
    }
  }) as T
}

/**
 * Async performance measurement decorator
 */
export function measureAsyncPerformance<
  T extends (...args: any[]) => Promise<any>,
>(fn: T, name: string): T {
  return (async (...args: any[]) => {
    const start = performance.now()
    try {
      const result = await fn(...args)
      const end = performance.now()
      console.debug(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`)
      return result
    } catch (error) {
      const end = performance.now()
      console.debug(`⏱️ ${name} (error): ${(end - start).toFixed(2)}ms`)
      throw error
    }
  }) as T
}
