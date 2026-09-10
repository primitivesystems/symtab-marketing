import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { repositoryUrl } from "@/lib/project-content"

export const metadata: Metadata = {
  title: "License",
  description: "Symtab is open source. Read the license terms.",
}

export default function LicensePage() {
  return (
    <main id="main" className="project-page">
      <header className="project-intro site-shell">
        <p className="eyebrow">LEGAL</p>
        <h1 className="project-title">License.</h1>
        <p className="project-description">
          Symtab is free and open-source software, licensed for everyone to
          use, study, modify, and share.
        </p>
      </header>

      <div className="site-shell">
        <div className="project-empty">
          <h2 className="section-title">MIT License</h2>
          <div className="typeset">
            <p>
              Copyright © {new Date().getFullYear()} Symtab contributors
            </p>
            <p>
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the “Software”), to deal in the Software without
              restriction, including without limitation the rights to use,
              copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, subject to the following conditions: the
              above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.
            </p>
            <p>
              The software is provided “as is”, without warranty of any kind,
              express or implied. In no event shall the authors or copyright
              holders be liable for any claim, damages, or other liability.
            </p>
          </div>
          <a
            className="text-link"
            href={`${repositoryUrl}/blob/main/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View the license on GitHub <ArrowUpRight aria-hidden="true" />
          </a>
          <p className="content-note">
            Looking for the product?{" "}
            <Link href="/download">Download Symtab</Link>.
          </p>
        </div>
      </div>
    </main>
  )
}