import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { Services } from "@/pages/Services"
import type { Service } from "@/types"

// Mock the services data
const mockServicesData: Service[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: "Brain",
    description: "Advanced AI solutions for your business",
    features: [
      "Custom AI Models",
      "Data Analysis",
      "Predictive Analytics",
      "Natural Language Processing",
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
    pricing: "Starting at $10,000",
  },
  {
    id: "web-dev",
    title: "Web Development",
    icon: "Globe",
    description: "Modern web applications built with cutting-edge technologies",
    features: [
      "Responsive Design",
      "Progressive Web Apps",
      "API Integration",
      "Performance Optimization",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Next.js"],
    pricing: "Starting at $5,000",
  },
  {
    id: "cloud-arch",
    title: "Cloud Architecture",
    icon: "Cloud",
    description: "Scalable cloud solutions for enterprise applications",
    features: [
      "Infrastructure Design",
      "Auto-scaling",
      "Security Implementation",
      "Cost Optimization",
    ],
    technologies: ["AWS", "Azure", "Docker", "Kubernetes"],
    pricing: "Starting at $15,000",
  },
]

// Mock the services data import
vi.mock("@/content/data/services.json", () => {
  return {
    default: mockServicesData,
  }
})

// Mock the SEO functions
vi.mock("@/lib/seo", () => ({
  generatePageSEO: vi.fn(() => ({
    title: "Services - Techlis",
    description: "Our comprehensive technology services",
    keywords: ["services", "AI", "web development"],
    structuredData: {},
  })),
  generateServicesListStructuredData: vi.fn(() => ({})),
}))

// Mock the toast hook
const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
}

vi.mock("@/components/ui", () => ({
  ServiceGridSkeleton: ({ count }: { count: number }) => (
    <div data-testid="service-grid-skeleton">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} data-testid={`skeleton-${i}`}>
          Loading...
        </div>
      ))}
    </div>
  ),
  useToast: () => mockToast,
}))

// Mock the error boundary
vi.mock("@/components/common", () => ({
  ServicesErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="services-error-boundary">{children}</div>
  ),
  SEOHead: ({
    seoData,
  }: {
    seoData: {
      title: string
      description?: string
      keywords?: string[]
      structuredData?: object
    }
  }) => <div data-testid="seo-head" data-title={seoData.title} />,
}))

// Mock the services components
vi.mock("@/components/services", () => ({
  ServicesGrid: ({ services }: { services: Service[] }) => (
    <div data-testid="services-grid" data-service-count={services.length}>
      {services.map((service) => (
        <div key={service.id} data-testid={`service-${service.id}`}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <span>{service.pricing}</span>
        </div>
      ))}
    </div>
  ),
  ServicesCTA: ({
    title,
    description,
    buttonText,
    onButtonClick,
  }: {
    title: string
    description: string
    buttonText: string
    onButtonClick: () => void
  }) => (
    <div data-testid="services-cta">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onButtonClick} data-testid="cta-button">
        {buttonText}
      </button>
    </div>
  ),
}))

// Mock console methods
const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})

// Wrapper component for routing
const ServicesWrapper = () => (
  <BrowserRouter>
    <Services />
  </BrowserRouter>
)

