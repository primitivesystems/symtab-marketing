// Run: bun --conditions=react-server apps/web/lib/github.test.ts
import assert from "node:assert/strict"
import { getRelease, getReleases, getRoadmap } from "./github"

const originalFetch = globalThis.fetch
let calls = 0
const respond = (body: unknown, status = 200, headers = {}) => {
  globalThis.fetch = (async (_input, init) => {
    calls++
    assert.equal(
      (init as RequestInit & { next: { revalidate: number } }).next.revalidate,
      300
    )
    assert.ok(init?.signal)
    return new Response(JSON.stringify(body), { status, headers })
  }) as typeof fetch
}
try {
  const base = {
    id: 1,
    tag_name: "v1",
    name: "Published title",
    published_at: "2026-09-01T00:00:00Z",
    body: "# Full notes\n\nUnchanged.",
    html_url: "https://github.com/wizaye/project-flux/releases/tag/v1",
    draft: false,
    prerelease: false,
    assets: [
      {
        name: "app-arm64.dmg",
        browser_download_url:
          "https://github.com/wizaye/project-flux/releases/download/v1/app-arm64.dmg",
        size: 1234,
        state: "uploaded",
      },
    ],
  }
  respond([{ ...base, id: 2, draft: true }, base])
  const releases = await getReleases()
  assert.equal(releases.items.length, 1)
  assert.equal(releases.items[0]?.body, base.body)
  assert.equal(releases.items[0]?.title, base.name)
  assert.equal(releases.items[0]?.assets[0]?.size, 1234)
  respond([
    {
      ...base,
      assets: [
        {
          ...base.assets[0],
          browser_download_url: "https://evil.example/app.dmg",
        },
      ],
    },
  ])
  assert.equal((await getReleases()).unavailable, true)
  respond({}, 404)
  assert.deepEqual(await getRelease("missing"), {
    item: null,
    unavailable: false,
  })
  respond({}, 403)
  assert.deepEqual(await getReleases(), { items: [], unavailable: true })
  const issue = {
    number: 1,
    title: "Real issue",
    html_url: "https://github.com/wizaye/project-flux/issues/1",
    user: { login: "author" },
    labels: [{ name: "bug" }],
    created_at: base.published_at,
    comments: 3,
    state: "open",
  }
  const pull = { ...issue, pull_request: { merged_at: null }, draft: false }
  respond([
    issue,
    { ...pull, number: 2 },
    {
      ...pull,
      number: 3,
      state: "closed",
      pull_request: { merged_at: base.published_at },
    },
    { ...pull, number: 4, state: "closed" },
    { ...pull, number: 5, draft: true },
  ])
  const roadmap = await getRoadmap()
  assert.deepEqual(
    roadmap.columns.map((column) => column.items.map((item) => item.number)),
    [[1], [2], [3], [5]]
  )
  assert.deepEqual(roadmap.columns[0]?.items[0]?.labels, ["bug"])
  assert.equal(roadmap.columns[1]?.items[0]?.comments, 3)
  respond([{ ...issue, comments: "bad" }])
  assert.equal((await getRoadmap()).unavailable, true)
  assert.ok(
    (await getRoadmap()).columns.every((column) => column.items.length === 0)
  )
  calls = 0
  respond([], 200, { link: '<https://api.github.com/next>; rel="next"' })
  assert.equal((await getReleases()).truncated, true)
  assert.equal(calls, 2)
  console.log(
    "GitHub mapping, filtering, failure, and pagination checks passed"
  )
} finally {
  globalThis.fetch = originalFetch
}
