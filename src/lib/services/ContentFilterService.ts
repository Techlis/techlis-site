import type { BlogPost } from "@/types"
import { CONTENT_KEYWORDS, BLOG_CONFIG } from "@/lib/constants"

export class ContentFilterService {
  private readonly TRENDING_THRESHOLD_DAYS = 7
  private readonly ENGAGEMENT_KEYWORDS = [
    "breaking",
    "new",
    "latest",
    "trending",
    "popular",
    "important",
    "major",
    "significant",
    "revolutionary",
    "innovative",
  ]

  /**
   * Filter posts for relevance based on advanced keyword matching
   */
  filterRelevantPosts(posts: BlogPost[]): BlogPost[] {
    return posts.filter((post) => this.isRelevantPost(post))
  }

  /**
   * Categorize a post based on its content
   */
  categorizePost(title: string, description: string): string {
    const content = `${title} ${description}`.toLowerCase()
    const scores: Record<string, number> = {}

    // Calculate relevance score for each category
    Object.entries(CONTENT_KEYWORDS).forEach(([category, keywords]) => {
      scores[category] = this.calculateCategoryScore(content, keywords)
    })

    // Find the category with the highest score
    const bestCategory = Object.entries(scores).reduce(
      (best, [category, score]) => {
        return score > best.score ? { category, score } : best
      },
      { category: "software-dev", score: 0 }
    )

    // Only return a category if it meets minimum threshold
    return bestCategory.score > 0 ? bestCategory.category : "software-dev"
  }

  /**
   * Detect trending posts based on recency and engagement indicators
   */
  detectTrendingPosts(posts: BlogPost[]): BlogPost[] {
    const now = Date.now()
    const trendingThreshold =
      now - this.TRENDING_THRESHOLD_DAYS * 24 * 60 * 60 * 1000

    return posts
      .filter((post) => {
        const postDate = new Date(post.pubDate).getTime()
        return postDate > trendingThreshold
      })
      .map((post) => ({
        ...post,
        trendingScore: this.calculateTrendingScore(post),
      }))
      .sort((a, b) => (b as any).trendingScore - (a as any).trendingScore)
      .slice(0, 10) // Top 10 trending posts
  }

  /**
   * Filter posts by multiple categories
   */
  filterByCategories(posts: BlogPost[], categories: string[]): BlogPost[] {
    if (categories.length === 0) return posts
    return posts.filter((post) => categories.includes(post.category))
  }

