// Common types
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

// Component props
export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

// Service types
export interface Service {
  id: string
  title: string
  icon: string
  shortDescription: string
  description: string
  features: string[]
  technologies: string[]
  startingPrice: number
  deliveryTime: string
  category?: string
  image?: string
}

// Technology types
export interface Technology {
  name: string
  category: string
  icon: string
  description?: string
  proficiency?: number
}

// Team member types
export interface TeamMember extends BaseEntity {
  name: string
  role: string
  bio: string
  image: string
  skills: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

// Testimonial types
export interface Testimonial extends BaseEntity {
  name: string
  role: string
  company: string
  content: string
  rating: number
  image?: string
  projectType?: string
}

// Case study types
export interface CaseStudy extends BaseEntity {
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  duration: string
  teamSize: number
  images: string[]
  testimonial?: Testimonial
  featured: boolean
}

// Blog post types
export interface BlogPost extends BaseEntity {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  image: string
  readTime: number
  published: boolean
  featured: boolean
}

// Contact form types
export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  services?: string[]
  budget?: string
  timeline?: string
  source?: string
}

// Newsletter types
export interface NewsletterFormData {
  email: string
  firstName?: string
  interests?: string[]
}

// Pricing types
export interface PricingTier {
  id: string
  name: string
  description: string
  price: number
  period: 'month' | 'project' | 'hour'
  features: string[]
  highlighted: boolean
  buttonText?: string
  customPrice?: boolean
}

// FAQ types
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

// SEO types
export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

// Animation types
export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T> {
  data: T
  errors: ValidationError[]
  isSubmitting: boolean
  isSubmitted: boolean
}

// API response types
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: ValidationError[]
}

// Theme types
export interface Theme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
  fonts: {
    sans: string
    mono: string
    display: string
  }
}

// Layout types
export interface LayoutProps extends ComponentProps {
  title?: string
  description?: string
  seo?: SEOData
}

// Hero section types
export interface HeroProps extends ComponentProps {
  title: string
  subtitle?: string
  description?: string
  cta?: {
    primary?: {
      text: string
      href: string
    }
    secondary?: {
      text: string
      href: string
    }
  }
  image?: string
  video?: string
  stats?: Array<{
    label: string
    value: string
  }>
}

// Section types
export interface SectionProps extends ComponentProps {
  title?: string
  subtitle?: string
  description?: string
  centered?: boolean
  background?: 'default' | 'gray' | 'gradient'
}

// Button types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'luxury' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

// Card types
export interface CardProps extends ComponentProps {
  variant?: 'default' | 'luxury' | 'elevated' | 'glow'
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
}

// Image types
export interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

// Modal types
export interface ModalProps extends ComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// Notification types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

// Performance metrics
export interface Metrics {
  projectsCompleted: number
  clientsSatisfied: number
  yearsExperience: number
  teamSize: number
  countriesServed: number
  uptime: number
}