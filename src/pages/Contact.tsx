import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import {
  Button,
  Input,
  Textarea,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  LoadingButton,
  useToast,
} from "@/components/ui"
import { motion } from "framer-motion"
import { SEOHead } from "@/components/common/SEOHead"
import { generatePageSEO } from "@/lib/seo"
import type { JSX } from "react/jsx-runtime"

export function Contact(): JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { success, error: showError } = useToast()

  const seoData = generatePageSEO("contact")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Handle form submission here
      console.log("Form submitted:", formData)

      success(
        "Message sent successfully! We'll get back to you within 24 hours.",
        {
          duration: 6000,
        }
      )

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        service: "",
      })
    } catch (err) {
      showError(
        "Failed to send message. Please try again or contact us directly."
      )
      console.error("Form submission error:", err)
    } finally {
      setIsSubmitting(false)
    }
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
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-purple-700 text-white py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl font-bold">Get In Touch</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Ready to transform your business with AI? Let's discuss your
                project and explore how we can help.
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
                  <h2 className="text-2xl font-bold mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <Mail className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-gray-600">hello@techlis.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <Phone className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-gray-600">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-50 to-purple-50 p-6 rounded-xl">
                  <h3 className="font-semibold mb-2">Quick Response</h3>
                  <p className="text-gray-600 text-sm">
                    We typically respond to all inquiries within 24 hours. For
                    urgent matters, please call us directly.
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
                    <CardTitle>Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2"
                          >
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
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
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium mb-2"
                          >
                            Company
                          </label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="service"
                            className="block text-sm font-medium mb-2"
                          >
                            Service Interest
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                          >
                            <option value="">Select a service</option>
                            <option value="ai-development">
                              AI Development
                            </option>
                            <option value="cloud-architecture">
                              Cloud Architecture
                            </option>
                            <option value="mobile-development">
                              Mobile Development
                            </option>
                            <option value="web-development">
                              Web Development
                            </option>
                            <option value="consulting">Consulting</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2"
                        >
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project..."
                          rows={6}
                          required
                        />
                      </div>

                      <LoadingButton
                        type="submit"
                        size="lg"
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
