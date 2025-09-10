import { describe, it, expect, beforeEach, vi } from "vitest"
import { BlogService } from "@/lib/services/BlogService"
import type { RSS2JSONResponse } from "@/types"

// Mock the constants
vi.mock("@/lib/constants", () => ({
  RSS_FEEDS: [
    {
      url: "https://example.com/feed",
      name: "Test Feed",
      category: "software-dev",
      priority: 5,
    },
  ],
  CONTENT_KEYWORDS: {
    "software-dev": ["programming", "development", "coding"],
  },
}))

// Mock the config
vi.mock("@/lib/config", () => ({
  getRSS2JSONConfig: () => ({
    baseUrl: "https://api.rss2json.com/v1/api.json",
    apiKey: "test-key",
    maxCount: 10,
    timeout: 5000,
    retryAttempts: 1,
    retryDelay: 500,
  }),
  getBlogConfig: () => ({
    cacheEnabled: true,
    cacheDuration: 30 * 60 * 1000,
    storageKey: "techlis_blog_data",
    postsPerPage: 6,
    threeWeeksMs: 21 * 24 * 60 * 60 * 1000,
    fiveMonthsMs: 5 * 30 * 24 * 60 * 60 * 1000,
    categories: {
      "ai-ml": "AI & Machine Learning",
      "software-dev": "Software Development",
      "web-mobile": "Web & Mobile",
      "cloud-devops": "Cloud & DevOps",
    },
  }),
  getEnvironmentConfig: () => ({
    isDevelopment: false,
    isProduction: false,
    isTest: true,
    apiTimeout: 5000,
    cacheEnabled: true,
    logLevel: "error" as const,
  }),
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, "localStorage", { value: localStorageMock })

// Mock fetch
global.fetch = vi.fn()

describe("BlogService", () => {
  let blogService: BlogService

  beforeEach(() => {
    blogService = new BlogService()
    vi.clearAllMocks()
  })

  describe("fetchLatestPosts", () => {
    it("should return cached posts when cache is valid", async () => {
      const cachedData = {
        posts: [
          {
            id: "test-1",
            title: "Test Post",
            description: "Test description",
            link: "https://example.com",
            pubDate: new Date().toISOString(),
            source: "Test Source",
            category: "software-dev" as const,
            isArchived: false,
            createdAt: new Date().toISOString(),
          },
        ],
        lastFetch: new Date().toISOString(),
        categories: { "software-dev": 1 },
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(cachedData))

      const posts = await blogService.fetchLatestPosts()

      expect(posts).toHaveLength(1)
      expect(posts[0].title).toBe("Test Post")
      expect(fetch).not.toHaveBeenCalled()
    })

    it("should fetch from RSS feeds when cache is invalid", async () => {
      localStorageMock.getItem.mockReturnValue(null)

      const mockResponse: RSS2JSONResponse = {
        status: "ok",
        feed: {
          url: "https://example.com/feed",
          title: "Test Feed",
          link: "https://example.com",
          author: "Test Author",
          description: "Test Description",
          image: "https://example.com/image.jpg",
        },
        items: [
          {
            title: "Programming Tutorial",
            pubDate: new Date().toISOString(),
            link: "https://example.com/post1",
            guid: "guid1",
            author: "Author 1",
            thumbnail: "",
            description: "Learn about programming and software development",
            content: "Full content here",
            enclosure: null,
            categories: ["AI", "ML"],
          },
        ],
      }

      ;(fetch as unknown).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const posts = await blogService.fetchLatestPosts()

      expect(fetch).toHaveBeenCalled()
      expect(posts).toHaveLength(1)
      expect(posts[0].title).toBe("Programming Tutorial")
    })

    it("should handle fetch errors gracefully", async () => {
      localStorageMock.getItem.mockReturnValue(null)
      ;(fetch as unknown).mockRejectedValue(new Error("Network error"))

      // Should return empty array when all feeds fail and no cache
      const posts = await blogService.fetchLatestPosts()
      expect(posts).toEqual([])
    })
  })

  describe("getTrendingPosts", () => {
    it("should return recent posts", async () => {
      const recentDate = new Date()
      const cachedData = {
        posts: [
          {
            id: "test-1",
            title: "Recent Post",
            description: "Recent description",
            link: "https://example.com",
            pubDate: recentDate.toISOString(),
            source: "Test Source",
            category: "software-dev" as const,
            isArchived: false,
            createdAt: new Date().toISOString(),
          },
        ],
        lastFetch: new Date().toISOString(),
        categories: { "software-dev": 1 },
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(cachedData))

      const trendingPosts = await blogService.getTrendingPosts(5)

      expect(trendingPosts).toHaveLength(1)
      expect(trendingPosts[0].title).toBe("Recent Post")
    })
  })

  describe("clearCache", () => {
    it("should clear localStorage cache", () => {
      blogService.clearCache()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "techlis_blog_data"
      )
    })
  })
})
