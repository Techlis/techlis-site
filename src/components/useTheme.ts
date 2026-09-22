import { createContext, useContext } from "react"
import type { Theme } from "./ThemeProvider"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "dark" | "light"
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
