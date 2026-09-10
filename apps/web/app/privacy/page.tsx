import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy",
  description: "Symtab's privacy practices. Your files stay on your machine.",
}

export default function PrivacyPage() {
  return (
    <main id="main" className="project-page">
      <header className="project-intro site-shell">
        <p className="eyebrow">LEGAL</p>
        <h1 className="project-title">Privacy.</h1>
        <p className="project-description">
          The short version: your knowledge is stored as files on your
          machine, and this website does not track you.
        </p>
      </header>

      <div className="site-shell">
        <div className="project-empty">
          <h2 className="section-title">Your files</h2>
          <p>
            Symtab the application stores notes as ordinary files in folders
            you choose. We operate no cloud service that holds a copy of your
            knowledge. Optional features that use the network (publishing,
            hosted AI providers) send data only where you explicitly configure
            them to.
          </p>
          <h2 className="section-title">This website</h2>
          <p>
            This site serves static pages and public release information from
            the GitHub API. It sets no analytics or advertising cookies, and we
            do not build profiles of visitors.
          </p>
          <h2 className="section-title">Contact</h2>
          <p>
            Questions about privacy? Open a discussion on the repository or
            email <a href="mailto:privacy@symtab.dev">privacy@symtab.dev</a>.
          </p>
        </div>
      </div>
    </main>
  )
}
