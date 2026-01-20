import { motion, useInView, type UseInViewOptions } from "framer-motion"
import { useRef } from "react"

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  width?: "fit-content" | "100%"
  viewOptions?: UseInViewOptions
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0.1,
  duration = 0.5,
  width = "fit-content",
  viewOptions,
}: RevealOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
    ...viewOptions,
  })

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
