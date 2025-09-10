import { About, Hero, Services, Technologies, CTA } from "@/components/sections"
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
      <Services />
      <About />
      <Technologies />
      <CTA />
    </>
  )
}
export default Home
export { Home }
