import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { About } from "@/components/sections/About"
import { Technologies } from "@/components/sections/Technologies"
import { CTA } from "@/components/sections/CTA"
import { SEOHead } from "@/components/common/SEOHead"
import { generatePageSEO, generateWebsiteStructuredData } from "@/lib/seo"
import type { JSX } from "react"

export function Home(): JSX.Element {
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
