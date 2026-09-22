import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Send } from "lucide-react"
import {
  Input,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LoadingButton,
  useToast,
} from "@/components/ui"
import { SEOHead } from "@/components/common/SEOHead"
import { generatePageSEO } from "@/lib/seo"
import type { JSX } from "react/jsx-runtime"

function Contact(): JSX.Element {
  // Read service param from URL
  const searchParams = new URLSearchParams(window.location.search)
  const initialService = searchParams.get("service") || ""
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    service: initialService,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { success, error: showError } = useToast()

  const seoData = generatePageSEO("contact")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const myForm = e.target as HTMLFormElement
    const netlifyFormData = new FormData(myForm)

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // body: new URLSearchParams(
      //   Array.from(netlifyFormData.entries()) as [string, string][]
      // ).toString(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: new URLSearchParams(netlifyFormData as any).toString(),
    })
      .then(() => {
        success(
          "Message sent successfully! I'll get back to you within 24 hours.",
          { duration: 6000 }
        )
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
          service: "",
        })
      })
      .catch((error) => {
        showError(
          "Failed to send message. Please try again or contact me directly."
        )
        console.error("Form submission error:", error)
      })
    setIsSubmitting(false)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <SEOHead seoData={seoData} />
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          {/* Animated Gradient Blob */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[400px] bg-primary-500/20 dark:bg-primary-400/10 blur-[100px] rounded-full sm:w-[800px] sm:h-[500px]"
          />

          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto space-y-8"
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-sm text-muted-foreground shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Currently accepting new projects
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                Let's Build Something <br className="hidden md:block" />
                <span className="text-primary-600 dark:text-primary-400">
                  Exceptional
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Whether you have a clear roadmap or just a spark of an idea, I'm
                here to help you build software that matters.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6 dark:text-slate-100">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-secondary rounded-lg">
                        <Mail className="h-6 w-6 text-primary-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold dark:text-slate-100">
                          Email
                        </h3>
                        <p className="text-gray-600 dark:text-slate-400">
                          hello@techlis.com
                        </p>
                      </div>
                    </div>

                    {/* <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <Phone className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div> */}

                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-secondary rounded-lg">
                        <MapPin className="h-6 w-6 text-primary-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold dark:text-slate-100">
                          Location
                        </h3>
                        <p className="text-gray-600 dark:text-slate-400">
                          Vancouver, BC
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-xl border border-border">
                  <h3 className="font-semibold mb-2 dark:text-slate-100">
                    Quick Response
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm">
                    We typically respond to all inquiries within 24 hours. For
                    urgent matters, feel free to email us directly.
                  </p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Send a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      name="contact"
                      method="POST"
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <input type="hidden" name="form-name" value="contact" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2 dark:text-slate-200"
                          >
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="transition-all duration-300 focus:border-primary-400 focus:shadow-md"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2 dark:text-slate-200"
                          >
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            required
                            className="transition-all duration-300 focus:border-primary-400 focus:shadow-md"
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium mb-2 dark:text-slate-200"
                          >
                            Company
                          </label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company"
                            className="transition-all duration-300 focus:border-primary-400 focus:shadow-md"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label
                            htmlFor="service"
                            className="block text-sm font-medium mb-2 dark:text-slate-200"
                          >
                            Service Interest
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="flex h-11 w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-all duration-300 focus:border-primary-400 focus:shadow-md"
                          >
                            <option value="">Select a service</option>
                            <option value="founder-partner">
                              Founder Product Partner
                            </option>
                            <option value="mobile-launch">
                              Mobile MVP Launch
                            </option>
                            <option value="saas-build">SaaS Platform V1</option>
                            <option value="ai-addon">
                              AI Feature Integration
                            </option>
                            <option value="other">Other</option>
                          </select>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2 dark:text-slate-200"
                        >
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project..."
                          rows={6}
                          required
                          className="transition-all duration-300 focus:border-primary-400 focus:shadow-md"
                        />
                      </motion.div>

                      <p style={{ display: "none" }}>
                        <label>
                          Don’t fill this out if you’re human:{" "}
                          <input name="bot-field" />
                        </label>
                      </p>

                      <LoadingButton
                        type="submit"
                        // size="lg"
                        className="w-full group"
                        isLoading={isSubmitting}
                        loadingText="Sending Message..."
                        disabled={isSubmitting}
                      >
                        Send Message
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </LoadingButton>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
export default Contact
export { Contact }
