import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Button variants
export const buttonVariants = {
  primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
  secondary: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 transition-all duration-300",
  luxury: "bg-gradient-to-r from-luxury-gold to-yellow-400 text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300",
  ghost: "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition-all duration-300",
  outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
}

// Size variants
export const sizeVariants = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
}

// Card variants
export const cardVariants = {
  default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm",
  luxury: "bg-white/10 backdrop-blur-sm border border-white/20 shadow-luxury hover:shadow-luxury-lg",
  elevated: "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl",
  glow: "bg-white dark:bg-gray-800 shadow-glow hover:shadow-glow-lg",
}

// Animation utilities
export const animations = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  slideInRight: "animate-slide-in-right",
  slideInLeft: "animate-slide-in-left",
  scaleIn: "animate-scale-in",
  float: "animate-float",
  bounceSubtle: "animate-bounce-subtle",
  shimmer: "animate-shimmer",
  gradientX: "animate-gradient-x",
  gradientY: "animate-gradient-y",
  gradientXY: "animate-gradient-xy",
  pulseGlow: "animate-pulse-glow",
}

// Responsive breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Common spacing
export const spacing = {
  section: "py-16 md:py-24 lg:py-32",
  container: "px-4 sm:px-6 lg:px-8",
  content: "max-w-7xl mx-auto",
}

// Format utilities
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(dateObj)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

// Delay utility for animations
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// SEO utilities
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}