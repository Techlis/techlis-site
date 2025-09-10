import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ServiceCard } from "@/components/services/ServiceCard"
import type { Service } from "@/types"

// Mock the accessibility module
vi.mock("@/lib/accessibility", () => ({
  handleKeyboardNavigation: vi.fn((event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      callback()
    }
  }),
}))

const mockService: Service = {
  id: "test-service",
  title: "Test Service",
  icon: "Brain",
  description: "This is a test service description",
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4",
    "Feature 5",
    "Feature 6",
  ],
  technologies: [
    "React",
    "TypeScript",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
  ],
  pricing: "Starting at $5,000",
}

describe("ServiceCard", () => {
  it("renders service information correctly", () => {
    render(<ServiceCard service={mockService} />)

    expect(screen.getByText("Test Service")).toBeInTheDocument()
    expect(
      screen.getByText("This is a test service description")
    ).toBeInTheDocument()
    expect(screen.getByText("Starting at $5,000")).toBeInTheDocument()
  })

  it("displays features with checkmarks", () => {
    render(<ServiceCard service={mockService} />)

    expect(screen.getByText("Key Features")).toBeInTheDocument()
    expect(screen.getByText("Feature 1")).toBeInTheDocument()
    expect(screen.getByText("Feature 2")).toBeInTheDocument()
    expect(screen.getByText("Feature 3")).toBeInTheDocument()
    expect(screen.getByText("Feature 4")).toBeInTheDocument()
  })

  it("shows additional features count when more than 4 features", () => {
    render(<ServiceCard service={mockService} />)

    expect(screen.getByText("+2 more features")).toBeInTheDocument()
  })

  it("displays technologies with badges", () => {
    render(<ServiceCard service={mockService} />)

    expect(screen.getByText("Technologies")).toBeInTheDocument()
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
    expect(screen.getByText("Node.js")).toBeInTheDocument()
    expect(screen.getByText("AWS")).toBeInTheDocument()
  })

  it("shows additional technologies count when more than 4 technologies", () => {
    render(<ServiceCard service={mockService} />)

    expect(screen.getByText("+2")).toBeInTheDocument()
  })

  it("handles click events", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    const user = userEvent.setup()

    render(<ServiceCard service={mockService} />)

    const card = screen.getByRole("article")
    await user.click(card)

    expect(consoleSpy).toHaveBeenCalledWith(
      "Service card clicked: Test Service"
    )

    consoleSpy.mockRestore()
  })

  it("handles keyboard navigation", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    const user = userEvent.setup()

    render(<ServiceCard service={mockService} />)

    const card = screen.getByRole("article")
    card.focus()
    await user.keyboard("{Enter}")

    expect(consoleSpy).toHaveBeenCalledWith(
      "Service card clicked: Test Service"
    )

    consoleSpy.mockRestore()
  })

  it("has proper accessibility attributes", () => {
    render(<ServiceCard service={mockService} />)

    const card = screen.getByRole("article")
    expect(card).toHaveAttribute(
      "aria-labelledby",
      "service-title-test-service"
    )
    expect(card).toHaveAttribute("tabIndex", "0")

    const title = screen.getByRole("heading", { name: "Test Service" })
    expect(title).toHaveAttribute("id", "service-title-test-service")
  })

  it("applies custom className", () => {
    render(<ServiceCard service={mockService} className="custom-class" />)

    const card = screen.getByRole("article")
    expect(card).toHaveClass("custom-class")
  })

  it("renders Learn More button", () => {
    render(<ServiceCard service={mockService} />)

    const button = screen.getByRole("button", { name: /learn more/i })
    expect(button).toBeInTheDocument()
  })

  it("handles service with unknown icon gracefully", () => {
    const serviceWithUnknownIcon = {
      ...mockService,
      icon: "UnknownIcon",
    }

    render(<ServiceCard service={serviceWithUnknownIcon} />)

    // Should still render without crashing
    expect(screen.getByText("Test Service")).toBeInTheDocument()
  })

  it("handles service with minimal features", () => {
    const serviceWithFewFeatures = {
      ...mockService,
      features: ["Feature 1", "Feature 2"],
    }

    render(<ServiceCard service={serviceWithFewFeatures} />)

    expect(screen.getByText("Feature 1")).toBeInTheDocument()
    expect(screen.getByText("Feature 2")).toBeInTheDocument()
    expect(screen.queryByText(/more features/)).not.toBeInTheDocument()
  })

  it("handles service with minimal technologies", () => {
    const serviceWithFewTechs = {
      ...mockService,
      technologies: ["React", "TypeScript"],
    }

    render(<ServiceCard service={serviceWithFewTechs} />)

    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument()
  })
})
