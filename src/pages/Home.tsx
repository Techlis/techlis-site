import { About } from "@/components/sections/About"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Process } from "@/components/sections/Process"
import { SelectedWork } from "@/components/sections/SelectedWork"
import { CTA } from "@/components/sections/CTA"
import { SEOHead } from "@/components/common/SEOHead"
import { generatePageSEO, generateWebsiteStructuredData } from "@/lib/seo"
import type { JSX } from "react"

function Home(): JSX.Element {
  const seoData = {
    ...generatePageSEO("home"),
    structuredData: generateWebsiteStructuredData(),
  }

  return (
    <>
      <SEOHead seoData={seoData} />
      <Hero />
      <SelectedWork />
      <Services />
      <Process />
      <About />
      <CTA />
    </>
  )
}
export default Home
export { Home }
