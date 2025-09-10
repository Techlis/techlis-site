import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { BlogService } from "@/lib/services/BlogService"
import { BlogError } from "@/types"
import type { RSS2JSONResponse, BlogPost, RSSFeed } from "@/types"

// Mock the config modules
vi.mock("@/lib/config", () => ({
  getRSS2JSONConfig: () => ({
    baseUrl: "https://api.rss2json.com/v1/api.json",
    apiKey: "test-api-key",
    maxCount: 10,
    timeout: 5000,
    retryAttempts: 3,
    retryDelay: 1000,
  }),
  getBlogConfig: () => ({
    cacheEnabled: true,
    cacheDuration: 30 * 60 * 1000, // 30 minutes
    storageKey: "techlis-blog-data",
    threeWeeksMs: 21 * 24 * 60 * 60 * 1000,
    fiveMonthsMs: 5 * 30 * 24 * 60 * 60 * 1000,
  }),
  getEnvironmentConfig: () => ({
    isDevelopment: true,
    isProduction: false,
  }),
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock the constants
vi.mock("@/lib/constants", () => ({
  RSS_FEEDS: [
    {
      url: "https://example.com/feed1.xml",
      name: "Test Feed 1",
      category: "ai-ml",
      priority: 5,
    },
    {
      url: "https://example.com/feed2.xml",
      name: "Test Feed 2",
      category: "software-dev",
      priority: 4,
    },
  ] as RSSFeed[],
  CONTENT_KEYWORDS: {
    "ai-ml": ["artificial intelligence", "machine learning", "AI", "ML"],
    "software-dev": ["programming", "development", "coding", "software"],
    "web-mobile": ["web development", "mobile app", "react", "javascript"],
    "cloud-devops": ["cloud", "devops", "kubernetes", "docker"],
  },
}))

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

// Mock fetch
global.fetch = vi.fn()

const mockRSSResponse: RSS2JSONResponse = {
  status: "ok",
  feed: {
    url: "https://example.com/feed1.xml",
    title: "Test Feed",
    link: "https://example.com",
    author: "Test Author",
    description: "Test Description",
    image: "https://example.com/image.jpg",
  },
  items: [
    {
      title: "AI and Machine Learning Advances",
      pubDate: "2024-01-15T10:00:00Z",
      link: "https://example.com/post1",
      guid: "post1",
      author: "Author 1",
      thumbnail: "",
      description:
        "This post discusses artificial intelligence and machine learning advances",
      content: "Full content here",
      enclosure: null,
      categories: ["AI", "Technology"],
    },
    {
      title: "Software Development Best Practices",
      pubDate: "2024-01-14T10:00:00Z",
      link: "https://example.com/post2",
      guid: "post2",
      author: "Author 2",
      thumbnail: "",
      description:
        "This post covers programming and software development practices",
      content: "Full content here",
      enclosure: null,
      categories: ["Programming", "Development"],
    },
  ],
}

describe("BlogService", () => {
  let blogService: BlogService
  let mockFetch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    localStorageMock.setItem.mockImplementation(() => {})
    localStorageMock.removeItem.mockImplementation(() => {})

    mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockRSSResponse),
    } as Response)

    blogService = new BlogService()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("fetchLatestPosts", () => {
    it("fetches posts from all RSS feeds successfully", async () => {
      const posts = await blogService.fetchLatestPosts()

      expect(posts).toHaveLength(2)
      expect(posts[0].title).toBe("AI and Machine Learning Advances")
      expect(posts[0].category).toBe("ai-ml")
      expect(posts[1].title).toBe("Software Development Best Practices")
      expect(posts[1].category).toBe("software-dev")
    })

    it("filters out irrelevant posts", async () => {
      const irrelevantResponse = {
        ...mockRSSResponse,
        items: [
          {
            ...mockRSSResponse.items[0],
            title: "Cooking Recipes",
            description: "How to cook pasta",
          },
        ],
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(irrelevantResponse),
      } as Response)

      const posts = await blogService.fetchLatestPosts()
      expect(posts).toHaveLength(0)
    })

    it("sorts posts by date (newest first)", async () => {
      const posts = await blogService.fetchLatestPosts()

      const firstPostDate = new Date(posts[0].pubDate).getTime()
      const secondPostDate = new Date(posts[1].pubDate).getTime()

      expect(firstPostDate).toBeGreaterThan(secondPostDate)
    })

    it("returns cached data when cache is valid", async () => {
      const cachedData = {
        posts: [
          {
            id: "cached-post",
            title: "Cached Post",
            description: "Cached description",
            link: "https://example.com/cached",
            pubDate: "2024-01-15T10:00:00Z",
            source: "Cached Source",
            category: "ai-ml" as const,
            isArchived: false,
            createdAt: "2024-01-15T10:00:00Z",
          },
        ],
        lastFetch: new Date().toISOString(),
        categories: { "ai-ml": 1 },
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(cachedData))

      const posts = await blogService.fetchLatestPosts()

      expect(posts).toHaveLength(1)
      expect(posts[0].title).toBe("Cached Post")
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("fetches new data when cache is expired", async () => {
      const expiredCachedData = {
        posts: [],
        lastFetch: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        categories: {},
      }

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify(expiredCachedData)
      )

      const posts = await blogService.fetchLatestPosts()

      expect(mockFetch).toHaveBeenCalled()
      expect(posts).toHaveLength(2)
    })

    it("handles network errors gracefully", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"))

      await expect(blogService.fetchLatestPosts()).rejects.toThrow(BlogError)
    })

    it("retries failed requests", async () => {
      mockFetch
        .mockRejectedValueOnce(new Error("Network error"))
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(mockRSSResponse),
        } as Response)

      const posts = await blogService.fetchLatestPosts()

      expect(mockFetch).toHaveBeenCalledTimes(6) // 2 feeds × 3 attempts
      expect(posts).toHaveLength(2)
    })

    it("handles rate limit errors without retry", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        statusText: "Too Many Requests",
      } as Response)

      await expect(blogService.fetchLatestPosts()).rejects.toThrow(BlogError)
      expect(mockFetch).toHaveBeenCalledTimes(2) // No retries for rate limit
    })

    it("handles timeout errors", async () => {
      mockFetch.mockImplementation(
        () =>
          new Promise((_, reject) => {
            setTimeout(() => reject(new Error("AbortError")), 100)
          })
      )

      await expect(blogService.fetchLatestPosts()).rejects.toThrow(BlogError)
    })

    it("caches fetched data", async () => {
      await blogService.fetchLatestPosts()

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "techlis-blog-data",
        expect.stringContaining("posts")
      )
    })

    it("excludes archived posts from results", async () => {
      const cachedDataWithArchived = {
        posts: [
          {
            id: "active-post",
            title: "Active Post",
            description: "Active description",
            link: "https://example.com/active",
            pubDate: "2024-01-15T10:00:00Z",
            source: "Test Source",
            category: "ai-ml" as const,
            isArchived: false,
            createdAt: "2024-01-15T10:00:00Z",
          },
          {
            id: "archived-post",
            title: "Archived Post",
            description: "Archived description",
            link: "https://example.com/archived",
            pubDate: "2024-01-14T10:00:00Z",
            source: "Test Source",
            category: "ai-ml" as const,
            isArchived: true,
            createdAt: "2024-01-14T10:00:00Z",
          },
        ],
        lastFetch: new Date().toISOString(),
        categories: { "ai-ml": 2 },
      }

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify(cachedDataWithArchived)
      )

      const posts = await blogService.fetchLatestPosts()

      expect(posts).toHaveLength(1)
      expect(posts[0].title).toBe("Active Post")
    })
  })

  describe("getPostsByCategory", () => {
    it("filters posts by category", async () => {
      const posts = await blogService.getPostsByCategory("ai-ml")

      expect(posts).toHaveLength(1)
      expect(posts[0].category).toBe("ai-ml")
    })
  })

  describe("getTrendingPosts", () => {
    it("returns recent posts within the last week", async () => {
      const recentResponse = {
        ...mockRSSResponse,
        items: [
          {
            ...mockRSSResponse.items[0],
            pubDate: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(), // 2 days ago
          },
        ],
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(recentResponse),
      } as Response)

      const trendingPosts = await blogService.getTrendingPosts(5)

      expect(trendingPosts).toHaveLength(1)
    })

    it("limits results to specified count", async () => {
      const trendingPosts = await blogService.getTrendingPosts(1)

      expect(trendingPosts).toHaveLength(1)
    })
  })

  describe("getCachedPosts", () => {
    it("returns cached posts without fetching", () => {
      const cachedData = {
        posts: [
          {
            id: "cached-post",
            title: "Cached Post",
            description: "Cached description",
            link: "https://example.com/cached",
            pubDate: "2024-01-15T10:00:00Z",
            source: "Cached Source",
            category: "ai-ml" as const,
            isArchived: false,
            createdAt: "2024-01-15T10:00:00Z",
          },
        ],
        lastFetch: new Date().toISOString(),
        categories: { "ai-ml": 1 },
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(cachedData))

      const posts = blogService.getCachedPosts()

      expect(posts).toHaveLength(1)
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("returns empty array when no cache exists", () => {
      localStorageMock.getItem.mockReturnValue(null)

      const posts = blogService.getCachedPosts()

      expect(posts).toHaveLength(0)
    })
  })

  describe("clearCache", () => {
    it("removes cached data from localStorage", () => {
      blogService.clearCache()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "techlis-blog-data"
      )
    })
  })

  describe("error handling", () => {
    it("handles malformed JSON in cache", async () => {
      localStorageMock.getItem.mockReturnValue("invalid json")

      const posts = await blogService.fetchLatestPosts()

      // Should fetch new data instead of using corrupted cache
      expect(mockFetch).toHaveBeenCalled()
      expect(posts).toHaveLength(2)
    })

    it("handles RSS2JSON API errors", async () => {
      const errorResponse = {
        status: "error",
        message: "Invalid RSS URL",
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(errorResponse),
      } as Response)

      await expect(blogService.fetchLatestPosts()).rejects.toThrow(BlogError)
    })

    it("handles HTTP errors", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response)

      await expect(blogService.fetchLatestPosts()).rejects.toThrow(BlogError)
    })
  })

  describe("content processing", () => {
    it("cleans HTML from descriptions", async () => {
      const htmlResponse = {
        ...mockRSSResponse,
        items: [
          {
            ...mockRSSResponse.items[0],
            description:
              "<p>This has <strong>HTML</strong> tags &amp; entities</p>",
          },
        ],
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(htmlResponse),
      } as Response)

      const posts = await blogService.fetchLatestPosts()

      expect(posts[0].description).toBe("This has HTML tags & entities")
    })

    it("truncates long descriptions", async () => {
      const longDescription = "A".repeat(300)
      const longDescResponse = {
        ...mockRSSResponse,
        items: [
          {
            ...mockRSSResponse.items[0],
            description: longDescription,
          },
        ],
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(longDescResponse),
      } as Response)

      const posts = await blogService.fetchLatestPosts()

      expect(posts[0].description).toHaveLength(203) // 200 + "..."
      expect(posts[0].description).toEndWith("...")
    })

    it("generates unique post IDs", async () => {
      const posts = await blogService.fetchLatestPosts()

      expect(posts[0].id).toBeDefined()
      expect(posts[1].id).toBeDefined()
      expect(posts[0].id).not.toBe(posts[1].id)
    })
  })
})
