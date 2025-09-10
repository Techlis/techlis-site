import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { ContentCleanupService } from "@/lib/services/ContentCleanupService"
import type { BlogPost, StoredBlogData } from "@/types"

// Mock the config module
vi.mock("@/lib/config", () => ({
  getBlogConfig: () => ({
    threeWeeksMs: 21 * 24 * 60 * 60 * 1000,
    fiveMonthsMs: 5 * 30 * 24 * 60 * 60 * 1000,
    storageKey: "techlis-blog-data",
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
  clear: vi.fn(),
}
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

// Helper function to create test posts
const createTestPost = (
  id: string,
  daysAgo: number,
  isArchived: boolean = false
): BlogPost => ({
  id,
  title: `Test Post ${id}`,
  description: `Description for post ${id}`,
  link: `https://example.com/post-${id}`,
  pubDate: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
  source: "Test Source",
  category: "ai-ml",
  isArchived,
  createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
})

describe("ContentCleanupService", () => {
  let cleanupService: ContentCleanupService
  let mockStoredData: StoredBlogData

  beforeEach(() => {
    vi.clearAllMocks()

    // Create test data with posts of different ages
    mockStoredData = {
      posts: [
        createTestPost("recent", 5), // 5 days ago - should stay active
        createTestPost("old", 30), // 30 days ago - should be archived
        createTestPost("very-old", 180), // 180 days ago - should be deleted
        createTestPost("already-archived", 25, true), // Already archived
      ],
      lastFetch: new Date().toISOString(),
      categories: {
        "ai-ml": 4,
      },
    }

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockStoredData))
    localStorageMock.setItem.mockImplementation(() => {})

    cleanupService = new ContentCleanupService()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("performCleanup", () => {
    it("archives posts older than 3 weeks", async () => {
      const result = await cleanupService.performCleanup()

      expect(result.archived).toBe(1) // The 30-day old post
      expect(result.deleted).toBe(1) // The 180-day old post
      expect(result.remaining).toBe(2) // Recent + already archived
    })

    it("deletes posts older than 5 months", async () => {
      const result = await cleanupService.performCleanup()

      expect(result.deleted).toBe(1)

      // Verify the very old post was removed
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
      const postIds = savedData.posts.map((p: BlogPost) => p.id)
      expect(postIds).not.toContain("very-old")
    })

    it("keeps recent posts active", async () => {
      const result = await cleanupService.performCleanup()

      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
      const recentPost = savedData.posts.find(
        (p: BlogPost) => p.id === "recent"
      )

      expect(recentPost).toBeDefined()
      expect(recentPost.isArchived).toBe(false)
    })

    it("updates category statistics", async () => {
      await cleanupService.performCleanup()

      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
      expect(savedData.categories["ai-ml"]).toBe(2) // Only 2 posts remaining
    })

    it("saves updated data to localStorage", async () => {
      await cleanupService.performCleanup()

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "techlis-blog-data",
        expect.stringContaining("posts")
      )
    })
  })

  describe("archiveOldPosts", () => {
    it("archives only posts older than 3 weeks", async () => {
      const archivedCount = await cleanupService.archiveOldPosts()

      expect(archivedCount).toBe(1)

      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
      const oldPost = savedData.posts.find((p: BlogPost) => p.id === "old")

      expect(oldPost.isArchived).toBe(true)
    })

    it("does not archive already archived posts", async () => {
      const archivedCount = await cleanupService.archiveOldPosts()

      expect(archivedCount).toBe(1) // Only the "old" post, not "already-archived"
    })

    it("does not archive recent posts", async () => {
      await cleanupService.archiveOldPosts()

      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
      const recentPost = savedData.posts.find(
        (p: BlogPost) => p.id === "recent"
      )

      expect(recentPost.isArchived).toBe(false)
    })

    it("returns 0 when no posts need archiving", async () => {
      // Mock data with only recent posts
      const recentOnlyData = {
        posts: [createTestPost("recent1", 5), createTestPost("recent2", 10)],
        lastFetch: new Date().toISOString(),
        categories: { "ai-ml": 2 },
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(recentOnlyData))

      const archivedCount = await cleanupService.archiveOldPosts()

      expect(archivedCount).toBe(0)
    })
  })

  describe("deleteExpiredPosts", () => {
    it("deletes posts older than 5 months", async () => {
      const deletedCount = await cleanupService.deleteExpiredPosts()

      expect(deletedCount).toBe(1)

      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
      const postIds = savedData.posts.map((p: BlogPost) => p.id)

      expect(postIds).not.toContain("very-old")
    })

    it("keeps posts newer than 5 months", async () => {
      await cleanupService.deleteExpiredPosts()

      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
      const postIds = savedData.posts.map((p: BlogPost) => p.id)

      expect(postIds).toContain("recent")
      expect(postIds).toContain("old")
      expect(postIds).toContain("already-archived")
    })

    it("returns 0 when no posts need deletion", async () => {
      // Mock data with no very old posts
      const noOldPostsData = {
        posts: [createTestPost("recent", 5), createTestPost("old", 30)],
        lastFetch: new Date().toISOString(),
        categories: { "ai-ml": 2 },
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(noOldPostsData))

      const deletedCount = await cleanupService.deleteExpiredPosts()

      expect(deletedCount).toBe(0)
    })
  })

  describe("getCleanupStats", () => {
    it("returns correct statistics", () => {
      const stats = cleanupService.getCleanupStats()

      expect(stats.total).toBe(4)
      expect(stats.active).toBe(3) // 3 non-archived posts
      expect(stats.archived).toBe(1) // 1 already archived post
      expect(stats.postsToArchive).toBe(1) // 1 post older than 3 weeks
      expect(stats.postsToDelete).toBe(1) // 1 post older than 5 months
    })

    it("identifies oldest and newest posts", () => {
      const stats = cleanupService.getCleanupStats()

      expect(stats.oldestPost).toBeDefined()
      expect(stats.newestPost).toBeDefined()

      // Oldest should be the 180-day old post
      expect(new Date(stats.oldestPost!).getTime()).toBeLessThan(
        new Date(stats.newestPost!).getTime()
      )
    })

    it("handles empty data", () => {
      localStorageMock.getItem.mockReturnValue(
        JSON.stringify({
          posts: [],
          lastFetch: "",
          categories: {},
        })
      )

      const stats = cleanupService.getCleanupStats()

      expect(stats.total).toBe(0)
      expect(stats.active).toBe(0)
      expect(stats.archived).toBe(0)
      expect(stats.oldestPost).toBeNull()
      expect(stats.newestPost).toBeNull()
    })
  })

  describe("scheduleAutomaticCleanup", () => {
    it("runs cleanup immediately", async () => {
      const performCleanupSpy = vi
        .spyOn(cleanupService, "performCleanup")
        .mockResolvedValue({ archived: 0, deleted: 0, remaining: 0 })

      cleanupService.scheduleAutomaticCleanup()

      // Wait for immediate cleanup to complete
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(performCleanupSpy).toHaveBeenCalledTimes(1)
    })

    it("schedules periodic cleanup", () => {
      const setIntervalSpy = vi.spyOn(global, "setInterval")

      cleanupService.scheduleAutomaticCleanup()

      expect(setIntervalSpy).toHaveBeenCalledWith(
        expect.any(Function),
        24 * 60 * 60 * 1000 // 24 hours
      )
    })
  })

  describe("performManualCleanup", () => {
    it("returns success report on successful cleanup", async () => {
      const result = await cleanupService.performManualCleanup()

      expect(result.success).toBe(true)
      expect(result.report.archived).toBe(1)
      expect(result.report.deleted).toBe(1)
      expect(result.report.remaining).toBe(2)
      expect(result.report.errors).toHaveLength(0)
    })

    it("returns error report on cleanup failure", async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error("Storage error")
      })

      const result = await cleanupService.performManualCleanup()

      expect(result.success).toBe(false)
      expect(result.report.errors).toHaveLength(1)
      expect(result.report.errors[0]).toContain("Cleanup failed")
    })
  })

  describe("restoreArchivedPosts", () => {
    it("restores all archived posts when no IDs specified", async () => {
      const restoredCount = await cleanupService.restoreArchivedPosts()

      expect(restoredCount).toBe(1)

      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
      const restoredPost = savedData.posts.find(
        (p: BlogPost) => p.id === "already-archived"
      )

      expect(restoredPost.isArchived).toBe(false)
    })

    it("restores only specified posts", async () => {
      const restoredCount = await cleanupService.restoreArchivedPosts([
        "already-archived",
      ])

      expect(restoredCount).toBe(1)
    })

    it("returns 0 when no archived posts exist", async () => {
      const noArchivedData = {
        posts: [createTestPost("recent", 5)],
        lastFetch: new Date().toISOString(),
        categories: { "ai-ml": 1 },
      }

      localStorageMock.getItem.mockReturnValue(JSON.stringify(noArchivedData))

      const restoredCount = await cleanupService.restoreArchivedPosts()

      expect(restoredCount).toBe(0)
    })
  })

  describe("getPostsForCleanup", () => {
    it("returns posts that will be affected by cleanup", () => {
      const { toArchive, toDelete } = cleanupService.getPostsForCleanup()

      expect(toArchive).toHaveLength(1)
      expect(toArchive[0].id).toBe("old")

      expect(toDelete).toHaveLength(1)
      expect(toDelete[0].id).toBe("very-old")
    })
  })

  describe("clearAllData", () => {
    it("removes all data from localStorage", () => {
      cleanupService.clearAllData()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "techlis-blog-data"
      )
    })
  })

  describe("exportData", () => {
    it("returns JSON string of stored data", () => {
      const exported = cleanupService.exportData()

      expect(exported).toBe(JSON.stringify(mockStoredData, null, 2))
    })
  })

  describe("importData", () => {
    it("imports valid JSON data", () => {
      const newData = {
        posts: [createTestPost("imported", 1)],
        lastFetch: new Date().toISOString(),
        categories: { "ai-ml": 1 },
      }

      const success = cleanupService.importData(JSON.stringify(newData))

      expect(success).toBe(true)
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "techlis-blog-data",
        JSON.stringify(newData)
      )
    })

    it("rejects invalid JSON data", () => {
      const success = cleanupService.importData("invalid json")

      expect(success).toBe(false)
    })

    it("rejects data with invalid structure", () => {
      const invalidData = { invalid: "structure" }

      const success = cleanupService.importData(JSON.stringify(invalidData))

      expect(success).toBe(false)
    })
  })

  describe("error handling", () => {
    it("handles localStorage errors gracefully", () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error("Storage error")
      })

      const stats = cleanupService.getCleanupStats()

      expect(stats.total).toBe(0)
    })

    it("handles malformed JSON in localStorage", () => {
      localStorageMock.getItem.mockReturnValue("invalid json")

      const stats = cleanupService.getCleanupStats()

      expect(stats.total).toBe(0)
    })
  })
})
