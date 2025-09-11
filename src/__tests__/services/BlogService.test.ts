import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { BlogService } from "@/lib/services/BlogService"
import type { RSS2JSONResponse, RSSFeed } from "@/types"

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
const mockFetch = vi.fn()

// Mock the CacheService to avoid complex caching logic in tests
vi.mock("@/lib/services/CacheService", () => {
  const mockCache = {
    get: vi.fn(() => null), // Always return null to force fetching
    set: vi.fn(),
    invalidateByTags: vi.fn(),
    getStats: vi.fn(() => ({ hits: 0, misses: 0, hitRate: 0, totalSize: 0 })),
  }
  
  return {
    persistentCache: mockCache,
    type: {
      CacheOptions: {}
    }
  }
})

global.fetch = mockFetch

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
      enclosure: {},
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
      enclosure: {},
      categories: ["Programming", "Development"],
    },
  ],
}

describe("BlogService", () => {
  let blogService: BlogService

  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
    localStorageMock.setItem.mockImplementation(() => {})
    localStorageMock.removeItem.mockImplementation(() => {})

    mockFetch.mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockRSSResponse),
    } as Response))

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

    it("sorts posts by date (newest first)", async () => {
      const posts = await blogService.fetchLatestPosts()

      const firstPostDate = new Date(posts[0].pubDate).getTime()
      const secondPostDate = new Date(posts[1].pubDate).getTime()

      expect(firstPostDate).toBeGreaterThan(secondPostDate)
    })
  })

  describe("getPostsByCategory", () => {
    it("filters posts by category", async () => {
      const posts = await blogService.getPostsByCategory("ai-ml")

      // Since we're mocking the cache to always return null, this will fetch all posts
      // and then filter them by category
      expect(posts.length).toBeGreaterThanOrEqual(1)
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
            pubDate: new Date().toISOString(), // now
          },
        ],
      }

      mockFetch.mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(recentResponse),
      } as Response))

      const trendingPosts = await blogService.getTrendingPosts(5)

      expect(trendingPosts).toHaveLength(1)
    })
  })

  describe("getCachedPosts", () => {
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
})