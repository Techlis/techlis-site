import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BlogPostCard } from "@/components/blog/BlogPostCard"
import type { BlogPost } from "@/types"

// Mock the accessibility module
vi.mock("@/lib/accessibility", () => ({
  handleKeyboardNavigation: vi.fn((event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      callback()
    }
  }),
}))

const mockPost: BlogPost = {
  id: "test-post-1",
  title: "Test Blog Post Title",
  description:
    "This is a test blog post description that should be displayed in the card component.",
  link: "https://example.com/test-post",
  pubDate: "2024-01-15T10:00:00Z",
  source: "Test Blog",
  category: "ai-ml",
  isArchived: false,
  createdAt: "2024-01-15T10:00:00Z",
}

const mockArchivedPost: BlogPost = {
  ...mockPost,
  id: "archived-post",
  title: "Archived Post",
  isArchived: true,
}

const mockOnReadMore = vi.fn()

// Mock window.open
Object.defineProperty(window, "open", {
  writable: true,
  value: vi.fn(),
})

describe("BlogPostCard", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders blog post information correctly", () => {
    render(<BlogPostCard post={mockPost} onReadMore={mockOnReadMore} />)

    expect(screen.getByText("Test Blog Post Title")).toBeInTheDocument()
    expect(
      screen.getByText(/This is a test blog post description/)
    ).toBeInTheDocument()
    expect(screen.getByText("Test Blog")).toBeInTheDocument()
  })

  it("displays category badge with correct label", () => {
    render(<BlogPostCard post={mockPost} onReadMore={mockOnReadMore} />)

    expect(screen.getByText("AI & ML")).toBeInTheDocument()
  })

  it("formats date correctly", () => {
    render(<BlogPostCard post={mockPost} onReadMore={mockOnReadMore} />)

    expect(screen.getByText("Jan 15, 2024")).toBeInTheDocument()
  })

  it("handles invalid date gracefully", () => {
    const postWithInvalidDate = {
      ...mockPost,
      pubDate: "invalid-date",
    }

    render(
      <BlogPostCard post={postWithInvalidDate} onReadMore={mockOnReadMore} />
    )

    expect(screen.getByText("Unknown date")).toBeInTheDocument()
  })

  it("truncates long titles", () => {
    const postWithLongTitle = {
      ...mockPost,
      title:
        "This is a very long blog post title that should be truncated because it exceeds the maximum length limit",
    }

    render(
      <BlogPostCard post={postWithLongTitle} onReadMore={mockOnReadMore} />
    )

    const titleElement = screen.getByText(/This is a very long blog post title/)
    expect(titleElement.textContent).toMatch(/\.\.\./)
  })

  it("truncates long descriptions", () => {
    const postWithLongDescription = {
      ...mockPost,
      description:
        "This is a very long description that should be truncated because it exceeds the maximum character limit for blog post descriptions in the card component. It should show ellipsis at the end.",
    }

    render(
      <BlogPostCard
        post={postWithLongDescription}
        onReadMore={mockOnReadMore}
      />
    )

    const descriptionElement = screen.getByText(
      /This is a very long description/
    )
    expect(descriptionElement.textContent).toMatch(/\.\.\./)
  })

  it("shows archived badge for archived posts", () => {
    render(<BlogPostCard post={mockArchivedPost} onReadMore={mockOnReadMore} />)

    expect(screen.getByText("Archived")).toBeInTheDocument()
  })

  it("applies archived styling for archived posts", () => {
    render(<BlogPostCard post={mockArchivedPost} onReadMore={mockOnReadMore} />)

    const card = screen.getByRole("article")
    expect(card).toHaveClass("opacity-75", "border-gray-300")
  })

  it("calls onReadMore when card is clicked", async () => {
    const user = userEvent.setup()
    render(<BlogPostCard post={mockPost} onReadMore={mockOnReadMore} />)

    const card = screen.getByRole("article")
    await user.click(card)

    expect(mockOnReadMore).toHaveBeenCalledWith(mockPost)
  })

  it("calls onReadMore when Read More button is clicked", async () => {
    const user = userEvent.setup()
    render(<BlogPostCard post={mockPost} onReadMore={mockOnReadMore} />)

    const readMoreButton = screen.getByRole("button", { name: "Read More" })
    await user.click(readMoreButton)

    expect(mockOnReadMore).toHaveBeenCalledWith(mockPost)
  })

  it("opens external link when external link button is clicked", async () => {
    const user = userEvent.setup()
    render(<BlogPostCard post={mockPost} onReadMore={mockOnReadMore} />)

    const externalLinkButton = screen.getByRole("button", {
      name: /open.*in new tab/i,
    })
    await user.click(externalLinkButton)

    expect(window.open).toHaveBeenCalledWith(
      "https://example.com/test-post",
      "_blank",
      "noopener,noreferrer"
    )
  })

  it("prevents event propagation when external link is clicked", async () => {
    const user = userEvent.setup()
    render(<BlogPostCard post={mockPost} onReadMore={mockOnReadMore} />)

    const externalLinkButton = screen.getByRole("button", {
      name: /open.*in new tab/i,
    })
    await user.click(externalLinkButton)

    // onReadMore should not be called when external link is clicked
    expect(mockOnReadMore).not.toHaveBeenCalled()
  })

  it("handles keyboard navigation", async () => {
    const user = userEvent.setup()
    render(<BlogPostCard post={mockPost} onReadMore={mockOnReadMore} />)

    const card = screen.getByRole("article")
    card.focus()
    await user.keyboard("{Enter}")

    expect(mockOnReadMore).toHaveBeenCalledWith(mockPost)
  })

  it("has proper accessibility attributes", () => {
    render(<BlogPostCard post={mockPost} onReadMore={mockOnReadMore} />)

    const card = screen.getByRole("article")
    expect(card).toHaveAttribute(
      "aria-labelledby",
      "blog-post-title-test-post-1"
    )
    expect(card).toHaveAttribute("tabIndex", "0")

    const title = screen.getByRole("heading")
    expect(title).toHaveAttribute("id", "blog-post-title-test-post-1")
  })

  it("applies custom className", () => {
    render(
      <BlogPostCard
        post={mockPost}
        onReadMore={mockOnReadMore}
        className="custom-class"
      />
    )

    const card = screen.getByRole("article")
    expect(card).toHaveClass("custom-class")
  })

  it("displays correct category colors for different categories", () => {
    const categories: BlogPost["category"][] = [
      "ai-ml",
      "software-dev",
      "web-mobile",
      "cloud-devops",
    ]
    const expectedLabels = [
      "AI & ML",
      "Software Dev",
      "Web & Mobile",
      "Cloud & DevOps",
    ]

    categories.forEach((category, index) => {
      const postWithCategory = { ...mockPost, category, id: `post-${index}` }
      const { unmount } = render(
        <BlogPostCard post={postWithCategory} onReadMore={mockOnReadMore} />
      )

      expect(screen.getByText(expectedLabels[index])).toBeInTheDocument()

      unmount()
    })
  })
})
