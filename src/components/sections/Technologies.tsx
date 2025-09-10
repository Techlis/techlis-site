import { motion } from "framer-motion"
import type { JSX } from "react/jsx-runtime"

export function Technologies(): JSX.Element {
  const technologies = [
    {
      category: "AI & Machine Learning",
      items: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "OpenAI API",
        "Hugging Face",
        "LangChain",
      ],
    },
    {
      category: "Frontend Development",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Vue.js",
        "Angular",
      ],
    },
    {
      category: "Backend & Cloud",
      items: ["Node.js", "Python", "AWS", "Docker", "Kubernetes", "PostgreSQL"],
    },
    {
      category: "Mobile Development",
      items: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "Firebase"],
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Technologies We <span className="gradient-text">Master</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We stay at the forefront of technology, using the latest tools and
            frameworks to build robust, scalable solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-4">
                {tech.category}
              </h3>
              <div className="space-y-2">
                {tech.items.map((item) => (
                  <div
                    key={item}
                    className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
