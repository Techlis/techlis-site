/**
 * Accessibility Integration Tests
 * Tests accessibility features across all pages
 */

import { render, screen, within } from "@testing-library/react"
import { vi, describe, it, expect, beforeEach } from "vitest"
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
  measureAsyncPerformance: (fn: () => Promise<void>) => fn,
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

describe("Accessibility Integration", () => {
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

  it("has proper semantic HTML structure", async () => {
    render(<App />)

    // Check for semantic HTML elements
    expect(document.querySelector("header")).toBeInTheDocument()
    expect(document.querySelector("main")).toBeInTheDocument()
    expect(document.querySelector("nav")).toBeInTheDocument()
  })

  it("has accessible navigation", async () => {
    render(<App />)

    // Check for navigation landmarks
    const nav = document.querySelector("nav")
    expect(nav).toBeInTheDocument()

    const nav = screen.getByRole("navigation")

    // Check for accessible links
    const homeLink = within(nav).getByRole("link", { name: /home/i })
    const servicesLink = within(nav).getByRole("link", { name: /services/i })
    const aboutLink = within(nav).getByRole("link", { name: /about/i })
    const blogLink = within(nav).getByRole("link", { name: /blog/i })
    const contactLink = within(nav).getByRole("link", { name: /contact/i })

    expect(homeLink).toBeInTheDocument()
    expect(servicesLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
    expect(blogLink).toBeInTheDocument()
    expect(contactLink).toBeInTheDocument()
  })

  it("has accessible mobile menu button", async () => {
    render(<App />)

    // Check for mobile menu button with proper aria-label
    const menuButton = screen.getByLabelText(/toggle menu/i)
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveAttribute("aria-label", "Toggle menu")
  })

  it("has proper heading hierarchy", async () => {
    render(<App />)

    // Should have proper heading structure (though content may be lazy loaded)
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    expect(headings.length).toBeGreaterThan(0)
  })

  it("has accessible buttons and interactive elements", async () => {
    render(<App />)

    // Check for accessible buttons
    const buttons = screen.getAllByRole("button")
    buttons.forEach((button) => {
      // Each button should be focusable
      expect(button).not.toHaveAttribute("tabindex", "-1")
    })
  })

  it("has proper focus management", async () => {
    render(<App />)

    // Check that interactive elements are focusable
    const links = screen.getAllByRole("link")
    const buttons = screen.getAllByRole("button")

    const allInteractiveElements = [...links, ...buttons]
    allInteractiveElements.forEach((element) => {
      // Should not have negative tabindex unless specifically intended
      const tabIndex = element.getAttribute("tabindex")
      if (tabIndex !== null) {
        expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(0)
      }
    })
  })

  it("uses appropriate ARIA attributes", async () => {
    render(<App />)

    // Check for proper ARIA usage
    const elementsWithAriaHidden = document.querySelectorAll("[aria-hidden]")
    elementsWithAriaHidden.forEach((element) => {
      // aria-hidden should be "true" or "false"
      const ariaHidden = element.getAttribute("aria-hidden")
      expect(["true", "false"]).toContain(ariaHidden)
    })
  })

  it("has accessible images with alt text", async () => {
    render(<App />)

    // Check that images have alt attributes
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt")
    })
  })

  

  it("supports keyboard navigation", async () => {
    render(<App />)

    // Check that focusable elements exist
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
    expect(focusableElements.length).toBeGreaterThan(0)
  })

  it("has responsive design classes", async () => {
    render(<App />)

    // Check for responsive design classes
    const responsiveElements = document.querySelectorAll(
      "[class*='sm:'], [class*='md:'], [class*='lg:'], [class*='xl:']"
    )
    expect(responsiveElements.length).toBeGreaterThan(0)
  })
})
