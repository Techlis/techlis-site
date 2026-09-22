/**
 * Accessibility utilities for keyboard navigation and screen reader support
 */

/**
 * Handle keyboard navigation for interactive elements
 */
export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  callback: () => void
): void {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault()
    callback()
  }
}

/**
 * Generate unique IDs for accessibility labels
 */
export function generateAccessibilityId(prefix: string, id: string): string {
  return `${prefix}-${id.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`
}

/**
 * Skip link props interface
 */
export interface SkipLinkProps {
  href: string
  children: React.ReactNode
}

/**
 * Screen reader only props interface
 */
export interface ScreenReaderOnlyProps {
  children: React.ReactNode
}

/**
 * Focus trap for modals and dropdowns
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[
    focusableElements.length - 1
  ] as HTMLElement

  function handleTabKey(e: KeyboardEvent) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  }

  element.addEventListener("keydown", handleTabKey)

  // Focus the first element
  firstElement?.focus()

  // Return cleanup function
  return () => {
    element.removeEventListener("keydown", handleTabKey)
  }
}

/**
 * Announce content changes to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: "polite" | "assertive" = "polite"
): void {
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", priority)
  announcement.setAttribute("aria-atomic", "true")
  announcement.className = "sr-only"
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
