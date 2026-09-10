# Plane changelog layout

Reference: https://plane.so/changelog/?category=cloud, inspected desktop1440 and mobile390 on2026-09-09. Symtab branding and GitHub content replace Plane branding/content.

Desktop: full-width pale intro, title top122px with58px/75.4px weight430; content rail1256px at x84.5, title/body font Satoshi/Inter on reference. Tabs top389px,48px high,4px padding,8px gap,8px radius; list starts517px. Entry:400px sticky date column +40px gap +816px body; date16px, dot12px,1px vertical line, sticky top80px. Heading24px/31.2px,16px vertical gap,16:9 cover with title centered, category pill, brand bottom-left/date bottom-right. Body18px and underlined Read more14px;80px between entries.

Mobile390:16px gutters, title36px/46.8px; date above heading, no left rail. Tabs horizontally scroll if needed. Body stacks. Preserve bounded font scale; Symtab uses existing Geist, semantic light/dark tokens. Signature is connected date rail, not huge version numbers.

Click-driven category navigation and Read more route; dates stay sticky during native scroll. Categories represent GitHub release channels (all/stable/prerelease), not fictional platform labels. Read more renders full original GitHub Markdown with existing typeset.css; no unsafe raw HTML. One ReleaseTimeline used on changelog and landing announcement section (latest entry), with compact mode for landing. Hero badge uses same latest release and targets its detail page. No fabricated images: CSS geometric cover using Symtab brand and source title.
