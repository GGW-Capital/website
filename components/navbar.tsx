"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "./ui/gradient-button";
import { usePathname } from "next/navigation";

// Static navigation links - no CMS integration
const NAV_LINKS = [
  { href: "/", label: "Home" },
  {
    href: "#",
    label: "Properties",
    children: [
      { href: "/buy", label: "Buy" },
      { href: "/rent", label: "Rent" },
      { href: "/off-plan", label: "Off-Plan" },
    ],
  },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "Who We Are" },
      { href: "/about#team", label: "Our Team" },
    ],
  },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/services", label: "Services" },
  { href: "/developers", label: "Developers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Don't render the navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `bg-black/90 md:bg-black/40 md:backdrop-blur-md border-b border-[#D4AF37]/20 shadow-sm`
          : "bg-gradient-to-b from-black/90 to-black/0 border-[#D4AF37]/0"
      }`}
    >
      {/* Top bar with contact info */}
      <div
        className={`hidden md:block py-2 transition-all border-b border-[#D4AF37]/10 duration-300 ${
          isScrolled ? "bg-black/50" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-sm text-white/70 font-medium">
            <a
              href="tel:+971526925562"
              className="flex items-center hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              +971 52 692 5562
            </a>
            <a
              href="mailto:info@ggwcapitalre.com"
              className="flex items-center hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              info@ggwcapitalre.com
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://maps.app.goo.gl/URZeDftHMxVpZTCL7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white/70 hover:text-[#D4AF37] transition-colors text-sm font-medium"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Clover Bay Tower - Office 1912 - 19th floor - Business Bay - Dubai
              - UAE
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <div className="flex items-center">
              <Image
                src="/images/ggw-capital-logo.svg"
                alt="GGW Capital"
                width={224}
                height={47.6}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative group">
                {link.children ? (
                  <button
                    className="flex items-center text-white hover:text-[#D4AF37] transition-colors font-medium"
                    onClick={() => toggleDropdown(link.label)}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-white hover:text-[#D4AF37] transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown for desktop */}
                {link.children && (
                  <div className="absolute left-0 mt-2 w-48 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-md shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-3 text-white hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors font-medium"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <GradientButton>
              <Link href="/contact">Book a Consultation</Link>
            </GradientButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 py-20 px-4 z-40 overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full text-white hover:text-[#D4AF37] transition-colors py-3 border-b border-white/10 font-semibold"
                      onClick={() => toggleDropdown(link.label)}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown for mobile */}
                    {activeDropdown === link.label && (
                      <div className="pl-4 py-2 space-y-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block py-2 text-white/80 hover:text-[#D4AF37] transition-colors font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-white hover:text-[#D4AF37] transition-colors py-3 border-b border-white/10 font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8 space-y-4">
           <Link href="/contact"> <GradientButton className="w-full py-6 font-semibold">
              Book a Consultation
            </GradientButton></Link>

            <div className="flex flex-col space-y-4 pt-6">
              <a
                href="tel:+971526925562"
                className="flex items-center text-white/70 hover:text-[#D4AF37] transition-colors font-medium"
              >
                <Phone className="h-5 w-5 mr-3" />
                +971 52 692 5562
              </a>
              <a
                href="mailto:info@ggwcapitalre.com"
                className="flex items-center text-white/70 hover:text-[#D4AF37] transition-colors font-medium"
              >
                <Mail className="h-5 w-5 mr-3" />
                info@ggwcapitalre.com
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
