import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github, 
  Youtube,
  ArrowRight,
  ChevronUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { COMPANY, SOCIAL_LINKS, NAV_ITEMS, SERVICES, CONTACT_INFO } from '@/lib/constants'
import { Button } from '@/components/ui'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('bg-gray-900 text-white', className)}>
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get the latest insights on AI development, cloud solutions, and tech trends 
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Button variant="primary" size="lg" className="whitespace-nowrap">
                Subscribe
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white">
                  {COMPANY.shortName}
                </span>
                <span className="text-sm text-gray-400">
                  System Inc.
                </span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {COMPANY.description}
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} />
                <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} />
                <span>{COMPANY.location}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-6">Navigation</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.id}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-semibold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} {COMPANY.name}. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Youtube size={20} />
              </a>
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <span className="text-sm">Back to top</span>
              <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}