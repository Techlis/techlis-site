// Company information
export const COMPANY = {
  name: 'Techlis System Inc.',
  shortName: 'Techlis',
  tagline: 'Transform Ideas Into AI-Powered Solutions',
  description: 'Enterprise software development, AI integration, and cloud solutions that scale with your business',
  foundedYear: 2020,
  location: 'San Francisco, CA',
  email: 'hello@techlis.com',
  phone: '+1 (555) 123-4567',
  website: 'https://techlis.com',
} as const

// Social media links
export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/techlis',
  twitter: 'https://twitter.com/techlis',
  github: 'https://github.com/techlis',
  youtube: 'https://youtube.com/@techlis',
  facebook: 'https://facebook.com/techlis',
} as const

// Navigation
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const

// Service categories
export const SERVICES = [
  {
    id: 'ai-development',
    title: 'AI Development',
    icon: 'Brain',
    shortDescription: 'Custom AI solutions and ML models',
    description: 'Custom AI solutions, ML models, NLP integration for enterprise applications',
    features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'AI Integration'],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API'],
    startingPrice: 15000,
    deliveryTime: '8-12 weeks',
  },
  {
    id: 'cloud-architecture',
    title: 'Cloud Architecture',
    icon: 'Cloud',
    shortDescription: 'Scalable cloud infrastructure',
    description: 'Enterprise-grade cloud solutions, migration, and infrastructure optimization',
    features: ['AWS/Azure/GCP', 'Microservices', 'Auto-scaling', 'Security'],
    technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    startingPrice: 12000,
    deliveryTime: '6-10 weeks',
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    icon: 'Smartphone',
    shortDescription: 'Native and cross-platform apps',
    description: 'Native iOS/Android and cross-platform mobile applications',
    features: ['Native iOS/Android', 'React Native', 'Flutter', 'App Store Optimization'],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
    startingPrice: 10000,
    deliveryTime: '10-16 weeks',
  },
  {
    id: 'devops-automation',
    title: 'DevOps Automation',
    icon: 'Settings',
    shortDescription: 'CI/CD and infrastructure automation',
    description: 'Complete DevOps pipeline setup, monitoring, and automation solutions',
    features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring', 'Security'],
    technologies: ['Jenkins', 'GitLab CI', 'Ansible', 'Prometheus'],
    startingPrice: 8000,
    deliveryTime: '4-8 weeks',
  },
  {
    id: 'technical-consulting',
    title: 'Technical Consulting',
    icon: 'Users',
    shortDescription: 'Strategic technology guidance',
    description: 'Strategic technology consulting, architecture review, and team augmentation',
    features: ['Technology Strategy', 'Architecture Review', 'Team Training', 'Code Audits'],
    technologies: ['Various', 'Best Practices', 'Industry Standards', 'Frameworks'],
    startingPrice: 5000,
    deliveryTime: '2-6 weeks',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    icon: 'Globe',
    shortDescription: 'Modern web applications',
    description: 'Full-stack web development with modern frameworks and technologies',
    features: ['React/Vue/Angular', 'Node.js/Python', 'Database Design', 'API Development'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'GraphQL'],
    startingPrice: 7000,
    deliveryTime: '6-12 weeks',
  },
] as const

// Technologies
export const TECHNOLOGIES = [
  { name: 'React', category: 'Frontend', icon: 'react.svg' },
  { name: 'TypeScript', category: 'Language', icon: 'typescript.svg' },
  { name: 'Node.js', category: 'Backend', icon: 'nodejs.svg' },
  { name: 'Python', category: 'Language', icon: 'python.svg' },
  { name: 'AWS', category: 'Cloud', icon: 'aws.svg' },
  { name: 'Docker', category: 'DevOps', icon: 'docker.svg' },
  { name: 'Kubernetes', category: 'DevOps', icon: 'kubernetes.svg' },
  { name: 'TensorFlow', category: 'AI/ML', icon: 'tensorflow.svg' },
  { name: 'PyTorch', category: 'AI/ML', icon: 'pytorch.svg' },
  { name: 'OpenAI', category: 'AI/ML', icon: 'openai.svg' },
  { name: 'PostgreSQL', category: 'Database', icon: 'postgresql.svg' },
  { name: 'MongoDB', category: 'Database', icon: 'mongodb.svg' },
] as const

// Pricing tiers
export const PRICING_TIERS = [
  {
    id: 'startup',
    name: 'Startup',
    description: 'Perfect for early-stage companies',
    price: 5000,
    period: 'project',
    features: [
      'MVP Development',
      'Basic AI Integration',
      '3 Months Support',
      'Code Documentation',
      'Basic Testing',
    ],
    highlighted: false,
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'For growing businesses',
    price: 15000,
    period: 'project',
    features: [
      'Full-Featured Application',
      'Advanced AI/ML Features',
      '6 Months Support',
      'Comprehensive Testing',
      'Performance Optimization',
      'Security Audit',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: 50000,
    period: 'project',
    features: [
      'Enterprise-Grade Solution',
      'Custom AI Development',
      '12 Months Support',
      'Dedicated Team',
      'Advanced Security',
      'Compliance (SOC2, HIPAA)',
      'SLA Guarantee',
    ],
    highlighted: false,
  },
] as const

// Contact information
export const CONTACT_INFO = {
  address: {
    street: '123 Innovation Drive',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    country: 'United States',
  },
  hours: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 6:00 PM',
    saturday: 'Closed',
    sunday: 'Closed',
  },
  timezone: 'Pacific Time (PT)',
} as const

// FAQ categories
export const FAQ_CATEGORIES = [
  'General',
  'Services',
  'Pricing',
  'Technical',
  'Support',
] as const

// Blog categories
export const BLOG_CATEGORIES = [
  'AI Development',
  'Cloud Computing',
  'Mobile Development',
  'DevOps',
  'Industry Insights',
  'Case Studies',
] as const

// Performance metrics
export const METRICS = {
  projectsCompleted: 500,
  clientsSatisfied: 200,
  yearsExperience: 4,
  teamSize: 25,
  countriesServed: 15,
  uptime: 99.9,
} as const

// CTA buttons
export const CTA_BUTTONS = {
  primary: 'Start Your Project',
  secondary: 'Explore Partnership',
  contact: 'Get In Touch',
  consultation: 'Free Consultation',
  portfolio: 'View Portfolio',
  pricing: 'View Pricing',
} as const