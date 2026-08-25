# scope.md — Product Scope

## Project Vision
`thisislohit` is a personal-brand portfolio for a senior mobile engineer. It is not a generic "template" portfolio — the Stitch design brief explicitly frames it as an **editorial monograph**: confident, spacious, typographically-led, and utilitarian. The site should read like a piece of print design that happens to be a website, positioning the developer as an architect of digital experiences rather than a list of technologies.

The site communicates: technical seniority, taste, and clarity of thought — through restraint (no gradients, no soft shadows, no decorative motion) rather than through visual noise.

## Goals
1. Establish a distinctive, premium personal brand that stands apart from templated SaaS-style portfolios.
2. Communicate mobile-engineering seniority credibly — real skills, real projects, real experience only.
3. Convert visits into outcomes: recruiter/hiring-manager contact, GitHub exploration, or direct inquiry.
4. Load fast and read cleanly on mobile first (the audience will frequently arrive from LinkedIn/Twitter/GitHub on a phone).
5. Be maintainable by one person without a CMS or backend.

## Target Audience
- **Recruiters / hiring managers** — scanning quickly, need role fit, seniority signal, and a fast path to contact/resume.
- **Engineering peers / potential collaborators** — want to see real code quality, architecture thinking, and GitHub activity.
- **Potential clients** — want proof of shipped work and a low-friction way to start a conversation.
- **Open-source collaborators** — care about active repos, contribution patterns, and technical writing if any.
- **People discovering the GitHub work** — arriving from a repo/README link, want a credible identity behind the code.

All audiences are technical or technical-adjacent; none need hand-holding or marketing copy. This supports the editorial, text-forward direction in `design.md` rather than a feature-tour SaaS layout.

## Portfolio Content — Recommended Information Architecture

`design.md` is analyzed (not assumed) below before recommending structure. Signals from the design:
- **Display typography treated as a graphic element**, allowed to clip the viewport → implies a **large, singular Hero statement**, not a hero + carousel.
- **12-column asymmetric editorial grid**, "avoid centering content" → favors **long-form, alternating-alignment sections** over centered card grids.
- **`stack-xl` (128px) between major sections** → a genuinely minimal number of top-level sections (too many sections at this scale = an extremely long page).
- **Metadata labels as "rhythmic cadence"** → each section wants a small uppercase eyebrow label (e.g. `01 — WORK`), reinforcing an editorial "issue/chapter" structure.
- **Lists with hairline dividers + arrow-up-right icon** → strongly implies **Projects and Experience are rendered as list rows**, not visual cards, keeping with the flat, borderless aesthetic.
- **Tags with 1px border, metadata font** → implies **Skills are rendered as tags/labels**, not progress bars or icon grids (icon grids would break the "no decorative icons" rule).

Recommended sections (final — supersedes the illustrative list in the brief):

| # | Section | Why it exists |
|---|---------|----------------|
| 01 | **Hero** | Large clipped display type + role statement + primary CTA (contact / view work). Sets the editorial tone immediately. |
| 02 | **About** | Short, confident positioning statement — not a biography. Supports the "architect, not coder" framing. |
| 03 | **Work / Projects** | The core proof section. List rows (title, one-line description, stack tags, arrow-up-right link), asymmetric layout. |
| 04 | **Skills** | Grouped tag rows (metadata typography), organized by real category, not a decorative skill-meter. |
| 05 | **Experience** | Compact list with hairline dividers: role, company, dates, one-line impact. |
| 06 | **Foundations & Education** | Formal education. Pulled from the Stitch "Foundations & Education" screen — kept separate from About because it's credential/background, not positioning copy. |
| 07 | **Contact** | Single, deliberate closing statement + email/social — no contact form (matches "avoid unnecessary complexity/backend"). |
| — | **Footer** | Minimal: wordmark/logotype treatment, copyright, social links, back-to-top. The Stitch "Branded Identity" screen (page-wide wordmark/nav/footer treatment) folds in here rather than becoming its own section — it's a cross-page brand treatment, not standalone content. |

Decision: **GitHub/Open Source folds into Work/Projects — resolved 2026-08-25, no standalone section.** The user's real GitHub activity (github.com/thisislohit, 11 public repos) is mostly forks and practice repos; the one substantial original project, Bus Tracking Flutter (34 stars), is already represented as a Work/Projects entry with its repo URL. A dedicated section would be thin and redundant with Work — keeps the page minimal per the brief's explicit "avoid unnecessary features" instruction.

