import Link from "next/link"
import { Apple, Linux, Windows } from "@thesvg/react"
import { ArrowRight, ArrowUpRight, Monitor, Server } from "lucide-react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/ui/components/tabs"
import { Button } from "@workspace/ui/components/button"
import { getReleases } from "@/lib/github"
import { repositoryUrl } from "@/lib/project-content"
import {
  releaseDate,
  releaseHref,
} from "@/components/sections/release-timeline"

export const metadata = {
  title: "Download",
  description:
    "Get the latest Symtab desktop release, or follow self-hosting development.",
}

const platforms = [
  {
    name: "macOS",
    icon: <Apple variant="mono" width={56} height={56} />,
    pattern: /\.dmg$/i,
  },
  {
    name: "Windows",
    icon: <Windows width={56} height={56} />,
    pattern: /\.(exe|msi)$/i,
  },
  {
    name: "Linux",
    icon: <Linux variant="mono" width={56} height={56} />,
    pattern: /\.(AppImage|deb|rpm)$/i,
  },
]

export default async function DownloadPage() {
  const { items, unavailable } = await getReleases()
  const latest = items.find((release) => !release.prerelease)
  return (
    <main id="main" className="project-page download-page">
      <header className="project-intro site-shell">
        <p className="eyebrow">MAKE ROOM FOR YOUR IDEAS</p>
        <h1 className="project-title">Your workspace. On your terms.</h1>
        <p className="project-description">
          Start with the desktop app. Keep your notes in open formats, on a
          machine you control.
        </p>
      </header>
      <div className="site-shell">
        <Tabs defaultValue="desktop" className="download-tabs">
          <TabsList aria-label="Choose your edition" className="gap-2 border border-border">
            <TabsTrigger value="desktop" className="font-normal data-active:border-border data-active:shadow-none dark:data-active:border-border dark:data-active:bg-background">
              <Monitor aria-hidden="true" />
              Desktop
            </TabsTrigger>
            <TabsTrigger value="self-hosted" className="font-normal data-active:border-border data-active:shadow-none dark:data-active:border-border dark:data-active:bg-background">
              <Server aria-hidden="true" />
              Self-hosting
            </TabsTrigger>
          </TabsList>
          <TabsContent value="desktop">
            <div className="download-heading">
              <h2 className="section-title">Download Symtab</h2>
              <span className="content-note">
                {latest
                  ? `${latest.tag} · ${releaseDate(latest.date)}`
                  : "Release availability"}
              </span>
            </div>
            {unavailable && (
              <p className="download-notice">
                GitHub is temporarily unavailable. Check the release archive
                below for downloads.
              </p>
            )}
            <div className="download-grid">
              {platforms.map(({ name, icon, pattern }) => {
                const assets =
                  latest?.assets.filter((asset) => pattern.test(asset.name)) ??
                  []
                return (
                  <section
                    className="platform-card"
                    key={name}
                    aria-label={name}
                  >
                    <div className="platform-art" aria-hidden="true">
                      {icon}
                    </div>
                    <h3>{name}</h3>
                    <p className="content-note">
                      {assets.length
                        ? "Available in the latest release"
                        : unavailable
                          ? "Availability could not be checked"
                          : "No build published yet"}
                    </p>
                    <div className="platform-downloads">
                      {assets.length ? (
                        assets.map((asset) => (
                          <div key={asset.url}>
                            <Button
                              nativeButton={false}
                              render={<a href={asset.url} />}
                              className="download-button"
                            >
                              Download {name}{" "}
                              <ArrowUpRight
                                strokeWidth={1.5}
                                aria-hidden="true"
                              />
                            </Button>
                            <p className="content-note asset-name">
                              {asset.name} · {(asset.size / 1048576).toFixed(1)}{" "}
                              MB
                            </p>
                          </div>
                        ))
                      ) : (
                        <Button disabled variant="outline">
                          Not available
                        </Button>
                      )}
                    </div>
                  </section>
                )
              })}
            </div>
            <div className="download-details">
              <div>
                <h3>Before you install</h3>
                <p>
                  Current FLUX v0.0.x releases are unsigned Apple Silicon test
                  builds, published under the FLUX name. They are not Intel Mac
                  builds. Review the release notes and back up your workspace
                  before testing.
                </p>
              </div>
              <div className="section-actions">
                {latest && (
                  <Link href={releaseHref(latest.tag)} className="text-link">
                    Read release notes <ArrowRight aria-hidden="true" />
                  </Link>
                )}
                <a
                  href={`${repositoryUrl}/releases`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  All GitHub releases <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="self-hosted">
            <div className="self-hosted-panel">
              <Server size={40} strokeWidth={1.5} aria-hidden="true" />
              <span className="mock-label">Coming soon</span>
              <h2 className="section-title">
                Your infrastructure. Your workspace.
              </h2>
              <p className="project-description">
                A self-hosted edition is not available yet. Follow the public
                roadmap for progress and help shape what comes next.
              </p>
              <Link href="/roadmap" className="text-link">
                Explore the roadmap <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
