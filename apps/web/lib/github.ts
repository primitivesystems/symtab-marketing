import "server-only"

import { repositoryUrl } from "./project-content"

export type Release = {
  id: number
  tag: string
  title: string
  date: string
  body: string
  url: string
  prerelease: boolean
  assets: { name: string; url: string; size: number }[]
}
export type RoadmapItem = {
  number: number
  title: string
  url: string
  kind: "issue" | "pull"
  author: string
  labels: string[]
  date: string
  comments: number
}

const api = `https://api.github.com/repos${new URL(repositoryUrl).pathname}`
const record = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Invalid GitHub record")
  return value as Record<string, unknown>
}
const string = (value: unknown): string => {
  if (typeof value !== "string") throw new Error("Invalid GitHub text")
  return value
}
const number = (value: unknown): number => {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0)
    throw new Error("Invalid GitHub number")
  return value
}
const date = (value: unknown): string => {
  const result = string(value)
  if (!Number.isFinite(Date.parse(result)))
    throw new Error("Invalid GitHub date")
  return result
}
const url = (value: unknown): string => {
  const result = string(value)
  if (!result.startsWith(`${repositoryUrl}/`))
    throw new Error("Invalid GitHub URL")
  return result
}

async function request(path: string) {
  const response = await fetch(`${api}/${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
  return response
}

async function list(path: string) {
  const items: unknown[] = []
  // ponytail: bounded to 200 records per feed; paginate further if the public history grows.
  for (let page = 1; page <= 2; page++) {
    const response = await request(
      `${path}${path.includes("?") ? "&" : "?"}per_page=100&page=${page}`
    )
    const body: unknown = await response.json()
    if (!Array.isArray(body)) throw new Error("Invalid GitHub list")
    items.push(...body)
    const more = /rel="next"/.test(response.headers.get("link") ?? "")
    if (!more) return { items, truncated: false }
  }
  return { items, truncated: true }
}

function release(value: unknown): Release | null {
  const item = record(value)
  if (typeof item.draft !== "boolean" || typeof item.prerelease !== "boolean")
    throw new Error("Invalid release status")
  if (item.draft) return null
  const tag = string(item.tag_name)
  if (!Array.isArray(item.assets)) throw new Error("Invalid release assets")
  return {
    id: number(item.id),
    tag,
    title: item.name == null || item.name === "" ? tag : string(item.name),
    date: date(item.published_at),
    body: item.body == null ? "" : string(item.body),
    url: url(item.html_url),
    prerelease: item.prerelease,
    assets: item.assets
      .map(record)
      .filter((asset) => asset.state === "uploaded")
      .map((asset) => ({
        name: string(asset.name),
        url: url(asset.browser_download_url),
        size: number(asset.size),
      })),
  }
}

export async function getReleases(): Promise<{
  items: Release[]
  unavailable: boolean
  truncated?: boolean
}> {
  try {
    const result = await list("releases")
    return {
      items: result.items
        .map(release)
        .filter((item): item is Release => item !== null)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
      unavailable: false,
      truncated: result.truncated,
    }
  } catch {
    return { items: [], unavailable: true }
  }
}

export async function getRelease(
  tag: string
): Promise<{ item: Release | null; unavailable: boolean }> {
  try {
    const response = await request(`releases/tags/${encodeURIComponent(tag)}`)
    return { item: release(await response.json()), unavailable: false }
  } catch (error) {
    return {
      item: null,
      unavailable: !(
        error instanceof Error && error.message === "GitHub returned 404"
      ),
    }
  }
}

export async function getRoadmap(): Promise<{
  columns: {
    title: string
    tone: string
    description: string
    items: RoadmapItem[]
  }[]
  unavailable: boolean
  truncated?: boolean
}> {
  const columns = [
    {
      title: "Open issues",
      tone: "neutral",
      description: "Open issues from the repository",
      items: [] as RoadmapItem[],
    },
    {
      title: "In review",
      tone: "review",
      description: "Open, non-draft pull requests",
      items: [] as RoadmapItem[],
    },
    {
      title: "Merged",
      tone: "done",
      description: "Merged pull requests, not necessarily released",
      items: [] as RoadmapItem[],
    },
    {
      title: "Draft",
      tone: "neutral",
      description: "Work-in-progress pull requests",
      items: [] as RoadmapItem[],
    },
  ]
  try {
    const result = await list("issues?state=all&sort=updated&direction=desc")
    for (const value of result.items) {
      const item = record(value)
      if (item.state !== "open" && item.state !== "closed")
        throw new Error("Invalid issue status")
      const pull = item.pull_request == null ? null : record(item.pull_request)
      if (
        pull &&
        (typeof item.draft !== "boolean" ||
          !(pull.merged_at === null || typeof pull.merged_at === "string"))
      )
        throw new Error("Invalid pull status")
      const column = pull
        ? pull.merged_at
          ? 2
          : item.state === "open"
            ? item.draft
              ? 3
              : 1
            : -1
        : item.state === "open"
          ? 0
          : -1
      if (column === -1) continue
      if (!Array.isArray(item.labels)) throw new Error("Invalid labels")
      columns[column]!.items.push({
        number: number(item.number),
        title: string(item.title),
        url: url(item.html_url),
        kind: pull ? "pull" : "issue",
        author: item.user == null ? "ghost" : string(record(item.user).login),
        labels: item.labels.map((label: unknown) => string(record(label).name)),
        date: date(pull?.merged_at ?? item.created_at),
        comments: number(item.comments),
      })
    }
    for (const column of columns)
      column.items.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    return {
      columns: columns.filter(
        (column) => column.title !== "Draft" || column.items.length > 0
      ),
      unavailable: false,
      truncated: result.truncated,
    }
  } catch {
    return {
      columns: columns.slice(0, 3).map((column) => ({ ...column, items: [] })),
      unavailable: true,
    }
  }
}
