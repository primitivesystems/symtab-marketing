import { HeroSection } from "@/components/sections/hero-section"
import { EcosystemSection } from "@/components/sections/ecosystem"
import { FeaturesSection } from "@/components/sections/features-section"
import {
  ContributorsSection,
  SponsorsSection,
} from "@/components/sections/community-sections"
import { getReleases } from "@/lib/github"
import { releaseHref } from "@/components/sections/release-timeline"
export default async function Page() {
  const { items } = await getReleases()
  const latest = items[0]
  return (
    <main id="main" className="marketing-page">
      <HeroSection
        announcement={
          latest
            ? {
                tag: latest.tag,
                title: latest.title,
                href: releaseHref(latest.tag),
              }
            : undefined
        }
      />
      <FeaturesSection />
      <EcosystemSection />
      <ContributorsSection />
      <SponsorsSection />
    </main>
  )
}
