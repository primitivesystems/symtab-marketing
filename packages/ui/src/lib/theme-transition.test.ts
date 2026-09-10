// Run: bun packages/ui/src/lib/theme-transition.test.ts
import assert from "node:assert/strict"
import { runThemeTransition } from "./theme-transition"

const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document")
const originalMatchMedia = Object.getOwnPropertyDescriptor(
  globalThis,
  "matchMedia"
)
let updates = 0,
  removed = 0,
  starts = 0
let finish!: () => void
const finished = new Promise<void>((resolve) => {
  finish = resolve
})
const doc = {
  head: { appendChild() {} },
  createElement: () => ({
    id: "",
    textContent: "",
    remove: () => {
      removed++
    },
  }),
  startViewTransition: (update: () => void) => {
    starts++
    update()
    return { finished }
  },
}
Object.defineProperty(globalThis, "document", {
  configurable: true,
  value: doc,
})
Object.defineProperty(globalThis, "matchMedia", {
  configurable: true,
  value: () => ({ matches: false }),
})
try {
  const first = runThemeTransition(() => {
    updates++
  }, "")
  await runThemeTransition(() => {
    updates++
  }, "")
  assert.equal(updates, 1, "Rapid toggles must not overlap")
  assert.equal(starts, 1)
  finish()
  await first
  assert.equal(removed, 1, "Transition styles must be cleaned up")
  doc.startViewTransition = () => {
    throw new Error("Snapshot unavailable")
  }
  await runThemeTransition(() => {
    updates++
  }, "")
  assert.equal(updates, 2, "Failed snapshots must still change theme once")
  Object.defineProperty(globalThis, "matchMedia", {
    configurable: true,
    value: () => ({ matches: true }),
  })
  await runThemeTransition(() => {
    updates++
  }, "")
  assert.equal(updates, 3, "Reduced motion must work without snapshots")
  console.log("Theme race, fallback, cleanup, and reduced-motion checks passed")
} finally {
  for (const [name, descriptor] of [
    ["document", originalDocument],
    ["matchMedia", originalMatchMedia],
  ] as const) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor)
    else Reflect.deleteProperty(globalThis, name)
  }
}
