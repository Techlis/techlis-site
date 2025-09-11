import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BlogFilters } from "@/components/blog/BlogFilters"

const mockOnCategoryChange = vi.fn()

const mockCategories = ["ai-ml", "software-dev", "web-mobile", "cloud-devops"]
const mockPostCounts = {
  all: 25,
  "ai-ml": 8,
  "software-dev": 10,
  "web-mobile": 5,
  "cloud-devops": 2,
}

describe("BlogFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders filter header correctly", () => {
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    expect(screen.getByText("Filter Posts")).toBeInTheDocument()
  })

  it("renders all category buttons", () => {
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    expect(screen.getByText("All Posts")).toBeInTheDocument()
    expect(screen.getByText("AI & ML")).toBeInTheDocument()
    expect(screen.getByText("Software Dev")).toBeInTheDocument()
    expect(screen.getByText("Web & Mobile")).toBeInTheDocument()
    expect(screen.getByText("Cloud & DevOps")).toBeInTheDocument()
  })

  it("displays post counts when provided", () => {
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
        postCounts={mockPostCounts}
      />
    )

    expect(screen.getByText("25")).toBeInTheDocument() // All posts count
    expect(screen.getByText("8")).toBeInTheDocument() // AI & ML count
    expect(screen.getByText("10")).toBeInTheDocument() // Software Dev count
    expect(screen.getByText("5")).toBeInTheDocument() // Web & Mobile count
    expect(screen.getByText("2")).toBeInTheDocument() // Cloud & DevOps count
  })

  it("highlights selected category", () => {
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="ai-ml"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    const aiMlButton = screen.getByRole("button", { name: /AI & ML/ })
    const allPostsButton = screen.getByRole("button", { name: /All Posts/ })

    // Selected button should have different styling (variant="default")
    expect(aiMlButton).toHaveClass("bg-gradient-to-r")
    expect(allPostsButton).not.toHaveClass("bg-gradient-to-r")
  })

  it("calls onCategoryChange when category button is clicked", async () => {
    const user = userEvent.setup()
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    const aiMlButton = screen.getByRole("button", { name: /AI & ML/ })
    await user.click(aiMlButton)

    expect(mockOnCategoryChange).toHaveBeenCalledWith("ai-ml")
  })

  it("shows clear button when category is selected", () => {
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="ai-ml"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument()
  })

  it("hides clear button when 'all' is selected", () => {
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    expect(
      screen.queryByRole("button", { name: /clear/i })
    ).not.toBeInTheDocument()
  })

  it("calls onCategoryChange with 'all' when clear button is clicked", async () => {
    const user = userEvent.setup()
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="ai-ml"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    const clearButton = screen.getByRole("button", { name: /clear/i })
    await user.click(clearButton)

    expect(mockOnCategoryChange).toHaveBeenCalledWith("all")
  })

  it("shows active filter display when category is selected", () => {
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="ai-ml"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    expect(screen.getByText("Showing posts in:")).toBeInTheDocument()
    expect(screen.getAllByText("AI & ML")).toHaveLength(2) // One in button, one in active filter
  })

  it("hides active filter display when 'all' is selected", () => {
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    expect(screen.queryByText("Showing posts in:")).not.toBeInTheDocument()
  })

  it("clears filter from active filter display", async () => {
    const user = userEvent.setup()
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="ai-ml"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    // Find the X button in the active filter display (not the main clear button)
    const activeFilterSection = screen
      .getByText("Showing posts in:")
      .closest("div")
    const clearButtonInActiveFilter =
      activeFilterSection?.querySelector("button")

    if (clearButtonInActiveFilter) {
      await user.click(clearButtonInActiveFilter)
      expect(mockOnCategoryChange).toHaveBeenCalledWith("all")
    }
  })

  it("applies custom className", () => {
    const { container } = render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
        className="custom-class"
      />
    )

    expect(container.firstChild).toHaveClass("custom-class")
  })

  it("handles empty categories array", () => {
    render(
      <BlogFilters
        categories={[]}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    )

    // Should still show "All Posts" button
    expect(screen.getByText("All Posts")).toBeInTheDocument()
  })

  it("handles zero post counts", () => {
    const zeroPostCounts = {
      all: 0,
      "ai-ml": 0,
      "software-dev": 0,
    }

    render(
      <BlogFilters
        categories={["ai-ml", "software-dev"]}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
        postCounts={zeroPostCounts}
      />
    )

    // Should not display badges with 0 count
    expect(screen.queryByText("0")).not.toBeInTheDocument()
  })

  it("handles missing post counts gracefully", () => {
    render(
      <BlogFilters
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
        postCounts={{}} // Empty post counts
      />
    )

    // Should render without crashing
    expect(screen.getByText("Filter Posts")).toBeInTheDocument()
  })
})
