import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { JSX } from "react"

export function Hero(): JSX.Element {
  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden bg-white">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-100/50 rounded-full px-4 py-1.5">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse"></span>
              <span className="text-sm font-medium text-primary-700 tracking-wide">
                Specialized Product Engineering Studio
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-primary-900 mb-8 leading-[1.1]"
          >
            The Engineering Partner for <br className="hidden md:block" />
            <span className="text-primary-600">Visionary Founders.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl leading-relaxed"
          >
            Techlis partners with founders to design, build, and ship
            high-quality web and mobile products. No middle management, just
            specific senior engineering expertise.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button
              size="xl"
              className="h-14 px-8 text-lg shadow-xl shadow-primary-900/10 hover:shadow-primary-900/20 transition-all font-semibold"
              asChild
            >
              <Link to="/contact">
                Work With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="h-14 px-8 text-lg border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
              asChild
            >
              <a
                href="https://jonnyn.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Selected Work
                <ArrowRight className="ml-2 h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform" />
              </a>
            </Button>
          </motion.div>

          {/* Trust Indicators / Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 pt-10 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full"
          >
            {[
              { label: "Products Shipped", value: "50+" },
              { label: "Years Experience", value: "15+" },
              { label: "Client Revenue", value: "$50M+" },
              { label: "Code Quality", value: "A+" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-900 font-mono mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
