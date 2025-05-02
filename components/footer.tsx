"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

// Static footer component - no CMS integration
export default function Footer() {
  const pathname = usePathname();
  const { toast } = useToast();

  // Don't render the footer on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-[#050505] text-white border-t border-[#D4AF37]/20">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-6">
              <div className="relative w-48 h-12">
                <Image
                  src="/images/ggw-capital-logo.svg"
                  alt="GGW Capital"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-white/70 mb-6">
              GGW Capital is a premier luxury real estate agency specializing in
              high-end properties across the UAE. Our expertise and personalized
              service ensure an exceptional experience for our discerning
              clients.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/ggwcapital/"
                target="_blank"
                className="text-white/70 hover:text-[#D4AF37] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61565948621617"
                target="_blank"
                className="text-white/70 hover:text-[#D4AF37] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/ggw-capital-real-estate-brokerage"
                target="_blank"
                className="text-white/70 hover:text-[#D4AF37] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Properties for Sale", href: "/buy" },
                { label: "Properties for Rent", href: "/rent" },
                {
                  label: "Off-Plan Projects",
                  href: "/projects?marketType=off-plan",
                },
                { label: "Neighborhoods", href: "/neighborhoods" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#D4AF37] transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-[#D4AF37]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-[#D4AF37] mt-1" />
                <span className="text-white/70">
                  Downtown Dubai, Sheikh Mohammed bin Rashid Blvd
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-[#D4AF37]" />
                <a
                  href="tel:+971526925562"
                  className="text-white/70 hover:text-[#D4AF37] transition-colors"
                >
                  +971 52 692 5562
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#D4AF37]" />
                <a
                  href="mailto:info@ggwcapitalre.com"
                  className="text-white/70 hover:text-[#D4AF37] transition-colors"
                >
                  info@ggwcapitalre.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Newsletter</h3>
            <p className="text-white/70 mb-6">
              Subscribe to our newsletter to receive the latest updates on
              luxury properties and market insights.
            </p>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const emailInput = form.querySelector(
                  'input[type="email"]'
                ) as HTMLInputElement;
                const email = emailInput?.value;
                const submitButton = form.querySelector(
                  'button[type="submit"]'
                ) as HTMLButtonElement;

                if (!email || !email.includes("@")) {
                  toast({
                    variant: "destructive",
                    title: "Invalid Email",
                    description: "Please enter a valid email address",
                  });
                  return;
                }

                // Set loading state
                submitButton.disabled = true;
                submitButton.innerHTML =
                  '<span class="inline-block animate-spin mr-2">⟳</span> Subscribing...';

                fetch("/api/newsletter", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.success) {
                      toast({
                        variant: "default",
                        title: "Success!",
                        description: data.message,
                      });
                      emailInput.value = "";
                    } else {
                      toast({
                        variant: "destructive",
                        title: "Error",
                        description:
                          data.message ||
                          "Failed to subscribe. Please try again later.",
                      });
                    }
                  })
                  .catch((error) => {
                    console.error("Newsletter subscription error:", error);
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description:
                        "Failed to subscribe. Please try again later.",
                    });
                  })
                  .finally(() => {
                    // Reset button state
                    submitButton.disabled = false;
                    submitButton.innerHTML = "Subscribe";
                  });
              }}
            >
              <Input
                type="email"
                placeholder="Your Email Address"
                className="bg-transparent border-[#D4AF37]/30 focus:border-[#D4AF37] h-12"
                required
              />
              <Button
                type="submit"
                className="w-full bg-black border border-ggw-gold text-ggw-gold hover:bg-ggw-gold/10 rounded-[2px] font-sans"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-[#D4AF37]/10 py-6 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} GGW Capital. All rights reserved.
            </p>
            <p className="text-white/50 text-center text-sm mb-4 md:mb-0">
              Developed by{" "}
              <span itemScope itemType="https://schema.org/Organization">
                <a
                  itemProp="url"
                  className="bg-ggw-gradient bg-clip-text text-transparent hover:underline decoration-primary font-bold"
                  href="https://dynamicord.com?utm_source=clientsite&utm_medium=referral&utm_campaign=portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span itemProp="name">Dynamic ORD</span>
                </a>
              </span>{" "}
              — SEO-first development.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/50">
              <Link
                href="/privacy-policy"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
