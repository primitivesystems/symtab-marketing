import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { DownloadButton } from "@workspace/ui/components/utilities/download-button"

import { downloads } from "@/lib/marketing-config"

const features: Record<
  string,
  {
    eyebrow: string
    title: string
    description: string
    points: { title: string; description: string }[]
  }
> = {
  "local-first": {
    eyebrow: "LOCAL-FIRST",
    title: "Your knowledge stays yours.",
    description:
      "Work directly with local Markdown files. No proprietary database is required to access, edit, or move your notes.",
    points: [
      {
        title: "Plain files on disk",
        description:
          "Every note is an ordinary Markdown file. Open it in any editor, back it up with any tool, and grep it like code.",
      },
      {
        title: "No lock-in, ever",
        description:
          "Symtab adds structure on top of your files instead of replacing them. Delete the app and your knowledge survives intact.",
      },
      {
        title: "Works with your stack",
        description:
          "Git for versioning, any sync service for multi-device, any static site generator for publishing.",
      },
    ],
  },
  graph: {
    eyebrow: "KNOWLEDGE GRAPH",
    title: "See how your knowledge connects.",
    description:
      "Turn files, links, tags, and references into a navigable knowledge graph without changing how your files are stored.",
    points: [
      {
        title: "Links become structure",
        description:
          "Wiki-links, tags, and references are indexed as they are written. The graph builds itself in the background.",
      },
      {
        title: "Navigate, don't search",
        description:
          "Follow connections between notes to rediscover context you forgot you had. Search finds words; the graph finds ideas.",
      },
      {
        title: "Stored, not extracted",
        description:
          "The graph is a derived view of your files, never a separate source of truth. Rebuild it any time from disk.",
      },
    ],
  },
  ai: {
    eyebrow: "SYMTAB AI",
    title: "AI that understands your workspace.",
    description:
      "Ask questions, plan work, learn from documents, and let agents operate against your workspace with explicit permissions.",
    points: [
      {
        title: "Grounded in your files",
        description:
          "Answers cite the notes they came from. The AI reads your workspace. It never invents a private copy of it.",
      },
      {
        title: "Explicit permissions",
        description:
          "Agents can only read or write what you have granted. Every action is visible and revocable.",
      },
      {
        title: "Local when possible",
        description:
          "Run models locally through Ollama, or connect hosted providers. Your notes leave your machine only if you allow it.",
      },
    ],
  },
}

const slugs = Object.keys(features)

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const feature = features[slug]
  if (!feature) return {}
  return { title: feature.title, description: feature.description }
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const feature = features[slug]
  if (!feature) notFound()

  return (
    <main id="main" className="project-page">
      <header className="project-intro site-shell">
        <p className="eyebrow">{feature.eyebrow}</p>
        <h1 className="project-title">{feature.title}</h1>
        <p className="project-description">{feature.description}</p>
        <div className="section-actions">
          <DownloadButton urls={downloads} className="download-button" />
          <Link className="text-link" href="/#features">
            <ArrowLeft aria-hidden="true" /> All features
          </Link>
        </div>
      </header>

      <div className="site-shell">
        <div className="roadmap-board">
          {feature.points.map((point, index) => (
            <section
              key={point.title}
              className="roadmap-card"
              aria-labelledby={`point-${index}`}
            >
              <p className="content-note">{`0${index + 1}`}</p>
              <h4 id={`point-${index}`}>{point.title}</h4>
              <p>{point.description}</p>
            </section>
          ))}
        </div>

        <p className="content-note roadmap-footnote">
          Have questions or feedback?{" "}
          <Link className="text-link" href="/changelog">
            See what shipped recently <ArrowRight aria-hidden="true" />
          </Link>
        </p>
      </div>
    </main>
  )
}
