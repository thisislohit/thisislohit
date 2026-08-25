# plan.md — Phased Implementation Roadmap

> Foundation phases (1–5) must be reviewed/approved before Phase 6 (component code) begins, per project instructions.

## Phase 1 — Discovery
- **Objective**: Understand the Stitch design and the brand intent.
- **Tasks**: Read `design.md` in full (frontmatter + prose); identify conflicts, gaps, and reusable patterns.
- **Dependencies**: None.
- **Deliverables**: Audit findings (now in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) Part 1).
- **Definition of Done**: Every color/type/spacing/shape rule in `design.md` is accounted for — either extracted or documented as a gap with a resolution.
- **Status**: ✅ Complete.

## Phase 2 — Scope
- **Objective**: Define what `thisislohit` is, for whom, and its boundaries.
- **Tasks**: Vision, goals, audience, IA recommendation, functional/non-functional requirements, out-of-scope list.
- **Dependencies**: Phase 1 (IA recommendation depends on the audit's layout/pattern findings).
- **Deliverables**: [scope.md](scope.md).
- **Definition of Done**: Section list is justified by design evidence, not assumed from the brief's illustrative example.
- **Status**: ✅ Complete.

## Phase 3 — Stitch Design Audit
- (Folded into Phase 1 deliverable — [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) Part 1 — rather than a separate document, since the brief did not name a distinct audit file and the audit directly feeds the token extraction in the same document.)
- **Status**: ✅ Complete.

## Phase 4 — Architecture
- **Objective**: Choose and justify the technical stack and folder structure before any code exists.
- **Tasks**: Evaluate framework/language/styling/animation/content/deployment options against the scope and design constraints; define folder structure.
- **Dependencies**: Phase 2 (stack choices must serve the defined scope, not the reverse).
- **Deliverables**: [architecture.md](architecture.md).
- **Definition of Done**: Every dependency has a stated reason; every rejected alternative has a stated reason.
- **Status**: ✅ Complete.

## Phase 5 — Design Tokens
- **Objective**: Convert audited design decisions into implementation-ready CSS custom properties.
- **Tasks**: Color, typography, spacing, radius, border, shadow (absence), breakpoints, motion, z-index tokens.
- **Dependencies**: Phase 3.
- **Deliverables**: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) Part 2.
- **Definition of Done**: No component in Phase 6 will need a value not already defined here.
- **Status**: ✅ Complete.

---

## ⬇︎ Approval gate — do not proceed past this point without review ⬇︎

---

## Phase 6 — Component Foundation
- **Objective**: Build the reusable UI primitives (`src/components/ui/`).
- **Tasks**: Scaffold Next.js + TypeScript + Tailwind v4 project per [architecture.md](architecture.md); wire tokens into `@theme`; implement Button, IconButton, Tag, Container, Section, Heading, Text, Link, Divider.
- **Dependencies**: Phases 4–5 approved.
- **Deliverables**: Working component library, viewable in isolation (e.g. a temporary `/dev/components` route) before wiring into real sections.
- **Definition of Done**: Every component in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) Part 3 exists, uses only tokens (no raw values), passes basic keyboard/focus check.

## Phase 7 — Page Structure
- **Objective**: Compose the section shells in order with placeholder content.
- **Tasks**: `src/sections/*` (Hero, About, Work, Skills, Experience, Contact, Footer), `src/app/page.tsx` composition, responsive grid behavior (12-col → 4-col).
- **Dependencies**: Phase 6.
- **Deliverables**: Full-page scroll skeleton, responsive at all breakpoints, no real content yet.
- **Definition of Done**: Page matches the asymmetric editorial layout described in `design.md` at mobile/tablet/desktop.

## Phase 8 — Content
- **Objective**: Populate real content.
- **Tasks**: Write `src/data/{projects,skills,experience,social}.ts` from user-provided material (see [tasks.md](tasks.md) "Content Needed" — nothing invented).
- **Dependencies**: Phase 7 + user supplies content.
- **Deliverables**: Fully populated, real portfolio content.
- **Definition of Done**: No placeholder/lorem-ipsum text remains; every skill/project/experience entry is verified real.

## Phase 9 — Interactions
- **Objective**: Implement the keyboard shortcut system and hover/focus micro-interactions.
- **Tasks**: `G H/P/S/C`, `?`, `Esc`; shortcuts dialog (Radix Dialog); list-row arrow hover translate; button hover fills.
- **Dependencies**: Phase 7.
- **Deliverables**: Working shortcut system, ignored while typing in inputs, no effect on mobile, documented in-app via `?`.
- **Definition of Done**: All rules in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)/`.cursor/rules` for shortcuts are met; full mouse/touch-only navigation still works identically.

## Phase 10 — Accessibility
- **Objective**: Verify WCAG 2.1 AA.
- **Tasks**: Contrast audit per token (esp. lime/blue combinations, §DESIGN_SYSTEM.md Part 2 note), keyboard-only pass, screen-reader landmark/heading-outline check, `prefers-reduced-motion` handling, focus-visible everywhere.
- **Dependencies**: Phases 8–9.
- **Deliverables**: Accessibility pass notes.
- **Definition of Done**: No AA failures; single correct `h1`; all interactive elements reachable and labeled by keyboard/AT.

## Phase 11 — Performance
- **Objective**: Verify the performance NFR.
- **Tasks**: Font-loading strategy check (`next/font`, subset if needed), image optimization, bundle audit (confirm no unused animation/UI-kit weight), Lighthouse pass.
- **Dependencies**: Phase 8.
- **Deliverables**: Lighthouse report.
- **Definition of Done**: Mobile Performance ≥ 95.

## Phase 12 — SEO
- **Objective**: Verify the SEO NFR.
- **Tasks**: Metadata per page/section, OG/Twitter card image, `sitemap.ts`, `robots.ts`, structured data (Person/schema.org if applicable).
- **Dependencies**: Phase 8.
- **Deliverables**: Passing SEO checklist.
- **Definition of Done**: Rich link previews verified on at least LinkedIn + Twitter/X share debuggers.

## Phase 13 — Testing
- **Objective**: Confirm correctness across devices/browsers.
- **Tasks**: Responsive QA (mobile/tablet/desktop), cross-browser pass (latest 2 versions per [scope.md](scope.md)), keyboard-shortcut QA, link QA (every external project/social link resolves).
- **Dependencies**: Phases 9–12.
- **Deliverables**: QA notes / checklist in [tasks.md](tasks.md).
- **Definition of Done**: No broken links, no layout breakage at any defined breakpoint.

## Phase 14 — Deployment
- **Objective**: Ship to production.
- **Tasks**: Vercel project setup, custom domain (if any) + DNS, production environment check.
- **Dependencies**: Phase 13.
- **Deliverables**: Live URL.
- **Definition of Done**: Production build passes all Phase 10–12 checks on the live domain, not just locally.

## Phase 15 — Final Polish
- **Objective**: Last-mile refinement pass.
- **Tasks**: Real-device check (iOS Safari, Android Chrome — the audience's own tools), copy pass, favicon/OG image final art, 404 page.
- **Dependencies**: Phase 14.
- **Deliverables**: Polished, launched site.
- **Definition of Done**: User sign-off.
