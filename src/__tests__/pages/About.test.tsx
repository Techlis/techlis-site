import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { About } from "@/pages/About"

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

const AboutWithRouter = () => (
  <BrowserRouter>
    <About />
  </BrowserRouter>
)

describe("About Page", () => {
  it("renders the main heading", () => {
    render(<AboutWithRouter />)
    expect(screen.getByText(/Transforming Ideas Into/)).toBeInTheDocument()
    expect(screen.getByText(/AI-Powered Solutions/)).toBeInTheDocument()
  })

  it("renders company mission and vision", () => {
    render(<AboutWithRouter />)
    expect(screen.getByText(/Our Mission/)).toBeInTheDocument()
    expect(screen.getByText(/Our Vision/)).toBeInTheDocument()
    expect(screen.getByText(/Our Values/)).toBeInTheDocument()
  })

  it("renders founder information", () => {
    render(<AboutWithRouter />)
    expect(screen.getByText(/Jonny Nguyen/)).toBeInTheDocument()
    expect(screen.getByText(/Founder & CEO/)).toBeInTheDocument()
  })

  it("renders team structure information", () => {
    render(<AboutWithRouter />)
    expect(screen.getByText(/Our Global Team/)).toBeInTheDocument()
    expect(screen.getByText(/Onshore Team/)).toBeInTheDocument()
    expect(screen.getByText(/Offshore Team/)).toBeInTheDocument()
  })

  it("renders call-to-action section", () => {
    render(<AboutWithRouter />)
    expect(screen.getByText(/Let's Build Something/)).toBeInTheDocument()
    expect(screen.getByText(/Amazing/)).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Get Started Today/ })
    ).toBeInTheDocument()
  })
})
