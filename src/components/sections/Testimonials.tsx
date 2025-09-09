import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui'

interface TestimonialsProps {
  className?: string
}

// Sample testimonials data - this would normally come from a CMS or API
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow Inc.',
    content: 'Techlis transformed our legacy system into a modern, AI-powered platform. Their expertise in machine learning and cloud architecture exceeded our expectations. The team delivered ahead of schedule and within budget.',
    rating: 5,
    image: null, // Placeholder for avatar
    projectType: 'AI Development',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Head of Digital Innovation',
    company: 'Enterprise Solutions LLC',
    content: 'The mobile app Techlis developed for us has revolutionized how our customers interact with our services. Their attention to detail and user experience design is outstanding.',
    rating: 5,
    image: null,
    projectType: 'Mobile Development',
  },
  {
    id: 3,
    name: 'Dr. Emily Watson',
    role: 'Founder & CEO',
    company: 'HealthTech Innovations',
    content: 'Working with Techlis on our cloud migration was seamless. They provided comprehensive DevOps solutions that improved our deployment speed by 300% and reduced infrastructure costs significantly.',
    rating: 5,
    image: null,
    projectType: 'Cloud Architecture',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'VP of Technology',
    company: 'StartupBoost',
    content: 'Techlis built our MVP from scratch with cutting-edge technologies. Their technical consulting helped us make informed decisions that saved us months of development time.',
    rating: 5,
    image: null,
    projectType: 'Technical Consulting',
  },
  {
    id: 5,
    name: 'Amanda Thompson',
    role: 'Operations Director',
    company: 'Global Logistics Co.',
    content: 'The automation solutions Techlis implemented transformed our operations. We\'ve seen a 40% increase in efficiency and dramatic reduction in manual errors.',
    rating: 5,
    image: null,
    projectType: 'DevOps Automation',
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Product Manager',
    company: 'E-commerce Plus',
    content: 'Our web platform built by Techlis handles millions of transactions seamlessly. Their full-stack expertise and performance optimization skills are unmatched.',
    rating: 5,
    image: null,
    projectType: 'Web Development',
  },
]

export function Testimonials({ className }: TestimonialsProps) {
  return (
    <section className={cn('py-24 bg-gray-900 text-white overflow-hidden', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 mb-6">
            <Star size={16} className="mr-2 fill-current" />
            <span className="text-sm font-medium">Client Testimonials</span>
          </div>
          <h2 className="heading-lg mb-6">
            Trusted by Industry Leaders
            <span className="text-gradient block">Across the Globe</span>
          </h2>
          <p className="body-lg text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients say about 
            their experience working with Techlis System Inc.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-800 border-gray-700 h-full hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 group">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote size={32} className="text-primary-400 opacity-50" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <Star 
                        key={starIndex} 
                        size={16} 
                        className="text-yellow-400 fill-current" 
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Project Type Badge */}
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium">
                      {testimonial.projectType}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="group">
            <div className="text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              4.9/5
            </div>
            <div className="text-gray-300 font-medium">Average Rating</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              200+
            </div>
            <div className="text-gray-300 font-medium">Happy Clients</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              98%
            </div>
            <div className="text-gray-300 font-medium">Retention Rate</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              500+
            </div>
            <div className="text-gray-300 font-medium">Projects Delivered</div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with cutting-edge technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
              Start Your Project
            </button>
            <button className="btn-ghost px-8 py-4 rounded-lg font-semibold border border-gray-600 hover:border-primary-500 transition-colors duration-300">
              View Case Studies
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}