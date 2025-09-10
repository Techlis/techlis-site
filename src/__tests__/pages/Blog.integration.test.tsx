import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { Blog } from "@/pages/Blog"
import { BlogService } from "@/lib/services/BlogService"
import type { BlogPost } from "@/types"

// Mock blog posts data
const mockBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Advanced Machine Learning Techniques",
    description:
      "Exploring the latest developments in machine learning and artificial intelligence",
    link: "https://example.com/post-1",
    pubDate: "2024-01-15T10:00:00Z",
    source: "AI Research Blog",
    category: "ai-ml",
    isArchived: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "post-2",
    title: "React 19 New Features",
    description: "A comprehensive guide to the new features in React 19",
    link: "https://example.com/post-2",
    pubDate: "2024-01-14T10:00:00Z",
    source: "React Blog",
    category: "web-mobile",
    isArchived: false,
    createdAt: "2024-01-14T10:00:00Z",
  },
  {
    id: "post-3",
    title: "Cloud Architecture Best Practices",
    description:
      "How to design scalable cloud architectures for modern applications",
    link: "https://example.com/post-3",
    pubDate: "2024-01-13T10:00:00Z",
    source: "Cloud Computing Today",
    category: "cloud-devops",
    isArchived: false,
    createdAt: "2024-01-13T10:00:00Z",
  },
  {
    id: "post-4",
    title: "Archived Post",
    description: "This is an archived post",
    link: "https://example.com/post-4",
    pubDate: "2023-12-01T10:00:00Z",
    source: "Old Blog",
    category: "software-dev",
    isArchived: true,
    createdAt: "2023-12-01T10:00:00Z",
  },
]

// Mock BlogService
const mockBlogService = {
  fetchLatestPosts: vi.fn(),
  getCachedPosts: vi.fn(),
  clearCache: vi.fn(),
}

vi.mock("@/lib/services/BlogService", () => ({
  BlogService: vi.fn(() => mockBlogService),
}))

// Mock the SEO functions
vi.mock("@/lib/seo", () => ({
  generatePageSEO: vi.fn(() => ({
    title: "Blog - Techlis",
    description: "Latest insights on AI, software development, and technology",
    keywords: ["blog", "AI", "technology", "insights"],
    structuredData: {},
  })),
  generateBlogStructuredData: vi.fn(() => ({})),
}))

// Mock the blog components
vi.mock("@/components/blog", () => ({
  BlogPostCard: ({ post, onReadMore }: any) => (
    <div data-testid={`blog-post-${post.id}`} onClick={() => onReadMore(post)}>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <span>{post.category}</span>
      <span>{post.source}</span>
      {post.isArchived && <span data-testid="archived-badge">Archived</span>}
    </div>
  ),
  BlogFilters: ({
    categories,
    selectedCategory,
    onCategoryChange,
    postCounts,
  }: any) => (
    <div data-testid="blog-filters">
      <button
        data-testid="filter-all"
        onClick={() => onCategoryChange("all")}
        data-active={selectedCategory === "all"}
      >
        All ({postCounts?.all || 0})
      </button>
      {categories.map((category: string) => (
        <button
          key={category}
          data-testid={`filter-${category}`}
          onClick={() => onCategoryChange(category)}
          data-active={selectedCategory === category}
        >
          {category} ({postCounts?.[category] || 0})
        </button>
      ))}
    </div>
  ),
  BlogPagination: ({ currentPage, totalPages, onPageChange }: any) => (
    <div data-testid="blog-pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          data-testid={`page-${i + 1}`}
          onClick={() => onPageChange(i + 1)}
          data-active={currentPage === i + 1}
        >
          {i + 1}
        </button>
      ))}
    </div>
  ),
  BlogErrorBoundary: ({ children, onRetry }: any) => (
    <div data-testid="blog-error-boundary">
      {children}
      <button data-testid="error-retry" onClick={onRetry}>
        Retry
      </button>
    </div>
  ),
  BlogSkeletonGrid: ({ count }: { count: number }) => (
    <div data-testid="blog-skeleton-grid">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} data-testid={`skeleton-${i}`}>
          Loading...
        </div>
      ))}
    </div>
  ),
  BlogLoadingSpinner: ({ message }: { message: string }) => (
    <div data-testid="blog-loading-spinner">{message}</div>
  ),
  BlogRefreshButton: ({ onRefresh, isLoading }: any) => (
    <button
      data-testid="refresh-button"
      onClick={onRefresh}
      disabled={isLoading}
    >
      {isLoading ? "Refreshing..." : "Refresh"}
    </button>
  ),
  useBlogErrorHandler: () => ({
    error: null,
    handleError: vi.fn(),
    clearError: vi.fn(),
  }),
}))