describe("Services Page Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.location.reload
    Object.defineProperty(window, "location", {
      value: { reload: vi.fn() },
      writable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("Page Loading and Data Flow", () => {
    it("shows loading skeleton initially then renders services", async () => {
      render(<ServicesWrapper />)

      // Should show loading skeleton initially
      expect(screen.getByTestId("service-grid-skeleton")).toBeInTheDocument()

      // Wait for services to load
      await waitFor(() => {
        expect(screen.getByTestId("services-grid")).toBeInTheDocument()
      })

      // Should show all services
      expect(screen.getByTestId("services-grid")).toHaveAttribute(
        "data-service-count",
        "3"
      )
      expect(screen.getByTestId("service-ai-ml")).toBeInTheDocument()
      expect(screen.getByTestId("service-web-dev")).toBeInTheDocument()
      expect(screen.getByTestId("service-cloud-arch")).toBeInTheDocument()
    })

    it("displays success toast when services load", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith(
          "Services loaded successfully"
        )
      })
    })

    it("renders SEO head with correct data", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        const seoHead = screen.getByTestId("seo-head")
        expect(seoHead).toHaveAttribute("data-title", "Services - Techlis")
      })
    })
  })

  describe("Page Structure and Content", () => {
    it("renders hero section with correct content", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(screen.getByText("Our Services")).toBeInTheDocument()
      })

      expect(
        screen.getByText(/Transform your business with our comprehensive suite/)
      ).toBeInTheDocument()
      expect(screen.getByText("Enterprise Solutions")).toBeInTheDocument()
    })

    it("displays company statistics", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(screen.getByText("50+")).toBeInTheDocument()
        expect(screen.getByText("Projects Delivered")).toBeInTheDocument()
        expect(screen.getByText("99.9%")).toBeInTheDocument()
        expect(screen.getByText("Uptime Guarantee")).toBeInTheDocument()
        expect(screen.getByText("24/7")).toBeInTheDocument()
        expect(screen.getByText("Support Available")).toBeInTheDocument()
      })
    })

    it("renders services grid section with header", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(
          screen.getByText("Comprehensive Technology Solutions")
        ).toBeInTheDocument()
        expect(screen.getByText("What We Offer")).toBeInTheDocument()
        expect(
          screen.getByText(/From AI development to cloud architecture/)
        ).toBeInTheDocument()
      })
    })

    it("renders CTA section", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("services-cta")).toBeInTheDocument()
        expect(screen.getByText("Need a Custom Solution?")).toBeInTheDocument()
        expect(screen.getByText("Get Free Consultation")).toBeInTheDocument()
      })
    })
  })

  describe("Service Data Display", () => {
    it("displays all service information correctly", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        // AI & ML Service
        expect(screen.getByText("AI & Machine Learning")).toBeInTheDocument()
        expect(
          screen.getByText("Advanced AI solutions for your business")
        ).toBeInTheDocument()
        expect(screen.getByText("Starting at $10,000")).toBeInTheDocument()

        // Web Development Service
        expect(screen.getByText("Web Development")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Modern web applications built with cutting-edge technologies"
          )
        ).toBeInTheDocument()
        expect(screen.getByText("Starting at $5,000")).toBeInTheDocument()

        // Cloud Architecture Service
        expect(screen.getByText("Cloud Architecture")).toBeInTheDocument()
        expect(
          screen.getByText(
            "Scalable cloud solutions for enterprise applications"
          )
        ).toBeInTheDocument()
        expect(screen.getByText("Starting at $15,000")).toBeInTheDocument()
      })
    })
  })

  describe("User Interactions", () => {
    it("handles CTA button click", async () => {
      const user = userEvent.setup()
      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("cta-button")).toBeInTheDocument()
      })

      const ctaButton = screen.getByTestId("cta-button")
      await user.click(ctaButton)

      expect(consoleSpy).toHaveBeenCalledWith("Services CTA clicked")
    })
  })

  describe("Error Handling", () => {
    it("shows error state when services fail to load", async () => {
      // Mock services data to throw an error
      vi.doMock("@/content/data/services.json", () => {
        throw new Error("Failed to load services")
      })

      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(screen.getByText("Something went wrong")).toBeInTheDocument()
        expect(screen.getByText(/Failed to load services/)).toBeInTheDocument()
        expect(screen.getByText("Try Again")).toBeInTheDocument()
      })
    })

    it("handles retry button click in error state", async () => {
      const user = userEvent.setup()

      // Mock services data to throw an error
      vi.doMock("@/content/data/services.json", () => {
        throw new Error("Failed to load services")
      })

      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(screen.getByText("Try Again")).toBeInTheDocument()
      })

      const retryButton = screen.getByText("Try Again")
      await user.click(retryButton)

      expect(window.location.reload).toHaveBeenCalled()
    })

    it("displays error toast when services fail to load", async () => {
      // Mock services data to throw an error
      vi.doMock("@/content/data/services.json", () => {
        throw new Error("Failed to load services")
      })

      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          "Failed to load services. Please try again later."
        )
      })
    })
  })

  describe("Responsive Design", () => {
    it("applies responsive classes for mobile layout", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        const heroSection = screen.getByLabelText(/services hero/i)
        expect(heroSection).toHaveClass("mobile-padding", "section-padding")
      })
    })

    it("shows responsive text sizing", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        const title = screen.getByText("Our Services")
        expect(title).toHaveClass(
          "text-3xl",
          "sm:text-4xl",
          "md:text-5xl",
          "lg:text-6xl"
        )
      })
    })
  })

  describe("Accessibility", () => {
    it("has proper ARIA labels and semantic structure", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(screen.getByLabelText(/services hero/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/services grid/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/company statistics/i)).toBeInTheDocument()
      })
    })

    it("has proper heading hierarchy", async () => {
      render(<ServicesWrapper />)

      await waitFor(() => {
        const h1 = screen.getByRole("heading", { level: 1 })
        expect(h1).toHaveTextContent("Our Services")

        const h2 = screen.getByRole("heading", { level: 2 })
        expect(h2).toHaveTextContent("Comprehensive Technology Solutions")
      })
    })
  })

  describe("Performance", () => {
    it("loads services data efficiently", async () => {
      const startTime = performance.now()
      render(<ServicesWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("services-grid")).toBeInTheDocument()
      })

      const endTime = performance.now()
      const loadTime = endTime - startTime

      // Should load within reasonable time (less than 1 second)
      expect(loadTime).toBeLessThan(1000)
    })

    it("shows loading state for appropriate duration", async () => {
      render(<ServicesWrapper />)

      // Should show loading initially
      expect(screen.getByTestId("service-grid-skeleton")).toBeInTheDocument()

      // Should transition to loaded state
      await waitFor(
        () => {
          expect(
            screen.queryByTestId("service-grid-skeleton")
          ).not.toBeInTheDocument()
          expect(screen.getByTestId("services-grid")).toBeInTheDocument()
        },
        { timeout: 1000 }
      )
    })
  })
})
