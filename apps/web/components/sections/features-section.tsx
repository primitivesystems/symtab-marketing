import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"
import { FeatureMotion } from "@workspace/ui/components/utilities/welcome-motion"

const features = [
  {
    title: "Your knowledge stays yours",
    description:
      "Work directly with local Markdown files. No proprietary database is required to access, edit, or move your notes.",
    href: "/features/local-first",
    linkLabel: "Learn about local-first storage",
    visual: <VaultVisual />,
  },
  {
    title: "See how your knowledge connects",
    description:
      "Turn files, links, tags, and references into a navigable knowledge graph without changing how your files are stored.",
    href: "/features/graph",
    linkLabel: "Explore the graph",
    visual: <GraphVisual />,
  },
  {
    title: "AI that understands your workspace",
    description:
      "Ask questions, plan work, learn from documents, and let agents operate against your workspace with explicit permissions.",
    href: "/features/ai",
    linkLabel: "Explore Symtab AI",
    visual: <AIVisual />,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="site-section" aria-label="Features">
      <div className="site-shell">
        <div className="section-heading">
          <p className="eyebrow">A WORKSPACE, NOT A WALLED GARDEN</p>
          <h2 className="section-title">
            From a passing thought to a connected idea.
          </h2>
        </div>
        <div className="feature-bento">
          {features.map((feature) => (
            <FeatureShowcase key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FeatureShowcaseProps {
  title: string
  description: string
  href: string
  linkLabel: string
  visual: ReactNode
}

function FeatureShowcase({
  title,
  description,
  href,
  linkLabel,
  visual,
}: FeatureShowcaseProps) {
  return (
    <FeatureMotion>
      <div className="bento-copy">
        <div>
          <h3>{title}</h3>

          <p className="mt-3 leading-7 text-pretty text-muted-foreground">
            {description}
          </p>

          <Link href={href} className="text-link mt-5">
            {linkLabel} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="bento-visual" aria-hidden="true">
        {visual}
      </div>
    </FeatureMotion>
  )
}

/* -------------------------------------------------------------------------- */
/* Local-first visual                                                         */
/* -------------------------------------------------------------------------- */

function VaultVisual() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-full w-full max-w-2xl overflow-hidden rounded-md border border-border bg-background">
        <div className="border-b border-border px-4 py-2 text-xs text-muted-foreground">
          ~/Documents/Symtab
        </div>

        <div className="grid grid-cols-2">
          <div className="border-b border-border p-4 sm:border-r sm:border-b-0">
            <File label="projects/" />
            <File label="research/" />
            <File label="daily/" />
            <File label="README.md" />
          </div>

          <div className="p-4 font-mono text-xs leading-6 text-muted-foreground">
            <div># Symtab</div>
            <div />
            <div>Your files remain ordinary</div>
            <div>Markdown on disk.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function File({ label }: { label: string }) {
  return (
    <div className="rounded-sm px-2 py-1.5 text-sm text-muted-foreground">
      {label}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Graph visual                                                               */
/* -------------------------------------------------------------------------- */

function GraphVisual() {
  return (
    <div className="relative h-full min-h-[240px] overflow-hidden rounded-md border border-border bg-background">
      <GraphNode className="top-[50%] left-[50%]" label="Symtab" />
      <GraphNode className="top-[22%] left-[22%]" label="Local-first" />
      <GraphNode className="top-[22%] left-[78%]" label="Publishing" />
      <GraphNode className="top-[78%] left-[22%]" label="Markdown" />
      <GraphNode className="top-[78%] left-[78%]" label="AI" />

      <svg
        className="absolute inset-0 size-full text-muted-foreground/40"
        aria-hidden="true"
      >
        <line
          className="graph-link"
          x1="50%"
          y1="50%"
          x2="22%"
          y2="22%"
          stroke="currentColor"
        />
        <line
          className="graph-link"
          x1="50%"
          y1="50%"
          x2="78%"
          y2="22%"
          stroke="currentColor"
        />
        <line
          className="graph-link"
          x1="50%"
          y1="50%"
          x2="22%"
          y2="78%"
          stroke="currentColor"
        />
        <line
          className="graph-link"
          x1="50%"
          y1="50%"
          x2="78%"
          y2="78%"
          stroke="currentColor"
        />
      </svg>
    </div>
  )
}

function GraphNode({ className, label }: { className: string; label: string }) {
  return (
    <div
      className={`graph-node absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background px-3 py-1.5 text-xs ${className}`}
    >
      {label}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* AI visual                                                                  */
/* -------------------------------------------------------------------------- */

function AIVisual() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-full w-full max-w-xl overflow-hidden rounded-md border border-border bg-background">
        <div className="border-b border-border px-4 py-3 text-sm font-medium">
          Symtab AI
        </div>

        <div className="space-y-3 p-4">
          <div>
            <span className="text-xs text-muted-foreground">You</span>
            <p className="mt-1 text-sm">
              Find the notes related to distributed systems and summarize the
              open questions.
            </p>
          </div>

          <div>
            <span className="text-xs text-muted-foreground">Symtab</span>

            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <div>Read 14 notes</div>
              <div>Traversed 8 graph connections</div>
              <div>Found 4 unresolved questions</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
