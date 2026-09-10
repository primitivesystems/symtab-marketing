// One lock for every toggle instance and keyboard shortcut.
let transitioning = false

export async function runThemeTransition(update: () => void, css: string) {
  if (transitioning) return
  transitioning = true
  let applied = false
  const apply = () => {
    if (!applied) {
      applied = true
      update()
    }
  }
  let style: HTMLStyleElement | undefined
  try {
    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      apply()
      return
    }
    style = document.createElement("style")
    style.id = "theme-transition-styles"
    style.textContent =
      css +
      `
      ::view-transition-group(root) { animation-duration: 450ms; animation-timing-function: cubic-bezier(0.2, 0, 0, 1); }
      ::view-transition-old(root), .dark::view-transition-old(root) { z-index: 1; mix-blend-mode: normal; }
      ::view-transition-new(root), .dark::view-transition-new(root) { z-index: 2; mix-blend-mode: normal; filter: none; animation-duration: 450ms; animation-timing-function: cubic-bezier(0.2, 0, 0, 1); }
    `
    document.head.appendChild(style)
    const transition = document.startViewTransition(apply)
    await transition.finished
  } catch {
    // Unsupported/skipped snapshots still apply the requested theme exactly once.
    apply()
  } finally {
    style?.remove()
    transitioning = false
  }
}
