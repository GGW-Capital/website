
import type React from "react"
import { Montserrat } from "next/font/google"
// Initialize Montserrat font with multiple weights
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})


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
    </html>
  )
}
