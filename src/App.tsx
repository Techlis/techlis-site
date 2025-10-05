import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { ToastProvider } from "@/components/ui"
import { ScrollToTop } from "@/components/common/ScrollToTop"
import {
  LazyHomeWrapper,
  LazyAboutWrapper,
  LazyServicesWrapper,
  LazyBlogWrapper,
  LazyContactWrapper,
  LazyPrivacyWrapper,
  LazyTermsWrapper,
} from "@/components/lazy/LazyPages"
import { usePerformanceDashboard } from "@/components/dev/usePerformanceDashboard"
import { initPerformanceMonitoring } from "@/lib/performance"
import { validateEnvironmentConfig } from "@/lib/config"
import type { JSX } from "react"

// Initialize performance monitoring
initPerformanceMonitoring()

// Validate environment configuration on app start
try {
  validateEnvironmentConfig()
} catch (error) {
  console.error("Environment configuration error:", error)
}

function App(): JSX.Element {
  const { PerformanceDashboard } = usePerformanceDashboard()

  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<LazyHomeWrapper />} />
            <Route path="/about" element={<LazyAboutWrapper />} />
            <Route path="/services" element={<LazyServicesWrapper />} />
            <Route path="/blog" element={<LazyBlogWrapper />} />
            <Route path="/contact" element={<LazyContactWrapper />} />
            <Route path="/privacy" element={<LazyPrivacyWrapper />} />
            <Route path="/terms" element={<LazyTermsWrapper />} />
          </Routes>
        </Layout>
        {PerformanceDashboard}
      </Router>
    </ToastProvider>
  )
}

export default App
