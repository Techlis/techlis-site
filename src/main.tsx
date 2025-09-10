import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/globals.css"
import App from "./App.tsx"
import { initializeApp } from "@/lib/init"

// Initialize application with environment validation
try {
  initializeApp()
} catch (error) {
  console.error("Failed to initialize application:", error)
  // In production, you might want to show a user-friendly error page
}

// Load development utilities in development mode
if (import.meta.env.DEV) {
  import("@/lib/dev-utils").then(({ logEnvironmentInfo }) => {
    logEnvironmentInfo()
  })
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
