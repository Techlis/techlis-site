import { RevealOnScroll } from "@/components/common/RevealOnScroll"
import { ExternalLink, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const works = [
  {
    title: "Tipbox",
    category: "SaaS Partnership",
    summary:
      "A unified workspace for team collaboration and secure asset sharing.",
    narrative:
      "Teams faced fractured workflows sharing sensitive assets. Joined as Lead Engineer to transition the platform from prototype to commercial launch. Architected the PERN stack and built the real-time notification engine.",
    bullets: [
      "Scalable PERN Stack Architecture",
      "Automated AWS Infrastructure (Terraform)",
      "High-Performance GraphQL API",
    ],
    tags: ["React", "Node.js", "GraphQL", "AWS"],
    link: "https://tipbox.io",
  },
  {
    title: "Lyft Shipping",
    category: "Logistics Platform",
    summary: "Real-time ecosystem for fleet management and driver dispatch.",
    narrative:
      "They needed to synchronize complex shipping operations across web and mobile. Led the full-stack build of the dispatcher dashboard and a dedicated React Native driver app to track thousands of shipments in real-time.",
    bullets: [
      "Real-time Driver Tracking",
      "Cross-Platform Mobile App",
      "High-Concurrency Dispatch Backend",
    ],
    tags: ["React Native", "MongoDB", "Express", "AWS"],
    link: "https://diamonddelivers.com",
  },
  {
    title: "NFB Films App",
    category: "Mobile Experience",
    summary:
      "Streaming experience serving 4,000+ films for a national media library.",
    narrative:
      "The National Film Board needed to modernize access to their massive archive. Rebuilt their mobile presence from the ground up, creating a 4.8-star app that serves thousands of daily users.",
    bullets: [
      "4.8 Star App Store Rating",
      "Custom Interactive CMS",
      "CI/CD Pipelines (Fastlane)",
    ],
    tags: ["React Native", "Redux", "Firebase", "Fastlane"],
    link: "https://www.nfb.ca/apps",
  },
]

export function SelectedWork() {
  return (
    <section className="py-24 bg-white/30 backdrop-blur-[2px] relative">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <RevealOnScroll className="max-w-3xl mb-16" width="100%">
          <Badge
            variant="secondary"
            className="mb-4 text-primary-700 bg-primary-50 border-primary-200"
          >
            Selected Work
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Proof of <span className="text-primary-600">Work</span>
          </h2>
          <p className="text-xl text-gray-500 leading-relaxed">
            Real products shipped with real founders. Here are a few examples
            where Techlis acted as the lead engineering partner.
          </p>
        </RevealOnScroll>

        {/* Case Studies - Vertical Stacking */}
        <div className="relative">
          {works.map((work, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5 }}
              className="sticky top-24 md:top-32 py-4"
              style={{
                zIndex: index + 1,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 bg-white/90 pt-12 group transition-all duration-500">
                {/* Left: Identity */}
                <div className="lg:col-span-4 space-y-6">
                  <div>
                    <div className="text-sm font-semibold tracking-wider text-primary-600 uppercase mb-2">
                      {work.category}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {work.title}
                    </h3>
                    <p className="text-lg text-gray-600 font-medium">
                      {work.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200 font-mono transition-colors group-hover:border-primary-200 group-hover:bg-primary-50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button variant="outline" className="group/btn" asChild>
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project{" "}
                      <ExternalLink className="ml-2 h-3 w-3 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                </div>

                {/* Right: Narrative */}
                <div className="lg:col-span-8 bg-gray-50 rounded-2xl p-8 lg:p-10 border border-gray-100/50 transition-all duration-500 group-hover:shadow-xl group-hover:border-primary-100/50 group-hover:bg-white group-hover:-translate-y-1">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    The Collaboration
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {work.narrative}
                  </p>

                  <h4 className="font-semibold text-gray-900 mb-4">
                    Key Outcomes
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {work.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* "More Work" Blurb */}
        <RevealOnScroll
          className="mt-24 text-center border-t border-gray-100 pt-16"
          width="100%"
        >
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            These are just product engineering highlights. For a deeper dive
            into the founder's technical background, creative experiments, and
            full history:
          </p>
          <Button
            size="xl"
            variant="outline"
            className="h-14 px-8 text-lg bg-white hover:bg-gray-50 hover:scale-105 transition-transform"
            asChild
          >
            <a
              href="https://jonnyn.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Full Portfolio on jonnyn.com
            </a>
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  )
}
