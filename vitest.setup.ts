// Early Vitest setup executed before any test environment code
// Provide a silent no-op implementation for window.scrollTo to avoid jsdom 'Not implemented' errors
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'scrollTo', {
    value: () => {},
    writable: true,
    configurable: true,
  })
}