Decision: **Beyond Mobile — added, then cut. Resolved 2026-08-25, no section.** Originally added to the IA sourced from the pulled Stitch "Beyond Mobile" screen. The user confirmed there is no real full-stack/adjacent-technology work to showcase there, so it was removed rather than filled with placeholder or inferred content — an empty or thin section would violate the brief's "avoid unnecessary features" instruction as much as an invented one would violate "do not invent skills or experience." The stub component (`src/sections/BeyondMobile.tsx`) was deleted, not just unrendered.

Decision: **Foundations & Education kept, scoped to the confirmed facts only.** The Stitch screen's own copy included a "Continuously Learning" / "expanding into backend, web, AR" narrative — the same territory as the now-cut Beyond Mobile section. Since the user declined that content there, the same claims aren't reintroduced here either. This section is the education entry only (degree, institution, dates — all confirmed from the user's resume), not a "how I learn" statement, which nobody has provided.

Decision: **Branded Identity does not become a section** — its content (wordmark, nav, footer social links, back-to-top) is a cross-page brand treatment and folds into Header/Footer implementation instead.

Decision: **Split into separate routes — resolved 2026-08-25, supersedes the single-page IA below.** User requested real per-section pages instead of one page with anchor scrolling. Nav items each got their own route: `/` (Hero), `/about`, `/work` (+ Skills), `/experience` (+ Foundations & Education), `/contact`. Skills and Foundations stayed grouped into Work/Experience respectively rather than getting their own route — same as their scroll-only, no-nav-link status on the old layout. Footer moved into the shared root layout (renders on every route) instead of being the last section on one page.

## Functional Requirements
- ~~Single-page (or single-page-primary) scroll experience with anchor-based sections.~~ **Superseded 2026-08-25** — see the routing decision above. Real routes per top-level nav item instead.
- Hero, About, Work, Skills, Experience, Foundations & Education, Contact, Footer sections render with real content (see Content Needed).
- Each Work item links out to a live project and/or source repo (external link, new tab).
- Contact section provides a direct, working `mailto:` link (and optional social links) — no server-side form/backend in v1.
- Keyboard shortcut system for desktop navigation (`G H`, `G P`, `G S`, `G C`, `?`, `Esc`) per §11 of the brief, with a visible discoverability affordance (small shortcut hint, `?` panel).
- Fully navigable and usable via mouse/touch alone — shortcuts are an enhancement, never a requirement.
- Responsive across mobile / tablet / desktop per the grid rules in `design.md` (12-col → 4-col collapse).

## Non-Functional Requirements
- **Performance**: Lighthouse Performance ≥ 95 mobile. No render-blocking web fonts beyond the two needed weights actually used. No unused JS shipped for animation libraries.
- **Accessibility**: WCAG 2.1 AA minimum — color contrast (verified per token, see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) audit notes on Acid Lime and Electric Blue against white text), full keyboard operability, semantic landmarks, visible focus states, `prefers-reduced-motion` respected.
- **SEO**: Static generation, per-page metadata, Open Graph/Twitter cards, sitemap.xml, robots.txt, semantic heading hierarchy (single `h1` in Hero).
- **Responsiveness**: Mobile-first implementation; the 12-column desktop grid is additive, not the base case.
- **Maintainability**: Content (projects, skills, experience) lives in typed data files, not scattered in JSX, so updates don't require touching component code.
- **Browser compatibility**: Latest 2 versions of Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome explicitly tested (mobile-dev audience will check on-device).

## Out of Scope (v1)
- CMS or headless-CMS integration.
- Blog / long-form writing platform (may become a v2 addition — not designed against yet).
- Contact form with backend/email service — a `mailto:` link is sufficient for v1.
- User accounts, comments, likes, analytics dashboards beyond a single privacy-respecting pageview tracker (optional, deferred decision).
- Dark/light theme toggle — `design.md` defines one deliberate "paper" theme; a second theme is a real design project of its own, not a checkbox. Revisit only if explicitly requested.
- Internationalization / multi-language content.
- Animation-heavy scroll storytelling (parallax, scroll-jacking) — conflicts with the brief's flat, utilitarian, non-decorative direction.
- Case-study sub-pages per project — v1 links out to the live project/repo directly; in-site case studies are a possible v2 if content is provided.
