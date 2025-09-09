import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Users, Zap, Award } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COMPANY, CTA_BUTTONS, METRICS } from '@/lib/constants'
import { Button } from '@/components/ui'

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps) {
  const stats = [
    { label: 'Projects Completed', value: METRICS.projectsCompleted.toString(), icon: Award },
    { label: 'Happy Clients', value: METRICS.clientsSatisfied.toString(), icon: Users },
    { label: 'Years Experience', value: METRICS.yearsExperience.toString(), icon: Star },
    { label: 'Team Members', value: METRICS.teamSize.toString(), icon: Zap },
  ]

  return (
    <section className={cn('hero-background', className)}>
      <div className="hero-overlay" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="hero-content text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">Trusted by 200+ Companies</span>
              </div>

              <h1 className="heading-xl mb-6 text-white">
                {COMPANY.tagline}
              </h1>

              <p className="body-lg mb-8 text-gray-200 max-w-2xl">
                {COMPANY.description}. We specialize in custom infrastructure solutions 
                including email servers, cloud architecture, and enterprise-grade technical implementations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  variant="primary"
                  size="xl"
                  className="group"
                  asChild
                >
                  <Link to="/contact">
                    {CTA_BUTTONS.primary}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                
                <Button
                  variant="ghost"
                  size="xl"
                  className="text-white hover:bg-white/10 border border-white/20"
                  asChild
                >
                  <Link to="/partnership">
                    <Play size={20} />
                    {CTA_BUTTONS.secondary}
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm ml-2">4.9/5 Client Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award size={16} className="text-emerald-400" />
                  <span className="text-sm">ISO 27001 Certified</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main visual placeholder */}
              <div className="aspect-square max-w-lg mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/10" />
                <div className="absolute inset-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center text-white">
                    <Zap size={64} className="mx-auto mb-4 text-yellow-400" />
                    <h3 className="text-2xl font-bold mb-2">AI-Powered</h3>
                    <p className="text-gray-300">Enterprise Solutions</p>
                  </div>
                </div>
              </div>

              {/* Floating stats cards */}
              <div className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-xs text-gray-300">Uptime</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-xs text-gray-300">Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                    <IconComponent size={24} className="text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}+</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}