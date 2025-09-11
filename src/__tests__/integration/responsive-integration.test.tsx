/**
 * Responsive Design Integration Tests
 * Tests responsive behavior across all pages
 */

import { render, screen, waitFor } from "@testing-library/react"
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
  measureAsyncPerformance: <T extends (...args: unknown[]) => unknown>(
    fn: T
  ): T => fn,
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

describe("Responsive Design Integration", () => {
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

  it("has responsive navigation classes", async () => {
    render(<App />)

    // Check for responsive navigation classes
    const nav = document.querySelector("nav")
    expect(nav).toHaveClass("hidden", "md:flex")

    // Check for mobile menu button
    const menuButton = screen.getByLabelText(/toggle menu/i)
    expect(menuButton).toHaveClass("md:hidden")
  })

  it("has responsive layout structure", async () => {
    render(<App />)

    // Check for responsive layout classes
    const layout = document.querySelector(".min-h-screen")
    expect(layout).toBeInTheDocument()
    expect(layout).toHaveClass("flex", "flex-col")
  })

  it("has responsive typography classes", async () => {
    render(<App />)

    // Check for responsive text classes
    const responsiveTextElements = document.querySelectorAll(
      "[class*='text-sm'], [class*='text-base'], [class*='text-lg'], [class*='text-xl'], [class*='sm:text-'], [class*='md:text-'], [class*='lg:text-']"
    )
    expect(responsiveTextElements.length).toBeGreaterThan(0)
  })

  it("has responsive spacing classes", async () => {
    render(<App />)

    // Check for responsive spacing classes
    const responsiveSpacingElements = document.querySelectorAll(
      "[class*='p-'], [class*='m-'], [class*='px-'], [class*='py-'], [class*='mx-'], [class*='my-'], [class*='sm:p-'], [class*='md:p-'], [class*='lg:p-']"
    )
    expect(responsiveSpacingElements.length).toBeGreaterThan(0)
  })

  it("has responsive grid and flex classes", async () => {
    render(<App />)

    // Check for responsive grid and flex classes
    const responsiveLayoutElements = document.querySelectorAll(
      "[class*='grid'], [class*='flex'], [class*='sm:grid-'], [class*='md:grid-'], [class*='lg:grid-'], [class*='sm:flex-'], [class*='md:flex-']"
    )
    expect(responsiveLayoutElements.length).toBeGreaterThan(0)
  })

  it("has responsive container classes", async () => {
    render(<App />)

    // Check for container classes
    const containers = document.querySelectorAll(".container")
    expect(containers.length).toBeGreaterThan(0)
  })

  it("has mobile-friendly touch targets", async () => {
    render(<App />)

    // Check for touch-friendly classes
    const touchTargets = document.querySelectorAll(
      "[class*='touch-target'], [class*='touch-button']"
    )
    expect(touchTargets.length).toBeGreaterThan(0)
  })

  it("has responsive image handling", async () => {
    render(<App />)

    // Check for responsive image classes
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      // Should have responsive or sizing classes
      const hasResponsiveClasses =
        img.className.includes("w-") ||
        img.className.includes("h-") ||
        img.className.includes("max-w-") ||
        img.className.includes("max-h-")
      expect(hasResponsiveClasses).toBe(true)
    })
  })

  it("has responsive button sizes", async () => {
    render(<App />)

    // Check for responsive button classes
    const buttons = document.querySelectorAll("button, [role='button']")
    buttons.forEach((button) => {
      // Should have appropriate sizing classes
      const hasButtonClasses =
        button.className.includes("px-") ||
        button.className.includes("py-") ||
        button.className.includes("h-") ||
        button.className.includes("w-")
      expect(hasButtonClasses).toBe(true)
    })
  })

  it("has responsive visibility classes", async () => {
    render(<App />)

    // Check for responsive visibility classes
    const hiddenElements = document.querySelectorAll(
      "[class*='hidden'], [class*='sm:block'], [class*='md:block'], [class*='lg:block'], [class*='sm:hidden'], [class*='md:hidden'], [class*='lg:hidden']"
    )
    expect(hiddenElements.length).toBeGreaterThan(0)
  })

  it("has proper mobile padding classes", async () => {
    render(<App />)

    await waitFor(async () => {
      const mobilePaddingElements =
        await screen.findAllByTestId("mobile-padding")
      expect(mobilePaddingElements.length).toBeGreaterThan(0)
    })
  })
})
