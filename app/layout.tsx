import type { Metadata } from "next"
import { Geist } from "next/font/google"

import "./globals.css"

import { cn } from "@/lib/utils"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Habyt Frontend Take-Home Assignment",
  description: "Habyt Frontend Take-Home Assignment",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.className, "antialiased min-h-screen")}>
        {children}
      </body>
    </html>
  )
}
