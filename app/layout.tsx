import type { Metadata } from "next"

import "./globals.css"

import { geistSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

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
