import { describe, it, expect, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { ToastProvider } from "@/components/ui"
import { About } from "@/pages/About"

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}))

const AboutWithRouter = () => (
  <ToastProvider>
    <BrowserRouter>
      <About />
    </BrowserRouter>
  </ToastProvider>
)

describe("About Page", () => {
  it("shows loading skeleton initially", () => {
    render(<AboutWithRouter />)

    // Check for skeleton loading elements
    expect(document.querySelector(".animate-pulse")).toBeInTheDocument()
  })

  it("shows success toast after loading", async () => {
    render(<AboutWithRouter />)

    // Wait for loading to complete and toast to appear
    await waitFor(
      () => {
        expect(
          screen.getByText("Company information loaded")
        ).toBeInTheDocument()
      },
      { timeout: 1000 }
    )
  })

  it("renders the main heading after loading", async () => {
    render(<AboutWithRouter />)

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(screen.getByText(/Transforming Ideas Into/)).toBeInTheDocument()
      },
      { timeout: 1000 }
    )
    expect(screen.getByText(/AI-Powered Solutions/)).toBeInTheDocument()
  })

  it("renders company information after loading", async () => {
    render(<AboutWithRouter />)

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(screen.getByText(/Our Mission/)).toBeInTheDocument()
      },
      { timeout: 1000 }
    )
  })

  it("renders call-to-action section after loading", async () => {
    render(<AboutWithRouter />)

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(screen.getByText(/Let's Build Something/)).toBeInTheDocument()
      },
      { timeout: 1000 }
    )
  })
})
