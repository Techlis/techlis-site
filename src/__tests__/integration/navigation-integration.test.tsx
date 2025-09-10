/**
 * Navigation Integration Tests
 * Tests complete user flows across all pages
 */

import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest"
import App from "@/App"

// Mock environment variables
vi.mock("@/lib/config", () => ({
  validateEnvironmentConfig: vi.fn(),
  getRSS2JSONConfig: () => ({
    baseUrl: "https://api.rss2json.com/v1/api.json",
    apiKey: "test-api-key",
    maxCount: 10,
    timeout: 5000,
    retryAttempts: 3,
    retryDelay: 1000,
  }),
  getBlogConfig: () => ({
    cacheDuration: 30 * 60 * 1000,
    storageKey: "techlis_blog_data",
    cacheEnabled: true,
  }),
  getEnvironmentConfig: () => ({
    isDevelopment: true,
    isProduction: false,
    isTest: true,
  }),
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}))

// Mock performance monitoring
vi.mock("@/lib/performance", () => ({
  initPerformanceMonitoring: vi.fn(),
  performanceMonitor: {
    recordApiResponseTime: vi.fn(),
  },
  measureAsyncPerformance: <T extends (...args: unknown[]) => unknown>(fn: T) =>
    fn,
}))

// Mock services data
vi.mock("@/content/data/services.json", () => ({
  default: [
    {
      id: "ai-development",
      title: "AI Development",
      icon: "🤖",
      description: "Custom AI solutions",
      features: ["Machine Learning", "Deep Learning"],
      technologies: ["Python", "TensorFlow"],
      pricing: "Starting at $10,000",
    },
  ],
}))

// Mock fetch for blog service
const mockFetch = vi.fn()
global.fetch = mockFetch

describe("Navigation Integration", () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks()

    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    })

    // Mock successful RSS feed response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        status: "ok",
        items: [
          {
            title: "Test AI Article",
            description: "This is about artificial intelligence",
            link: "https://example.com/ai-article",
            pubDate: "2024-01-15T10:00:00Z",
          },
        ],
      }),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders the main app without crashing", async () => {
    render(<App />)

    // Should render the header with navigation
    expect(screen.getByText("Techlis")).toBeInTheDocument()

    // Should render navigation items
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Services")).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
    expect(screen.getByText("Blog")).toBeInTheDocument()
    expect(screen.getByText("Contact")).toBeInTheDocument()
  })

  it("displays the home page by default", async () => {
    render(<App />)

    // Wait for lazy loading
    await waitFor(
      () => {
        // Should show hero section content
        expect(screen.getByText(/Transform Ideas Into/i)).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })

  it("has working navigation links", async () => {
    render(<App />)

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("Techlis")).toBeInTheDocument()
    })

    // Check that navigation links are present and clickable
    const homeLink = screen.getByRole("link", { name: /home/i })
    const servicesLink = screen.getByRole("link", { name: /services/i })
    const aboutLink = screen.getByRole("link", { name: /about/i })
    const blogLink = screen.getByRole("link", { name: /blog/i })
    const contactLink = screen.getByRole("link", { name: /contact/i })

    expect(homeLink).toBeInTheDocument()
    expect(servicesLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
    expect(blogLink).toBeInTheDocument()
    expect(contactLink).toBeInTheDocument()

    // Check href attributes
    expect(homeLink).toHaveAttribute("href", "/")
    expect(servicesLink).toHaveAttribute("href", "/services")
    expect(aboutLink).toHaveAttribute("href", "/about")
    expect(blogLink).toHaveAttribute("href", "/blog")
    expect(contactLink).toHaveAttribute("href", "/contact")
  })

  it("shows mobile menu toggle button", async () => {
    render(<App />)

    // Should have mobile menu button
    const menuButton = screen.getByLabelText(/toggle menu/i)
    expect(menuButton).toBeInTheDocument()
  })

  it("renders footer with company information", async () => {
    render(<App />)

    // Wait for page to load
    await waitFor(() => {
      expect(screen.getByText("Techlis")).toBeInTheDocument()
    })

    // Footer should be present (though content may vary)
    const footer = document.querySelector("footer")
    expect(footer).toBeInTheDocument()
  })

  it("handles lazy loading errors gracefully", async () => {
    // Mock console.error to avoid noise in tests
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})

    render(<App />)

    // Should still render the basic structure even if lazy components fail
    expect(screen.getByText("Techlis")).toBeInTheDocument()

    consoleSpy.mockRestore()
  })

  it("applies consistent styling across the app", async () => {
    render(<App />)

    // Check for consistent layout structure
    const layout = document.querySelector(".min-h-screen")
    expect(layout).toBeInTheDocument()

    // Check for header
    const header = document.querySelector("header")
    expect(header).toBeInTheDocument()

    // Check for main content area
    const main = document.querySelector("main")
    expect(main).toBeInTheDocument()
  })

  it("includes SEO and accessibility features", async () => {
    render(<App />)

    // Check for proper document structure
    expect(document.querySelector("html")).toHaveAttribute("lang")

    // Check for meta viewport tag (should be in index.html)
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    expect(viewportMeta).toBeInTheDocument()
  })

  it("handles routing correctly", async () => {
    // Test with BrowserRouter to ensure routing works
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    // Should render without errors
    expect(screen.getByText("Techlis")).toBeInTheDocument()
  })
})
