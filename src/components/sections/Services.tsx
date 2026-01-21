import type { JSX } from "react"
import { Link } from "react-router-dom"
import { easeInOut, motion } from "framer-motion"
import {
  Brain,
  Cloud,
  Smartphone,
  Globe,
  Target,
  Database,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react"
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SERVICES } from "@/lib/constants"

const iconMap = {
  Brain,
  Cloud,
  Smartphone,
  Globe,
  Target,
  Database,
}

export function Services(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  }

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
  }

  return (
    <section className="section-padding bg-white/30 dark:bg-transparent backdrop-blur-[2px] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-20"
        >
          <Badge
            variant="secondary"
            className="bg-primary-50 text-primary-700 border-primary-200"
          >
            Specialized Capabilities
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            How I Can <span className="gradient-text">Help</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
            I focus on the high-impact areas where I can deliver the most value
            to your product. No fluff, just shipping code that works.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            const isPopular = index === 0 // Make AI Development popular

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div variants={cardHoverVariants} className="h-full">
                  <Card className="h-full luxury-card group relative overflow-hidden flex flex-col">
                    {isPopular && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="luxury" className="shadow-lg">
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="p-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl group-hover:from-primary-500 group-hover:to-primary-600 transition-all duration-500"
                          >
                            <Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-500" />
                          </motion.div>
                          <div>
                            <CardTitle className="text-xl sm:text-2xl mb-2">
                              {service.title}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className="text-xs font-medium"
                            >
                              {service.engagementModel}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 flex-grow flex flex-col">
                      <div className="text-base text-gray-600 dark:text-slate-400 leading-relaxed min-h-[50px]">
                        {service.description}
                      </div>

                      {/* Target Audience */}
                      <div className="bg-primary-50/50 dark:bg-slate-700/50 p-3 rounded-lg border border-primary-100/50 dark:border-slate-600/50">
                        <h4 className="flex items-center text-sm font-semibold text-primary-900 dark:text-slate-100 mb-1">
                          <Target className="w-4 h-4 mr-2" />
                          Perfect For:
                        </h4>
                        <p className="text-sm text-primary-800 dark:text-slate-300">
                          {service.targetAudience}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="flex-grow">
                        <h4 className="font-semibold mb-3 text-gray-900 dark:text-slate-100 text-sm uppercase tracking-wider">
                          What's Included
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.map((feature) => (
                            <motion.div
                              key={feature}
                              whileHover={{ x: 2 }}
                              className="flex items-start space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700 dark:text-slate-300 leading-tight">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        {/* <h4 className="font-semibold mb-3 text-gray-900 text-sm">
                          Stack
                        </h4> */}
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 rounded text-xs border border-gray-200 dark:border-slate-600"
                            >
                              {tech}
                            </span>
                          ))}
                          {service.technologies.length > 4 && (
                            <span className="px-2 py-1 text-gray-400 text-xs">
                              +{service.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-2 mt-auto">
                        <Button
                          variant={isPopular ? "default" : "outline"}
                          className="w-full group shadow-lg dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 hover:scale-105 transition-transform"
                          asChild
                        >
                          <Link to={`/contact?service=${service.id}`}>
                            Inquire about {service.title}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>

                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 rounded-3xl p-8 border border-primary-100 dark:border-slate-700">
            <h3 className="text-2xl font-bold mb-4 dark:text-slate-100">
              Need something else?
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              If you have a specific technical challenge not listed here, let's
              chat. If I'm not the right fit, I'll tell you who is.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="shadow-xl" asChild>
                <Link to="/contact">
                  Book a Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 hover:scale-105 transition-transform"
                asChild
              >
                <a
                  href="https://jonnyn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View My Work
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
