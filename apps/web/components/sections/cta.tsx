import { DownloadButton } from "@workspace/ui/components/utilities/download-button"

import { downloads } from "@/lib/marketing-config"

export function FinalCta() {
  return (
    <section className="site-section final-cta">
      <div className="site-shell">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="cta-title">Make your knowledge yours.</h2>

          <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            Open files. Open formats. Open source.
          </p>

          <div className="mt-8">
            <DownloadButton urls={downloads} className="download-button" />
          </div>
        </div>
      </div>
    </section>
  )
}
