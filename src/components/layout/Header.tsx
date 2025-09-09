import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, COMPANY } from '@/lib/constants'
import { Button } from '@/components/ui'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                'font-bold text-lg leading-none transition-colors duration-300',
                isScrolled ? 'text-gray-900' : 'text-white'
              )}>
                {COMPANY.shortName}
              </span>
              <span className={cn(
                'text-xs leading-none transition-colors duration-300',
                isScrolled ? 'text-gray-600' : 'text-gray-300'
              )}>
                System Inc.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:scale-105 relative group',
                  location.pathname === item.href
                    ? isScrolled
                      ? 'text-primary-600'
                      : 'text-white'
                    : isScrolled
                    ? 'text-gray-700 hover:text-primary-600'
                    : 'text-gray-300 hover:text-white'
                )}
              >
                {item.label}
                <span className={cn(
                  'absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full',
                  location.pathname === item.href && 'w-full'
                )} />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="primary"
              size="lg"
              className="hover:scale-105 transition-transform duration-300"
              asChild
            >
              <Link to="/contact">Start Your Project</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-md transition-colors duration-300',
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            )}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'block text-base font-medium transition-colors duration-300',
                    location.pathname === item.href
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to="/contact">Start Your Project</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}