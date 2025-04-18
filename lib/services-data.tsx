import { Building2, Home, Briefcase, Landmark, Users, Key, Sparkles, Building, ArrowRight } from "lucide-react"
import React from "react"

// Main services used in the services page
// export const MAIN_SERVICES = [
//   {
//     id: "real-estate",
//     title: "Real Estate Services",
//     icon: <Home className="h-10 w-10 text-[#D4AF37]" />,
//     description: "Comprehensive real estate services including buying, selling, and renting properties across the UAE.",
//     features: [
//       "Property Search & Acquisition",
//       "Selling & Marketing Properties",
//       "Rental Management",
//       "Property Valuation",
//       "Investment Advisory",
//     ],
//     image: "/placeholder.jpg",
//   },
//   {
//     id: "company-formation",
//     title: "UAE Company Formation",
//     icon: <Building2 className="h-10 w-10 text-[#D4AF37]" />,
//     description: "Complete company setup services in UAE Free Zones and Mainland with ongoing support.",
//     features: [
//       "Free Zone Company Setup",
//       "Mainland Company Formation",
//       "Business Licensing",
//       "Corporate Bank Account Opening",
//       "PRO Services",
//     ],
//     image: "/placeholder.jpg",
//   },
//   {
//     id: "investment",
//     title: "Investment Advisory",
//     icon: <Briefcase className="h-10 w-10 text-[#D4AF37]" />,
//     description: "Expert guidance on real estate investments to maximize returns and build a strong portfolio.",
//     features: [
//       "Investment Strategy Development",
//       "Market Analysis & Research",
//       "ROI Calculation & Projections",
//       "Portfolio Diversification",
//       "Exit Strategy Planning",
//     ],
//     image: "/placeholder.jpg",
//   },
//   {
//     id: "banking",
//     title: "Banking & Financing",
//     icon: <Landmark className="h-10 w-10 text-[#D4AF37]" />,
//     description:
//       "Assistance with mortgage applications, financing options, and banking services for real estate transactions.",
//     features: [
//       "Mortgage Advisory",
//       "Loan Application Assistance",
//       "Interest Rate Negotiation",
//       "Banking Relationship Management",
//       "Financial Planning",
//     ],
//     image: "/placeholder.jpg",
//   },
//   {
//     id: "relocation",
//     title: "Relocation Services",
//     icon: <Users className="h-10 w-10 text-[#D4AF37]" />,
//     description: "Comprehensive relocation support for individuals and families moving to the UAE.",
//     features: [
//       "Visa & Residency Assistance",
//       "School & Education Guidance",
//       "Healthcare & Insurance Setup",
//       "Transportation & Logistics",
//       "Cultural Orientation",
//     ],
//     image: "/placeholder.jpg",
//   },
// ]

export const MAIN_SERVICES = [
  {
    id: "off-plan-projects",
    title: "Off-Plan Projects",
    tagline: "Invest in Dubai Future",
    description:
      "Secure your investment in Dubai's future with our exclusive off-plan projects offering high ROI potential and customization options.",
    icon: <Building className="h-10 w-10 text-[#D4AF37]" />,
    image: "/images/off-plan-projects.png",
    link: "/off-plan",
    features: [
      "Early investment opportunities with high ROI potential",
      "Customization options for buyers",
      "Strategic locations near Dubai's future landmarks",
      "Exclusive payment plans and incentives",
    ],
  },
  {
    id: "ready-to-move-in",
    title: "Ready-to-Move-In Properties",
    tagline: "Move Into Your Dream Home Today",
    description:
      "Find your perfect home that's ready for immediate occupancy in Dubai's most sought-after neighborhoods with no waiting periods.",
    icon: <Home className="h-10 w-10 text-[#D4AF37]" />,
    image: "/images/ready-to-move-in.png",
    link: "/buy",
    features: [
      "Ready for immediate occupancy",
      "Prime locations in Dubai's most sought-after neighborhoods",
      "No construction delays or waiting periods",
      "Move-in ready finishes and appliances",
      "Competitive pricing with flexible payment plans",
    ],
  },
  {
    id: "rental-solutions",
    title: "Rental Solutions",
    tagline: "Flexible Rental Options Tailored to You",
    description:
      "Discover our premium rental properties with flexible terms, full furnishing options, and comprehensive management services.",
    icon: <Key className="h-10 w-10 text-[#D4AF37]" />,
    image: "/images/rental-solutions.png",
    link: "/rent",
    features: [
      "Short and long-term rental options available",
      "Fully furnished properties in prime locations",
      "Transparent rental agreements",
      "24/7 property management and maintenance services",
      "Ideal for expats, professionals, and families",
    ],
  },
  {
    id: "investment-consulting",
    title: "Investment Consulting",
    tagline: "Maximize Your Investment Potential",
    description:
      "Our expert advisors provide tailored investment strategies based on in-depth market analysis to maximize your returns.",
    icon: <Briefcase className="h-10 w-10 text-[#D4AF37]" />,
    image: "/images/investment-consulting.png",
    link: "/services/investment",
    features: [
      "Tailored investment strategies",
      "Access to exclusive, high-growth real estate projects",
      "In-depth market analysis and insights",
      "Personalized advice for local and international investors",
      "Risk management and portfolio diversification",
    ],
  },
  {
    id: "property-management",
    title: "Property Management",
    tagline: "Comprehensive Property Management Services",
    description:
      "Let us handle every aspect of your property management, from tenant acquisition to maintenance and financial reporting.",
    icon: <Sparkles className="h-10 w-10 text-[#D4AF37]" />,
    image: "/images/property-management.png",
    link: "/services/real-estate",
    features: [
      "Tenant acquisition and management",
      "Regular property maintenance and inspections",
      "Transparent reporting and financial management",
      "24/7 support and emergency services",
      "Maximizing property value and rental income",
    ],
  },
]


