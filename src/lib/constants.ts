import servicesData from "@/content/data/services.json"
import type { RSSFeed, CompanyData } from "@/types"

export const SITE_CONFIG = {
  name: "Techlis",
  description:
    "Your Specialized Product Engineering Partner - Mobile, Web, & AI Solutions for Founders",
  url: "https://techlis.com",
  ogImage: "https://techlis.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/innovative_jonny",
    github: "https://github.com/techlis",
    linkedin: "https://linkedin.com/company/techlis",
  },
}

export const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/#about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export const SERVICES = servicesData

export const TECHNOLOGIES = [
  { name: "React Native", category: "Mobile", icon: "📱" },
  { name: "Expo", category: "Mobile", icon: "🚀" },
  { name: "Next.js", category: "Frontend", icon: "▲" },
  { name: "TypeScript", category: "Language", icon: "📘" },
  { name: "React", category: "Frontend", icon: "⚛️" },
  { name: "Node.js", category: "Backend", icon: "🟢" },
  { name: "PostgreSQL", category: "Database", icon: "🐘" },
  { name: "Supabase", category: "Backend", icon: "🔥" },
  { name: "OpenAI", category: "AI/ML", icon: "🤖" },
  { name: "Vercel", category: "Cloud", icon: "☁️" },
  { name: "Docker", category: "DevOps", icon: "🐳" },
  { name: "Python", category: "AI/ML", icon: "🐍" },
]

// RSS Feed Configuration for Blog System
export const RSS_FEEDS: RSSFeed[] = [
  {
    url: "https://machinelearningmastery.com/feed/",
    name: "Machine Learning Mastery",
    category: "ai-ml" as const,
    priority: 5,
  },
  {
    url: "https://aws.amazon.com/blogs/aws/feed/",
    name: "AWS Blog",
    category: "cloud-devops" as const,
    priority: 5,
  },
  {
    url: "https://dev.to/feed",
    name: "DEV Community",
    category: "software-dev" as const,
    priority: 4,
  },
  {
    url: "https://www.smashingmagazine.com/feed/",
    name: "Smashing Magazine",
    category: "web-mobile" as const,
    priority: 4,
  },
  {
    url: "https://feeds.feedburner.com/TechCrunch/",
    name: "TechCrunch",
    category: "software-dev" as const,
    priority: 3,
  },
  {
    url: "https://blog.openai.com/rss/",
    name: "OpenAI Blog",
    category: "ai-ml" as const,
    priority: 4,
  },
]

// RSS2JSON API Configuration (use config.ts for environment-specific settings)
export const RSS2JSON_CONFIG = {
  baseUrl: "https://api.rss2json.com/v1/api.json",
  apiKey: import.meta.env.VITE_RSS2JSON_API_KEY || "",
  maxCount: 10,
  timeout: 5000,
}

// Blog Content Management Configuration (use config.ts for environment-specific settings)
export const BLOG_CONFIG = {
  CACHE_DURATION: 30 * 60 * 1000, // 30 minutes in milliseconds
  THREE_WEEKS_MS: 21 * 24 * 60 * 60 * 1000, // 3 weeks in milliseconds
  FIVE_MONTHS_MS: 5 * 30 * 24 * 60 * 60 * 1000, // 5 months in milliseconds
  STORAGE_KEY: "techlis_blog_data",
  CATEGORIES: {
    "ai-ml": "AI & Machine Learning",
    "software-dev": "Software Development",
    "web-mobile": "Web & Mobile",
    "cloud-devops": "Cloud & DevOps",
  },
}

// Content Filtering Keywords
export const CONTENT_KEYWORDS = {
  "ai-ml": [
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "neural network",
    "AI",
    "ML",
    "GPT",
    "LLM",
    "computer vision",
    "natural language processing",
    "NLP",
  ],
  "software-dev": [
    "programming",
    "development",
    "coding",
    "software",
    "framework",
    "library",
    "algorithm",
    "data structure",
    "testing",
    "debugging",
    "SaaS",
  ],
  "web-mobile": [
    "web development",
    "mobile app",
    "react",
    "javascript",
    "frontend",
    "backend",
    "responsive design",
    "PWA",
    "iOS",
    "Android",
    "Expo",
    "React Native",
  ],
  "cloud-devops": [
    "cloud",
    "devops",
    "kubernetes",
    "docker",
    "aws",
    "azure",
    "deployment",
    "CI/CD",
    "infrastructure",
    "microservices",
    "serverless",
  ],
}

// Company Data for About Page
export const COMPANY_DATA: CompanyData = {
  name: "Techlis",
  mission:
    "To help visionary founders turn their ideas into shipping products without the headache of managing a large team.",
  vision:
    "To be the technical superpower for the next generation of solo founders and small startups.",
  values: [
    "Direct Collaboration",
    "Shipping Over Planning",
    "Practical Engineering",
    "Long-term Partnership",
    "Zero Fluff",
  ],
  founder: {
    name: "Jonny Nguyen",
    title: "Founder & Lead Engineer",
    bio: "Jonny is a product engineer who partners directly with founders to build products that scale. Specializing in React Native, Expo, and Modern Web stacks, he acts as your technical co-founder for hire.",
    image: "/images/team/jonny-nguyen.jpg",
  },
  team: {
    onshoreTeam: {
      size: 1, // Core Studio
      description:
        "Techlis acts as your dedicated product studio. You work directly with me to ensure your vision is executed perfectly.",
      expertise: [
        "Product Architecture",
        "Mobile Engineering",
        "Full-Stack Web",
        "Technical Strategy",
        "MVP Development",
      ],
    },
    offshoreTeam: {
      size: 10, // Available Network
      description:
        "i have a network of trusted specialists for when we need to scale up specific capabilities or extend the runway.",
      expertise: [
        "Specialized QA",
        "Extended Development",
        "Design Systems",
        "Content Operations",
        "Data labeling",
      ],
    },
  },
  established: "2020",
  locations: ["Vancouver, BC (HQ)", "Remote Friendly"],
}

export const TRUSTED_COMPANIES = [
  {
    name: "Maisie Beauty",
    logo: "/images/companies/maisiebeauty.png",
  },
  {
    name: "Clarity",
    logo: "/images/companies/clarity.png",
  },
  {
    name: "Tipbox",
    logo: "/images/companies/tipbox.png",
  },
  {
    name: "NFB",
    logo: "/images/companies/nfb.png",
  },
  {
    name: "Lyft Shipping",
    logo: "/images/companies/lyftshipping.png",
  }
]
