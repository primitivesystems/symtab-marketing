import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { repositoryUrl } from "@/lib/project-content"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Github, Nextjs, Vercel, ClaudeCode, CodexOpenai } from "@thesvg/react"

const footerGroups = [
  {
    title: "Product",
    links: [
      ["Features", "/#features"],
      ["Changelog", "/changelog"],
      ["Download", "/download"],
      ["Roadmap", "/roadmap"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Documentation", `${repositoryUrl}#readme`],
      ["Report an issue", `${repositoryUrl}/issues`],
      ["Community", "/#community"],
      ["GitHub", repositoryUrl],
    ],
  },
  {
    title: "Project",
    links: [
      ["Contributors", "/#contributors"],
      ["Sponsors", "/#sponsors"],
      ["License", "/license"],
      ["Security", "/security"],
      ["Privacy", "/privacy"],
    ],
  },
] as const

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand" aria-label="Symtab home">
              <Image src="/logo.png" width={32} height={32} alt="" />
              <span>symtab</span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              An open-source workspace for knowledge you own.
            </p>
            <nav aria-label="Social links" className="mt-4 flex items-center gap-2">
              <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label="Symtab on GitHub" title="Symtab on GitHub" className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground">
                <Github variant="mono" width={18} height={18} aria-hidden="true" />
              </a>
            </nav>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="min-w-0">
              <h3 className="text-sm font-medium">{group.title}</h3>

              <ul className="mt-4 space-y-2.5">
                {group.links.map(([label, href]) => {
                  const external = href.startsWith("http")

                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="text-link footer-link"
                      >
                        {label}
                        {external && <ArrowUpRight aria-hidden="true" />}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <span>© {new Date().getFullYear()} Symtab</span>
            <p className="footer-credits">
              <span>Built with</span>
              <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer"><Nextjs width={14} height={14} aria-hidden="true" />Next.js</a>
              <span>by</span>
              <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer"><Vercel variant="mono" width={14} height={14} aria-hidden="true" />Vercel</a>
            </p>
            <p className="footer-credits">
              <span>Development assisted by</span>
              <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer"><ClaudeCode variant="mono" width={14} height={14} aria-hidden="true" />Claude</a>
              <span>and</span>
              <a href="https://openai.com/codex/" target="_blank" rel="noopener noreferrer"><CodexOpenai variant="mono" width={14} height={14} aria-hidden="true" />Codex</a>
            </p>
          </div>

          <div className="footer-appearance">
            <span className="footer-theme-label">Theme</span>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}
