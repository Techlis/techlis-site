import { SITE_CONFIG, COMPANY_DATA } from "@/lib/constants"
import type { Service, BlogPost } from "@/types"

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: "website" | "article"
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonicalUrl?: string
  structuredData?: object
}

export interface PageSEOConfig {
  title: string
  description: string
  keywords: string[]
  path: string
}

// Page-specific SEO configurations
export const PAGE_SEO_CONFIG: Record<string, PageSEOConfig> = {
  home: {
    title: "Techlis - AI Software Development Company",
    description:
      "Transform Ideas Into AI-Powered Solutions. Enterprise software development, AI integration, and cloud solutions that scale with your business.",
    keywords: [
      "AI development",
      "software development",
      "cloud architecture",
      "mobile apps",
      "enterprise solutions",
      "artificial intelligence",
      "machine learning",
      "web development",
      "DevOps",
      "technology consulting",
    ],
    path: "/",
  },
  services: {
    title: "Our Services - AI & Software Development Solutions | Techlis",
    description:
      "Comprehensive AI and software development services including cloud architecture, mobile development, web applications, and enterprise solutions. Get expert consultation today.",
    keywords: [
      "AI services",
      "software development services",
      "cloud architecture",
      "mobile app development",
      "web development",
      "enterprise software",
      "DevOps services",
      "technology consulting",
      "custom software solutions",
      "AI integration",
    ],
    path: "/services",
  },
  about: {
    title: "About Techlis - Leading AI Software Development Company",
    description:
      "Learn about Techlis, founded by Jonny Nguyen in 2020. We're a leading AI software development company with teams in San Francisco, Austin, and Ho Chi Minh City.",
    keywords: [
      "about Techlis",
      "AI software company",
      "Jonny Nguyen",
      "software development team",
      "company history",
      "technology expertise",
      "global development team",
      "AI innovation",
      "enterprise solutions",
      "software consulting",
    ],
    path: "/about",
  },
  blog: {
    title: "Tech Insights & Articles - AI, Software Development Blog | Techlis",
    description:
      "Stay updated with the latest trends in AI, machine learning, software development, and cloud technologies. Expert insights and industry analysis.",
    keywords: [
      "tech blog",
      "AI articles",
      "software development blog",
      "machine learning insights",
      "cloud technology",
      "DevOps articles",
      "web development trends",
      "technology news",
      "programming tutorials",
      "enterprise technology",
    ],
    path: "/blog",
  },
  contact: {
    title: "Contact Techlis - Get Your AI Software Development Quote",
    description:
      "Ready to transform your business with AI? Contact Techlis for expert software development, AI integration, and cloud solutions. Free consultation available.",
    keywords: [
      "contact Techlis",
      "AI development quote",
      "software development consultation",
      "enterprise solutions",
      "project consultation",
      "custom software quote",
      "AI integration services",
      "technology consulting",
      "development partnership",
      "business transformation",
    ],
    path: "/contact",
  },
}

// Generate SEO data for a specific page
export function generatePageSEO(
  pageKey: keyof typeof PAGE_SEO_CONFIG
): SEOData {
  const config = PAGE_SEO_CONFIG[pageKey]
  const fullUrl = `${SITE_CONFIG.url}${config.path}`

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    ogTitle: config.title,
    ogDescription: config.description,
    ogImage: SITE_CONFIG.ogImage,
    ogType: "website",
    twitterTitle: config.title,
    twitterDescription: config.description,
    twitterImage: SITE_CONFIG.ogImage,
    canonicalUrl: fullUrl,
    structuredData: generateOrganizationStructuredData(),
  }
}

// Generate SEO data for a service page
export function generateServiceSEO(service: Service): SEOData {
  const title = `${service.title} - Professional ${service.title} Services | Techlis`
  const description = `${service.description} Get expert ${service.title.toLowerCase()} solutions with ${service.technologies.join(", ")}. ${service.pricing}`

  return {
    title,
    description,
    keywords: [
      service.title.toLowerCase(),
      ...service.technologies.map((tech) => tech.toLowerCase()),
      "professional services",
      "enterprise solutions",
      "custom development",
    ],
    ogTitle: title,
    ogDescription: description,
    ogImage: SITE_CONFIG.ogImage,
    ogType: "website",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: SITE_CONFIG.ogImage,
    structuredData: generateServiceStructuredData(service),
  }
}

