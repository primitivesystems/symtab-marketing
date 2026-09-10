import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"

import "@workspace/ui/globals.css"
import "./typeset.css"
import "./releases.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import { SiteHeader } from "@/components/navbar"
import { SiteFooter } from "@/components/footer"
import { announcement } from "@/lib/marketing-config"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { WelcomeMotion } from "@workspace/ui/components/utilities/welcome-motion"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "Symtab | Your knowledge should belong to you",
    template: "%s · Symtab",
  },
  description:
    "Symtab is an open-source workspace for notes, knowledge, publishing, and AI, built around files you own.",
  openGraph: {
    title: "Symtab | Your knowledge should belong to you",
    description:
      "An open-source workspace for notes, knowledge, publishing, and AI, built around files you own.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <body>
        <ThemeProvider>
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <Link
              className="announcement-banner"
              href={announcement.href}
            >
              <span className="site-shell">
                <span>{announcement.text}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
            <SiteHeader />
            <WelcomeMotion>{children}</WelcomeMotion>
            <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
