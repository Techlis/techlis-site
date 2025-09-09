export interface Service {
  id: string
  title: string
  icon: string
  description: string
  features: string[]
  technologies: string[]
  pricing: string
}

export interface BlogPost {
  id: string
  title: string
  description: string
  link: string
  pubDate: string
  source: string
  category: "ai-ml" | "software-dev" | "web-mobile" | "cloud-devops"
  isArchived: boolean
  createdAt: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  image: string
  rating: number
}

export interface Technology {
  name: string
  category: string
  icon?: string
}

export interface ContactForm {
  name: string
  email: string
  company?: string
  message: string
  service?: string
  budget?: string
}

export interface NavigationItem {
  name: string
  href: string
  children?: NavigationItem[]
}
// Company and About Page Types
export interface Founder {
  name: string
  title: string
  bio: string
  image?: string
}

export interface TeamInfo {
  onshoreTeam: {
    size: number
    description: string
    expertise: string[]
  }
  offshoreTeam: {
    size: number
    description: string
    expertise: string[]
  }
}

export interface CompanyData {
  name: string
  mission: string
  vision: string
  values: string[]
  founder: Founder
  team: TeamInfo
  established: string
  locations: string[]
}

// Blog System Types
export interface RSSFeed {
  url: string
  name: string
  category: "ai-ml" | "software-dev" | "web-mobile" | "cloud-devops"
  priority: number // 1-5, higher is more important
}

export interface StoredBlogData {
  posts: BlogPost[]
  lastFetch: string
  categories: Record<string, number> // category -> post count
}

// API Response Types
export interface RSS2JSONResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: Array<{
    title: string
    pubDate: string
    link: string
    guid: string
    author: string
    thumbnail: string
    description: string
    content: string
    enclosure: any
    categories: string[]
  }>
}

// Error Handling Types
export class BlogError extends Error {
  constructor(
    message: string,
    public code: "FETCH_ERROR" | "PARSE_ERROR" | "RATE_LIMIT" | "NETWORK_ERROR",
    public source?: string
  ) {
    super(message)
    this.name = "BlogError"
  }
}

export interface ErrorBoundaryState {
  hasError: boolean
  error?: BlogError
  fallbackContent?: BlogPost[]
}

// Component Props Types
export interface ServiceCardProps {
  service: Service
  className?: string
}

export interface ServicesGridProps {
  services: Service[]
}

export interface ServicesCTAProps {
  title: string
  description: string
  buttonText: string
  onButtonClick: () => void
}

export interface CompanyInfoProps {
  mission: string
  vision: string
  values: string[]
}

export interface FounderProfileProps {
  founder: Founder
}

export interface TeamStructureProps {
  teamInfo: TeamInfo
}

export interface BlogPostCardProps {
  post: BlogPost
  onReadMore: (post: BlogPost) => void
}

export interface BlogFiltersProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}
