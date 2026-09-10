import { ArrowUpRight, Heart, Hexagon, Layers, Orbit, Plus } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

import { contributors, repositoryUrl, verifiedOn } from "@/lib/project-content"

function ContributorAvatars() {
  return (
    <div className="flex flex-col items-start gap-5 lg:items-end">
      {/* Avatar stack */}
      <div className="flex items-center">
        {contributors.map((person, index) => (
          <Tooltip key={person.username}>
            <TooltipTrigger
              render={
                <a
                  href={`https://github.com/${person.username}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${person.username} on GitHub`}
                  className={[
                    "relative block rounded-full outline-none",
                    "focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    index > 0 ? "-ml-3" : "",
                  ].join(" ")}
                  style={{
                    zIndex: contributors.length - index,
                  }}
                >
                  <Avatar className="size-12 border-2 border-background bg-muted shadow-none ring-1 ring-border/70 hover:ring-foreground/25 sm:size-14">
                    <AvatarImage
                      src={`https://github.com/${person.username}.png?size=112`}
                      alt={`${person.username}'s GitHub avatar`}
                    />

                    <AvatarFallback className="text-xs font-medium">
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                </a>
              }
            />

            <TooltipContent side="top" sideOffset={10}>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">@{person.username}</span>

                <span className="text-xs text-muted-foreground">
                  {person.contributions} contributions
                </span>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Contribution CTA */}
        <Tooltip>
          <TooltipTrigger
            render={
              <a
                href={`${repositoryUrl}/issues`}
                target="_blank"
                rel="noreferrer"
                aria-label="Contribute to Symtab"
                className="relative z-0 -ml-3 block rounded-full outline-none focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Avatar className="size-12 border-2 border-background bg-muted shadow-none ring-1 ring-border/70 hover:bg-accent hover:ring-foreground/25 sm:size-14">
                  <AvatarFallback className="bg-transparent">
                    <Plus
                      className="size-4 text-muted-foreground"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </AvatarFallback>
                </Avatar>
              </a>
            }
          />

          <TooltipContent side="top" sideOffset={10}>
            You, next?
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Small context below avatars */}
      <div className="flex max-w-md flex-col gap-1 lg:items-end lg:text-right">
        <p className="text-sm font-medium">
          {contributors.length} contributors and counting.
        </p>

        <p className="content-note">
          Verified repository contributors · {verifiedOn}
        </p>
      </div>
    </div>
  )
}

export function ContributorsSection() {
  return (
    <section id="community" className="site-section">
      <span id="contributors" />
      <div className="site-shell community-section-grid">
        {/* Left */}
        <div>
          <p className="eyebrow">MADE BY PEOPLE</p>

          <h2 className="section-title">Built in the open. Better together.</h2>

          <p className="project-description">
            Every fix, thoughtful issue, and line of documentation makes this
            workspace better.
          </p>

          <a
            href={`${repositoryUrl}/graphs/contributors`}
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Meet the contributors
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        {/* Right */}
        <div className="flex min-w-0 items-center lg:justify-end">
          <ContributorAvatars />
        </div>
      </div>
    </section>
  )
}

const sponsors = [
  { name: "Northstar", Icon: Orbit },
  { name: "Form & Field", Icon: Layers },
  { name: "Hexworks", Icon: Hexagon },
]

export function SponsorsSection() {
  return (
    <section id="sponsors" className="site-section sponsors-section">
      <div className="site-shell">
        <div className="sponsors-heading">
          <div>
            <p className="eyebrow">ROOM TO KEEP BUILDING</p>

            <h2 className="section-title">Supported by good company.</h2>
          </div>

          <span className="mock-label">
            <Heart size={14} aria-hidden="true" />
            Mock sponsors
          </span>
        </div>

        <p className="project-description">
          A place for the people and organizations helping open tools stay open.
        </p>

        <div className="sponsor-grid">
          {sponsors.map(({ name, Icon }) => (
            <div className="sponsor-card" key={name}>
              <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
              <span>{name}</span>
            </div>
          ))}
        </div>

        <p className="content-note">
          Illustrative names only. No sponsorship or endorsement is implied.
        </p>
      </div>
    </section>
  )
}
