"use client"

import type React from "react"

import { useState } from "react"
import { FileDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function CSVExportSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail("")

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 md:p-12 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Download Our <span className="text-[#D4AF37]">Market Report</span>
              </h2>
              <p className="text-white/80 mb-6">
                Get our comprehensive analysis of the UAE luxury real estate market, including price trends, investment
                opportunities, and future projections.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Detailed price analysis by neighborhood",
                  "ROI comparison across property types",
                  "Developer performance metrics",
                  "Market forecast for the next 5 years",
                  "Expert insights and recommendations",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="bg-[#D4AF37]/10 p-1 rounded-full mt-1">
                      <Check className="h-4 w-4 text-[#D4AF37]" />
                    </div>
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#0a0a0a] border border-[#D4AF37]/10 rounded-xl p-6 shadow-lg"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-[#D4AF37]/10 p-4 rounded-full">
                  <FileDown className="h-10 w-10 text-[#D4AF37]" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white text-center mb-6">Get Your Free CSV Export</h3>

              {isSubmitted ? (
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-4 text-center">
                  <Check className="h-6 w-6 text-[#D4AF37] mx-auto mb-2" />
                  <p className="text-white">Thank you! Your report has been sent to your email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-transparent border-[#D4AF37]/40 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#D4AF37] text-black hover:bg-[#C4A030] py-6 font-medium transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <FileDown className="h-5 w-5" />
                          Download Report
                        </div>
                      )}
                    </Button>

                    <p className="text-xs text-white/50 text-center">
                      By submitting, you agree to receive occasional updates about the market. We respect your privacy
                      and will never share your information.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

