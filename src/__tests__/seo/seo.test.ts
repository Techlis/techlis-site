import { describe, it, expect } from "vitest"
import {
  generatePageSEO,
  generateServiceSEO,
  generateBlogPostSEO,
  generateOrganizationStructuredData,
  generateWebsiteStructuredData,
  generateServicesListStructuredData,
  generateBlogStructuredData,
} from "@/lib/seo"
import type { Service, BlogPost } from "@/types"

describe("SEO Functions", () => {
  const mockService: Service = {
    id: "ai-development",
    title: "AI Development",
    icon: "🤖",
    description: "Custom AI solutions for your business",
    features: ["Machine Learning", "Natural Language Processing"],
    technologies: ["Python", "TensorFlow", "OpenAI"],
    pricing: "Starting at $10,000",
  }

  const mockBlogPost: BlogPost = {
    id: "test-post",
    title: "Test AI Article",
    description: "A test article about AI",
    link: "https://example.com/test",
    pubDate: "2024-12-09T10:00:00Z",
    source: "Tech Blog",
    category: "ai-ml",
    isArchived: false,
    createdAt: "2024-12-09T10:00:00Z",
  }

  describe("generatePageSEO", () => {
    it("should generate SEO data for home page", () => {
      const seo = generatePageSEO("home")

      expect(seo.title).toContain("Techlis")
      expect(seo.description).toContain("AI-Powered Solutions")
      expect(seo.keywords).toContain("AI development")
      expect(seo.ogTitle).toBe(seo.title)
      expect(seo.canonicalUrl).toBe("https://techlis.com/")
    })

    it("should generate SEO data for services page", () => {
      const seo = generatePageSEO("services")

      expect(seo.title).toContain("Services")
      expect(seo.description).toContain("AI and software development services")
      expect(seo.keywords).toContain("AI services")
      expect(seo.canonicalUrl).toBe("https://techlis.com/services")
    })

    it("should generate SEO data for about page", () => {
      const seo = generatePageSEO("about")

      expect(seo.title).toContain("About")
      expect(seo.description).toContain("Jonny Nguyen")
      expect(seo.keywords).toContain("about Techlis")
      expect(seo.canonicalUrl).toBe("https://techlis.com/about")
    })

    it("should generate SEO data for blog page", () => {
      const seo = generatePageSEO("blog")

      expect(seo.title).toContain("Blog")
      expect(seo.description).toContain("AI, machine learning")
      expect(seo.keywords).toContain("tech blog")
      expect(seo.canonicalUrl).toBe("https://techlis.com/blog")
    })

    it("should generate SEO data for contact page", () => {
      const seo = generatePageSEO("contact")

      expect(seo.title).toContain("Contact")
      expect(seo.description).toContain("Contact Techlis")
      expect(seo.keywords).toContain("contact Techlis")
      expect(seo.canonicalUrl).toBe("https://techlis.com/contact")
    })
  })

  describe("generateServiceSEO", () => {
    it("should generate SEO data for a service", () => {
      const seo = generateServiceSEO(mockService)

      expect(seo.title).toContain("AI Development")
      expect(seo.description).toContain("Custom AI solutions")
      expect(seo.keywords).toContain("ai development")
      expect(seo.keywords).toContain("python")
      expect(seo.structuredData).toBeDefined()
    })
  })

  describe("generateBlogPostSEO", () => {
    it("should generate SEO data for a blog post", () => {
      const seo = generateBlogPostSEO(mockBlogPost)

      expect(seo.title).toContain("Test AI Article")
      expect(seo.description).toContain("A test article about AI")
      expect(seo.keywords).toContain("ai ml")
      expect(seo.ogType).toBe("article")
      expect(seo.canonicalUrl).toBe(mockBlogPost.link)
    })
  })

  describe("generateOrganizationStructuredData", () => {
    it("should generate valid organization structured data", () => {
      const data = generateOrganizationStructuredData()

      expect(data["@context"]).toBe("https://schema.org")
      expect(data["@type"]).toBe("Organization")
      expect(data.name).toBe("Techlis")
      expect(data.founder.name).toBe("Jonny Nguyen")
      expect(data.address).toHaveLength(3)
      expect(data.knowsAbout).toContain("Artificial Intelligence")
    })
  })

  describe("generateWebsiteStructuredData", () => {
    it("should generate valid website structured data", () => {
      const data = generateWebsiteStructuredData()

      expect(data["@context"]).toBe("https://schema.org")
      expect(data["@type"]).toBe("WebSite")
      expect(data.name).toBe("Techlis")
      expect(data.url).toBe("https://techlis.com")
      expect(data.potentialAction).toBeDefined()
    })
  })

  describe("generateServicesListStructuredData", () => {
    it("should generate structured data for services list", () => {
      const data = generateServicesListStructuredData([mockService])

      expect(data["@context"]).toBe("https://schema.org")
      expect(data["@type"]).toBe("ItemList")
      expect(data.numberOfItems).toBe(1)
      expect(data.itemListElement).toHaveLength(1)
      expect(data.itemListElement[0].item.name).toBe("AI Development")
    })
  })

  describe("generateBlogStructuredData", () => {
    it("should generate structured data for blog", () => {
      const data = generateBlogStructuredData([mockBlogPost])

      expect(data["@context"]).toBe("https://schema.org")
      expect(data["@type"]).toBe("Blog")
      expect(data.name).toContain("Techlis Tech Insights")
      expect(data.blogPost).toHaveLength(1)
      expect(data.blogPost[0].headline).toBe("Test AI Article")
    })
  })
})
