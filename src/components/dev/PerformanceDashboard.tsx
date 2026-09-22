/**
 * Performance Dashboard Component (Development Only)
 * Displays real-time performance metrics and cache statistics
 */

import * as React from "react"
import { performanceMonitor } from "@/lib/performance"
import { persistentCache } from "@/lib/services/CacheService"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Database, Zap, RefreshCw, X } from "lucide-react"
import type { JSX } from "react"

interface PerformanceDashboardProps {
  onClose?: () => void
}

export function PerformanceDashboard({
  onClose,
}: PerformanceDashboardProps): JSX.Element {
  const [metrics, setMetrics] = React.useState(performanceMonitor.getMetrics())
  const [cacheStats, setCacheStats] = React.useState(persistentCache.getStats())
  const [isVisible, setIsVisible] = React.useState(false)

  // Update metrics every 2 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(performanceMonitor.getMetrics())
      setCacheStats(persistentCache.getStats())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Show dashboard after initial load
  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose?.(), 300)
  }

  const handleRefresh = () => {
    setMetrics(performanceMonitor.getMetrics())
    setCacheStats(persistentCache.getStats())
  }

  const handleClearCache = () => {
    persistentCache.clear()
    setCacheStats(persistentCache.getStats())
  }

  const score = performanceMonitor.getPerformanceScore()

  if (!isVisible) return <></>

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-white/95 backdrop-blur-sm border shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary-600" />
              <h3 className="font-semibold text-sm">Performance</h3>
              <Badge
                variant={
                  score.grade === "A"
                    ? "default"
                    : score.grade === "B"
                      ? "secondary"
                      : "destructive"
                }
              >
                {score.grade}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                className="h-6 w-6 p-0"
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {/* Core Web Vitals */}
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className="font-medium">Core Web Vitals</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div>
                  <span className="text-gray-500">LCP:</span>{" "}
                  <span
                    className={
                      metrics.largestContentfulPaint &&
                      metrics.largestContentfulPaint > 2500
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {metrics.largestContentfulPaint
                      ? `${(metrics.largestContentfulPaint / 1000).toFixed(2)}s`
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">FID:</span>{" "}
                  <span
                    className={
                      metrics.firstInputDelay && metrics.firstInputDelay > 100
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {metrics.firstInputDelay
                      ? `${metrics.firstInputDelay.toFixed(0)}ms`
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">CLS:</span>{" "}
                  <span
                    className={
                      metrics.cumulativeLayoutShift &&
                      metrics.cumulativeLayoutShift > 0.1
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {metrics.cumulativeLayoutShift
                      ? metrics.cumulativeLayoutShift.toFixed(3)
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">FCP:</span>{" "}
                  <span
                    className={
                      metrics.firstContentfulPaint &&
                      metrics.firstContentfulPaint > 1800
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {metrics.firstContentfulPaint
                      ? `${(metrics.firstContentfulPaint / 1000).toFixed(2)}s`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bundle & Load Performance */}
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Database className="w-3 h-3 text-blue-500" />
                <span className="font-medium">Bundle & Load</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <span className="text-gray-500">Bundle:</span>{" "}
                  <span
                    className={
                      metrics.bundleSize && metrics.bundleSize > 200000
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {metrics.bundleSize
                      ? `${(metrics.bundleSize / 1024).toFixed(0)}KB`
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Load:</span>{" "}
                  <span
                    className={
                      metrics.pageLoadTime && metrics.pageLoadTime > 3000
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {metrics.pageLoadTime
                      ? `${(metrics.pageLoadTime / 1000).toFixed(2)}s`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Cache Performance */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <Database className="w-3 h-3 text-purple-500" />
                  <span className="font-medium">Cache</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCache}
                  className="h-4 px-1 text-xs"
                >
                  Clear
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <span className="text-gray-500">Hit Rate:</span>{" "}
                  <span
                    className={
                      cacheStats.hitRate < 70
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {cacheStats.hitRate.toFixed(1)}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Entries:</span>{" "}
                  <span>{cacheStats.entryCount}</span>
                </div>
                <div>
                  <span className="text-gray-500">Size:</span>{" "}
                  <span>{(cacheStats.totalSize / 1024).toFixed(0)}KB</span>
                </div>
                <div>
                  <span className="text-gray-500">API:</span>{" "}
                  <span
                    className={
                      metrics.apiResponseTime && metrics.apiResponseTime > 1000
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {metrics.apiResponseTime
                      ? `${metrics.apiResponseTime.toFixed(0)}ms`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Score */}
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="font-medium">Score: {score.score}/100</span>
                <Badge
                  variant={
                    score.grade === "A"
                      ? "default"
                      : score.grade === "B"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  Grade {score.grade}
                </Badge>
              </div>
              {score.recommendations.length > 0 && (
                <div className="mt-1">
                  <details className="text-xs">
                    <summary className="cursor-pointer text-gray-500">
                      {score.recommendations.length} recommendations
                    </summary>
                    <ul className="mt-1 space-y-1 text-xs text-gray-600">
                      {score.recommendations.slice(0, 3).map((rec, index) => (
                        <li key={index} className="text-xs">
                          • {rec}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
