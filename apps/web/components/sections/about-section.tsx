import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function AboutSection() {
  return (
    <section id="community" className="site-section">
      <div className="site-shell">
        <article className="feature-row community-row">
          <div className="feature-copy">
            <div className="max-w-md">
              <h2 className="section-title">Symtab is built in the open.</h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                The project is open source and community maintained. Decisions,
                development, issues, and releases happen in public.
              </p>

              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link mt-5"
              >
                View the project on GitHub <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="feature-visual community-visual">
            <div className="grid h-full grid-cols-2 gap-3 sm:grid-cols-3">
              <CommunityTile label="Issues" />
              <CommunityTile label="Pull requests" />
              <CommunityTile label="Discussions" />
              <CommunityTile label="Roadmap" />
              <CommunityTile label="Releases" />
              <CommunityTile label="Contributors" />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

function CommunityTile({ label }: { label: string }) {
  return (
    <div className="community-tile flex min-h-28 items-end rounded-md border border-border bg-background p-4">
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
