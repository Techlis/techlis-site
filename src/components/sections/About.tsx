import {
  CheckCircle,
  Users,
  Award,
  Zap,
  Target,
  Shield,
  Rocket,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { easeInOut, motion } from "framer-motion"
import type { JSX } from "react"

export function About(): JSX.Element {
  const stats = [
    {
      icon: Users,
      value: "20+",
      label: "Expert Developers",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Award,
      value: "100+",
      label: "Projects Completed",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: CheckCircle,
      value: "98%",
      label: "Client Satisfaction",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Zap,
      value: "24/7",
      label: "Premium Support",
      color: "from-amber-500 to-amber-600",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  }

  return (
    <section className="section-padding bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-primary-100/30 to-purple-100/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-amber-100/30 to-orange-100/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <Badge
                variant="secondary"
                className="bg-primary-50 text-primary-700 border-primary-200 mb-6"
              >
                The Founder Partner Model
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Why Founders{" "}
                <span className="gradient-text">Partner With Techlis</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We act as your technical co-founder for hire. You get the
                expertise of a senior engineering team without the overhead of
                managing one. We focus on speed, quality, and shipping real
                value.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Target,
                    text: "Product-First Mindset",
                    color: "text-blue-600",
                  },
                  {
                    icon: Shield,
                    text: "Scale-Ready V1s",
                    color: "text-purple-600",
                  },
                  {
                    icon: Rocket,
                    text: "Rapid Iteration Cycles",
                    color: "text-green-600",
                  },
                  {
                    icon: Award,
                    text: "High-Fidelity Engineering",
                    color: "text-amber-600",
                  },
                  {
                    icon: Users,
                    text: "Long-term Partnership",
                    color: "text-red-600",
                  },
                  {
                    icon: Zap,
                    text: "Direct Communication",
                    color: "text-indigo-600",
                  },
                ].map((feature) => (
                  <motion.div
                    key={feature.text}
                    whileHover={{ x: 4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/60 transition-all duration-200"
                  >
                    <div
                      className={`p-2 rounded-lg bg-gray-50 ${feature.color}`}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mission Statement */}
            <motion.div variants={itemVariants}>
              <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-6 border border-primary-100">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower visionary founders by bridging the gap between
                  complex engineering and simple, usable product design. We
                  build technology that serves the business, not the other way
                  around.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, -1, 1, 0],
                  }}
                  transition={{ duration: 0.3 }}
                  className="luxury-card text-center p-8 group cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-4xl font-bold gradient-text mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom Section - Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and ensure we deliver
              exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation First",
                description:
                  "We stay ahead of technology trends to provide cutting-edge solutions.",
                icon: Rocket,
                gradient: "from-blue-500 to-purple-600",
              },
              {
                title: "Quality Driven",
                description:
                  "Every line of code is crafted with precision and tested thoroughly.",
                icon: Shield,
                gradient: "from-purple-500 to-pink-600",
              },
              {
                title: "Client Success",
                description:
                  "Your success is our success. We're committed to your long-term growth.",
                icon: Target,
                gradient: "from-amber-500 to-orange-600",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
