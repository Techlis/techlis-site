import type { BlogPost, StoredBlogData } from "@/types"
import { getBlogConfig, logger } from "@/lib/config"

export class ContentCleanupService {
  private readonly blogConfig = getBlogConfig()
  private readonly THREE_WEEKS_MS = this.blogConfig.threeWeeksMs
  private readonly FIVE_MONTHS_MS = this.blogConfig.fiveMonthsMs
  private readonly STORAGE_KEY = this.blogConfig.storageKey

  /**
   * Perform complete cleanup process
   */
  async performCleanup(): Promise<{
    archived: number
    deleted: number
    remaining: number
  }> {
    const storedData = this.getStoredData()
    const now = Date.now()

    // Separate posts into categories
    const { toArchive, toDelete, toKeep } = this.categorizePostsByAge(
      storedData.posts,
      now
    )

    // Archive posts older than 3 weeks
    const archivedPosts = toArchive.map((post) => ({
      ...post,
      isArchived: true,
    }))

    // Combine kept posts with archived posts
    const updatedPosts = [...toKeep, ...archivedPosts]

    // Update stored data
    const updatedData: StoredBlogData = {
      ...storedData,
      posts: updatedPosts,
      categories: this.calculateCategoryStats(updatedPosts),
    }

    this.saveStoredData(updatedData)

    logger.info(
      `Cleanup completed: ${toArchive.length} archived, ${toDelete.length} deleted, ${updatedPosts.length} remaining`
    )

    return {
      archived: toArchive.length,
      deleted: toDelete.length,
      remaining: updatedPosts.length,
    }
  }

  /**
   * Archive posts older than 3 weeks
   */
  async archiveOldPosts(): Promise<number> {
    const storedData = this.getStoredData()
    const now = Date.now()
    let archivedCount = 0

    const updatedPosts = storedData.posts.map((post) => {
      if (!post.isArchived && this.shouldArchivePost(post, now)) {
        archivedCount++
        return { ...post, isArchived: true }
      }
      return post
    })

    if (archivedCount > 0) {
      const updatedData: StoredBlogData = {
        ...storedData,
        posts: updatedPosts,
        categories: this.calculateCategoryStats(updatedPosts),
      }

      this.saveStoredData(updatedData)
    }

    return archivedCount
  }

  /**
   * Delete posts older than 5 months
   */
  async deleteExpiredPosts(): Promise<number> {
    const storedData = this.getStoredData()
    const now = Date.now()

    const initialCount = storedData.posts.length
    const remainingPosts = storedData.posts.filter(
      (post) => !this.shouldDeletePost(post, now)
    )

    const deletedCount = initialCount - remainingPosts.length

    if (deletedCount > 0) {
      const updatedData: StoredBlogData = {
        ...storedData,
        posts: remainingPosts,
        categories: this.calculateCategoryStats(remainingPosts),
      }

      this.saveStoredData(updatedData)
    }

    return deletedCount
  }

  /**
   * Get cleanup statistics
   */
  getCleanupStats(): {
    total: number
    active: number
    archived: number
    oldestPost: string | null
    newestPost: string | null
    postsToArchive: number
    postsToDelete: number
  } {
    const storedData = this.getStoredData()
    const now = Date.now()

    const activePosts = storedData.posts.filter((post) => !post.isArchived)
    const archivedPosts = storedData.posts.filter((post) => post.isArchived)

    const postsToArchive = activePosts.filter((post) =>
      this.shouldArchivePost(post, now)
    ).length

    const postsToDelete = storedData.posts.filter((post) =>
      this.shouldDeletePost(post, now)
    ).length

    // Find oldest and newest posts
    const sortedPosts = [...storedData.posts].sort(
      (a, b) => new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime()
    )

    return {
      total: storedData.posts.length,
      active: activePosts.length,
      archived: archivedPosts.length,
      oldestPost: sortedPosts[0]?.pubDate || null,
      newestPost: sortedPosts[sortedPosts.length - 1]?.pubDate || null,
      postsToArchive,
      postsToDelete,
    }
  }

  /**
   * Schedule automatic cleanup (runs in background)
   */
  scheduleAutomaticCleanup(): void {
    // Run cleanup immediately
    this.performCleanup().catch((error) => {
      logger.warn("Automatic cleanup failed:", error)
    })

    // Schedule periodic cleanup every 24 hours
    const cleanupInterval = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

    setInterval(() => {
      this.performCleanup().catch((error) => {
        logger.warn("Scheduled cleanup failed:", error)
      })
    }, cleanupInterval)

    logger.info("Automatic cleanup scheduled")
  }

