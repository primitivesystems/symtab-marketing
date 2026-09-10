# Marketing layout rules

## Open-source pages and content

Publish and edit releases on GitHub. `apps/web/lib/github.ts` loads their original titles, dates, tags, and Markdown bodies with five-minute revalidation. `project-content.ts` defines the repository URL and the separately dated contributor snapshot. Set an optional server-only `GITHUB_TOKEN` in the web app environment for higher API limits; never use a NEXT_PUBLIC variable for it. No Plane account is involved.

The read-only roadmap loads GitHub issues: open issues exclude PRs, In review contains open non-draft PRs, Merged requires a real merge timestamp, and Draft appears only if needed. Closed-unmerged PRs are excluded. Merged does not mean released. Feeds are bounded to the 200 most recently updated records; a notice links to the full history when truncated. API failures show an unavailable state, never fabricated data. Contributors remain snapshot totals; sponsors remain fictional placeholders.

Run `bun --conditions=react-server apps/web/lib/github.test.ts` for feed mapping, filtering, failure, and pagination checks. Run `bun apps/web/components/release-timeline.test.tsx` for Markdown rendering/security checks. Run workspace typecheck, lint, and build after UI edits.

The changelog lives only at `/changelog`, with release detail routes beneath it. Its connected date markers stay attached to their entries, and the line ends at the last marker. The announcement is a single banner above the navbar, not a landing-page changelog section. The hero badge links to the same latest GitHub release. Full release bodies use `typeset.css` through react-markdown + GFM; raw HTML is disabled and unsafe URLs are filtered. Community and sponsors remain separate sections after the CTA.

- Use `site-section` for section spacing and one `site-shell` inside it for alignment. All sections, header, and footer share a 1344px maximum width with 20–32px gutters. Do not nest shells or use Tailwind's generic `container`.
- Use `section-title` for feature headings (22–26px). Hero, CTA, project-page and release-detail titles share `--page-title-size` (28–36px). Geist is the UI/body face; Geist Mono is for paths and code. Sizes stop growing on ultrawide screens. Use `--section-space` for page-intro and section rhythm.
- All marketing surfaces, timeline markers, covers and roadmap status icons use monochrome semantic tokens. No colored accents.
- The Skiper button and D shortcut share one theme-transition lock. Resolve system theme from the current root class, commit within the view-transition callback, and clean up temporary styles after completion. The icon uses theme CSS, avoiding server/client hydration mismatch. Reduced motion and browsers without view transitions switch immediately.
- Menu entry/exit uses 180ms opacity, 8px translation and 4px blur transitions, with native dialog focus management retained. Theme changes use a 450ms reveal; do not add independent color fades.
- Use `feature-row`, `feature-copy`, and `feature-visual` for paired copy and media. They stack below 880px, always with copy first. Use `section-actions` to group calls to action.
- Use `text-link` with Lucide `ArrowRight` for internal navigation and `ArrowUpRight` for external destinations. Icons are 16px, currentColor, with a 1.5px stroke. Brand logos remain in `@thesvg/react`. No Unicode substitutes for icons.
- Primary actions use `download-button`. Preserve readable contrast in both themes, 44px minimum height (48px on phones), visible keyboard focus, and safe-area insets.
- Mobile navigation is a full-screen native dialog below 1024px: grouped disclosures, focus containment, Escape dismissal, focus restoration, scroll locking, and closure after selecting a link or resizing to desktop.
- Keep empty testimonials hidden until real quotes are supplied. Integration marks identify supported tools; they are not customer endorsements.

## Verification

Latest pass: browser verified `/`, `/changelog`, `/roadmap`, and `/changelog/v0.0.2` at 320, 768, 1440, and 3440px with no horizontal overflow and the same computed title scale. Banner precedes navbar; home has zero timeline entries. Verified rapid double-click theme guard, transition cleanup, no hydration errors in a clean tab, mobile disclosure, Escape/focus restoration, link dismissal and scroll unlock. Production build, typecheck, GitHub/Markdown checks and theme-transition checks pass. Lint has one pre-existing download-button effect warning. Animation slow-motion playback, RTL and 200% zoom were not verified in this pass.

