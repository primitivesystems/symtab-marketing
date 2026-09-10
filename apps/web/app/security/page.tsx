import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security",
  description: "How to report security vulnerabilities in Symtab.",
}

export default function SecurityPage() {
  return (
    <main id="main" className="project-page">
      <header className="project-intro site-shell">
        <p className="eyebrow">TRUST</p>
        <h1 className="project-title">Security.</h1>
        <p className="project-description">
          Symtab is built around files you own, which means security starts
          with never asking you to give them up.
        </p>
      </header>

      <div className="site-shell">
        <div className="project-empty">
          <h2 className="section-title">Reporting a vulnerability</h2>
          <p>
            If you discover a security issue, please do not open a public
            issue. Use GitHub&apos;s private vulnerability reporting on the
            repository, or email{" "}
            <a href="mailto:security@symtab.dev">security@symtab.dev</a>. We
            aim to acknowledge reports within 48 hours.
          </p>
          <h2 className="section-title">What Symtab does by default</h2>
          <p>
            Your notes are plain files on your disk. Syncing, publishing, and
            AI features are opt-in, and every network request is made only with
            your explicit configuration. The marketing site sets no tracking
            cookies.
          </p>
        </div>
      </div>
    </main>
  )
}
