import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TECHNOLOGIES } from '@/lib/constants'

interface TechnologiesProps {
  className?: string
}

export function Technologies({ className }: TechnologiesProps) {
  const categories = Array.from(new Set(TECHNOLOGIES.map(tech => tech.category)))

  return (
    <section className={cn('py-24 bg-white dark:bg-gray-800', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 mb-6">
            <span className="text-sm font-medium">Our Tech Stack</span>
          </div>
          <h2 className="heading-lg mb-6 text-gray-900 dark:text-white">
            Cutting-Edge Technologies
            <span className="text-gradient block">Powering Innovation</span>
          </h2>
          <p className="body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We leverage the latest technologies and frameworks to build scalable, 
            secure, and high-performance solutions for our clients.
          </p>
        </motion.div>

        {/* Technologies by Category */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const categoryTechs = TECHNOLOGIES.filter(tech => tech.category === category)
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {category}
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {categoryTechs.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: categoryIndex * 0.1 + techIndex * 0.05 
                      }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group"
                    >
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500">
                        {/* Technology Icon Placeholder */}
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-lg">
                            {tech.name.charAt(0)}
                          </span>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {tech.name}
                        </h4>
                        
                        {tech.description && (
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {tech.description}
                          </p>
                        )}

                        {/* Proficiency bar (if available) */}
                        {tech.proficiency && (
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${tech.proficiency}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                              {tech.proficiency}% Proficiency
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="group">
            <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              12+
            </div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">Technologies</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              6
            </div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">Categories</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-emerald-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              5+
            </div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">Years Experience</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              99%
            </div>
            <div className="text-gray-600 dark:text-gray-300 font-medium">Success Rate</div>
          </div>
        </motion.div>

        {/* Integration Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Custom Technology Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't see the technology you need? We're constantly evolving our tech stack 
              and can integrate any technology that best serves your project requirements.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}