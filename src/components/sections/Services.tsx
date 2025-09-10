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
  CardDescription,
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
    <section className="section-padding bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
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
            Premium Services
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Our <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From AI development to cloud architecture, we provide comprehensive
            solutions that drive innovation and accelerate your business growth
            with cutting-edge technology.
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
                  <Card className="h-full luxury-card group relative overflow-hidden">
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
                            <CardTitle className="text-2xl mb-2">
                              {service.title}
                            </CardTitle>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {service.pricing}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-base text-gray-600 leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold mb-4 text-gray-900">
                          Key Capabilities
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {service.features.map((feature) => (
                            <motion.div
                              key={feature}
                              whileHover={{ x: 4 }}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold mb-4 text-gray-900">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <motion.span
                              key={tech}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1 bg-gray-100 hover:bg-primary-50 text-gray-700 hover:text-primary-700 rounded-full text-xs font-medium transition-all duration-200 cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-4">
                        <Button
                          variant={isPopular ? "default" : "outline"}
                          className="w-full group shadow-lg"
                          asChild
                        >
                          <Link to={`/contact?service=${service.id}`}>
                            Get Started
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
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-3xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every business is unique. Let's discuss your specific requirements
              and create a tailored solution that perfectly fits your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="shadow-xl" asChild>
                <Link to="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
