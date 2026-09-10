import Link from "next/link"
import { Layers, Tag, FlaskConical, ArrowUpRight } from "lucide-react"
import { getReleases } from "@/lib/github"
import { repositoryUrl } from "@/lib/project-content"
import { ReleaseTimeline } from "@/components/sections/release-timeline"

export const metadata = {
  title: "Changelog",
  description: "Features, updates, and fixes published on GitHub.",
}
const categories = [
  { id: "all", label: "All updates", Icon: Layers },
  { id: "stable", label: "Releases", Icon: Tag },
  { id: "prerelease", label: "Pre-releases", Icon: FlaskConical },
]

export default async function ChangelogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const [{ category: requested }, result] = await Promise.all([
    searchParams,
    getReleases(),
  ])
  const category = categories.some((item) => item.id === requested)
    ? requested
    : "all"
  const visible = result.items.filter(
    (release) =>
      category === "all" ||
      (category === "prerelease" ? release.prerelease : !release.prerelease)
  )
  return (
    <main id="main" className="changelog-page">
      <header className="changelog-intro">
        <div className="site-shell">
          <h1>Changelog</h1>
          <p>New features. Updates. Bug fixes. Enhancements.</p>
        </div>
      </header>
      <div className="site-shell changelog-list">
        <nav className="release-filters" aria-label="Release channel">
          {categories.map(({ id, label, Icon }) => (
            <Link
              key={id}
              href={id === "all" ? "/changelog" : `/changelog?category=${id}`}
              aria-current={category === id ? "page" : undefined}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
        {result.unavailable ? (
          <div className="project-empty">
            <h2 className="section-title">
              Release notes are temporarily unavailable
            </h2>
            <p>
              GitHub couldn’t be reached. You can still read the releases
              directly.
            </p>
            <a
              className="text-link"
              href={repositoryUrl + "/releases"}
              target="_blank"
              rel="noreferrer"
            >
              Open GitHub releases <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        ) : visible.length ? (
          <ReleaseTimeline releases={visible} />
        ) : (
          <div className="project-empty">
            <h2 className="section-title">
              No {category === "prerelease" ? "pre-releases" : "releases"}{" "}
              published yet
            </h2>
            <Link className="text-link" href="/changelog">
              View all updates
            </Link>
          </div>
        )}
        <p className="content-note release-source">
          Published on{" "}
          <a
            href={repositoryUrl + "/releases"}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={12} aria-hidden="true" />
          </a>{" "}
          · Refreshes every 5 minutes.
          {result.truncated &&
            " Showing the most recent releases; browse GitHub for the full archive."}
        </p>
      </div>
    </main>
  )
}
