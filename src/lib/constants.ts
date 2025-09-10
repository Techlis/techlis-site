import servicesData from "@/content/data/services.json"
import type { RSSFeed, CompanyData } from "@/types"

export const SITE_CONFIG = {
  name: "Techlis",
  description:
    "AI Software Development Company - Transform Ideas Into AI-Powered Solutions",
  url: "https://techlis.com",
  ogImage: "https://techlis.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/techlis",
    github: "https://github.com/techlis",
    linkedin: "https://linkedin.com/company/techlis",
  },
}

export const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export const SERVICES = servicesData

export const TECHNOLOGIES = [
  { name: "React", category: "Frontend", icon: "⚛️" },
  { name: "TypeScript", category: "Language", icon: "📘" },
  { name: "Node.js", category: "Backend", icon: "🟢" },
  { name: "Python", category: "AI/ML", icon: "🐍" },
  { name: "AWS", category: "Cloud", icon: "☁️" },
  { name: "Docker", category: "DevOps", icon: "🐳" },
  { name: "PostgreSQL", category: "Database", icon: "🐘" },
  { name: "TensorFlow", category: "AI/ML", icon: "🧠" },
  { name: "Kubernetes", category: "DevOps", icon: "⚙️" },
  { name: "Next.js", category: "Frontend", icon: "▲" },
  { name: "OpenAI", category: "AI/ML", icon: "🤖" },
  { name: "Firebase", category: "Backend", icon: "🔥" },
]
// RSS Feed Configuration for Blog System
export const RSS_FEEDS: RSSFeed[] = [
  {
    url: "https://feeds.feedburner.com/oreilly/radar",
    name: "O'Reilly Radar",
    category: "software-dev" as const,
    priority: 5,
  },
  {
    url: "https://machinelearningmastery.com/feed/",
    name: "Machine Learning Mastery",
    category: "ai-ml" as const,
    priority: 4,
  },
  {
    url: "https://aws.amazon.com/blogs/aws/feed/",
    name: "AWS Blog",
    category: "cloud-devops" as const,
    priority: 5,
  },
  {
    url: "https://blog.google/technology/developers/rss/",
    name: "Google Developers Blog",
    category: "web-mobile" as const,
    priority: 4,
  },
  {
    url: "https://dev.to/feed",
    name: "DEV Community",
    category: "software-dev" as const,
    priority: 3,
  },
  {
    url: "https://www.smashingmagazine.com/feed/",
    name: "Smashing Magazine",
    category: "web-mobile" as const,
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
  ],
}

// Company Data for About Page
export const COMPANY_DATA: CompanyData = {
  name: "Techlis",
  mission:
    "To transform businesses through innovative AI and software solutions that drive growth and efficiency.",
  vision:
    "To be the leading AI software development partner for enterprises worldwide, delivering cutting-edge solutions that shape the future of technology.",
  values: [
    "Innovation-driven development",
    "Client-centric approach",
    "Quality and reliability",
    "Continuous learning and improvement",
    "Ethical AI practices",
  ],
  founder: {
    name: "Jonny Nguyen",
    title: "Founder & CEO",
    bio: "With over 15 years of experience in software development and AI, Jonny leads Techlis with a vision to democratize AI technology for businesses of all sizes. His expertise spans machine learning, cloud architecture, and enterprise software development.",
    image: "/images/team/jonny-nguyen.jpg",
  },
  team: {
    onshoreTeam: {
      size: 8,
      description:
        "Our onshore team consists of senior developers, AI specialists, and project managers based in major tech hubs.",
      expertise: [
        "AI/ML Engineering",
        "Cloud Architecture",
        "Full-Stack Development",
        "DevOps & Infrastructure",
        "Product Management",
      ],
    },
    offshoreTeam: {
      size: 15,
      description:
        "Our offshore development team provides 24/7 support and specialized expertise in various technologies.",
      expertise: [
        "Frontend Development",
        "Backend Development",
        "Mobile Development",
        "QA & Testing",
        "UI/UX Design",
      ],
    },
  },
  established: "2020",
  locations: ["San Francisco, CA", "Austin, TX", "Ho Chi Minh City, Vietnam"],
}
