import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Playfair_Display_SC } from "next/font/google";
import "@/app/(client-view)/globals.css";
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
    { name: "Dynamic ORD", url: "https://dynamicord.com" },
  ],
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
        url: "/images/ggw-capital-logo.webp",
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
    images: ["/images/ggw-capital-logo.webp"],
  },
  other: {
    developer: "Dynamic ORD (https://dynamicord.com)", // 👈 Custom field for clarity
  },
  verification: {
    google: "poprW4idzg8MJ6-ThxMDpwk-4MHBWx5z0dM44yKosis",
    other: {
      "msvalidate.01": "0A2575AC00CC1BECD65FB7C06173AD61",
      "yandex-verification": '65c3f2d8d6582f4e'
    },
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
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3YXKDW657X"
          strategy="afterInteractive"
        />
        <Script strategy="afterInteractive" type="text/javascript">
    {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rdtltglq89");`}
</Script>
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3YXKDW657X');
          `}
        </Script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WZCKNJQ6');`,
          }}
        />
      </head>
      <body className="font-sans bg-black text-white min-h-screen relative">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WZCKNJQ6"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
