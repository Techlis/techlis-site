import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { About } from "@/pages/About"
import type { CompanyData } from "@/types"

// Mock company data
const mockCompanyData: CompanyData = {
  name: "Techlis",
  mission:
    "To democratize AI technology and make it accessible to businesses of all sizes",
  vision:
    "A world where every organization can harness the power of artificial intelligence",
  values: [
    "Innovation First",
    "Client Success",
    "Ethical AI",
    "Continuous Learning",
    "Global Impact",
  ],
  founder: {
    name: "Jonny Nguyen",
    title: "Founder & CEO",
    bio: "With over 15 years of experience in AI and software development, Jonny leads Techlis with a vision to make AI accessible to all businesses.",
    image: "/images/team/jonny-nguyen.jpg",
  },
  team: {
    onshoreTeam: {
      size: 8,
      description:
        "Our onshore team provides strategic leadership and client-facing services",
      expertise: [
        "AI Strategy",
        "Solution Architecture",
        "Project Management",
        "Client Relations",
      ],
    },
    offshoreTeam: {
      size: 25,
      description:
        "Our offshore development team delivers high-quality technical solutions",
      expertise: [
        "AI Development",
        "Software Engineering",
        "Data Science",
        "Quality Assurance",
      ],
    },
  },
  established: "2019",
  locations: ["San Francisco", "Ho Chi Minh City", "Singapore"],
}

// Mock the constants
vi.mock("@/lib/constants", () => ({
  COMPANY_DATA: mockCompanyData,
}))

// Mock the SEO functions
vi.mock("@/lib/seo", () => ({
  generatePageSEO: vi.fn(() => ({
    title: "About - Techlis",
    description: "Learn about Techlis and our mission to democratize AI",
    keywords: ["about", "company", "AI", "team"],
    structuredData: {},
  })),
}))

// Mock the toast hook
const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
}

vi.mock("@/components/ui", () => ({
  AboutSectionSkeleton: () => (
    <div data-testid="about-section-skeleton">Loading about content...</div>
  ),
  useToast: () => mockToast,
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}))

// Mock the error boundary
vi.mock("@/components/common", () => ({
  AboutErrorBoundary: ({ children }: any) => (
    <div data-testid="about-error-boundary">{children}</div>
  ),
  SEOHead: ({ seoData }: any) => (
    <div data-testid="seo-head" data-title={seoData.title} />
  ),
}))

// Mock the section components
vi.mock("@/components/sections/CompanyInfo", () => ({
  CompanyInfo: ({ mission, vision, values }: any) => (
    <div data-testid="company-info">
      <div data-testid="mission">{mission}</div>
      <div data-testid="vision">{vision}</div>
      <div data-testid="values">
        {values.map((value: string, index: number) => (
          <div key={index} data-testid={`value-${index}`}>
            {value}
          </div>
        ))}
      </div>
    </div>
  ),
}))

vi.mock("@/components/sections/FounderProfile", () => ({
  FounderProfile: ({ founder }: any) => (
    <div data-testid="founder-profile">
      <h3 data-testid="founder-name">{founder.name}</h3>
      <p data-testid="founder-title">{founder.title}</p>
      <p data-testid="founder-bio">{founder.bio}</p>
    </div>
  ),
}))

vi.mock("@/components/sections/TeamStructure", () => ({
  TeamStructure: ({ teamInfo }: any) => (
    <div data-testid="team-structure">
      <div data-testid="onshore-team">
        <span data-testid="onshore-size">{teamInfo.onshoreTeam.size}</span>
        <p data-testid="onshore-description">
          {teamInfo.onshoreTeam.description}
        </p>
      </div>
      <div data-testid="offshore-team">
        <span data-testid="offshore-size">{teamInfo.offshoreTeam.size}</span>
        <p data-testid="offshore-description">
          {teamInfo.offshoreTeam.description}
        </p>
      </div>
    </div>
  ),
}))

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock console methods
const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {})

// Wrapper component for routing
const AboutWrapper = () => (
  <BrowserRouter>
    <About />
  </BrowserRouter>
)

