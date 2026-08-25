# architecture.md — Technical Architecture

## Stack Decision

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Static generation for a content-driven site, file-based routing, built-in metadata API for SEO/OG tags, image optimization, zero-config Vercel deploy. Avoids hand-rolling SSG plumbing. |
| Language | **TypeScript** | Content (projects/skills/experience) is structured data — typed data files catch content-schema mistakes at build time, which matters more here than framework flexibility. |
| Styling | **Tailwind CSS v4** | `design.md` already defines a token system (colors, type scale, spacing scale) via CSS custom properties. Tailwind v4's CSS-first config maps 1:1 onto that — tokens become `@theme` variables, no translation layer, no CSS-in-JS runtime cost. Utility classes also naturally discourage introducing "just this once" arbitrary values, which the brief explicitly prohibits. |
| Component architecture | **React Server Components by default, Client Components only where interactive** | Most sections (Hero, About, Work, Skills, Experience, Footer) are static content — ship zero JS for them. Client boundaries are limited to: keyboard-shortcut listener, mobile nav toggle, shortcut-help overlay. |
| Content/data | **Local typed TS/JSON data files** (`src/data/`) | No CMS (out of scope, see [scope.md](scope.md)). A solo-maintained portfolio doesn't need one; typed data files are simpler, versioned in git, and zero-latency at build time. |
| Icons | **lucide-react** | `design.md` explicitly names "Lucide Arrow-Up-Right" for list hover states and specifies 2px stroke, sharp joins — Lucide is the only icon set named in the source design, so no evaluation needed. |
| Animation | **CSS transitions only (no animation library) in v1** | The brief is explicit: flat design, no gradients/shadows, "functional... rather than decorative" interaction. The only motion called out in `design.md` is a 2px hover translate on list arrows and color-shift hover states on buttons — both are trivial CSS `transition`. Adding Framer Motion or similar for this would violate "avoid unnecessary dependencies." Revisit only if a specific section (e.g. Hero entrance) needs orchestration CSS can't express. |
| Routing | **Real routes per nav item (`/`, `/about`, `/work`, `/experience`, `/contact`)** | Superseded 2026-08-25 (was single route with anchors — see [scope.md](scope.md)'s routing decision). Skills and Foundations & Education stay grouped under `/work` and `/experience` respectively rather than getting their own route. Footer moved to the root layout so it renders on every route. |
| SEO | **Next.js Metadata API + static `sitemap.ts`/`robots.ts`** | Built into the App Router, no extra dependency. |
| Accessibility | **Semantic HTML landmarks + Radix primitives only where a real interaction pattern demands one (e.g. the `?` shortcuts dialog)** | Radix (`@radix-ui/react-dialog`) is the one justified dependency beyond styling — building an accessible focus-trapped modal from scratch is exactly the kind of foundational-but-tricky problem not worth reinventing. Everything else (nav, lists, buttons) is plain semantic HTML + Tailwind, no headless-UI dependency needed. |
| Performance | **Static export via Next.js SSG, `next/font` for Geist (self-hosted, no external font request), `next/image` for any project screenshots** | Removes render-blocking third-party font requests; images are lazy-loaded and responsive by default. |
| Deployment | **Cloudflare (Workers, via GitHub integration)** | Superseded 2026-08-25 (was planned as Vercel) — user's actual choice. Auto-deploys from `main` on `github.com/thisislohit/thisislohit`; live temporarily at `thisislohit.pages.dev`, domain `thisislohit.dev` locked in but not yet pointed. |

### Explicitly rejected
- **CMS (Sanity/Contentful/etc.)** — over-engineering for single-maintainer structured content that changes rarely (see [scope.md](scope.md) Out of Scope).
- **Framer Motion / GSAP** — no motion requirement in `design.md` that CSS can't satisfy.
- **State management library (Redux/Zustand)** — there is no non-trivial client state; keyboard-shortcut state is a few `useState`/`useEffect` hooks in one client component.
- **CSS-in-JS (styled-components/emotion)** — Tailwind + CSS variables already gives us the token system for free; adding a second styling paradigm is redundant abstraction.
- **Contact-form backend (Resend/SendGrid/etc.)** — out of scope per [scope.md](scope.md); `mailto:` is sufficient for v1.

## Folder Structure

```
thisislohit/
├── design.md                  # Stitch design source — do not overwrite
├── DESIGN_SYSTEM.md           # implementation-ready tokens/components derived from design.md
├── scope.md
├── architecture.md
├── plan.md
├── tasks.md
├── memory.md
├── CONTRIBUTING.md
├── README.md
├── .cursor/
│   └── rules/
├── public/
│   └── fonts/                 # self-hosted Geist via next/font/local (or next/font/google if licensed there)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # root layout: fonts, metadata defaults, <html>/<body>
│   │   ├── page.tsx           # composes sections in order (Hero → About → Work → Skills → Experience → Contact)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── globals.css        # Tailwind entry + @theme token mapping from DESIGN_SYSTEM.md
│   ├── components/
│   │   ├── ui/                 # generic, content-agnostic primitives (Button, Tag, Divider, Container, Heading, Text, Link, IconButton)
│   │   └── shortcuts/          # KeyboardShortcuts provider + ShortcutsDialog (client components)
│   ├── sections/               # one component per IA section (Hero, About, Work, Skills, Experience, Contact, Footer)
│   │   └── work/
│   │       └── ProjectRow.tsx  # section-specific composed component
│   ├── data/
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   └── social.ts
│   ├── lib/
│   │   └── shortcuts.ts        # shortcut-sequence matching logic (pure function, testable)
│   └── styles/
│       └── tokens.css          # (if not inlined in globals.css) generated 1:1 from DESIGN_SYSTEM.md
```

Rationale for this shape vs. the brief's illustrative structure: it keeps the brief's intent (`components/`, `sections/`, `data/`, `styles/`, `lib/`) but nests everything under `src/app` per Next.js App Router convention, and splits `components/ui` (generic) from `sections/` (page-specific) so reusable primitives never accidentally gain page-specific logic — that split is what keeps the component inventory in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) actually reusable rather than a pile of one-off section components.

## Key Architectural Principles
- **No component beyond what the design requires.** The component inventory in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) is derived from what `design.md` actually specifies (Button, Tag, list rows, input styling for the eventual `?` search if ever needed) — not from the brief's illustrative "potential components" list wholesale.
- **Content is data, UI is presentation.** No project title, skill name, or experience bullet is ever hardcoded inside a section component.
- **Server-first.** Client Components are the exception, declared only where interactivity is unavoidable (keyboard shortcuts, mobile nav toggle, shortcuts dialog).
- **Tokens are the only source of visual values.** No component may use a raw hex, px, or arbitrary Tailwind bracket value that isn't already a design token — enforced via [.cursor/rules](.cursor/rules/).
