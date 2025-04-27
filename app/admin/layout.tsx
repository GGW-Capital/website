import type React from "react"
import { Montserrat } from "next/font/google"
import "../globals.css"

// Initialize Montserrat font with multiple weights
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata = {
  title: "GGW Capital Admin | Sanity Studio",
  description: "Admin panel for GGW Capital",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans bg-white">
        {children}
      </body>
      <style dangerouslySetInnerHTML={{__html: `* iframe, * .widget-visible iframe{display: none !important;}`}}/>
    </html>
  )
}