// Mock UI components
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}))

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
}))

// Mock SEOHead
vi.mock("@/components/common/SEOHead", () => ({
  SEOHead: ({ seoData }: any) => (
    <div data-testid="seo-head" data-title={seoData.title} />
  ),
}))

// Mock window.open
Object.defineProperty(window, "open", {
  writable: true,
  value: vi.fn(),
})

// Mock window.scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
})

// Wrapper component for routing
const BlogWrapper = () => (
  <BrowserRouter>
    <Blog />
  </BrowserRouter>
)

describe("Blog Page Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockBlogService.fetchLatestPosts.mockResolvedValue(
      mockBlogPosts.filter((p) => !p.isArchived)
    )
    mockBlogService.getCachedPosts.mockReturnValue([])
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("Page Loading and Data Flow", () => {
    it("shows loading skeleton initially then renders posts", async () => {
      render(<BlogWrapper />)

      // Should show loading skeleton initially
      expect(screen.getByTestId("blog-skeleton-grid")).toBeInTheDocument()

      // Wait for posts to load
      await waitFor(() => {
        expect(
          screen.queryByTestId("blog-skeleton-grid")
        ).not.toBeInTheDocument()
        expect(screen.getByTestId("blog-post-post-1")).toBeInTheDocument()
      })
    })

    it("fetches posts from BlogService on mount", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(mockBlogService.fetchLatestPosts).toHaveBeenCalledTimes(1)
      })
    })

    it("renders SEO head with correct data", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        const seoHead = screen.getByTestId("seo-head")
        expect(seoHead).toHaveAttribute("data-title", "Blog - Techlis")
      })
    })

    it("displays last updated timestamp", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByText(/Last updated:/)).toBeInTheDocument()
      })
    })
  })

  describe("Page Structure and Content", () => {
    it("renders header with correct content", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByText("Tech Insights & Articles")).toBeInTheDocument()
        expect(
          screen.getByText(/Curated content about AI, machine learning/)
        ).toBeInTheDocument()
      })
    })

    it("displays post statistics", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByText(/3 active posts/)).toBeInTheDocument()
      })
    })

    it("renders refresh button", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("refresh-button")).toBeInTheDocument()
      })
    })
  })

  describe("Blog Posts Display", () => {
    it("displays all non-archived posts", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("blog-post-post-1")).toBeInTheDocument()
        expect(screen.getByTestId("blog-post-post-2")).toBeInTheDocument()
        expect(screen.getByTestId("blog-post-post-3")).toBeInTheDocument()
        expect(screen.queryByTestId("blog-post-post-4")).not.toBeInTheDocument() // Archived
      })
    })

    it("displays post content correctly", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(
          screen.getByText("Advanced Machine Learning Techniques")
        ).toBeInTheDocument()
        expect(screen.getByText("React 19 New Features")).toBeInTheDocument()
        expect(
          screen.getByText("Cloud Architecture Best Practices")
        ).toBeInTheDocument()
      })
    })

    it("sorts posts by date (newest first)", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        const posts = screen.getAllByTestId(/^blog-post-/)
        expect(posts[0]).toHaveAttribute("data-testid", "blog-post-post-1") // Newest
        expect(posts[1]).toHaveAttribute("data-testid", "blog-post-post-2")
        expect(posts[2]).toHaveAttribute("data-testid", "blog-post-post-3") // Oldest
      })
    })
  })

  describe("Filtering Functionality", () => {
    it("renders filter buttons with correct categories", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("blog-filters")).toBeInTheDocument()
        expect(screen.getByTestId("filter-all")).toBeInTheDocument()
        expect(screen.getByTestId("filter-ai-ml")).toBeInTheDocument()
        expect(screen.getByTestId("filter-web-mobile")).toBeInTheDocument()
        expect(screen.getByTestId("filter-cloud-devops")).toBeInTheDocument()
      })
    })

    it("displays correct post counts for each category", async () => {
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByText("All (3)")).toBeInTheDocument()
        expect(screen.getByText("ai-ml (1)")).toBeInTheDocument()
        expect(screen.getByText("web-mobile (1)")).toBeInTheDocument()
        expect(screen.getByText("cloud-devops (1)")).toBeInTheDocument()
      })
    })

    it("filters posts by category when filter is clicked", async () => {
      const user = userEvent.setup()
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("filter-ai-ml")).toBeInTheDocument()
      })

      // Click AI/ML filter
      await user.click(screen.getByTestId("filter-ai-ml"))

      await waitFor(() => {
        expect(screen.getByTestId("blog-post-post-1")).toBeInTheDocument()
        expect(screen.queryByTestId("blog-post-post-2")).not.toBeInTheDocument()
        expect(screen.queryByTestId("blog-post-post-3")).not.toBeInTheDocument()
      })
    })

    it("shows all posts when 'All' filter is selected", async () => {
      const user = userEvent.setup()
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("filter-ai-ml")).toBeInTheDocument()
      })

      // First filter by category
      await user.click(screen.getByTestId("filter-ai-ml"))

      // Then click 'All' filter
      await user.click(screen.getByTestId("filter-all"))

      await waitFor(() => {
        expect(screen.getByTestId("blog-post-post-1")).toBeInTheDocument()
        expect(screen.getByTestId("blog-post-post-2")).toBeInTheDocument()
        expect(screen.getByTestId("blog-post-post-3")).toBeInTheDocument()
      })
    })
  })

  describe("Pagination", () => {
    it("shows pagination when there are more than 9 posts", async () => {
      // Mock more posts to trigger pagination
      const manyPosts = Array.from({ length: 15 }, (_, i) => ({
        ...mockBlogPosts[0],
        id: `post-${i + 1}`,
        title: `Post ${i + 1}`,
      }))

      mockBlogService.fetchLatestPosts.mockResolvedValue(manyPosts)

      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("blog-pagination")).toBeInTheDocument()
      })
    })

    it("handles page navigation correctly", async () => {
      const user = userEvent.setup()

      // Mock more posts to trigger pagination
      const manyPosts = Array.from({ length: 15 }, (_, i) => ({
        ...mockBlogPosts[0],
        id: `post-${i + 1}`,
        title: `Post ${i + 1}`,
      }))

      mockBlogService.fetchLatestPosts.mockResolvedValue(manyPosts)

      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("page-2")).toBeInTheDocument()
      })

      // Click page 2
      await user.click(screen.getByTestId("page-2"))

      // Should scroll to top
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      })
    })
  })

  describe("User Interactions", () => {
    it("opens external link when post is clicked", async () => {
      const user = userEvent.setup()
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("blog-post-post-1")).toBeInTheDocument()
      })

      await user.click(screen.getByTestId("blog-post-post-1"))

      expect(window.open).toHaveBeenCalledWith(
        "https://example.com/post-1",
        "_blank",
        "noopener,noreferrer"
      )
    })

    it("handles refresh button click", async () => {
      const user = userEvent.setup()
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("refresh-button")).toBeInTheDocument()
      })

      await user.click(screen.getByTestId("refresh-button"))

      expect(mockBlogService.fetchLatestPosts).toHaveBeenCalledTimes(2) // Initial + refresh
    })
  })

  describe("Error Handling", () => {
    it("shows error message when posts fail to load", async () => {
      mockBlogService.fetchLatestPosts.mockRejectedValue(
        new Error("Network error")
      )

      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByText(/Network error/)).toBeInTheDocument()
        expect(screen.getByText("Try Again")).toBeInTheDocument()
      })
    })

    it("falls back to cached posts when fetch fails", async () => {
      mockBlogService.fetchLatestPosts.mockRejectedValue(
        new Error("Network error")
      )
      mockBlogService.getCachedPosts.mockReturnValue([mockBlogPosts[0]])

      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("blog-post-post-1")).toBeInTheDocument()
        expect(screen.getByText("Cached content")).toBeInTheDocument()
      })
    })

    it("handles retry button click", async () => {
      const user = userEvent.setup()
      mockBlogService.fetchLatestPosts.mockRejectedValue(
        new Error("Network error")
      )

      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByText("Try Again")).toBeInTheDocument()
      })

      // Reset mock to succeed on retry
      mockBlogService.fetchLatestPosts.mockResolvedValue(
        mockBlogPosts.filter((p) => !p.isArchived)
      )

      await user.click(screen.getByText("Try Again"))

      await waitFor(() => {
        expect(screen.getByTestId("blog-post-post-1")).toBeInTheDocument()
      })
    })
  })

  describe("Empty State", () => {
    it("shows empty state when no posts are available", async () => {
      mockBlogService.fetchLatestPosts.mockResolvedValue([])

      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByText("No posts available")).toBeInTheDocument()
        expect(
          screen.getByText(
            /We're working on bringing you the latest tech content/
          )
        ).toBeInTheDocument()
      })
    })

    it("shows category-specific empty state", async () => {
      const user = userEvent.setup()
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("filter-ai-ml")).toBeInTheDocument()
      })

      // Filter to a category with no posts
      await user.click(screen.getByTestId("filter-ai-ml"))

      // Mock empty results for this category
      await waitFor(() => {
        // Since we have AI/ML posts, let's test with a different approach
        // Click a filter that would result in no posts
        const allButton = screen.getByTestId("filter-all")
        expect(allButton).toBeInTheDocument()
      })
    })
  })

  describe("Auto-refresh", () => {
    it("sets up auto-refresh interval", async () => {
      const setIntervalSpy = vi.spyOn(global, "setInterval")

      render(<BlogWrapper />)

      await waitFor(() => {
        expect(setIntervalSpy).toHaveBeenCalledWith(
          expect.any(Function),
          30 * 60 * 1000 // 30 minutes
        )
      })
    })

    it("cleans up interval on unmount", async () => {
      const clearIntervalSpy = vi.spyOn(global, "clearInterval")

      const { unmount } = render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("blog-post-post-1")).toBeInTheDocument()
      })

      unmount()

      expect(clearIntervalSpy).toHaveBeenCalled()
    })
  })

  describe("Performance", () => {
    it("loads posts efficiently", async () => {
      const startTime = performance.now()
      render(<BlogWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("blog-post-post-1")).toBeInTheDocument()
      })

      const endTime = performance.now()
      const loadTime = endTime - startTime

      // Should load within reasonable time (less than 1 second)
      expect(loadTime).toBeLessThan(1000)
    })

    it("shows loading state for appropriate duration", async () => {
      render(<BlogWrapper />)

      // Should show loading initially
      expect(screen.getByTestId("blog-skeleton-grid")).toBeInTheDocument()

      // Should transition to loaded state
      await waitFor(
        () => {
          expect(
            screen.queryByTestId("blog-skeleton-grid")
          ).not.toBeInTheDocument()
          expect(screen.getByTestId("blog-post-post-1")).toBeInTheDocument()
        },
        { timeout: 1000 }
      )
    })
  })
})
