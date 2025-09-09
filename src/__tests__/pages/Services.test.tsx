import { describe, it, expect, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { Services } from "@/pages/Services"

// Mock the services data
vi.mock("@/content/data/services.json", () => ({
  default: [
    {
      id: "ai-development",
      title: "AI & Machine Learning",
      icon: "Brain",
      description: "Enterprise-grade AI solutions",
      features: ["Custom AI Model Development", "Natural Language Processing"],
      technologies: ["Python", "TensorFlow"],
      pricing: "Starting at $25,000",
    },
  ],
}))

const ServicesWithRouter = () => (
  <BrowserRouter>
    <Services />
  </BrowserRouter>
)

describe("Services Page", () => {
  it("renders the services page with header", async () => {
    render(<ServicesWithRouter />)

    expect(screen.getByText("Our")).toBeInTheDocument()
    expect(screen.getByText("Services")).toBeInTheDocument()
    expect(
      screen.getByText(/Transform your business with our comprehensive suite/)
    ).toBeInTheDocument()
  })

  it("renders services grid after loading", async () => {
    render(<ServicesWithRouter />)

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText("AI & Machine Learning")).toBeInTheDocument()
    })

    expect(
      screen.getByText("Enterprise-grade AI solutions")
    ).toBeInTheDocument()
    expect(screen.getByText("Starting at $25,000")).toBeInTheDocument()
  })

  it("renders CTA section", () => {
    render(<ServicesWithRouter />)

    expect(screen.getByText("Need a Custom Solution?")).toBeInTheDocument()
    expect(screen.getByText("Get Free Consultation")).toBeInTheDocument()
  })
})
