import { useState, type JSX } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Brain } from "lucide-react"
import { Button } from "@/components/ui"
import { NAVIGATION_ITEMS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string): boolean => {
    if (href === "/") return location.pathname === "/"
    return location.pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-purple-600">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">Techlis</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAVIGATION_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary-600",
                isActive(item.href)
                  ? "text-primary-600"
                  : "text-gray-600 dark:text-gray-300"
              )}
              onClick={(e) => {
                // If it's a hash link
                if (item.href.includes("#")) {
                  // If we are already on the home page
                  if (location.pathname === "/") {
                    e.preventDefault()
                    const hash = item.href.split("#")[1]
                    const element = document.getElementById(hash)
                    element?.scrollIntoView({ behavior: "smooth" })
                  }
                  // If we are NOT on home page, default behavior (navigate to /#hash) works
                }
              }}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Button asChild>
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden touch-target p-2 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900">
          <nav
            data-testid="mobile-padding"
            className="container mobile-padding py-4 space-y-3"
          >
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-600",
                  isActive(item.href)
                    ? "text-primary-600"
                    : "text-gray-600 dark:text-gray-300"
                )}
                onClick={(e) => {
                  if (item.href.includes("#")) {
                    if (location.pathname === "/") {
                      e.preventDefault()
                      const hash = item.href.split("#")[1]
                      const element = document.getElementById(hash)
                      element?.scrollIntoView({ behavior: "smooth" })
                    }
                  }
                  setIsMenuOpen(false)
                }}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-3">
              <Button asChild className="w-full touch-button">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
