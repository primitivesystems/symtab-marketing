// Run: bun apps/web/components/release-timeline.test.tsx
import assert from "node:assert/strict"
import { renderToStaticMarkup } from "react-dom/server"
import { ReleaseContent, releaseHref } from "./release-timeline"

const html = renderToStaticMarkup(
  <ReleaseContent
    body={
      "## Changes\n\n**Fixed** `progress`\n\n| Item | Status |\n| --- | --- |\n| Update | Done |\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert%281%29)\n\n[GitHub](https://github.com/wizaye/project-flux)"
    }
  />
)
assert.ok(html.includes("typeset release-markdown"))
assert.ok(html.includes("<h2>Changes</h2>"))
assert.ok(html.includes("<strong>Fixed</strong>"))
assert.ok(html.includes("<table>"))
assert.ok(html.includes("<code>progress</code>"))
assert.ok(!html.includes("<script"))
assert.ok(!html.includes('href="javascript:'))
assert.ok(html.includes("markdown-external"))
assert.equal(releaseHref("release/1"), "/changelog/release%2F1")
console.log("Release Markdown and link checks passed")
