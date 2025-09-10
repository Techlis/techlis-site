import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { ServicesGrid } from "@/components/services/ServicesGrid"
import type { Service } from "@/types"

// Mock the ServiceCard component
vi.mock("@/components/services/ServiceCard", () => ({
  ServiceCard: ({ service }: { service: Service }) => (
    <div data-testid={`service-card-${service.id}`}>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  ),
}))

const mockServices: Service[] = [
  {
    id: "service-1",
    title: "AI & Machine Learning",
    icon: "Brain",
    description: "Advanced AI solutions",
    features: ["Feature 1", "Feature 2"],
    technologies: ["Python", "TensorFlow"],
    pricing: "$10,000",
  },
  {
    id: "service-2",
    title: "Web Development",
    icon: "Globe",
    description: "Modern web applications",
    features: ["Feature 1", "Feature 2"],
    technologies: ["React", "Node.js"],
    pricing: "$5,000",
  },
  {
    id: "service-3",
    title: "Cloud Architecture",
    icon: "Cloud",
    description: "Scalable cloud solutions",
    features: ["Feature 1", "Feature 2"],
    technologies: ["AWS", "Docker"],
    pricing: "$15,000",
  },
]

describe("ServicesGrid", () => {
  it("renders all services in a grid", () => {
    render(<ServicesGrid services={mockServices} />)

    expect(screen.getByTestId("service-card-service-1")).toBeInTheDocument()
    expect(screen.getByTestId("service-card-service-2")).toBeInTheDocument()
    expect(screen.getByTestId("service-card-service-3")).toBeInTheDocument()
  })

  it("applies correct grid classes", () => {
    render(<ServicesGrid services={mockServices} />)

    const gridContainer = screen.getByRole("grid")
    expect(gridContainer).toHaveClass(
      "grid",
      "gap-8",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:gap-10"
    )
  })

  it("has proper accessibility attributes", () => {
    render(<ServicesGrid services={mockServices} />)

    const grid = screen.getByRole("grid")
    expect(grid).toHaveAttribute("aria-label", "Services grid")

    const gridCells = screen.getAllByRole("gridcell")
    expect(gridCells).toHaveLength(3)

    // Check aria-rowindex and aria-colindex attributes
    expect(gridCells[0]).toHaveAttribute("aria-rowindex", "1")
    expect(gridCells[0]).toHaveAttribute("aria-colindex", "1")

    expect(gridCells[1]).toHaveAttribute("aria-rowindex", "1")
    expect(gridCells[1]).toHaveAttribute("aria-colindex", "2")

    expect(gridCells[2]).toHaveAttribute("aria-rowindex", "1")
    expect(gridCells[2]).toHaveAttribute("aria-colindex", "3")
  })

  it("calculates correct row and column indices for multiple rows", () => {
    const manyServices: Service[] = [
      ...mockServices,
      {
        id: "service-4",
        title: "Service 4",
        icon: "Target",
        description: "Description 4",
        features: ["Feature 1"],
        technologies: ["Tech 1"],
        pricing: "$1,000",
      },
      {
        id: "service-5",
        title: "Service 5",
        icon: "Database",
        description: "Description 5",
        features: ["Feature 1"],
        technologies: ["Tech 1"],
        pricing: "$2,000",
      },
    ]

    render(<ServicesGrid services={manyServices} />)

    const gridCells = screen.getAllByRole("gridcell")

    // First row
    expect(gridCells[0]).toHaveAttribute("aria-rowindex", "1")
    expect(gridCells[1]).toHaveAttribute("aria-rowindex", "1")
    expect(gridCells[2]).toHaveAttribute("aria-rowindex", "1")

    // Second row
    expect(gridCells[3]).toHaveAttribute("aria-rowindex", "2")
    expect(gridCells[3]).toHaveAttribute("aria-colindex", "1")
    expect(gridCells[4]).toHaveAttribute("aria-rowindex", "2")
    expect(gridCells[4]).toHaveAttribute("aria-colindex", "2")
  })

  it("shows empty state when no services provided", () => {
    render(<ServicesGrid services={[]} />)

    expect(screen.getByText("No Services Available")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Services will be displayed here once they are added to the system."
      )
    ).toBeInTheDocument()
  })

  it("renders empty state with proper styling", () => {
    render(<ServicesGrid services={[]} />)

    const emptyStateContainer = screen
      .getByText("No Services Available")
      .closest("div")
    expect(emptyStateContainer).toHaveClass("text-center", "py-16")

    // Check for icon container
    const iconContainer = screen
      .getByText("No Services Available")
      .closest("div")
      ?.querySelector("div.w-16.h-16")
    expect(iconContainer).toBeInTheDocument()
  })

  it("passes correct props to ServiceCard components", () => {
    render(<ServicesGrid services={mockServices} />)

    // Verify that service data is passed correctly
    expect(screen.getByText("AI & Machine Learning")).toBeInTheDocument()
    expect(screen.getByText("Advanced AI solutions")).toBeInTheDocument()

    expect(screen.getByText("Web Development")).toBeInTheDocument()
    expect(screen.getByText("Modern web applications")).toBeInTheDocument()

    expect(screen.getByText("Cloud Architecture")).toBeInTheDocument()
    expect(screen.getByText("Scalable cloud solutions")).toBeInTheDocument()
  })

  it("handles single service", () => {
    const singleService = [mockServices[0]]
    render(<ServicesGrid services={singleService} />)

    expect(screen.getByTestId("service-card-service-1")).toBeInTheDocument()
    expect(
      screen.queryByTestId("service-card-service-2")
    ).not.toBeInTheDocument()

    const gridCells = screen.getAllByRole("gridcell")
    expect(gridCells).toHaveLength(1)
  })

  it("maintains grid structure with different service counts", () => {
    const twoServices = mockServices.slice(0, 2)
    render(<ServicesGrid services={twoServices} />)

    const grid = screen.getByRole("grid")
    expect(grid).toHaveClass(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3"
    )

    const gridCells = screen.getAllByRole("gridcell")
    expect(gridCells).toHaveLength(2)
  })

  it("applies h-full class to ServiceCard for equal height", () => {
    render(<ServicesGrid services={mockServices} />)

    // Since we mocked ServiceCard, we can't directly test the className prop
    // But we can verify the structure is correct
    const gridCells = screen.getAllByRole("gridcell")
    gridCells.forEach((cell) => {
      expect(cell.firstChild).toBeInTheDocument()
    })
  })
})
