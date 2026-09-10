import { strict as assert } from "node:assert"
import { renderToStaticMarkup } from "react-dom/server"
import { ProgressiveBlur } from "./progressive-blur"

const html = renderToStaticMarkup(<ProgressiveBlur />)
assert.ok(html.includes('aria-hidden="true"'))
assert.equal((html.match(/backdrop-filter:blur\(/g) ?? []).length, 8)
for (const radius of [1, 2, 4, 8]) assert.ok(html.includes(`blur(${radius}px)`))
for (const end of [100, 80, 60, 40]) assert.ok(html.includes(`transparent ${end}%`))
console.log("Progressive blur layers: pass")