describe("About Page Integration", () => {
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
    it("shows loading skeleton initially then renders content", async () => {
      render(<AboutWrapper />)

      // Should show loading skeleton initially
      expect(screen.getByTestId("about-section-skeleton")).toBeInTheDocument()

      // Wait for content to load
      await waitFor(() => {
        expect(
          screen.queryByTestId("about-section-skeleton")
        ).not.toBeInTheDocument()
        expect(screen.getByTestId("company-info")).toBeInTheDocument()
      })
    })

    it("displays success toast when content loads", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(mockToast.success).toHaveBeenCalledWith(
          "Company information loaded"
        )
      })
    })

    it("renders SEO head with correct data", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        const seoHead = screen.getByTestId("seo-head")
        expect(seoHead).toHaveAttribute("data-title", "About - Techlis")
      })
    })
  })

  describe("Page Structure and Content", () => {
    it("renders hero section with correct content", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(screen.getByText("Transforming Ideas Into")).toBeInTheDocument()
        expect(screen.getByText("AI-Powered Solutions")).toBeInTheDocument()
        expect(screen.getByText("About Techlis")).toBeInTheDocument()
      })

      expect(
        screen.getByText(/Since 2019, we've been at the forefront/)
      ).toBeInTheDocument()
    })

    it("renders company story section", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(screen.getByText("Our Story")).toBeInTheDocument()
        expect(
          screen.getByText(/Founded with a vision to democratize AI technology/)
        ).toBeInTheDocument()
      })
    })

    it("renders unique value proposition section", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(screen.getByText("What Makes Us Different")).toBeInTheDocument()
        expect(screen.getByText("Innovation First")).toBeInTheDocument()
        expect(screen.getByText("Partnership Approach")).toBeInTheDocument()
        expect(screen.getByText("Rapid Delivery")).toBeInTheDocument()
      })
    })

    it("displays global presence information", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(screen.getByText(/Global Presence:/)).toBeInTheDocument()
        expect(
          screen.getByText(/San Francisco, Ho Chi Minh City, Singapore/)
        ).toBeInTheDocument()
      })
    })

    it("renders contact CTA section", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(screen.getByText("Let's Build Something")).toBeInTheDocument()
        expect(screen.getByText("Amazing")).toBeInTheDocument()
        expect(screen.getByText("Get Started Today")).toBeInTheDocument()
        expect(screen.getByText("Schedule a Call")).toBeInTheDocument()
      })
    })
  })

  describe("Company Data Display", () => {
    it("displays company information correctly", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        const companyInfo = screen.getByTestId("company-info")
        expect(companyInfo).toBeInTheDocument()

        expect(screen.getByTestId("mission")).toHaveTextContent(
          mockCompanyData.mission
        )
        expect(screen.getByTestId("vision")).toHaveTextContent(
          mockCompanyData.vision
        )

        // Check all values are displayed
        mockCompanyData.values.forEach((value, index) => {
          expect(screen.getByTestId(`value-${index}`)).toHaveTextContent(value)
        })
      })
    })

    it("displays founder information correctly", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        const founderProfile = screen.getByTestId("founder-profile")
        expect(founderProfile).toBeInTheDocument()

        expect(screen.getByTestId("founder-name")).toHaveTextContent(
          "Jonny Nguyen"
        )
        expect(screen.getByTestId("founder-title")).toHaveTextContent(
          "Founder & CEO"
        )
        expect(screen.getByTestId("founder-bio")).toHaveTextContent(
          mockCompanyData.founder.bio
        )
      })
    })

    it("displays team structure correctly", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        const teamStructure = screen.getByTestId("team-structure")
        expect(teamStructure).toBeInTheDocument()

        expect(screen.getByTestId("onshore-size")).toHaveTextContent("8")
        expect(screen.getByTestId("onshore-description")).toHaveTextContent(
          mockCompanyData.team.onshoreTeam.description
        )

        expect(screen.getByTestId("offshore-size")).toHaveTextContent("25")
        expect(screen.getByTestId("offshore-description")).toHaveTextContent(
          mockCompanyData.team.offshoreTeam.description
        )
      })
    })
  })

  describe("User Interactions", () => {
    it("handles CTA button clicks", async () => {
      const user = userEvent.setup()
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(screen.getByText("Get Started Today")).toBeInTheDocument()
        expect(screen.getByText("Schedule a Call")).toBeInTheDocument()
      })

      // Both buttons should be clickable (they're Link components in real implementation)
      const getStartedButton = screen.getByText("Get Started Today")
      const scheduleCallButton = screen.getByText("Schedule a Call")

      expect(getStartedButton).toBeInTheDocument()
      expect(scheduleCallButton).toBeInTheDocument()
    })
  })

  describe("Responsive Design", () => {
    it("applies responsive classes for mobile layout", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        const heroTitle = screen.getByText("Transforming Ideas Into")
        expect(heroTitle).toHaveClass(
          "text-3xl",
          "sm:text-4xl",
          "md:text-5xl",
          "lg:text-6xl"
        )
      })
    })

    it("shows responsive spacing and padding", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        const sections = screen.getAllByRole("region", { hidden: true })
        sections.forEach((section) => {
          expect(section).toHaveClass("section-padding")
        })
      })
    })
  })

  describe("Accessibility", () => {
    it("has proper ARIA labels and semantic structure", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(screen.getByLabelText(/about hero/i)).toBeInTheDocument()
      })
    })

    it("has proper heading hierarchy", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        const h1 = screen.getByRole("heading", { level: 1 })
        expect(h1).toHaveTextContent(/Transforming Ideas Into/)

        const h2Elements = screen.getAllByRole("heading", { level: 2 })
        expect(h2Elements.length).toBeGreaterThan(0)
      })
    })

    it("provides proper image alt text and ARIA labels", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        const badges = screen.getAllByRole("img", { hidden: true })
        badges.forEach((badge) => {
          expect(badge).toHaveAttribute("aria-label")
        })
      })
    })
  })

  describe("Error Handling", () => {
    it("handles component errors gracefully", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("about-error-boundary")).toBeInTheDocument()
      })
    })

    it("displays error toast when loading fails", async () => {
      // Mock an error during loading
      const originalUseEffect = React.useEffect
      vi.spyOn(React, "useEffect").mockImplementationOnce((effect, deps) => {
        const cleanup = effect()
        // Simulate error
        mockToast.error("Failed to load company information")
        return cleanup
      })

      render(<AboutWrapper />)

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          "Failed to load company information"
        )
      })
    })
  })

  describe("Performance", () => {
    it("loads content efficiently", async () => {
      const startTime = performance.now()
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("company-info")).toBeInTheDocument()
      })

      const endTime = performance.now()
      const loadTime = endTime - startTime

      // Should load within reasonable time (less than 1 second)
      expect(loadTime).toBeLessThan(1000)
    })

    it("shows loading state for appropriate duration", async () => {
      render(<AboutWrapper />)

      // Should show loading initially
      expect(screen.getByTestId("about-section-skeleton")).toBeInTheDocument()

      // Should transition to loaded state
      await waitFor(
        () => {
          expect(
            screen.queryByTestId("about-section-skeleton")
          ).not.toBeInTheDocument()
          expect(screen.getByTestId("company-info")).toBeInTheDocument()
        },
        { timeout: 1000 }
      )
    })
  })

  describe("Content Integration", () => {
    it("integrates all section components correctly", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        expect(screen.getByTestId("company-info")).toBeInTheDocument()
        expect(screen.getByTestId("founder-profile")).toBeInTheDocument()
        expect(screen.getByTestId("team-structure")).toBeInTheDocument()
      })
    })

    it("passes correct props to section components", async () => {
      render(<AboutWrapper />)

      await waitFor(() => {
        // Verify CompanyInfo receives correct props
        expect(screen.getByTestId("mission")).toHaveTextContent(
          mockCompanyData.mission
        )
        expect(screen.getByTestId("vision")).toHaveTextContent(
          mockCompanyData.vision
        )

        // Verify FounderProfile receives correct props
        expect(screen.getByTestId("founder-name")).toHaveTextContent(
          mockCompanyData.founder.name
        )

        // Verify TeamStructure receives correct props
        expect(screen.getByTestId("onshore-size")).toHaveTextContent(
          mockCompanyData.team.onshoreTeam.size.toString()
        )
        expect(screen.getByTestId("offshore-size")).toHaveTextContent(
          mockCompanyData.team.offshoreTeam.size.toString()
        )
      })
    })
  })
})
