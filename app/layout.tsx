import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BMC IT Club - Bhairahawa Multiple Campus",
  description: "Empowering Students with IT Skills at BMC",
  keywords: "BMC, IT Club, Bhairahawa Multiple Campus, Nepal, Programming, Technology, Sunil Neupane",
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
