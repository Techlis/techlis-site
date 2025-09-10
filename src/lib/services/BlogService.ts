import type {
  BlogPost,
  RSSFeed,
  StoredBlogData,
  RSS2JSONResponse,
} from "@/types"
import { BlogError } from "@/types"
import { RSS_FEEDS, CONTENT_KEYWORDS } from "@/lib/constants"
import {
  getRSS2JSONConfig,
  getBlogConfig,
  getEnvironmentConfig,
  logger,
} from "@/lib/config"

export class BlogService {
  private readonly RSS_FEEDS: RSSFeed[] = RSS_FEEDS
  private readonly rss2jsonConfig = getRSS2JSONConfig()
  private readonly blogConfig = getBlogConfig()
  private readonly envConfig = getEnvironmentConfig()

  /**
   * Fetch latest posts from all RSS feeds
   */
  async fetchLatestPosts(): Promise<BlogPost[]> {
    try {
      logger.debug("Starting to fetch latest posts")

      // Check cache first if caching is enabled
      if (this.blogConfig.cacheEnabled) {
        const cachedData = this.getCachedData()
        if (this.isCacheValid(cachedData)) {
          logger.debug("Returning cached posts")
          return cachedData.posts.filter((post) => !post.isArchived)
        }
      }

      // Fetch from all RSS feeds
      const allPosts: BlogPost[] = []

      for (const feed of this.RSS_FEEDS) {
        try {
          const posts = await this.fetchFromRSSFeedWithRetry(feed)
          allPosts.push(...posts)
          logger.debug(`Fetched ${posts.length} posts from ${feed.name}`)
        } catch (error) {
          logger.warn(`Failed to fetch from ${feed.name}:`, error)
          // Continue with other feeds even if one fails
        }
      }

      // Filter and sort posts
      const filteredPosts = this.filterRelevantPosts(allPosts)
      const sortedPosts = this.sortPostsByRelevance(filteredPosts)

      logger.info(
        `Fetched ${sortedPosts.length} relevant posts from ${this.RSS_FEEDS.length} feeds`
      )

      // Cache the results if caching is enabled
      if (this.blogConfig.cacheEnabled) {
        this.cacheData({
          posts: sortedPosts,
          lastFetch: new Date().toISOString(),
          categories: this.calculateCategoryStats(sortedPosts),
        })
      }

      return sortedPosts.filter((post) => !post.isArchived)
    } catch (error) {
      logger.error("Error fetching latest posts:", error)

      // Return cached data as fallback
      const cachedData = this.getCachedData()
      if (cachedData.posts.length > 0) {
        logger.info("Returning cached posts as fallback")
        return cachedData.posts.filter((post) => !post.isArchived)
      }

      throw new BlogError(
        "Failed to fetch blog posts and no cached data available",
        "FETCH_ERROR"
      )
    }
  }

