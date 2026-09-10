import Link from "next/link"
import { Card } from "@workspace/ui/components/card"
import {
  ArrowRight,
  ArrowUpRight,
  Circle,
  CircleCheck,
  GitPullRequest,
  GitMerge,
  MessageSquare,
} from "lucide-react"
import { getRoadmap } from "@/lib/github"
import { repositoryUrl } from "@/lib/project-content"
import { releaseDate } from "@/components/sections/release-timeline"

export const metadata = {
  title: "Roadmap",
  description: "Public issues, pull requests, and merged work from GitHub.",
}
export default async function RoadmapPage() {
  const result = await getRoadmap()
  return (
    <main id="main" className="project-page">
      <header className="project-intro site-shell">
        <p className="eyebrow">BUILDING IN THE OPEN</p>
        <h1 className="project-title">The work behind Symtab.</h1>
        <p className="project-description">
          Open issues, pull requests, and merged work.
          <br />
          Straight from the repository.
        </p>
        <div className="section-actions">
          <a
            className="text-link"
            href={repositoryUrl + "/issues"}
            target="_blank"
            rel="noreferrer"
          >
            Join the discussion <ArrowUpRight aria-hidden="true" />
          </a>
          <Link className="text-link" href="/changelog">
            Read the changelog <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </header>
      <div className="site-shell">
        <div className="roadmap-heading">
          <h2>Public roadmap</h2>
          <span className="content-note">
            GitHub · Refreshes every 5 minutes
          </span>
        </div>
        {result.unavailable ? (
          <div className="project-empty">
            <h2 className="section-title">
              The board is temporarily unavailable
            </h2>
            <p>
              GitHub couldn’t be reached. View the repository for current work.
            </p>
            <a
              className="text-link"
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open repository <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div className="roadmap-board">
            {result.columns.map((column) => {
              const Icon =
                column.title === "Merged"
                  ? GitMerge
                  : column.title === "In review"
                    ? GitPullRequest
                    : Circle
              return (
                <section
                  className="roadmap-column"
                  key={column.title}
                  aria-label={column.title}
                >
                  <div
                    className={`roadmap-column-heading status-${column.tone}`}
                  >
                    <h3>
                      <Icon size={16} aria-hidden="true" />
                      {column.title}
                    </h3>
                    <span>{column.items.length}</span>
                  </div>
                  <p className="content-note">{column.description}</p>
                  <div
                    className="roadmap-cards"
                    tabIndex={column.items.length > 3 ? 0 : undefined}
                    role={column.items.length > 3 ? "region" : undefined}
                    aria-label={
                      column.items.length > 3
                        ? `${column.title} cards`
                        : undefined
                    }
                  >
                    {column.items.length ? (
                      column.items.map((item) => (
                        <Card
                          key={`${item.kind}-${item.number}`}
                          className="roadmap-card"
                        >
                          <div className="roadmap-card-id">
                            <span>
                              {item.kind === "pull" ? "PR" : "Issue"} #
                              {item.number}
                            </span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </div>
                          <h4>
                            <a href={item.url} target="_blank" rel="noreferrer">
                              {item.title}
                            </a>
                          </h4>
                          {item.labels.length > 0 && (
                            <div className="roadmap-tags">
                              {item.labels.map((label) => (
                                <span key={label}>{label}</span>
                              ))}
                            </div>
                          )}
                          <div className="roadmap-card-meta">
                            <span title={item.author}>{item.author}</span>
                            <span aria-label={`${item.comments} comments`}>
                              <MessageSquare size={12} aria-hidden="true" />
                              {item.comments}
                            </span>
                          </div>
                          <time className="content-note" dateTime={item.date}>
                            {column.title === "Merged" ? "Merged" : "Opened"}{" "}
                            {releaseDate(item.date)}
                          </time>
                        </Card>
                      ))
                    ) : (
                      <div className="roadmap-no-items">
                        <CircleCheck size={20} aria-hidden="true" />
                        <p>No {column.title.toLowerCase()} right now.</p>
                        <a
                          className="text-link"
                          href={repositoryUrl + "/issues"}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View on GitHub <ArrowUpRight aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        )}
        <p className="content-note roadmap-footnote">
          Statuses mirror GitHub. Merged work is not necessarily included in a
          published release. This board is read-only.
          {result.truncated &&
            " Showing the most recently updated items; see GitHub for the full history."}
        </p>
      </div>
    </main>
  )
}
