import { useEffect, type JSX } from "react"
import { updateDocumentSEO, type SEOData } from "@/lib/seo"

interface SEOHeadProps {
  seoData: SEOData
}

export function SEOHead({ seoData }: SEOHeadProps): JSX.Element {
  useEffect(() => {
    updateDocumentSEO(seoData)
  }, [seoData])

  // This component doesn't render anything visible
  return <></>
}

export default SEOHead