  /**
   * Fetch posts from a single RSS feed with retry logic
   */
  private async fetchFromRSSFeedWithRetry(feed: RSSFeed): Promise<BlogPost[]> {
    let lastError: Error | null = null

    for (
      let attempt = 1;
      attempt <= this.rss2jsonConfig.retryAttempts;
      attempt++
    ) {
      try {
        logger.debug(
          `Fetching from ${feed.name} (attempt ${attempt}/${this.rss2jsonConfig.retryAttempts})`
        )
        return await this.fetchFromRSSFeed(feed)
      } catch (error) {
        lastError = error as Error

        if (error instanceof BlogError && error.code === "RATE_LIMIT") {
          // Don't retry on rate limit errors
          throw error
        }

        if (attempt < this.rss2jsonConfig.retryAttempts) {
          const delay = this.rss2jsonConfig.retryDelay * attempt
          logger.debug(`Retrying ${feed.name} in ${delay}ms`)
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    throw lastError
  }

  /**
   * Fetch posts from a single RSS feed
   */
  private async fetchFromRSSFeed(feed: RSSFeed): Promise<BlogPost[]> {
    const params = new URLSearchParams({
      rss_url: feed.url,
      api_key: this.rss2jsonConfig.apiKey,
      count: this.rss2jsonConfig.maxCount.toString(),
    })

    const controller = new AbortController()
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.rss2jsonConfig.timeout
    )

    try {
      const response = await fetch(`${this.rss2jsonConfig.baseUrl}?${params}`, {
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        if (response.status === 429) {
          throw new BlogError("Rate limit exceeded", "RATE_LIMIT", feed.name)
        }
        throw new BlogError(
          `HTTP ${response.status}: ${response.statusText}`,
          "FETCH_ERROR",
          feed.name
        )
      }

      const data: RSS2JSONResponse = await response.json()

      if (data.status !== "ok") {
        throw new BlogError(
          `RSS2JSON API error: ${data.status}`,
          "PARSE_ERROR",
          feed.name
        )
      }

      return this.transformRSSItems(data.items, feed)
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error && error.name === "AbortError") {
        throw new BlogError("Request timeout", "NETWORK_ERROR", feed.name)
      }

      if (error instanceof BlogError) {
        throw error
      }

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error"
      throw new BlogError(
        `Network error: ${errorMessage}`,
        "NETWORK_ERROR",
        feed.name
      )
    }
  }

  /**
   * Transform RSS items to BlogPost format
   */
  private transformRSSItems(
    items: RSS2JSONResponse["items"],
    feed: RSSFeed
  ): BlogPost[] {
    return items.map((item) => ({
      id: this.generatePostId(item.link, item.pubDate),
      title: item.title,
      description: this.cleanDescription(item.description),
      link: item.link,
      pubDate: item.pubDate,
      source: feed.name,
      category: feed.category,
      isArchived: false,
      createdAt: new Date().toISOString(),
    }))
  }

  /**
   * Filter posts for relevance based on keywords
   */
  private filterRelevantPosts(posts: BlogPost[]): BlogPost[] {
    return posts.filter((post) => this.isRelevantPost(post))
  }

  /**
   * Check if a post is relevant based on content keywords
   */
  private isRelevantPost(post: BlogPost): boolean {
    const content = `${post.title} ${post.description}`.toLowerCase()
    const keywords = CONTENT_KEYWORDS[post.category] || []

    return keywords.some((keyword) => content.includes(keyword.toLowerCase()))
  }

  /**
   * Sort posts by relevance (recency and priority)
   */
  private sortPostsByRelevance(posts: BlogPost[]): BlogPost[] {
    return posts.sort((a, b) => {
      // First sort by date (newer first)
      const dateA = new Date(a.pubDate).getTime()
      const dateB = new Date(b.pubDate).getTime()

      if (dateB !== dateA) {
        return dateB - dateA
      }

      // Then by feed priority
      const feedA = this.RSS_FEEDS.find((f) => f.name === a.source)
      const feedB = this.RSS_FEEDS.find((f) => f.name === b.source)

      return (feedB?.priority || 0) - (feedA?.priority || 0)
    })
  }

  /**
   * Get cached blog data from localStorage
   */
  private getCachedData(): StoredBlogData {
    if (!this.blogConfig.cacheEnabled) {
      return { posts: [], lastFetch: "", categories: {} }
    }

    try {
      const cached = localStorage.getItem(this.blogConfig.storageKey)
      if (!cached) {
        return { posts: [], lastFetch: "", categories: {} }
      }

      return JSON.parse(cached)
    } catch (error) {
      logger.warn("Failed to parse cached blog data:", error)
      return { posts: [], lastFetch: "", categories: {} }
    }
  }

  /**
   * Cache blog data to localStorage
   */
  private cacheData(data: StoredBlogData): void {
    if (!this.blogConfig.cacheEnabled) {
      return
    }

    try {
      localStorage.setItem(this.blogConfig.storageKey, JSON.stringify(data))
      logger.debug("Cached blog data successfully")
    } catch (error) {
      logger.warn("Failed to cache blog data:", error)
    }
  }

  /**
   * Check if cached data is still valid
   */
  private isCacheValid(cachedData: StoredBlogData): boolean {
    if (!this.blogConfig.cacheEnabled) {
      return false
    }

    if (!cachedData.lastFetch || cachedData.posts.length === 0) {
      return false
    }

    const lastFetch = new Date(cachedData.lastFetch).getTime()
    const now = Date.now()

    return now - lastFetch < this.blogConfig.cacheDuration
  }

  /**
   * Calculate category statistics
   */
  private calculateCategoryStats(posts: BlogPost[]): Record<string, number> {
    return posts.reduce(
      (stats, post) => {
        stats[post.category] = (stats[post.category] || 0) + 1
        return stats
      },
      {} as Record<string, number>
    )
  }

  /**
   * Generate unique post ID
   */
  private generatePostId(link: string, pubDate: string): string {
    const linkHash = btoa(link).slice(0, 8)
    const dateHash = new Date(pubDate).getTime().toString(36)
    return `${linkHash}-${dateHash}`
  }

  /**
   * Clean and truncate post description
   */
  private cleanDescription(description: string): string {
    // Remove HTML tags
    const cleaned = description.replace(/<[^>]*>/g, "")

    // Decode HTML entities
    const decoded = cleaned
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")

    // Truncate to reasonable length
    return decoded.length > 200 ? decoded.slice(0, 200) + "..." : decoded
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const allPosts = await this.fetchLatestPosts()
    return allPosts.filter((post) => post.category === category)
  }

  /**
   * Get trending posts (recent and high-priority sources)
   */
  async getTrendingPosts(limit: number = 5): Promise<BlogPost[]> {
    const allPosts = await this.fetchLatestPosts()
    const recentPosts = allPosts.filter((post) => {
      const postDate = new Date(post.pubDate).getTime()
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      return postDate > weekAgo
    })

    return recentPosts.slice(0, limit)
  }

  /**
   * Get cached posts without fetching new ones
   */
  getCachedPosts(): BlogPost[] {
    const cachedData = this.getCachedData()
    return cachedData.posts.filter((post) => !post.isArchived)
  }

  /**
   * Clear cache (useful for testing or manual refresh)
   */
  clearCache(): void {
    try {
      localStorage.removeItem(this.blogConfig.storageKey)
      logger.debug("Blog cache cleared successfully")
    } catch (error) {
      logger.warn("Failed to clear blog cache:", error)
    }
  }
}
