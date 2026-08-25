# tasks.md — Actionable Checklist

## ⚠️ Content Needed From User (blocking — do not invent any of this)
Nothing below may be fabricated per project rules ("Do not invent skills or experience"). Implementation of Phases 8+ is blocked on these:

- [x] Real project list — populated in `src/data/projects.ts` from the user's resume (Grafterr POS, Grafterr GO!, Collection Display App) + their public GitHub repo bus-tracking-flutter. **Featured flags and Additional Contributions confirmed by user 2026-08-25**: Grafterr POS/GO!/Collection Display App stay `featured: true`, Bus Tracking Flutter stays `featured: false`; the resume's "Additional Contributions" (Delivery Management App, Grafterr Customer Apps, Itles Learning Platform) are NOT added as separate Work entries.
- [x] Real skills list — populated in `src/data/skills.ts` from the resume, regrouped into 7 tag-able categories (traits like "R&D"/"Debugging" folded into concrete tools, not kept as categories). User should confirm the regrouping.
- [x] Real experience history — populated in `src/data/experience.ts`, 3 roles from the resume (Crowdnetic/FinMkt, Abilio IT Solutions, FIN Infocom/Grafterr).
- [x] GitHub handle (`thisislohit`) + section decision — **confirmed by user 2026-08-25: fold into Work**, no standalone GitHub/Open Source section. Bus Tracking Flutter already represents it in `src/data/projects.ts`. See scope.md IA decision.
- [x] Contact email + social links — populated in `src/data/social.ts` (kuntamukkala2017@gmail.com, GitHub, LinkedIn). Phone number confirmed public by user 2026-08-25 and added (`+91 83415 90211`, tel: link) to both Contact and Footer.
- [x] Short "About" positioning statement — drafted from the resume's Personal Statement, approved by the user, and implemented live in `src/sections/About.tsx` (2026-08-25).
- [x] Project screenshots/images for Work — **confirmed by user 2026-08-25: skip for now.** Stitch's own reference screens included 2 AI-generated decorative stock images (not real screenshots of any actual project); explicitly declined in favor of real screenshots later. `src/data/projects.ts`'s `Project` type has no image field yet — add one (and the actual image assets) when real screenshots are supplied, rather than reusing the Stitch placeholders as a stand-in.
- [x] Resume/CV link or file — **confirmed by user 2026-08-25: skip for now.** No download button added to Hero/Contact; revisit if/when a file or link is supplied.
- [x] Preferred domain name — **locked in 2026-08-25: thisislohit.dev.** Not yet pointed at the deployment; temporarily hosted on Cloudflare Pages (`thisislohit.pages.dev`). `metadataBase` (layout.tsx) and the sitemap/robots base URLs now point at the temp `.pages.dev` URL so OG images and sitemap entries resolve correctly against where the site is actually live — swap all three to `https://thisislohit.dev` once the real domain is pointed at the deployment.
- [x] `og-image`/favicon — **implemented 2026-08-25.** No Stitch-provided icon/logo asset exists (confirmed during the Stitch audit), so both are generated directly from the site's real tokens + already-approved Hero copy via Next.js's built-in `next/og` (App Router file convention, no new dependency): `src/app/icon.tsx` (32×32, "t" monogram matching the nav/footer wordmark) and `src/app/opengraph-image.tsx` (1200×630, reuses Hero's exact eyebrow + "Flutter Developer." headline). Verified visually — both render correctly against the real tokens. `metadataBase` now set (see domain entry above) — warning resolved.

## Foundation
- [x] Read and audit `design.md`
- [x] Resolve frontmatter-vs-prose color inconsistency (documented in DESIGN_SYSTEM.md §1.1)
- [x] Define scope
- [x] Finalize architecture
- [x] Finalize technology stack
- [x] **User review/approval of scope.md** — approved 2026-08-25
- [x] **User review/approval of architecture.md** — approved 2026-08-25
- [x] **User review/approval of DESIGN_SYSTEM.md before Phase 6 begins**
- [x] Build thisislohit MCP server (mcp-server/) and register it in `.mcp.json` (project scope)
- [x] Approve the MCP server in an interactive `claude` session (`claude mcp list` now shows "✔ Connected")

## Project Scaffold (Phase 6 setup, 2026-08-25)
- [x] Scaffold Next.js 16 (App Router) + TypeScript + Tailwind v4 project into the repo root (merged around existing docs — no doc files touched)
- [x] Map DESIGN_SYSTEM.md Part 2 tokens into `src/app/globals.css` `@theme` (spacing names match Stitch's own generated classes, e.g. `margin-page`, for easy cross-reference with `stitch-design/`)
- [x] `next/font/google` Geist wired in `src/app/layout.tsx` (self-hosted at build time, no external font request)
- [x] Install `lucide-react` + `@radix-ui/react-dialog` per architecture.md
- [x] Create `src/components/ui/`, `src/components/shortcuts/`, `src/sections/`, `src/data/`, `src/lib/` per architecture.md folder structure
- [x] Stub all 9 section components (Hero, About, Work, Skills, Beyond Mobile, Experience, Foundations & Education, Contact, Footer) with no invented content, composed in IA order in `src/app/page.tsx`
- [x] Typed empty data files (`projects.ts`, `skills.ts`, `experience.ts`, `social.ts`) ready for Phase 8 content
- [x] Scope `eslint.config.mjs` to ignore `mcp-server/` and `stitch-design/` (separate tooling/reference, not app code)
- [x] Verify `npm run build` and `npm run lint` both pass clean

## Stitch MCP Integration
- [x] Register the `stitch` MCP server (`claude mcp add stitch --transport http ... -s local`) — local scope, private per-machine config, key never enters `.mcp.json`
- [x] Verify `stitch` shows "✔ Connected" via `claude mcp list`
- [x] **Pull the actual Stitch design through the `stitch` MCP server** — attempted once, but its tools were not available in that session because `stitch` was registered mid-session (Claude Code only loads an MCP server's tool list at session start). Needs a fresh `claude` session in this project, then re-attempt.
- [x] Confirm what `stitch` exposes (project/screen list, per-screen HTML + screenshot, embedded design tokens) and decide whether any pulled output should update/supersede `design.md` — decided: `design.md`'s tokens/prose are byte-identical to the Stitch project's embedded `designMd`, so no update is needed; the 12 pulled screens (`stitch-design/`) are used as section-layout reference only.

## Design System
- [x] Extract color tokens
- [x] Extract typography tokens
- [x] Extract spacing tokens
- [x] Extract radius tokens
- [x] Document shadow absence (intentional, not a gap)
- [x] Define responsive/breakpoint tokens (derived, documented)
- [x] Define motion tokens (derived from the two motion behaviors named in design.md)
- [x] Define icon system (Lucide, 2px stroke)

## Components (implementation — Phase 6, complete)
- [x] Button (primary, secondary)
- [x] IconButton
- [x] Tag
- [x] Container / Section (layout primitives)
- [x] Heading
- [x] Text / Link / Divider
- [x] ListRow (ProjectRow, ExperienceRow)
- [x] Navigation / MobileNavigation
- [x] SocialLink
- [x] Footer
- [x] ShortcutsDialog (Radix Dialog wrapper)
- [x] Input (styled per design.md, built for completeness — not wired to a form in v1)

## Hero Redesign (2026-08-25 — matching a new Stitch export)
User supplied a richer Hero design directly (not from the live Stitch project's own screen list — a separate export, saved to `stitch-design/html/hero-v2-availability.html` + `DESIGN.md` + `screen.png`). Design tokens were unchanged (byte-identical to the existing `design.md`); only Hero's content/layout and the global Nav/Footer treatment changed.
- [x] Hero rebuilt: full name as the giant display statement (one real `<h1>`, fixing a double-`<h1>` issue in the source markup), "Available for Work" status tag (confirmed true by user), role as `<h2>`, technical-signals grid (Domain/Platforms), "Scroll to Explore" cue, edge-bleed treatment on the name (`overflow-x-hidden` added to `<body>` to support it safely — verified functionally: page cannot actually be scrolled horizontally at any breakpoint tested).
- [x] `Heading` extended with a `hero-name` level (fluid `clamp(72px, 11vw, 160px)`, unlike every other level's discrete breakpoint pair).
- [x] `Tag`'s `accent` variant gained a border (matches the new reference, and brings it in line with design.md's baseline tag spec) — also improves the existing Featured tags on Work.
- [x] `Navigation` updated globally: bigger uppercase wordmark, uppercase metadata-style links, bold+border-bottom active state, translucent `backdrop-blur-sm` bar. Documented as a sanctioned exception to design.md's "never blurs" rule in DESIGN_SYSTEM.md §1.7 (translucency on a fixed surface, not a depth/elevation cue).
- [x] `Footer` updated: copyright now uses the full name (was "thisislohit") with the live current year (not the source's stale "2024"), added "Location: Hyderabad".
- [x] Deliberately did NOT copy literally: the source's always-on underline for "Let's Talk" (design.md's prose explicitly says no persistent underline — this site's existing Link component already correctly does hover-only); the CTA button metadata-style typography was scoped to Hero's two buttons only, not applied to Button's shared base style (Contact's email button wasn't part of this update).
- [x] Verified: exactly one `<h1>` ("Lohit Kuntamukkala") and one `<h2>` ("Flutter Developer") — correct heading hierarchy. No horizontal scroll possible at 1280px or 375px (confirmed via `window.scrollTo` + checking `window.scrollX`, not just `scrollWidth` — which reflects pre-clip content extent even when `overflow:hidden` is correctly working, a real testing-methodology lesson from this pass). Mobile nav dialog still functions correctly with the updated wordmark. `npm run build`/`npm run lint` clean throughout.

## About / Work / Skills Structural Upgrade (2026-08-25 — matching a full new Stitch export set)
User supplied a complete new export set (`stitch_editorial_developer_design_system/`, one folder per screen + a `branded_identity` master composite showing every section assembled). Saved to `stitch-design/html/{about,featured-work,expertise}-v2*.html` + `branded-identity-v2-master.html`. Implemented the structural upgrades that use only confirmed real content; explicitly deferred the new first-person philosophy/tagline copy for separate review (see "Deferred" below).
- [x] `Project` type extended with `category` and `highlights: string[]` (src/data/projects.ts) — every highlight is a direct restatement of an existing resume bullet already used in that project's description, nothing new. `ProjectRow` updated to render a numbered category eyebrow + bulleted "Engineering Highlights" list.
- [x] `SkillGroup` type extended with `description` (src/data/skills.ts) — each description restates resume/experience content already used elsewhere on the site. `Skills.tsx` restructured into a numbered "Technical Capability Index" row format (index / category / description + tags), reusing the same hairline-divider list pattern as Work/Experience.
- [x] `About.tsx` gained a "Technical Profile" tag row (7 tags, each grounded in the resume — SaaS apps, payment integrations, native Android, offline-first, real-time sync, production stability, performance optimization) and a Based In / Primary Focus / Platforms trio. The already-approved About statement itself was NOT replaced.
- [x] Deliberately NOT added, respecting prior explicit decisions: the "More Work" list (Delivery Management App / Grafterr Customer Apps / IELTS Learning Platform — user said not to add these as Work entries); the Stitch reference's 2 AI-generated stock images (deferred until real screenshots exist); "Riverpod" and "SQLite" in Skills (not in the user's confirmed skill list, present in the Stitch reference but unconfirmed).
- [x] Verified: zero console errors, no horizontal scroll possible at 1280px or 375px (checked via `window.scrollX` after `scrollTo`, not `scrollWidth`), full-page screenshots at both breakpoints show clean, consistent layout with no clipping/breaks. `npm run build`/`npm run lint` clean.
- [x] **Philosophy/tagline copy drafted, approved by the user, and implemented 2026-08-25.** About: "I Build for the Real World." headline (`<h2>`), four Engineering Philosophy principles as `<h3>`s (Solve the System / Build for Real Conditions / Keep Complexity Under Control / Learn When the Problem Demands It — each grounded in a specific resume/experience fact, see comments in `About.tsx`), "The App Is Only the Surface." typographic break, a "How I Work" grid (Build/Debug/Integrate/Improve, each mapped to an existing resume skill category). Work: "Work That Ships." (`<h2>`) and "Built for Real Users." closing line. Skills: "Built Beyond UI." (`<h2>`) and "Flutter Is the Tool. Engineering Is the Job." typographic break.
- [x] Verified heading hierarchy after adding 3 new `<h2>`s and 4 `<h3>`s: exactly 1 `<h1>`, 4 `<h2>`s at the same level (Hero's role heading + About/Work/Skills headlines), 4 `<h3>`s correctly nested under About's principles — no skipped levels.
- [x] **Found + fixed a real bug**: the two typographic-break `<p>` elements didn't have `break-words` (only the `Heading` component has that fix from the earlier Hero overflow bug) — "Flutter Is the Tool. Engineering Is the Job." showed `scrollWidth` (383) > `clientWidth` (343) on mobile, the same overflow signature as the original Hero bug. Added `break-words` to both; reverified `scrollWidth === clientWidth` exactly on both breaks at 375px. Take-away recorded in memory: any large display-scale text needs this check, not just text going through the `Heading` component.
- [x] `npm run build`/`npm run lint` clean throughout.

## Contact / Foundations Upgrade (2026-08-25 — matching the same new export set)
- [x] `Foundations & Education` gained "Where It Started." (`<h2>`) and a closing statement "Building Is How I Learn." (plain `<p>`, same precedent as other closing statements — not a new heading level) + supporting line, both drafted and approved before implementation.
- [x] Deliberately NOT added: the reference's "Continuously Learning" subsection (React/Node.js/SQL/Backend/Deployment/Unity/AR tags + "expanding beyond mobile into backend, web, deployment, spatial computing") — same territory as the already-cut Beyond Mobile section, so not reintroduced here either.
- [x] `Contact` gained "Let's Build Something Useful." (`<h2>`), a secondary statement, a "Start a Conversation →" primary CTA, and an "Available for Work" tag matching Hero's. The contact list was restructured from a flat link row into `ListRow`-based rows (Email/Phone/GitHub/LinkedIn/Location, hairline dividers) — reorganizing already-confirmed data, not new content. The reference's duplicate "Built for Real Users." closing line (already used on Work) was deliberately not repeated.
- [x] Verified: 6 valid `<h2>`s total across the page now (Hero role + About/Work/Skills/Foundations/Contact headlines), 4 `<h3>`s under About, no skipped levels. All contact links (mailto/tel/GitHub/LinkedIn) correct hrefs; Location correctly non-interactive (no href). No horizontal scroll at 1280px or 375px. The three new headline elements ("Where It Started.", "Building Is How I Learn.", "Let's Build Something Useful.") all verified `scrollWidth === clientWidth` exactly on mobile — no overflow. `npm run build`/`npm run lint` clean.

## Experience Timeline Upgrade (2026-08-25 — matching a new Stitch export)
User supplied a new "Experience Timeline" export (screenshot + `lohit_portfolio_experience_timeline/code.html`), saved to `stitch-design/html/experience-v2.html` + `stitch-design/screenshots/experience-v2.png`.
- [x] `ExperienceEntry` type extended with `project: string` and `tags: string[]` (src/data/experience.ts). Crowdnetic's combined "Crowdnetic Technologies Pvt Ltd. (FinMkt)" split into separate `company`/`project` fields. Every tag is a direct restatement of a resume bullet already used for that specific role — nothing invented (e.g. Crowdnetic's Design Tokens/Tap-to-Pay tags both trace to that role's own resume bullets, not borrowed from Grafterr's).
- [x] `ExperienceRow` rebuilt to an asymmetric 12-col grid: left column (dates / company / project), right column (large role title, impact line, tag row) — matching the reference's visual weight.
- [x] `Experience.tsx` gained a "Where I've Built." headline (`<h2>`, kept at `headline-lg` for consistency with every other section's `<h2>` rather than the reference's larger display scale) and a closing statement "From Features to Systems." + Career/Focus metadata pair, both drafted and implemented directly (deviation from the usual draft-then-approve round-trip, given the user's "I'll push it later but I need to fix" urgency and that every prior draft this session had been approved unedited — flagged here, not treated as the new default).
- [x] Deliberately NOT added: the reference's arrow icon on each row (no real link destination for Experience entries — an arrow with nowhere to go would be decorative, not functional, per design.md's icon rule) — kept as a non-interactive `ListRow`, unlike `ProjectRow`. Role title kept as styled `<p>`, not a repeated `<h3>` — all three entries share the literal title "Flutter Developer," and three identical headings would be a poor screen-reader heading-outline.
- [x] Verified: 3/3 role titles present as plain `<p>` (not headings) — heading count on the page stays consistent with prior passes (7 `<h2>`s total: Hero role, About, Work, Skills, Experience, Foundations, Contact). No horizontal overflow at 1280px or 375px (`window.scrollX` stays `0` after `scrollTo`, the established test — `scrollWidth` alone is not proof of a bug). Visual spot-check at both breakpoints shows clean layout, correct wrapping, no clipping. `npm run build`/`npm run lint` clean.

**All 8 sections of the single-page site are now built out with real, approved content end to end** — Hero, About, Work, Skills, Experience, Foundations & Education, Contact, Footer.

## Portfolio Sections (Phase 7–8, complete — 2026-08-25)
- [x] Hero — implemented 2026-08-25 (src/sections/Hero.tsx, static per user's explicit choice — no Stitch "animated" variant, page's one real `<h1>`, View Work/Get in touch CTAs)
- [x] About — implemented 2026-08-25 (src/sections/About.tsx)
- [x] Work / Projects — implemented 2026-08-25 (src/sections/Work.tsx, ProjectRow list from src/data/projects.ts)
- [x] Skills — implemented 2026-08-25 (src/sections/Skills.tsx, grouped Tag rows from src/data/skills.ts)
- [x] ~~Beyond Mobile~~ — **cut, not implemented.** User confirmed no real full-stack/adjacent-tech work to showcase (2026-08-25); `src/sections/BeyondMobile.tsx` deleted, removed from scope.md IA and page.tsx, not just unrendered.
- [x] Experience — implemented 2026-08-25 (src/sections/Experience.tsx, ExperienceRow list from src/data/experience.ts)
- [x] Foundations & Education — implemented 2026-08-25 (src/sections/FoundationsEducation.tsx). Education entry only (degree/institution/dates, confirmed from resume) — no "how I learn" statement, deliberately not reintroducing the Beyond Mobile-adjacent narrative the user just declined.
- [x] Contact — implemented 2026-08-25 (src/sections/Contact.tsx, mailto CTA + SocialLinks from src/data/social.ts)
- [x] Footer — implemented earlier this session (src/sections/Footer.tsx); re-verified 2026-08-25 against real src/data/social.ts (email/GitHub/LinkedIn hrefs, back-to-top aria-label all correct)

## Interactions (Phase 9, complete — 2026-08-25)
- [x] Keyboard shortcut provider (`G H`, `G P`, `G S`, `G C`, `?`, `Esc`) — src/components/shortcuts/ShortcutsProvider.tsx + src/lib/shortcuts.ts
- [x] Shortcut ignored while focus is in input/textarea/select — verified live (dispatched "g h" into a real `<input>`, hash did not change; same keys outside the input correctly navigated)
- [x] Shortcuts have zero effect on mobile/touch — no special-casing needed or added: touch never dispatches keydown events, so this holds by construction
- [x] Equivalent mouse/touch navigation exists for every shortcut — G-H/G-P/G-S/G-C duplicate Navigation's existing link hrefs; `?` duplicates the new CircleHelp hint button in Navigation
- [x] `?` opens accessible shortcuts help dialog — verified live (hint button click and dialog-open both confirmed via DOM check)

## Quality (Phases 10–13, in progress — 2026-08-25)
- [x] Responsive testing (mobile 375px / tablet 768px / desktop 1280px, done in-browser — no real devices available in this environment). **Found + fixed a real bug**: Hero's display-xl "Flutter Developer." overflowed and lost letters on mobile (no word-break) — added `break-words` to Heading. Verified: h1 scrollWidth now exactly equals clientWidth, no horizontal page overflow anywhere.
- [x] Accessibility testing (contrast, keyboard, screen reader, reduced-motion). **Found + fixed two real bugs**: (1) Electric Blue as standalone text (Link/SocialLink/Nav active state) computed to 3.47:1, failing WCAG AA's 4.5:1 for normal-size text — added `--color-accent-primary-text` (#0144fe, 6.0:1), see DESIGN_SYSTEM.md §1.10. (2) The mobile nav overlay was hand-rolled with no real focus trap — top-bar wordmark/hamburger stayed keyboard-focusable underneath it. Rebuilt on Radix Dialog (matching ShortcutsDialog's existing pattern); verified Radix now marks the rest of the page `aria-hidden`+`pointer-events:none` while open. Landmarks/heading hierarchy/touch targets/reduced-motion CSS all verified clean.
- [x] **Button primary hover contrast — fixed 2026-08-25 per explicit user request.** Was flagged-not-fixed (white on literal `#4D7CFE` = 3.73:1, below AA) because `design.md`'s prose explicitly names that exact fill color, so it wasn't changed unilaterally during the earlier QA pass. Now uses `--color-accent-primary-text` (the same darkened blue already used for standalone link text) for the hover/active fill — white text on it computes to 6.44:1. `--color-accent-primary` itself is untouched elsewhere (focus rings, anywhere else it pairs with dark text). See DESIGN_SYSTEM.md §1.10.
- [x] Keyboard navigation full pass — shortcuts (Phase 9) already verified; mobile nav dialog and ShortcutsDialog both verified for focus-trap, Escape-to-close, and focus-restoration-to-trigger via Radix.
- [ ] Performance optimization + Lighthouse ≥ 95 mobile — no Lighthouse runner available in this environment to get a real score. Structural performance facts confirmed instead: zero images site-wide, only 3 Client Components (ShortcutsProvider/Navigation/ShortcutsDialog — everything else stays server-rendered per architecture.md), self-hosted Geist via next/font, all routes prerender as static (○ Static in build output), no unnecessary dependencies. Revisit with a real Lighthouse run before/at deployment.
- [x] SEO (metadata, sitemap, robots, OG/Twitter cards) — added `src/app/sitemap.ts` + `robots.ts` (planned in architecture.md, never built until now); removed a leftover default Next.js `favicon.ico` from the scaffold that was competing with the real `icon.tsx`; upgraded title/description to real copy (Hero's own text, not placeholders) with full Open Graph + Twitter card metadata, verified both auto-resolve to the real 1200×630 opengraph-image. `metadataBase` set to the temporary `thisislohit.pages.dev` deployment URL (domain locked in as thisislohit.dev, not yet pointed) — see the domain entry above.
- [x] Final QA (links, cross-browser) — verified zero console errors on a fresh load, zero broken internal anchor links (`#hero`/`#about`/`#work`/`#experience`/`#contact` all resolve; `#skills`/`#foundations` intentionally scroll-only, not nav-linked). Cross-browser testing not done (single browser environment available).
- [ ] Deployment (Phase 14)
