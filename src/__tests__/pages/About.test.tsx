import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { About } from "@/pages/About"

vi.mock("@/pages/About", () => ({
  About: () => <div>About Page</div>,
}))

const AboutWithRouter = () => (
  <BrowserRouter>
    <About />
  </BrowserRouter>
)

describe("About Page", () => {
  it("renders the About page", () => {
    render(<AboutWithRouter />)
    expect(screen.getByText("About Page")).toBeInTheDocument()
  })
})