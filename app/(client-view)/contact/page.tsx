import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "@/components/icons";
import { getTeamMembers } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import GradientTitle from "@/components/ui/gradient-title";
import { Metadata } from "next";
import ContactForm from "@/components/contact-form";

// SEO metadata for the contact page
export const metadata: Metadata = {
  title: "Contact GGW Capital | Luxury Real Estate Consultants",
  description:
    "Get in touch with GGW Capital's luxury real estate experts. Schedule a consultation for buying, selling, or investing in premium properties across the UAE.",
  keywords: [
    "contact luxury real estate agent",
    "UAE property consultation",
    "Dubai real estate advisory",
    "luxury property viewing",
    "premium real estate consultation",
    "schedule property tour Dubai",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export const revalidate = 60;

export default async function ContactPage() {
  // Fetch team members from Sanity CMS server-side
  let teamMembers = [];
  try {
    teamMembers = await getTeamMembers();
  } catch (error) {
    console.error("Error loading team members:", error);
  }

  return (
    <main className="min-h-screen bg-black text-white pt-44 pb-20">
      <div className="container mx-auto px-4">
        <div
          className="max-w-4xl mx-auto text-center mb-16"
          data-taos="fade-up"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl heading-1 font-bold mb-6 text-white">
            <GradientTitle element="span">Contact</GradientTitle> Us
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80">
            Get in touch with our expert team for personalized assistance with
            your real estate needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div data-taos="fade-right">
            {/* Contact Form - Client Component */}
            <div
              id="contact-form"
              className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 shadow-[0_0_15px_rgba(212,175,55,0.15)] mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h2>

              <ContactForm />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+971568663666"
                className="flex-1 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6 flex items-center gap-4 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Call Us</h3>
                  <p className="text-white/70">+971 56 866 3666</p>
                </div>
              </a>

              <a
                href="https://wa.me/971501234567"
                className="flex-1 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6 flex items-center gap-4 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all"
              >
                <div className="bg-[#D4AF37]/10 p-3 rounded-full">
                  <WhatsappIcon className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">WhatsApp</h3>
                  <p className="text-white/70">+971 56 866 3666</p>
                </div>
              </a>
            </div>
          </div>

          <div className="space-y-8" data-taos="fade-left">
            <Link
              href="https://maps.app.goo.gl/W5ud2PHcowraRZLN6"
              className="relative h-[300px] block rounded-xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8731.732752409618!2d55.268038762024354!3d25.19167585747499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6912ed5fac13%3A0x3259bd68d96bd734!2sGulf%20Gateway%20CSP!5e0!3m2!1sen!2slb!4v1743055116089!5m2!1sen!2slb"
                width="600"
                height="450"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm border border-[#D4AF37]/60 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#D4AF37] mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Our Office
                    </h3>
                    <p className="text-white/70">
                      Clover Bay Tower, Office 1912, 19th floor, Business Bay
                    </p>
                  </div>
                </div>
              </div>
            </Link>


            {/* Team Section */}
            {teamMembers.length > 0 && (
              <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Our Expert Team
                </h2>
                <div className="space-y-7">
                  {teamMembers.slice(0, 4).map((member:any) => (
                    <div className="flex items-center gap-4" key={member._id}>
                      <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        {member.image ? (
                          <Image
                            src={urlFor(member.image)
                              .width(120)
                              .height(120)
                              .url()}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Image
                            src="/placeholder-user.jpg"
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <Link href={`/about#team`} className="text-lg font-medium text-white">
                          {member.name}
                        </Link>
                        <p className="text-[#D4AF37]">{member.position}</p>
                        <div className="flex items-center gap-4 mt-2">
                          {member.phone && (
                            <a
                              href={`tel:${member.phone}`}
                              className="text-white/70 text-sm hover:text-white"
                            >
                              <Phone className="h-4 w-4" />
                            </a>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="text-white/70 text-sm hover:text-white"
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                          )}
                          {member.socialMedia.linkedin && (
                            <a
                              href={member.socialMedia.linkedin}
                              target="_blank"
                              className="text-white/70 text-sm hover:text-white"
                            >
                              <LinkedinIcon className="h-4 w-4" />
                            </a>
                          )}
                          {member.socialMedia.facebook && (
                            <a
                              href={member.socialMedia.facebook}
                              target="_blank"
                              className="text-white/70 text-sm hover:text-white"
                            >
                              <FacebookIcon className="h-4 w-4" />
                            </a>
                          )}
                          {member.socialMedia.instagram && (
                            <a
                              href={member.socialMedia.instagram}
                              target="_blank"
                              className="text-white/70 text-sm hover:text-white"
                            >
                              <InstagramIcon className="h-4 w-4" />
                            </a>
                          )}
                          {member.socialMedia.twitter && (
                            <a
                              href={member.socialMedia.twitter}
                              target="_blank"
                              className="text-white/70 text-sm hover:text-white"
                            >
                              <TwitterIcon className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {teamMembers.length > 4 && (
                  <div className="mt-4 text-center">
                    <Link
                      href="/about"
                      className="text-[#D4AF37] hover:underline inline-flex items-center text-sm"
                    >
                      View all team members
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