// Generate SEO data for a blog post
export function generateBlogPostSEO(post: BlogPost): SEOData {
  const title = `${post.title} | Techlis Blog`
  const description =
    post.description ||
    `Read about ${post.title} and stay updated with the latest in ${post.category.replace("-", " and ")}.`

  return {
    title,
    description,
    keywords: [
      post.category.replace("-", " "),
      "tech blog",
      "software development",
      "AI insights",
      "technology trends",
    ],
    ogTitle: title,
    ogDescription: description,
    ogImage: SITE_CONFIG.ogImage,
    ogType: "article",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: SITE_CONFIG.ogImage,
    canonicalUrl: post.link,
    structuredData: generateBlogPostStructuredData(post),
  }
}

// Generate Organization structured data
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_DATA.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    image: SITE_CONFIG.ogImage,
    foundingDate: COMPANY_DATA.established,
    founder: {
      "@type": "Person",
      name: COMPANY_DATA.founder.name,
      jobTitle: COMPANY_DATA.founder.title,
      description: COMPANY_DATA.founder.bio,
    },
    address: COMPANY_DATA.locations.map((location) => ({
      "@type": "PostalAddress",
      addressLocality: location.split(", ")[0],
      addressRegion: location.split(", ")[1] || "",
      addressCountry: location.includes("Vietnam") ? "VN" : "US",
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      email: "hello@techlis.com",
    },
    sameAs: [
      SITE_CONFIG.links.twitter,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.github,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Software Development",
      "Cloud Architecture",
      "Mobile Development",
      "Web Development",
      "DevOps",
      "Enterprise Solutions",
    ],
  }
}

// Generate Service structured data
export function generateServiceStructuredData(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: COMPANY_DATA.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/logo.png`,
    },
    serviceType: service.title,
    category: "Technology Services",
    offers: {
      "@type": "Offer",
      description: service.pricing,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
    additionalProperty: service.features.map((feature) => ({
      "@type": "PropertyValue",
      name: "Feature",
      value: feature,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Technologies`,
      itemListElement: service.technologies.map((tech, index) => ({
        "@type": "Offer",
        position: index + 1,
        name: tech,
        description: `Professional ${tech} development services`,
      })),
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Enterprise Clients",
    },
  }
}

// Generate multiple services structured data
export function generateServicesListStructuredData(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Techlis Services",
    description: "Comprehensive AI and software development services",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: COMPANY_DATA.name,
        },
      },
    })),
  }
}

// Generate Blog Post structured data
export function generateBlogPostStructuredData(post: BlogPost) {
  const categoryName = post.category.replace("-", " and ")

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description:
      post.description ||
      `Read about ${post.title} and stay updated with the latest in ${categoryName}.`,
    url: post.link,
    datePublished: post.pubDate,
    dateModified: post.pubDate,
    author: {
      "@type": "Organization",
      name: post.source,
      url: post.link,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_DATA.name,
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.link,
    },
    articleSection: categoryName,
    articleBody: post.description,
    wordCount: post.description?.split(" ").length || 100,
    keywords: [
      post.category.replace("-", " "),
      "technology",
      "software development",
      "AI",
      "machine learning",
    ],
    about: {
      "@type": "Thing",
      name: categoryName,
      description: `Articles and insights about ${categoryName}`,
    },
    isPartOf: {
      "@type": "Blog",
      name: "Techlis Tech Insights",
      url: `${SITE_CONFIG.url}/blog`,
    },
    inLanguage: "en-US",
  }
}

// Generate Blog structured data for the blog page
export function generateBlogStructuredData(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Techlis Tech Insights & Articles",
    description:
      "Stay updated with the latest trends in AI, machine learning, software development, and cloud technologies.",
    url: `${SITE_CONFIG.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: COMPANY_DATA.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/logo.png`,
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: post.link,
      datePublished: post.pubDate,
      author: {
        "@type": "Organization",
        name: post.source,
      },
    })),
    inLanguage: "en-US",
    about: [
      {
        "@type": "Thing",
        name: "Artificial Intelligence",
        description: "AI and machine learning insights",
      },
      {
        "@type": "Thing",
        name: "Software Development",
        description: "Programming and development best practices",
      },
      {
        "@type": "Thing",
        name: "Cloud Computing",
        description: "Cloud architecture and DevOps insights",
      },
    ],
  }
}

// Generate Website structured data
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_DATA.name,
      logo: `${SITE_CONFIG.url}/logo.png`,
    },
  }
}

