import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * ScrollToTop
 * Ensures that when the route path changes, the window scroll position resets to the top.
 * - If there's a hash (#section) it will attempt to scroll that element into view (smooth)
 * - Falls back to window.scrollTo(0,0) for normal route transitions
 * - Runs ONLY on location.pathname or location.hash change, not on search param changes
 */
export function ScrollToTop(): null {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there's a hash, attempt to scroll to the element with that id
    if (hash) {
      // Use setTimeout to wait for the new page layout to paint
      const id = hash.replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
    }

    // No hash or element not found: scroll to top instantly (avoid showing mid-page)
    const scrollTop = () => {
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant" as ScrollBehavior,
        })
      } catch {
        // Fallback for test or unsupported environments
        window.scrollTo(0, 0)
      }
    }

    // Focus management: move focus to main landmark for accessibility
    const focusMain = () => {
      const main = document.querySelector("main") as HTMLElement | null
      if (main) {
        // Ensure it can receive focus programmatically
        const previousTabIndex = main.getAttribute("tabindex")
        if (previousTabIndex === null) {
          main.setAttribute("tabindex", "-1")
        }
        main.focus({ preventScroll: true })
        // Clean up tabindex if we added it to avoid leaving it in the tab order
        if (previousTabIndex === null) {
          // Use a timeout to allow focus to settle before removing (some browsers might shift focus)
          setTimeout(() => {
            main.removeAttribute("tabindex")
          }, 0)
        }
      }
    }

    scrollTop()
    focusMain()
  }, [pathname, hash])

  return null
}

export default ScrollToTop
