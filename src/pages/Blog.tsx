import type { JSX } from "react"

export function Blog(): JSX.Element {
  return (
    <div className="container section-padding">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Coming soon - Insights and articles about AI, development, and
        technology.
      </p>
    </div>
  )
}
