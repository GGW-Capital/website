import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Playfair_Display_SC } from "next/font/google";
import "@/app/(client-view)/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Script from "next/script";

// Initialize Montserrat font with multiple weights for UI elements
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Add Libre Baskerville for headings
const baskerville = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni-moda",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://ggwcapitalre.com"
  ),
  title: {
    template: "%s | GGW Capital Luxury Real Estate",
    default: "GGW Capital | Exclusive Luxury Real Estate in UAE",
  },
  description:
    "Discover exclusive luxury properties in the UAE with GGW Capital. Find premium villas, apartments, and penthouses for sale, rent, and off-plan investments in Dubai, Abu Dhabi, and beyond.",
  keywords: [
    "luxury real estate",
    "properties UAE",
    "premium villas",
    "luxury apartments",
    "Dubai properties",
    "Abu Dhabi real estate",
    "investment properties",
    "waterfront homes",
    "exclusive penthouses",
    "off-plan investments",
    "Dubai luxury market",
    "UAE property consultants",
  ],
  authors: [
    { name: "GGW Capital" },
    { name: "Dynamic ORD", url: "https://dynamicord.com" },],
  creator: "GGW Capital",
  publisher: "GGW Capital",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "GGW Capital Luxury Real Estate",
    title: "GGW Capital | Exclusive Luxury Real Estate in UAE",
    description:
      "Discover exclusive luxury properties in the UAE with GGW Capital. Find premium villas, apartments, and penthouses for sale, rent, and off-plan investments.",
    images: [
      {
        url: "/ggw-capital-logo.webp",
        width: 1200,
        height: 630,
        alt: "GGW Capital Luxury Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GGW Capital | Exclusive Luxury Real Estate",
    description:
      "Discover exclusive luxury properties in the UAE with GGW Capital. Premium villas, apartments, and penthouses.",
    images: ["/ggw-capital-logo.webp"],
  },
  alternates: {
    canonical: "https://ggwcapitalre.com",
  },
  other: {
    developer: "Dynamic ORD (https://dynamicord.com)", // 👈 Custom field for clarity
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code when available
  },
  category: "real estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${baskerville.variable} js`}
    >
      <head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="font-sans bg-black text-white min-h-screen relative">
        <Script
          dangerouslySetInnerHTML={{
            __html: `
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/67f9732936f0cc190e5a1cf9/1ioj6jnuv';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`,
          }}
        />

        {/* Page content rendered directly by the server */}
        <Navbar />
        {/* Main content wrapper with navbar spacing */}
        {children}
        <Footer />
        {/* <WhatsAppChat /> */}
      </body>
    </html>
  );
}
