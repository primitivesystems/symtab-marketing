import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export type Release = {
  id: number
  tag: string
  title: string
  date: string
  body: string
  url: string
  prerelease: boolean
}

export const releaseHref = (tag: string) =>
  `/changelog/${encodeURIComponent(tag)}`
export const releaseDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(date))

export function ReleaseContent({ body }: { body: string }) {
  return (
    <div className="typeset release-markdown">
      <Markdown
        skipHtml
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {children}
              {href?.startsWith("http") && (
                <ArrowUpRight
                  className="markdown-external"
                  aria-hidden="true"
                />
              )}
            </a>
          ),
          table: ({ children }) => (
            <div className="typeset-scroll">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {body || "No release notes were provided for this release."}
      </Markdown>
    </div>
  )
}

export function ReleaseCover({ release }: { release: Release }) {
  return (
    <div className="release-cover" aria-hidden="true">
      <div className="release-cover-center">
        <strong>{release.title}</strong>
        <span>
          Changelog | {release.prerelease ? "Pre-release" : "Release"}
        </span>
      </div>
      <div className="release-cover-footer">
        <span>symtab</span>
        <time>{releaseDate(release.date)}</time>
      </div>
    </div>
  )
}

export function ReleaseTimeline({ releases }: { releases: Release[] }) {
  return (
    <div className="update-timeline">
      {releases.map((release, index) => (
        <article className="update-entry" id={release.tag} key={release.id}>
          <aside className="update-date">
            <div>
              <span
                aria-hidden="true"
                className={
                  index === 0 ? "timeline-dot is-latest" : "timeline-dot"
                }
              />
              <time dateTime={release.date}>{releaseDate(release.date)}</time>
            </div>
          </aside>
          <div className="update-content">
            <h2>
              <Link href={releaseHref(release.tag)}>{release.title}</Link>
            </h2>
            <Link
              href={releaseHref(release.tag)}
              aria-label={`Read ${release.title}`}
            >
              <ReleaseCover release={release} />
            </Link>
            <div className="release-excerpt">
              <ReleaseContent
                body={release.body
                  .split(/\n\s*\n/)
                  .slice(0, 2)
                  .join("\n\n")}
              />
            </div>
            <Link
              className="text-link update-read-more"
              href={releaseHref(release.tag)}
            >
              Read more <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
