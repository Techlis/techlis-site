import { MessageSquare, Code2, Rocket } from "lucide-react"
import { RevealOnScroll } from "@/components/common/RevealOnScroll"

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We dive deep into your product vision, technical constraints, and business goals to define a roadmap that makes sense.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Build & Ship",
    description:
      "I get to work building your V1 or feature. You get regular updates, early preview builds, and code that is ready to scale.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Iterate & Scale",
    description:
      "Launch is just the beginning. We monitor real user usage, squash bugs, and iterate quickly to find product-market fit.",
    icon: Rocket,
  },
]

export function Process() {
  return (
    <section className="py-24 bg-white/30 backdrop-blur-[2px] relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <RevealOnScroll className="text-center mb-16 space-y-4" width="100%">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How We <span className="text-primary-600">Work Together</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            A simple, transparent process designed for speed and quality. No
            black boxes, just clear communication and shipping.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-0 w-full h-[2px] bg-gradient-to-r from-gray-100 via-primary-100 to-gray-100" />

          {steps.map((step, index) => (
            <RevealOnScroll
              key={index}
              delay={index * 0.2}
              className="relative relative-z-10 bg-white group rounded-2xl p-6 hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="mb-6 relative">
                <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center text-xl font-bold mb-4 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="absolute -top-4 -right-4 text-[4rem] font-bold text-gray-50 opacity-50 select-none">
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
