import servicesData from "@/content/data/services.json"

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
