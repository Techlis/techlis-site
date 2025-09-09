export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  technologies: string[];
  pricing: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  readTime: number;
  featured?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

export interface Technology {
  name: string;
  category: string;
  icon?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
  service?: string;
  budget?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}