// Generate Breadcrumb structured data
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  }
}

// Generate FAQ structured data
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Generate LocalBusiness structured data
export function generateLocalBusinessStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}#business`,
    name: COMPANY_DATA.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    image: SITE_CONFIG.ogImage,
    telephone: "+1-555-123-4567",
    email: "hello@techlis.com",
    foundingDate: COMPANY_DATA.established,
    founder: {
      "@type": "Person",
      name: COMPANY_DATA.founder.name,
      jobTitle: COMPANY_DATA.founder.title,
      description: COMPANY_DATA.founder.bio,
    },
    address: COMPANY_DATA.locations.map((location) => {
      const [city, region] = location.split(", ")
      return {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: region || "",
        addressCountry: location.includes("Vietnam") ? "VN" : "US",
      }
    }),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      email: "hello@techlis.com",
    },
    geo: [
      {
        "@type": "GeoCoordinates",
        latitude: "37.7749",
        longitude: "-122.4194",
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Francisco",
          addressRegion: "CA",
          addressCountry: "US",
        },
      },
    ],
    openingHours: "Mo-Fr 09:00-18:00",
    priceRange: "$$$$",
    serviceArea: {
      "@type": "Country",
      name: "United States",
    },
    areaServed: ["United States", "Global"],
    sameAs: [
      SITE_CONFIG.links.twitter,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.github,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Software Development",
      "Cloud Architecture",
      "Mobile Development",
      "Web Development",
      "DevOps",
      "Enterprise Solutions",
    ],
  }
}

// Utility function to update document head with SEO data
export function updateDocumentSEO(seoData: SEOData): void {
  // Update title
  document.title = seoData.title

  // Update or create meta tags
  updateMetaTag("description", seoData.description)

  if (seoData.keywords) {
    updateMetaTag("keywords", seoData.keywords.join(", "))
  }

  // Open Graph tags
  updateMetaTag("og:title", seoData.ogTitle || seoData.title, "property")
  updateMetaTag(
    "og:description",
    seoData.ogDescription || seoData.description,
    "property"
  )
  updateMetaTag("og:image", seoData.ogImage || SITE_CONFIG.ogImage, "property")
  updateMetaTag("og:type", seoData.ogType || "website", "property")
  updateMetaTag(
    "og:url",
    seoData.canonicalUrl || window.location.href,
    "property"
  )

  // Twitter Card tags
  updateMetaTag("twitter:title", seoData.twitterTitle || seoData.title)
  updateMetaTag(
    "twitter:description",
    seoData.twitterDescription || seoData.description
  )
  updateMetaTag("twitter:image", seoData.twitterImage || SITE_CONFIG.ogImage)

  // Canonical URL
  if (seoData.canonicalUrl) {
    updateCanonicalLink(seoData.canonicalUrl)
  }

  // Structured data
  if (seoData.structuredData) {
    updateStructuredData(seoData.structuredData)
  }
}

// Helper function to update or create meta tags
function updateMetaTag(
  name: string,
  content: string,
  attribute: "name" | "property" = "name"
): void {
  let meta = document.querySelector(
    `meta[${attribute}="${name}"]`
  ) as HTMLMetaElement

  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }

  meta.content = content
}

// Helper function to update canonical link
function updateCanonicalLink(url: string): void {
  let canonical = document.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement

  if (!canonical) {
    canonical = document.createElement("link")
    canonical.rel = "canonical"
    document.head.appendChild(canonical)
  }

  canonical.href = url
}

