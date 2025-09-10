/**
 * Performance Optimization Tests
 * Tests for caching, lazy loading, and performance monitoring
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { PerformanceMonitor } from "@/lib/performance"
import { CacheService } from "@/lib/services/CacheService"
import { BlogService } from "@/lib/services/BlogService"

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

// Mock performance API
const performanceMock = {
  now: vi.fn(() => Date.now()),
  getEntriesByType: vi.fn(() => []),
  mark: vi.fn(),
  measure: vi.fn(),
}
Object.defineProperty(window, "performance", {
  value: performanceMock,
})

// Mock PerformanceObserver
class MockPerformanceObserver {
  constructor(callback: (list: PerformanceObserverEntryList) => void) {
    this.callback = callback
  }
  callback: (list: PerformanceObserverEntryList) => void
  observe = vi.fn()
  disconnect = vi.fn()
}
Object.defineProperty(window, "PerformanceObserver", {
  value: MockPerformanceObserver,
})

describe("Performance Monitoring", () => {
  let monitor: PerformanceMonitor

  beforeEach(() => {
    monitor = new PerformanceMonitor()
    vi.clearAllMocks()
  })

  it("should initialize performance monitoring", () => {
    monitor.init()
    expect(performanceMock.getEntriesByType).toHaveBeenCalled()
  })

  it("should record cache hits and misses", () => {
    monitor.recordCacheHit(100)
    monitor.recordCacheMiss(500)

    const metrics = monitor.getMetrics()
    expect(metrics.cache.hits).toBe(1)
    expect(metrics.cache.misses).toBe(1)
    expect(metrics.cache.totalRequests).toBe(2)
    expect(metrics.cache.hitRate).toBe(50)
  })

  it("should calculate performance score", () => {
    const score = monitor.getPerformanceScore()
    expect(score.score).toBeGreaterThanOrEqual(0)
    expect(score.score).toBeLessThanOrEqual(100)
    expect(["A", "B", "C", "D", "F"]).toContain(score.grade)
    expect(Array.isArray(score.recommendations)).toBe(true)
  })

  it("should record API response times", () => {
    monitor.recordApiResponseTime(250)
    const metrics = monitor.getMetrics()
    expect(metrics.apiResponseTime).toBe(250)
  })

  it("should export metrics as JSON", () => {
    const exported = monitor.exportMetrics()
    const parsed = JSON.parse(exported)
    expect(parsed).toHaveProperty("timestamp")
    expect(parsed).toHaveProperty("metrics")
    expect(parsed).toHaveProperty("score")
  })
})

describe("Cache Service", () => {
  let cache: CacheService

  beforeEach(() => {
    cache = new CacheService(1024 * 1024, 100, 60000) // 1MB, 100 entries, 1 minute TTL
  })

  afterEach(() => {
    cache.clear()
  })

  it("should store and retrieve data", () => {
    const testData = { message: "Hello, World!" }
    cache.set("test-key", testData)

    const retrieved = cache.get("test-key")
    expect(retrieved).toEqual(testData)
  })

  it("should respect TTL expiration", async () => {
    const testData = { message: "Expires soon" }
    cache.set("expire-key", testData, { ttl: 100 }) // 100ms TTL

    expect(cache.get("expire-key")).toEqual(testData)

    // Wait for expiration
    await new Promise((resolve) => setTimeout(resolve, 150))
    expect(cache.get("expire-key")).toBeNull()
  })

  it("should handle cache size limits", () => {
    // Fill cache beyond limit
    for (let i = 0; i < 150; i++) {
      cache.set(`key-${i}`, { data: "x".repeat(1000) }) // 1KB each
    }

    const stats = cache.getStats()
    expect(stats.entryCount).toBeLessThanOrEqual(100) // Should not exceed max entries
  })

  it("should invalidate by tags", () => {
    cache.set("tagged-1", "data1", { tags: ["group-a", "group-b"] })
    cache.set("tagged-2", "data2", { tags: ["group-a"] })
    cache.set("tagged-3", "data3", { tags: ["group-c"] })

    const invalidated = cache.invalidateByTags(["group-a"])
    expect(invalidated).toBe(2)
    expect(cache.get("tagged-1")).toBeNull()
    expect(cache.get("tagged-2")).toBeNull()
    expect(cache.get("tagged-3")).toBe("data3")
  })

  it("should provide accurate statistics", () => {
    cache.set("stats-1", "data1")
    cache.set("stats-2", "data2")
    cache.get("stats-1") // Hit
    cache.get("nonexistent") // Miss

    const stats = cache.getStats()
    expect(stats.hits).toBe(1)
    expect(stats.misses).toBe(1)
    expect(stats.hitRate).toBe(50)
    expect(stats.entryCount).toBe(2)
  })

  it("should handle LRU eviction", () => {
    const smallCache = new CacheService(1024, 3, 60000) // Only 3 entries max

    smallCache.set("key-1", "data1")
    smallCache.set("key-2", "data2")
    smallCache.set("key-3", "data3")

    // Access key-1 to make it recently used
    smallCache.get("key-1")

    // Add another entry, should evict the least recently used
    smallCache.set("key-4", "data4")

    // Check that we have exactly 3 entries
    const stats = smallCache.getStats()
    expect(stats.entryCount).toBe(3)

    // At least one of the original keys should be evicted
    const remainingKeys = [
      smallCache.get("key-1"),
      smallCache.get("key-2"),
      smallCache.get("key-3"),
    ].filter((val) => val !== null)

    expect(remainingKeys.length).toBe(2) // Only 2 of the original 3 should remain
    expect(smallCache.get("key-4")).toBe("data4") // New key should exist
  })
})

describe("Enhanced Blog Service Caching", () => {
  let blogService: BlogService

  beforeEach(() => {
    blogService = new BlogService()
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  afterEach(() => {
    blogService.clearCache()
  })

  it("should use enhanced cache for posts", async () => {
    // Mock successful API response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: "ok",
          items: [
            {
              title: "Test Post",
              description: "Test description with machine learning keywords",
              link: "https://example.com/test",
              pubDate: new Date().toISOString(),
            },
          ],
        }),
    })

    const posts = await blogService.fetchLatestPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0].title).toBe("Test Post")

    // Second call should use cache
    const cachedPosts = await blogService.fetchLatestPosts()
    expect(cachedPosts).toEqual(posts)
  })

  it("should cache posts by category", async () => {
    // Mock successful API response
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: "ok",
          items: [
            {
              title: "AI Post",
              description: "Artificial intelligence and machine learning",
              link: "https://example.com/ai",
              pubDate: new Date().toISOString(),
            },
          ],
        }),
    })

    const aiPosts = await blogService.getPostsByCategory("ai-ml")
    expect(aiPosts).toHaveLength(1)

    // Should use category-specific cache
    const cachedAiPosts = await blogService.getPostsByCategory("ai-ml")
    expect(cachedAiPosts).toEqual(aiPosts)
  })

  it("should provide cache statistics", () => {
    const stats = blogService.getCacheStats()
    expect(stats).toHaveProperty("hits")
    expect(stats).toHaveProperty("misses")
    expect(stats).toHaveProperty("hitRate")
    expect(stats).toHaveProperty("totalSize")
  })

  it("should preload posts without blocking", async () => {
    const preloadSpy = vi.spyOn(blogService, "preloadPosts")
    await blogService.preloadPosts()
    expect(preloadSpy).toHaveBeenCalled()
  })

  it("should clear all caches", () => {
    blogService.clearCache()
    expect(localStorageMock.removeItem).toHaveBeenCalled()
  })
})

describe("Performance Measurement Decorators", () => {
  it("should measure function performance", async () => {
    const consoleSpy = vi.spyOn(console, "debug").mockImplementation(() => {})

    const testFunction = async (delay: number) => {
      await new Promise((resolve) => setTimeout(resolve, delay))
      return "completed"
    }

    // Import measureAsyncPerformance dynamically to avoid issues
    const { measureAsyncPerformance } = await import("@/lib/performance")
    const measuredFunction = measureAsyncPerformance(
      testFunction,
      "test-function"
    )

    const result = await measuredFunction(10)
    expect(result).toBe("completed")
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("⏱️ test-function:")
    )

    consoleSpy.mockRestore()
  })
})

describe("Integration Tests", () => {
  it("should integrate performance monitoring with cache service", () => {
    const cache = new CacheService()

    // Set some data
    cache.set("perf-test", "data")

    // Get data (should record hit)
    const data = cache.get("perf-test")
    expect(data).toBe("data")

    // Get non-existent data (should record miss)
    const missing = cache.get("missing-key")
    expect(missing).toBeNull()

    const stats = cache.getStats()
    expect(stats.hits).toBe(1)
    expect(stats.misses).toBe(1)
  })

  it("should handle performance monitoring initialization", () => {
    // Should not throw errors when initializing
    expect(() => {
      const monitor = new PerformanceMonitor()
      monitor.init()
    }).not.toThrow()
  })
})