  /**
   * Get posts with high engagement potential
   */
  getHighEngagementPosts(posts: BlogPost[]): BlogPost[] {
    return posts
      .filter((post) => this.hasEngagementIndicators(post))
      .sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      )
  }

  /**
   * Advanced content relevance checking
   */
  private isRelevantPost(post: BlogPost): boolean {
    const content = `${post.title} ${post.description}`.toLowerCase()

    // Check for category-specific keywords
    const categoryKeywords = CONTENT_KEYWORDS[post.category] || []
    const hasKeywords = categoryKeywords.some((keyword) =>
      content.includes(keyword.toLowerCase())
    )

    // Check for technical depth indicators
    const hasTechnicalDepth = this.hasTechnicalDepth(content)

    // Check for quality indicators
    const hasQualityIndicators = this.hasQualityIndicators(content)

    // Filter out low-quality content
    const isNotLowQuality = !this.isLowQualityContent(content)

    return (
      hasKeywords &&
      (hasTechnicalDepth || hasQualityIndicators) &&
      isNotLowQuality
    )
  }

  /**
   * Calculate relevance score for a category
   */
  private calculateCategoryScore(content: string, keywords: string[]): number {
    let score = 0

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, "gi")
      const matches = content.match(regex)
      if (matches) {
        // Weight longer keywords higher
        const keywordWeight = keyword.length > 5 ? 2 : 1
        score += matches.length * keywordWeight
      }
    })

    return score
  }

  /**
   * Calculate trending score based on multiple factors
   */
  private calculateTrendingScore(post: BlogPost): number {
    let score = 0
    const content = `${post.title} ${post.description}`.toLowerCase()

    // Recency score (newer posts get higher scores)
    const postDate = new Date(post.pubDate).getTime()
    const now = Date.now()
    const daysSincePost = (now - postDate) / (24 * 60 * 60 * 1000)
    const recencyScore = Math.max(0, 10 - daysSincePost) // 10 points for today, decreasing

    // Engagement keywords score
    const engagementScore = this.ENGAGEMENT_KEYWORDS.reduce((acc, keyword) => {
      return content.includes(keyword) ? acc + 2 : acc
    }, 0)

    // Title length and quality score
    const titleScore = post.title.length > 30 && post.title.length < 100 ? 3 : 0

    // Source priority score (from RSS feed priority)
    const sourceScore = this.getSourcePriorityScore(post.source)

    score = recencyScore + engagementScore + titleScore + sourceScore

    return score
  }

  /**
   * Check if post has engagement indicators
   */
  private hasEngagementIndicators(post: BlogPost): boolean {
    const content = `${post.title} ${post.description}`.toLowerCase()

    return this.ENGAGEMENT_KEYWORDS.some((keyword) => content.includes(keyword))
  }

  /**
   * Check for technical depth in content
   */
  private hasTechnicalDepth(content: string): boolean {
    const technicalIndicators = [
      "implementation",
      "architecture",
      "algorithm",
      "performance",
      "optimization",
      "best practices",
      "tutorial",
      "guide",
      "deep dive",
      "analysis",
      "comparison",
      "benchmark",
    ]

    return technicalIndicators.some((indicator) => content.includes(indicator))
  }

  /**
   * Check for quality indicators
   */
  private hasQualityIndicators(content: string): boolean {
    const qualityIndicators = [
      "comprehensive",
      "detailed",
      "complete",
      "thorough",
      "expert",
      "professional",
      "enterprise",
      "production",
      "real-world",
      "case study",
    ]

    return qualityIndicators.some((indicator) => content.includes(indicator))
  }

  /**
   * Filter out low-quality content
   */
  private isLowQualityContent(content: string): boolean {
    const lowQualityIndicators = [
      "click here",
      "you won't believe",
      "shocking",
      "amazing trick",
      "hate this",
      "doctors hate",
      "one weird trick",
      "make money fast",
      "get rich quick",
    ]

    // Check for spam indicators
    const hasSpamIndicators = lowQualityIndicators.some((indicator) =>
      content.includes(indicator)
    )

    // Check for very short content
    const isTooShort = content.length < 50

    // Check for excessive capitalization
    const hasExcessiveCaps =
      (content.match(/[A-Z]/g) || []).length > content.length * 0.3

    return hasSpamIndicators || isTooShort || hasExcessiveCaps
  }

  /**
   * Get source priority score for trending calculation
   */
  private getSourcePriorityScore(sourceName: string): number {
    // This would typically come from RSS_FEEDS configuration
    const priorityMap: Record<string, number> = {
      "O'Reilly Radar": 5,
      "AWS Blog": 5,
      "Machine Learning Mastery": 4,
      "Google Developers Blog": 4,
      "Smashing Magazine": 4,
      "DEV Community": 3,
    }

    return priorityMap[sourceName] || 1
  }

  /**
   * Get category distribution statistics
   */
  getCategoryStats(
    posts: BlogPost[]
  ): Record<string, { count: number; percentage: number }> {
    const total = posts.length
    const stats: Record<string, { count: number; percentage: number }> = {}

    Object.keys(BLOG_CONFIG.CATEGORIES).forEach((category) => {
      const count = posts.filter((post) => post.category === category).length
      stats[category] = {
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }
    })

    return stats
  }

  /**
   * Filter posts by date range
   */
  filterByDateRange(
    posts: BlogPost[],
    startDate: Date,
    endDate: Date
  ): BlogPost[] {
    const start = startDate.getTime()
    const end = endDate.getTime()

    return posts.filter((post) => {
      const postDate = new Date(post.pubDate).getTime()
      return postDate >= start && postDate <= end
    })
  }

  /**
   * Search posts by keyword
   */
  searchPosts(posts: BlogPost[], query: string): BlogPost[] {
    if (!query.trim()) return posts

    const searchTerms = query
      .toLowerCase()
      .split(" ")
      .filter((term) => term.length > 2)

    return posts
      .filter((post) => {
        const content = `${post.title} ${post.description}`.toLowerCase()
        return searchTerms.some((term) => content.includes(term))
      })
      .sort((a, b) => {
        // Sort by relevance (number of matching terms)
        const aMatches = searchTerms.filter((term) =>
          `${a.title} ${a.description}`.toLowerCase().includes(term)
        ).length
        const bMatches = searchTerms.filter((term) =>
          `${b.title} ${b.description}`.toLowerCase().includes(term)
        ).length

        return bMatches - aMatches
      })
  }
}
