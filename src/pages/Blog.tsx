import * as React from "react"
import type { JSX } from "react"
import { BlogService } from "@/lib/services/BlogService"
import {
  BlogPostCard,
  BlogFilters,
  BlogPagination,
  BlogErrorBoundary,
  BlogSkeletonGrid,
  BlogLoadingSpinner,
  BlogRefreshButton,
  useBlogErrorHandler,
} from "@/components/blog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Rss, TrendingUp } from "lucide-react"
import { SEOHead } from "@/components/common/SEOHead"
import { generatePageSEO, generateBlogStructuredData } from "@/lib/seo"
import type { BlogPost } from "@/types"

const POSTS_PER_PAGE = 9

function Blog(): JSX.Element {
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = React.useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [lastUpdated, setLastUpdated] = React.useState<string>("")
  const { error, handleError, clearError } = useBlogErrorHandler()

  const blogService = React.useMemo(() => new BlogService(), [])

  // Generate SEO data with blog posts for enhanced structured data
  const seoData = React.useMemo(() => {
    const baseSEO = generatePageSEO("blog")
    return {
      ...baseSEO,
      structuredData:
        posts.length > 0
          ? generateBlogStructuredData(posts)
          : baseSEO.structuredData,
    }
  }, [posts])

  // Get unique categories from posts
  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(posts.map((post) => post.category))
    )
    return uniqueCategories.sort()
  }, [posts])

  // Get post counts by category
  const postCounts = React.useMemo(() => {
    const counts: Record<string, number> = {
      all: posts.filter((post) => !post.isArchived).length,
    }

    categories.forEach((category) => {
      counts[category] = posts.filter(
        (post) => post.category === category && !post.isArchived
      ).length
    })

    return counts
  }, [posts, categories])

  // Filter posts based on selected category
  React.useEffect(() => {
    let filtered = posts.filter((post) => !post.isArchived)

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Sort by date (newest first)
    filtered.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )

    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [posts, selectedCategory])

  // Get paginated posts
  const paginatedPosts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    return filteredPosts.slice(startIndex, endIndex)
  }, [filteredPosts, currentPage])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // Load initial posts
  const loadPosts = React.useCallback(
    async (showLoading = true) => {
      try {
        if (showLoading) {
          setIsLoading(true)
        } else {
          setIsRefreshing(true)
        }

        clearError()
        const fetchedPosts = await blogService.fetchLatestPosts()
        setPosts(fetchedPosts)
        setLastUpdated(new Date().toLocaleString())
      } catch (err) {
        console.error("Failed to load blog posts:", err)
        handleError(err as Error)

        // Try to load cached posts as fallback
        try {
          const cachedPosts = blogService.getCachedPosts()
          if (cachedPosts.length > 0) {
            setPosts(cachedPosts)
            setLastUpdated("Cached content")
          }
        } catch (cacheErr) {
          console.error("Failed to load cached posts:", cacheErr)
        }
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    },
    [blogService, handleError, clearError]
  )

  // Initial load with preloading
  React.useEffect(() => {
    // Preload posts in background
    blogService.preloadPosts()
    loadPosts()
  }, [loadPosts, blogService])

  // Auto-refresh every 30 minutes
  React.useEffect(() => {
    const interval = setInterval(
      () => {
        loadPosts(false)
      },
      30 * 60 * 1000
    ) // 30 minutes

    return () => clearInterval(interval)
  }, [loadPosts])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of blog content
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleReadMore = (post: BlogPost) => {
    // Open external link in new tab
    window.open(post.link, "_blank", "noopener,noreferrer")
  }

  const handleRefresh = () => {
    loadPosts(false)
  }

  const handleRetry = () => {
    clearError()
    loadPosts()
  }

  if (isLoading) {
    return (
      <div className="container section-padding mobile-padding">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Tech Insights & Articles
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Stay updated with the latest trends in AI, software development, and
            technology.
          </p>
        </div>

        <BlogSkeletonGrid count={6} />
      </div>
    )
  }

  return (
    <BlogErrorBoundary onRetry={handleRetry} fallbackContent={posts}>
      <SEOHead seoData={seoData} />
      <div className="container section-padding mobile-padding">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Rss
              className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600"
              aria-hidden="true"
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Tech Insights & Articles
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6 px-2">
            Curated content about AI, machine learning, software development,
            and cloud technologies.
          </p>

          {/* Stats and Last Updated */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500"
            role="region"
            aria-label="Blog statistics"
          >
            <div className="flex items-center gap-1">
              <TrendingUp
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                aria-hidden="true"
              />
              <span aria-live="polite">
                {posts.filter((p) => !p.isArchived).length} active posts
              </span>
            </div>
            {lastUpdated && (
              <div className="text-center" aria-live="polite">
                Last updated: {lastUpdated}
              </div>
            )}
            <BlogRefreshButton
              onRefresh={handleRefresh}
              isLoading={isRefreshing}
            />
          </div>
        </header>

        {error && (
          <Card className="border-red-200 bg-red-50 mb-8">
            <CardContent className="p-6">
              <p className="text-red-600 mb-4">{error.message}</p>
              <Button
                variant="outline"
                onClick={handleRetry}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        {categories.length > 0 && (
          <div className="mb-8">
            <BlogFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              postCounts={postCounts}
            />
          </div>
        )}

        {/* Posts Grid */}
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {paginatedPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          /* Empty State */
          <Card className="text-center py-12">
            <CardContent>
              <Rss className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedCategory === "all"
                  ? "No posts available"
                  : "No posts in this category"}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedCategory === "all"
                  ? "We're working on bringing you the latest tech content. Check back soon!"
                  : "Try selecting a different category or check back later for new content."}
              </p>
              {selectedCategory !== "all" && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory("all")}
                >
                  View All Posts
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Loading overlay for refresh */}
        {isRefreshing && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <Card className="p-6">
              <BlogLoadingSpinner message="Refreshing posts..." />
            </Card>
          </div>
        )}
      </div>
    </BlogErrorBoundary>
  )
}
export default Blog
export { Blog }
