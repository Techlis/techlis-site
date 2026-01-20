import { About as AboutSection } from "@/components/sections/About"
import { SelectedWork } from "@/components/sections/SelectedWork"
import { CTA } from "@/components/sections/CTA"
import { SEOHead } from "@/components/common/SEOHead"
import { generatePageSEO } from "@/lib/seo"
import type { JSX } from "react"

function About(): JSX.Element {
  const seoData = generatePageSEO("about")

  return (
    <>
      <SEOHead seoData={seoData} />
      <div className="pt-20">
        <AboutSection />
        <SelectedWork />
        <CTA />
      </div>
    </>
  )
}
export default About
export { About }
