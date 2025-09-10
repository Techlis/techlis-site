import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ServiceCard } from "@/components/services/ServiceCard"
import type { Service } from "@/types"

const mockService: Service = {
  id: "test-service",
  title: "Test Service",
  icon: "Brain",
  description: "This is a test service description",
  features: ["Feature 1", "Feature 2"],
  technologies: ["React", "TypeScript"],
  pricing: "Starting at $5,000",
}

describe("Basic Component Tests", () => {
  it("renders ServiceCard without crashing", () => {
    render(<ServiceCard service={mockService} />)
    expect(screen.getByText("Test Service")).toBeInTheDocument()
  })
})
