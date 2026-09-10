import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { getRelease } from "@/lib/github"
import { repositoryUrl } from "@/lib/project-content"
import {
  ReleaseContent,
  ReleaseCover,
  releaseDate,
} from "@/components/sections/release-timeline"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const { item: release } = await getRelease(tag)
  return { title: release ? release.title : "Release" }
}

export default async function ReleasePage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const { item: release, unavailable } = await getRelease(tag)
  if (unavailable)
    return (
      <main id="main" className="site-shell project-empty">
        <h1 className="section-title">Release temporarily unavailable</h1>
        <p>GitHub couldn’t be reached. Please try again shortly.</p>
        <a
          className="text-link"
          href={repositoryUrl + "/releases"}
          target="_blank"
          rel="noreferrer"
        >
          GitHub releases <ArrowUpRight aria-hidden="true" />
        </a>
      </main>
    )
  if (!release) notFound()
  return (
    <main id="main" className="release-detail">
      <Link className="text-link" href="/changelog">
        <ArrowLeft aria-hidden="true" /> All updates
      </Link>
      <header>
        <p className="content-note">
          <time dateTime={release.date}>{releaseDate(release.date)}</time> ·{" "}
          {release.prerelease ? "Pre-release" : "Release"}
        </p>
        <h1>{release.title}</h1>
      </header>
      <ReleaseCover release={release} />
      <ReleaseContent body={release.body} />
      <a
        className="text-link release-downloads"
        href={release.url}
        target="_blank"
        rel="noreferrer"
      >
        Release notes & downloads on GitHub <ArrowUpRight aria-hidden="true" />
      </a>
    </main>
  )
}