  /**
   * Manual cleanup with detailed reporting
   */
  async performManualCleanup(): Promise<{
    success: boolean
    report: {
      archived: number
      deleted: number
      remaining: number
      errors: string[]
    }
  }> {
    const errors: string[] = []

    try {
      const result = await this.performCleanup()

      return {
        success: true,
        report: {
          ...result,
          errors,
        },
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error"
      errors.push(`Cleanup failed: ${errorMessage}`)

      return {
        success: false,
        report: {
          archived: 0,
          deleted: 0,
          remaining: 0,
          errors,
        },
      }
    }
  }

  /**
   * Restore archived posts (undo archiving)
   */
  async restoreArchivedPosts(postIds?: string[]): Promise<number> {
    const storedData = this.getStoredData()
    let restoredCount = 0

    const updatedPosts = storedData.posts.map((post) => {
      if (post.isArchived && (!postIds || postIds.includes(post.id))) {
        restoredCount++
        return { ...post, isArchived: false }
      }
      return post
    })

    if (restoredCount > 0) {
      const updatedData: StoredBlogData = {
        ...storedData,
        posts: updatedPosts,
        categories: this.calculateCategoryStats(updatedPosts),
      }

      this.saveStoredData(updatedData)
    }

    return restoredCount
  }

  /**
   * Get posts that will be affected by cleanup
   */
  getPostsForCleanup(): {
    toArchive: BlogPost[]
    toDelete: BlogPost[]
  } {
    const storedData = this.getStoredData()
    const now = Date.now()

    const { toArchive, toDelete } = this.categorizePostsByAge(
      storedData.posts,
      now
    )

    return { toArchive, toDelete }
  }

  /**
   * Categorize posts by age for cleanup decisions
   */
  private categorizePostsByAge(
    posts: BlogPost[],
    now: number
  ): {
    toArchive: BlogPost[]
    toDelete: BlogPost[]
    toKeep: BlogPost[]
  } {
    const toArchive: BlogPost[] = []
    const toDelete: BlogPost[] = []
    const toKeep: BlogPost[] = []

    posts.forEach((post) => {
      if (this.shouldDeletePost(post, now)) {
        toDelete.push(post)
      } else if (!post.isArchived && this.shouldArchivePost(post, now)) {
        toArchive.push(post)
      } else {
        toKeep.push(post)
      }
    })

    return { toArchive, toDelete, toKeep }
  }

  /**
   * Check if a post should be archived
   */
  private shouldArchivePost(post: BlogPost, now: number): boolean {
    const postAge = now - new Date(post.pubDate).getTime()
    return postAge > this.THREE_WEEKS_MS
  }

  /**
   * Check if a post should be deleted
   */
  private shouldDeletePost(post: BlogPost, now: number): boolean {
    const postAge = now - new Date(post.pubDate).getTime()
    return postAge > this.FIVE_MONTHS_MS
  }

  /**
   * Get stored blog data from localStorage
   */
  private getStoredData(): StoredBlogData {
    try {
      const cached = localStorage.getItem(this.STORAGE_KEY)
      if (!cached) {
        return { posts: [], lastFetch: "", categories: {} }
      }

      return JSON.parse(cached)
    } catch (error) {
      logger.warn("Failed to parse stored blog data:", error)
      return { posts: [], lastFetch: "", categories: {} }
    }
  }

  /**
   * Save blog data to localStorage
   */
  private saveStoredData(data: StoredBlogData): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      logger.warn("Failed to save blog data:", error)
      throw new Error("Failed to save cleanup results")
    }
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
   * Clear all blog data (nuclear option)
   */
  clearAllData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      logger.warn("Failed to clear blog data:", error)
    }
  }

  /**
   * Export blog data for backup
   */
  exportData(): string {
    const storedData = this.getStoredData()
    return JSON.stringify(storedData, null, 2)
  }

  /**
   * Import blog data from backup
   */
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData) as StoredBlogData

      // Validate data structure
      if (!data.posts || !Array.isArray(data.posts)) {
        throw new Error("Invalid data format")
      }

      this.saveStoredData(data)
      return true
    } catch (error) {
      logger.error("Failed to import blog data:", error)
      return false
    }
  }
}
