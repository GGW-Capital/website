import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTeamMembers } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import GradientTitle from "@/components/ui/gradient-title";
import { Metadata } from "next";

// SEO metadata for the about page
export const metadata: Metadata = {
  title: "About GGW Capital | Premier Luxury Real Estate Agency",
  description:
    "Learn about GGW Capital, Dubai's premier luxury real estate agency with over 15 years of experience delivering exceptional properties and service to discerning clients worldwide.",
  keywords: [
    "Dubai luxury real estate agency",
    "GGW Capital history",
    "premium property experts",
    "luxury real estate team Dubai",
    "high-end property specialists",
    "luxury Dubai property agents",
  ],
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  // Fetch team members from Sanity CMS server-side
  let teamMembers: any[] = [];
  try {
    teamMembers = await getTeamMembers();
  } catch (error) {
    console.error("Error loading team members:", error);
  }

  // Static data
  const coreValues = [
    {
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from property selection to client service.",
    },
    {
      title: "Integrity",
      description:
        "We operate with the highest level of integrity and transparency in all our dealings.",
    },
    {
      title: "Innovation",
      description:
        "We constantly innovate to provide cutting-edge solutions and services to our clients.",
    },
    {
      title: "Personalization",
      description:
        "We tailor our services to meet the unique needs and preferences of each client.",
    },
  ];

  const achievements = [
    { metric: "450+", label: "Luxury Properties Sold" },
    { metric: "96%", label: "Client Satisfaction Rate" },
    { metric: "15+", label: "Years of Excellence" },
    { metric: "25+", label: "Expert Agents" },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div 
          className="max-w-4xl mx-auto text-center mb-16"
          data-taos="fade-up"
        >
          <h1 className="text-4xl md:text-5xl heading-1 lg:text-6xl font-bold mb-6 text-white">
            About <GradientTitle element="span">GGW Capital</GradientTitle>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80">
            The premier luxury real estate agency in Dubai, delivering
            exceptional properties and unparalleled service to discerning clients
            worldwide.
          </p>
        </div>

        {/* Company Story */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          data-taos="fade-up"
        >
          <Image
            alt="ggw capital office"
            width={500}
            height={400}
            src="/images/ggw-office.png"
            className="rounded-lg"
          />
          <div>
            <h2 className="text-3xl font-bold mb-6 heading-2 text-white">
              Our <span className="text-[#D4AF37]">Story</span>
            </h2>
            <p className="text-white/80 mb-6">
              GGW Capital was founded in 2010 with a vision to redefine luxury
              real estate in the UAE. What began as a boutique agency has grown
              into one of the most respected names in the Dubai property market,
              known for exceptional service and an unrivaled portfolio of
              high-end properties.
            </p>
            <p className="text-white/80 mb-6">
              Our journey has been marked by a commitment to excellence,
              integrity, and a deep understanding of both the local market and
              the unique needs of our international clientele. We've cultivated
              relationships with developers, property owners, and investors
              around the world, establishing GGW Capital as a trusted partner in
              luxury real estate.
            </p>
            <p className="text-white/80">
              Today, we continue to push boundaries and set new standards in the
              industry, guided by our founding principles and an unwavering
              dedication to our clients' success.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div 
          className="mb-20"
          data-taos="fade-up"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white heading-2">
              Our <span className="text-[#D4AF37]">Core Values</span>
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              At GGW Capital, our values guide everything we do, from how we
              interact with clients to how we select properties for our
              portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300"
                data-taos={`fade-up delay-${index * 100}`}
              >
                <div className="bg-[#D4AF37]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div 
          className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-10 shadow-[0_0_15px_rgba(212,175,55,0.15)] mb-20"
          data-taos="fade-up"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white heading-2">
              Our <span className="text-[#D4AF37]">Achievements</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <div 
                key={index} 
                className="text-center"
                data-taos={`fade-up delay-${index * 100}`}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">
                  {item.metric}
                </div>
                <div className="text-white/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <div 
          className="mb-20"
          data-taos="fade-up"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-white heading-2">
              Meet Our <span className="text-[#D4AF37]">Team</span>
            </h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              Our team of experienced professionals is dedicated to providing
              exceptional service and finding the perfect property for each
              client.
            </p>
          </div>

          {teamMembers.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-white/70">
                Our team information is currently being updated. Please check
                back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member: any, index: number) => (
                <div
                  key={member._id}
                  className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                  data-taos={`fade-up delay-${index % 6 * 100}`}
                >
                  <div className="relative h-[300px]">
                    {member.image ? (
                      <Image
                        src={urlFor(member.image).width(500).height(500).url()}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-[#0a0a0a] to-[#111] flex items-center justify-center">
                        <div className="text-4xl font-bold text-[#D4AF37]/30">
                          {member.name.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white heading-3 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#D4AF37] mb-4">{member.position}</p>
                    {member.bio && (
                      <p className="text-white/70 mb-4 line-clamp-3">
                        {member.bio}
                      </p>
                    )}

                    <div className="flex items-center gap-4">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-white/70 hover:text-[#D4AF37] transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="text-white/70 hover:text-[#D4AF37] transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div 
          className="bg-gradient-to-r from-[#0a0a0a] to-[#111] border border-[#D4AF37]/20 rounded-xl p-10 shadow-[0_0_15px_rgba(212,175,55,0.15)] text-center"
          data-taos="fade-up"
        >
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Find Your <span className="text-[#D4AF37]">Dream Property?</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-8">
            Our team of experts is ready to help you find the perfect property
            that matches your unique requirements and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] text-black hover:from-[#C4A030] hover:to-[#9A7C25] px-8 py-2 text-base">
                Contact Us
              </Button>
            </Link>
            <Link href="/buy">
              <Button
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-2 text-base"
              >
                View Properties <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}