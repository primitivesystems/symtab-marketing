import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { repositoryUrl } from "@/lib/project-content"

import { DownloadButton } from "@workspace/ui/components/utilities/download-button"
import { downloads } from "@/lib/marketing-config"
import Image from "next/image"

export interface HeroAnnouncement {
  tag: string
  title: string
  href: string
}

export function HeroSection({
  announcement,
}: {
  announcement?: HeroAnnouncement
}) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="site-shell">
        <div>
          {announcement && (
            <Link
              href={announcement.href}
              className="hero-announcement group"
              aria-label={`Release ${announcement.tag}: ${announcement.title}`}
            >
              <span className="hero-announcement-tag">{announcement.tag}</span>

              <span className="hero-announcement-title">
                {announcement.title}
              </span>

              <ArrowRight
                className="hero-announcement-arrow"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          )}
          <h1 id="hero-title" className="hero-title" data-welcome>
            Your knowledge should belong to you.
          </h1>

          <p className="hero-description" data-welcome>
            Symtab is an open-source workspace for notes, knowledge, publishing,
            and AI, built around files you own.
          </p>

          <div className="section-actions" data-welcome>
            <DownloadButton urls={downloads} className="download-button" />

            <a
              href={`${repositoryUrl}#readme`}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Read the docs <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-scene village-scene"><Image src="/village-twilight.png" alt="A hand-painted Indian village at twilight, surrounded by rice fields and palms." width={1536} height={1024} priority /></div>
      </div>
    </section>
  )
}
