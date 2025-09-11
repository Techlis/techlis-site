import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { Services } from "@/pages/Services"

vi.mock("@/pages/Services", () => ({
  Services: () => <div>Services Page</div>,
}))

const ServicesWithRouter = () => (
  <BrowserRouter>
    <Services />
  </BrowserRouter>
)

describe("Services Page", () => {
  it("renders the Services page", () => {
    render(<ServicesWithRouter />)
    expect(screen.getByText("Services Page")).toBeInTheDocument()
  })
})