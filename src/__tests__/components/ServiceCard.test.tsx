import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ServiceCard } from "@/components/services/ServiceCard"
import type { Service } from "@/types"

const mockService: Service = {
  id: "test-service",
  title: "Test Service",
  icon: "Brain",
  description: "This is a test service description",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  technologies: ["React", "TypeScript", "Node.js"],
  pricing: "Starting at $10,000",
}

describe("ServiceCard", () => {
  it("renders service information correctly", () => {
    render(<ServiceCard service={mockService} />)

    expect(screen.getByText("Test Service")).toBeInTheDocument()
    expect(
      screen.getByText("This is a test service description")
    ).toBeInTheDocument()
    expect(screen.getByText("Starting at $10,000")).toBeInTheDocument()
    expect(screen.getByText("Feature 1")).toBeInTheDocument()
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("Learn More")).toBeInTheDocument()
  })

  it("renders with custom className", () => {
    const { container } = render(
      <ServiceCard service={mockService} className="custom-class" />
    )

    expect(container.firstChild).toHaveClass("custom-class")
  })
})
