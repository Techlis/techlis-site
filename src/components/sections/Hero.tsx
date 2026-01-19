import { Link } from "react-router-dom"
import { ArrowRight, Play, Sparkles, Zap, Shield, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { easeInOut, motion } from "framer-motion"
import type { JSX } from "react/jsx-runtime"

export function Hero(): JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeInOut,
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: easeInOut,
      },
    },
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"
        />

        {/* Floating geometric shapes */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 right-20 w-4 h-4 bg-primary-500 rounded-full opacity-60"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-40 left-20 w-6 h-6 bg-amber-400 rotate-45 opacity-40"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-40 right-40 w-3 h-3 bg-purple-500 rounded-full opacity-50"
        />
      </div>

      <div className="container relative z-10 flex items-center min-h-screen">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full"
        >
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="secondary"
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-primary-200/50 text-primary-700 px-4 py-2 text-sm font-medium shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                <span>Specialized Product Engineering</span>
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-shadow">
                The Engineering Partner for{" "}
                <span className="gradient-text relative">
                  Visionary Founders
                  <motion.div
                    animate={{
                      scaleX: [0, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 1,
                      ease: "easeOut",
                    }}
                    className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full origin-left"
                  />
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                I partner with founders to design, build, and ship high-quality
                web and mobile products. No middle management, just direct
                collaboration and shipping.
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: Zap, text: "Ship Faster" },
                  { icon: Shield, text: "Scale-Ready" },
                  { icon: Award, text: "Product Focused" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200/50 shadow-sm"
                  >
                    <item.icon className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="xl"
                  className="group shadow-2xl shadow-primary-500/25"
                  asChild
                >
                  <Link to="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="group bg-white/80 backdrop-blur-sm border-2 hover:bg-white"
                  asChild
                >
                  <a
                    href="https://jonnyn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    View My Work
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200/50">
                {[
                  { value: "50+", label: "Products Shipped" },
                  { value: "100%", label: "Founder Led" },
                  { value: "5yr+", label: "Engineering Exp" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            variants={itemVariants}
            className="relative lg:justify-self-end"
          >
            <div className="relative max-w-lg mx-auto">
              {/* Main Dashboard Card */}
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="luxury-card rounded-3xl p-8 backdrop-blur-xl"
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <Badge variant="luxury" className="text-xs">
                      AI Powered
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="h-6 primary-gradient rounded-lg w-3/4 shimmer" />
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>

                    {/* Interactive Elements */}
                    <div className="flex space-x-2 pt-4">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-8 w-20 bg-primary-100 rounded-lg flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                        className="h-8 w-20 bg-purple-100 rounded-lg flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="h-8 w-20 bg-amber-100 rounded-lg flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [-15, 15, -15],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-400 to-orange-400 text-white p-4 rounded-2xl shadow-2xl"
              >
                <Sparkles className="h-6 w-6" />
              </motion.div>

              <motion.div
                animate={{
                  y: [15, -15, 15],
                  rotate: [0, -10, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-primary-500 to-blue-600 text-white p-4 rounded-2xl shadow-2xl"
              >
                <Zap className="h-6 w-6" />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 -right-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl shadow-xl"
              >
                <Award className="h-5 w-5" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