// Exclusive services used in the home page
export const EXCLUSIVE_SERVICES = [
  {
    id: "off-plan-projects",
    title: "Off-Plan Projects",
    tagline: "Invest in Dubai Future",
    description:
      "Secure your investment in Dubai's future with our exclusive off-plan projects offering high ROI potential and customization options.",
    icon: <Building className="h-6 w-6 text-[#D4AF37]" />,
    image: "/images/off-plan-projects.png",
    link: "/off-plan",
    benefits: [
      "Early investment opportunities with high ROI potential",
      "Customization options for buyers",
      "Strategic locations near Dubai's future landmarks",
      "Exclusive payment plans and incentives",
    ],
  },
  {
    id: "ready-to-move-in",
    title: "Ready-to-Move-In Properties",
    tagline: "Move Into Your Dream Home Today",
    description:
      "Find your perfect home that's ready for immediate occupancy in Dubai's most sought-after neighborhoods with no waiting periods.",
    icon: <Home className="h-6 w-6 text-[#D4AF37]" />,
    image: "/images/ready-to-move-in.png",
    link: "/buy",
    benefits: [
      "Ready for immediate occupancy",
      "Prime locations in Dubai's most sought-after neighborhoods",
      "No construction delays or waiting periods",
      "Move-in ready finishes and appliances",
      "Competitive pricing with flexible payment plans",
    ],
  },
  {
    id: "rental-solutions",
    title: "Rental Solutions",
    tagline: "Flexible Rental Options Tailored to You",
    description:
      "Discover our premium rental properties with flexible terms, full furnishing options, and comprehensive management services.",
    icon: <Key className="h-6 w-6 text-[#D4AF37]" />,
    image: "/images/rental-solutions.png",
    link: "/rent",
    benefits: [
      "Short and long-term rental options available",
      "Fully furnished properties in prime locations",
      "Transparent rental agreements",
      "24/7 property management and maintenance services",
      "Ideal for expats, professionals, and families",
    ],
  },
  {
    id: "investment-consulting",
    title: "Investment Consulting",
    tagline: "Maximize Your Investment Potential",
    description:
      "Our expert advisors provide tailored investment strategies based on in-depth market analysis to maximize your returns.",
    icon: <Briefcase className="h-6 w-6 text-[#D4AF37]" />,
    image: "/images/investment-consulting.png",
    link: "/services/investment",
    benefits: [
      "Tailored investment strategies",
      "Access to exclusive, high-growth real estate projects",
      "In-depth market analysis and insights",
      "Personalized advice for local and international investors",
      "Risk management and portfolio diversification",
    ],
  },
  {
    id: "property-management",
    title: "Property Management",
    tagline: "Comprehensive Property Management Services",
    description:
      "Let us handle every aspect of your property management, from tenant acquisition to maintenance and financial reporting.",
    icon: <Sparkles className="h-6 w-6 text-[#D4AF37]" />,
    image: "/images/property-management.png",
    link: "/services/real-estate",
    benefits: [
      "Tenant acquisition and management",
      "Regular property maintenance and inspections",
      "Transparent reporting and financial management",
      "24/7 support and emergency services",
      "Maximizing property value and rental income",
    ],
  },
]