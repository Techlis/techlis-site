import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Cloud, 
  Smartphone, 
  Settings, 
  Users, 
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SERVICES } from '@/lib/constants'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'

interface ServicesProps {
  className?: string
}

const iconMap = {
  Brain,
  Cloud,
  Smartphone,
  Settings,
  Users,
  Globe,
}

export function Services({ className }: ServicesProps) {
  return (
    <section className={cn('py-24 bg-gray-50 dark:bg-gray-900', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 mb-6">
            <span className="text-sm font-medium">Our Services</span>
          </div>
          <h2 className="heading-lg mb-6 text-gray-900 dark:text-white">
            Comprehensive Solutions for Your
            <span className="text-gradient block">Digital Transformation</span>
          </h2>
          <p className="body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From AI development to cloud architecture, we deliver enterprise-grade solutions 
            that drive innovation and accelerate your business growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Brain
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent size={24} className="text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${(service.startingPrice / 1000).toFixed(0)}k+
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Starting from
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {service.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle size={16} className="text-emerald-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {service.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                            +{service.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Delivery Time */}
                    <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Delivery Time:</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{service.deliveryTime}</span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="primary" 
                        size="sm" 
                        className="flex-1 group"
                        asChild
                      >
                        <Link to={`/services/${service.id}`}>
                          Learn More
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                      >
                        <Link to="/contact">Get Quote</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500 to-purple-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Our team can create tailored solutions that perfectly fit your business requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="ghost" 
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                asChild
              >
                <Link to="/contact">
                  Discuss Your Project
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent hover:bg-white/10 text-white border-white/30"
                asChild
              >
                <Link to="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}