Check 320, 390, 768, 1024, 1440, 1920, 2560, and 3440px. Inspect every section, not only the hero. Confirm shared rails, no horizontal page overflow, readable wrapping, both themes, menu keyboard behavior, and SVG external-link icons. Run `bun run typecheck`, `bun run lint`, and `bun run build`.

## Completed layout and UI review

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| HIGH | `packages/ui/src/components/common/footer.tsx` | Fixed column minimum overflowed at 320px | Columns can shrink | Keeps all content within the viewport |
| MEDIUM | `packages/ui/src/styles/globals.css` and all landing sections | Different rails, padding, oversized headings | One shell, bounded type scale, shared section spacing | Aligns all sections at every supported width |
| MEDIUM | `packages/ui/src/components/common/navbar.tsx` | Small floating mobile menu | Full-screen modal with grouped links | Provides a clear navigation layer and keyboard containment |
| MEDIUM | `packages/ui/src/components/sections/ecosystem.tsx` | Six marks in eight columns | Six equal columns; three on narrow screens | Removes the unbalanced empty columns |
| MEDIUM | `packages/ui/src/components/sections/testimonials.tsx` | Empty data still rendered a heading and space | Empty section returns null | Preserves meaningful section grouping |
| MEDIUM | `packages/ui/src/components/sections`, `packages/ui/src/components/common` | Unicode arrows and inconsistent icon sizing | SVG ArrowRight/ArrowUpRight, consistent text-link sizing | Matches icon weight to adjacent type |

Verified: no page overflow at all eight widths; full-page visual review in light and dark themes; mobile opening, disclosures, navigation dismissal, Escape, focus restoration, and scroll lock; workspace typecheck and production build. Lint has three existing warnings in the theme demo/download effect code.

Not verified: 200% browser zoom, RTL mirror, pseudo-localization, and animation playback at 10% speed. Existing destination pages and release downloads were not implemented by this design pass.

Approve for the inspected layout and navigation coverage. The unverified checks above are not included in that approval.
# September 10: focused marketing pass

- Landing order: hero, three compact feature demonstrations, integrations, community, separately labeled mock sponsors, footer. No pricing or release timeline on the landing route.
- Preserve Geist/Geist Mono and neutral semantic colors. Shared page titles scale from 32px to 44px; the shared shell caps at 1280px including 40px gutters (1200px usable content). Smaller screens use 20–40px gutters. All routes, header and footer use this shell.
- Mobile top-level navigation rows reserve a 48px trailing icon column, matching the close button's hit area. Center SVGs within this column instead of aligning their right edges.
- All route content uses the shared 240ms Motion entrance (85% to full opacity). Navigation and footer stay stable during route changes; do not dim the entire site or wrap sticky chrome in animated ancestors. Content is server-visible and reduced motion skips the entrance.
- The shared header has a pointer-transparent, four-layer progressive backdrop blur extending 24px below its edge. Reduced motion uses one layer. Hide this decorative blur while the mobile dialog is open.
- The mobile dialog begins at the visible header position, preserving announcement visibility and logo/close-button alignment. It uses a 180ms opacity transition, no whole-panel filter or transform, a sticky top row, and native focus containment. Its backdrop is transparent because the panel itself is opaque.
- Announcement and community backgrounds match the page: white in light mode, black in dark mode. Preserve muted component surfaces for tabs and controls; do not flatten global muted tokens.
- The centered announcement sentence is managed in `apps/web/lib/marketing-config.ts`, independently of GitHub releases. Only the hero badge displays the latest release; do not repeat its metadata in the banner.
- `/download` uses shared Base UI/shadcn tabs: Desktop and Self-hosting (coming soon). Only uploaded GitHub release assets generate download actions. Legacy download URLs redirect here.
- Desktop changelog dates/markers stick 24px below the header within their own release. Narrow screens retain the simpler date-only layout.
- Browser verified landing/download/changelog/roadmap with no horizontal overflow at 320px and 3440px; 390px menu opening/Escape and self-hosting tab; desktop sticky marker at 80px; footer theme control. No browser console errors. Full animation slow-motion, RTL, and 200% zoom audit not performed.
- Contributors remain a dated GitHub snapshot; sponsors are explicitly mock. No Windows/Linux builds or self-hosting availability is implied.
