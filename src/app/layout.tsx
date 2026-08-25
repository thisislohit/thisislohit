import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import { ShortcutsProvider } from "@/components/shortcuts/ShortcutsProvider";
import Footer from "@/sections/Footer";

// design.md specifies a single family (Geist) for both display and body —
// no separate mono/serif. next/font self-hosts at build time, satisfying
// architecture.md's "no external font request" performance rule.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

// Title/description reuse Hero's real, already-approved copy (src/sections/Hero.tsx)
// rather than separate marketing copy — nothing here is invented.
// icon.tsx/opengraph-image.tsx (App Router file convention, picked up
// automatically for both OG and Twitter cards) are built from the same
// real content + tokens.
//
// Domain locked in as thisislohit.dev (2026-08-25), not yet pointed —
// temporarily deployed on Cloudflare Pages' thisislohit.pages.dev, so
// metadataBase uses that for now (OG image URLs must resolve to wherever
// the site is actually live). Swap to https://thisislohit.dev the moment
// the real domain is pointed at the deployment. sitemap.ts/robots.ts have
// the same temp-then-swap TODO.
const SITE_URL = "https://thisislohit.pages.dev";
const TITLE = "thisislohit — Flutter Developer";
const DESCRIPTION =
  "Hyderabad-based, building payments and hospitality software that has to work — no demos, no maybes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Structural nav labels/routes, not user content — matches the link set
// Stitch's own generated screens consistently used across every pulled
// reference (stitch-design/html/*.html: "Work | Experience | About |
// Contact"). As of 2026-08-25 these are real routes, not same-page anchors
// — see src/app/{about,work,experience,contact}/page.tsx. Skills/Foundations
// are reachable within Work/Experience respectively, same as they were
// scroll-only (no top-nav entry) on the old single-page layout. Resume is
// intentionally omitted until a real resume link exists (tasks.md "Content
// Needed From User").
const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      {/* overflow-x-hidden: required for Hero's intentional edge-bleed on
          the display name (negative margin pushes it past the viewport
          edge on purpose, per design.md's "allowed to clip" rule) — without
          this the bleed would create a horizontal scrollbar instead of
          clipping. */}
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ShortcutsProvider>
          <Navigation links={NAV_LINKS} homeLabel="thisislohit" />
          <main className="flex flex-col gap-stack-xl">{children}</main>
          <Footer />
        </ShortcutsProvider>
      </body>
    </html>
  );
}
