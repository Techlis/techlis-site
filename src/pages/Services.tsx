import { Services as ServicesSection } from "@/components/sections/Services"
import { Process } from "@/components/sections/Process"
import { CTA } from "@/components/sections/CTA"
import { SEOHead } from "@/components/common/SEOHead"
import { generatePageSEO } from "@/lib/seo"
import type { JSX } from "react"

function Services(): JSX.Element {
  const seoData = generatePageSEO("services")

  return (
    <>
      <SEOHead seoData={seoData} />
      <div className="pt-20">
        <ServicesSection />
        <Process />
        <CTA />
      </div>
    </>
  )
}
export default Services
export { Services }