// Helper function to update structured data
function updateStructuredData(data: object): void {
  // Remove existing structured data
  const existingScript = document.querySelector(
    'script[type="application/ld+json"]'
  )
  if (existingScript) {
    existingScript.remove()
  }

  // Add new structured data
  const script = document.createElement("script")
  script.type = "application/ld+json"
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

// Generate comprehensive structured data for a page
type StructuredData =
  | ReturnType<typeof generateOrganizationStructuredData>
  | ReturnType<typeof generateWebsiteStructuredData>
  | ReturnType<typeof generateLocalBusinessStructuredData>
  | ReturnType<typeof generateServiceStructuredData>
  | ReturnType<typeof generateBlogPostStructuredData>
  | ReturnType<typeof generateBlogStructuredData>
  | ReturnType<typeof generateServicesListStructuredData>
  | ReturnType<typeof generateFAQStructuredData>
  | ReturnType<typeof generateBreadcrumbStructuredData>
  | object

export function generatePageStructuredData(
  pageKey: keyof typeof PAGE_SEO_CONFIG,
  additionalData?: StructuredData
): object {
  const baseData: StructuredData[] = [
    generateOrganizationStructuredData(),
    generateWebsiteStructuredData(),
  ]

  // Add page-specific structured data
  switch (pageKey) {
    case "home":
      baseData.push(generateLocalBusinessStructuredData())
      break
    case "services":
      // Services structured data will be added dynamically
      break
    case "about":
      baseData.push(generateLocalBusinessStructuredData())
      break
    case "blog":
      // Blog structured data will be added dynamically
      break
    case "contact":
      baseData.push(generateLocalBusinessStructuredData())
      break
  }

  if (additionalData) {
    baseData.push(additionalData)
  }

  return {
    "@context": "https://schema.org",
    "@graph": baseData,
  }
}

// Validate SEO data completeness
export function validateSEOData(seoData: SEOData): {
  isValid: boolean
  warnings: string[]
  errors: string[]
} {
  const warnings: string[] = []
  const errors: string[] = []

  // Required fields
  if (!seoData.title) {
    errors.push("Title is required")
  } else if (seoData.title.length > 60) {
    warnings.push("Title is longer than 60 characters")
  }

  if (!seoData.description) {
    errors.push("Description is required")
  } else if (seoData.description.length > 160) {
    warnings.push("Description is longer than 160 characters")
  } else if (seoData.description.length < 120) {
    warnings.push("Description is shorter than 120 characters")
  }

  // Keywords validation
  if (!seoData.keywords || seoData.keywords.length === 0) {
    warnings.push("No keywords provided")
  } else if (seoData.keywords.length > 10) {
    warnings.push("Too many keywords (>10)")
  }

  // Open Graph validation
  if (!seoData.ogTitle) {
    warnings.push("Open Graph title not set")
  }
  if (!seoData.ogDescription) {
    warnings.push("Open Graph description not set")
  }
  if (!seoData.ogImage) {
    warnings.push("Open Graph image not set")
  }

  // Twitter Card validation
  if (!seoData.twitterTitle) {
    warnings.push("Twitter title not set")
  }
  if (!seoData.twitterDescription) {
    warnings.push("Twitter description not set")
  }
  if (!seoData.twitterImage) {
    warnings.push("Twitter image not set")
  }

  // Canonical URL validation
  if (!seoData.canonicalUrl) {
    warnings.push("Canonical URL not set")
  }

  // Structured data validation
  if (!seoData.structuredData) {
    warnings.push("No structured data provided")
  }

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  }
}

// Generate SEO report for debugging
export function generateSEOReport(seoData: SEOData): string {
  const validation = validateSEOData(seoData)

  let report = "=== SEO REPORT ===\n\n"

  report += `Title: ${seoData.title}\n`
  report += `Title Length: ${seoData.title?.length || 0} characters\n\n`

  report += `Description: ${seoData.description}\n`
  report += `Description Length: ${seoData.description?.length || 0} characters\n\n`

  report += `Keywords: ${seoData.keywords?.join(", ") || "None"}\n`
  report += `Keywords Count: ${seoData.keywords?.length || 0}\n\n`

  report += `Open Graph Title: ${seoData.ogTitle || "Not set"}\n`
  report += `Open Graph Description: ${seoData.ogDescription || "Not set"}\n`
  report += `Open Graph Image: ${seoData.ogImage || "Not set"}\n\n`

  report += `Twitter Title: ${seoData.twitterTitle || "Not set"}\n`
  report += `Twitter Description: ${seoData.twitterDescription || "Not set"}\n`
  report += `Twitter Image: ${seoData.twitterImage || "Not set"}\n\n`

  report += `Canonical URL: ${seoData.canonicalUrl || "Not set"}\n`
  report += `Structured Data: ${seoData.structuredData ? "Present" : "Not set"}\n\n`

  if (validation.errors.length > 0) {
    report += "ERRORS:\n"
    validation.errors.forEach((error) => (report += `- ${error}\n`))
    report += "\n"
  }

  if (validation.warnings.length > 0) {
    report += "WARNINGS:\n"
    validation.warnings.forEach((warning) => (report += `- ${warning}\n`))
    report += "\n"
  }

  report += `Overall Status: ${validation.isValid ? "VALID" : "INVALID"}\n`

  return report
}
