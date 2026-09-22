import { About } from "@/components/sections/About"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Process } from "@/components/sections/Process"
import { SelectedWork } from "@/components/sections/SelectedWork"
import { CTA } from "@/components/sections/CTA"
import { SEOHead } from "@/components/common/SEOHead"
import { generatePageSEO, generateWebsiteStructuredData } from "@/lib/seo"
import { useEffect, type JSX } from "react"
import { useLocation } from "react-router-dom"

function Home(): JSX.Element {
  const seoData = {
    ...generatePageSEO("home"),
    structuredData: generateWebsiteStructuredData(),
  }

  const location = useLocation()

  // Handle hash scrolling when Home component mounts or hash changes
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [location.hash])

  return (
    <>
      <SEOHead seoData={seoData} />
      <Hero />
      <div id="services">
        <Services />
      </div>
      <div id="work">
        <SelectedWork />
      </div>
      <div id="process">
        <Process />
      </div>
      <div id="about">
        <About />
      </div>
      <CTA />
    </>
  )
}
export default Home
export { Home }
