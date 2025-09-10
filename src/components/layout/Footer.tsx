import { Link } from "react-router-dom"
import { Brain, Twitter, Linkedin, Github, Mail } from "lucide-react"
import { SITE_CONFIG, NAVIGATION_ITEMS } from "@/lib/constants"
import type { JSX } from "react/jsx-runtime"

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-purple-600">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Techlis</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Transform ideas into AI-powered solutions. Enterprise software
              development, AI integration, and cloud solutions that scale with
              your business.
            </p>
            <div className="flex space-x-4">
              <a
                href={SITE_CONFIG.links.twitter}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.links.linkedin}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SITE_CONFIG.links.github}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@techlis.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/services#ai-development"
                  className="hover:text-white transition-colors"
                >
                  AI Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services#cloud-architecture"
                  className="hover:text-white transition-colors"
                >
                  Cloud Architecture
                </Link>
              </li>
              <li>
                <Link
                  to="/services#mobile-development"
                  className="hover:text-white transition-colors"
                >
                  Mobile Applications
                </Link>
              </li>
              <li>
                <Link
                  to="/services#web-development"
                  className="hover:text-white transition-colors"
                >
                  Web Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>hello@techlis.com</li>
              {/* <li>+1 (555) 123-4567</li> */}
              <li>Vancouver, BC</li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Techlis. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
