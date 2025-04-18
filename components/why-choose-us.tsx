"use client"

import { useState, useEffect } from "react"
import { Shield, Award, Clock, Users, Gem, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { getSiteStatistics } from "@/lib/sanity"
import GradientTitle from "./ui/gradient-title"

const REASONS = [
  {
    icon: <Shield className="h-10 w-10 text-[#D4AF37]" />,
    title: "Trusted Expertise",
    description:
      "With over 15 years of experience in the UAE luxury real estate market, our team of experts provides unparalleled knowledge and guidance.",
  },
  {
    icon: <Award className="h-10 w-10 text-[#D4AF37]" />,
    title: "Exclusive Portfolio",
    description:
      "Access to the most prestigious properties and off-plan developments, many available exclusively through our network.",
  },
  {
    icon: <Clock className="h-10 w-10 text-[#D4AF37]" />,
    title: "Personalized Service",
    description:
      "Dedicated relationship managers who understand your unique requirements and provide tailored solutions for your property journey.",
  },
  {
    icon: <Users className="h-10 w-10 text-[#D4AF37]" />,
    title: "Global Network",
    description:
      "Connections with international investors, developers, and high-net-worth individuals across the globe.",
  },
  {
    icon: <Gem className="h-10 w-10 text-[#D4AF37]" />,
    title: "Premium Concierge",
    description:
      "Comprehensive concierge services including property management, interior design, and relocation assistance.",
  },
  {
    icon: <Globe className="h-10 w-10 text-[#D4AF37]" />,
    title: "Market Insights",
    description:
      "Regular market reports and investment analyses to help you make informed decisions in a dynamic market.",
  },
]

export default function WhyChooseUs() {
  const [stats, setStats] = useState({
    yearsInBusiness: 15,
    propertyCount: 500,
    clientSatisfaction: 98,
    industryAwards: 20,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const siteStats = await getSiteStatistics()
        if (siteStats) {
          setStats({
            yearsInBusiness: siteStats.yearsInBusiness || 15,
            propertyCount: siteStats.propertyCount || 500,
            clientSatisfaction: 98, // Hardcoded as this might not be easily tracked in Sanity
            industryAwards: 20, // Hardcoded as this might not be easily tracked in Sanity
          })
        }
      } catch (error) {
        console.error('Error fetching site statistics:', error)
      }
    }
    
    fetchStats()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      },
    },
  }

  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl heading-2 font-bold mb-6 text-white">
            Why <GradientTitle element="span">Choose us</GradientTitle>
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80">
            Discover the GGW Capital difference and why discerning clients trust us with their luxury real estate needs.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {REASONS.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-500 group"
            >
              <div className="bg-[#D4AF37]/10 p-4 rounded-full inline-flex mb-6 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                {reason.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">
                {reason.title}
              </h3>
              <p className="text-white/70 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 md:p-12 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-bold heading-3 text-white mb-6"
              >
                Our <GradientTitle element="span">Commitment</GradientTitle>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-white/80 mb-6 leading-relaxed"
              >
                At GGW Capital, we are committed to providing exceptional service and unparalleled expertise in the
                luxury real estate market. Our team of dedicated professionals works tirelessly to ensure that every
                client receives personalized attention and achieves their real estate goals.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/80 leading-relaxed"
              >
                Whether you're looking to buy, sell, or invest in luxury properties, our comprehensive approach and
                attention to detail ensure a seamless and rewarding experience. We pride ourselves on building lasting
                relationships based on trust, integrity, and results.
              </motion.p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#D4AF37]/10 p-6 rounded-xl text-center"
              >
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{stats.yearsInBusiness}+</div>
                <div className="text-white/80 text-sm">Years of Experience</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-[#D4AF37]/10 p-6 rounded-xl text-center"
              >
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{stats.propertyCount}+</div>
                <div className="text-white/80 text-sm">Luxury Properties</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#D4AF37]/10 p-6 rounded-xl text-center"
              >
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{stats.clientSatisfaction}%</div>
                <div className="text-white/80 text-sm">Client Satisfaction</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#D4AF37]/10 p-6 rounded-xl text-center"
              >
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{stats.industryAwards}+</div>
                <div className="text-white/80 text-sm">Industry Awards</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

