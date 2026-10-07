import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Special_Elite } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import { ShortcutsProvider } from "@/components/shortcuts/ShortcutsProvider";
import Footer from "@/sections/Footer";
import { SmoothScroll } from "@/components/tva/SmoothScroll";
import { TemporalBackdrop } from "@/components/tva/TemporalBackdrop";
import { TVACursor } from "@/components/tva/TVACursor";
import { SacredTimelineRail } from "@/components/tva/SacredTimelineRail";
import { MissMinutes } from "@/components/tva/MissMinutes";
import { BootSequence } from "@/components/tva/BootSequence";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", axes: ["wdth"], display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-plex-mono", display: "swap" });
const specialElite = Special_Elite({ subsets: ["latin"], weight: "400", variable: "--font-special-elite", display: "swap" });

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
const TITLE = "Variant Lohit — TVA Case File | Flutter Developer";
const DESCRIPTION =
  "Time Variance Authority case file: Variant Lohit, a Hyderabad-based Flutter engineer building payments and hospitality software that has to work — no demos, no maybes.";

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

const NAV_LINKS = [
  { label: "Case Files", href: "/#work" },
  { label: "Incident Log", href: "/#experience" },
  { label: "Temporal Loom", href: "/#skills" },
  { label: "Time Door", href: "/#contact" },
];

// Runs before first paint: flags first-visit sessions so the boot overlay
// shows immediately instead of flashing the site underneath it.
const BOOT_FLAG = `try{if(location.pathname==='/'&&!sessionStorage.getItem('tva-booted')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.boot='play'}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} ${specialElite.variable} font-sans h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_FLAG }} />
      </head>
      <body
        suppressHydrationWarning
        className="relative flex min-h-full flex-col overflow-x-hidden bg-background text-text-primary selection:bg-accent-primary selection:text-black"
      >
        <TemporalBackdrop />
        <SmoothScroll />
        <TVACursor />
        <BootSequence />
        <ShortcutsProvider>
          <Navigation links={NAV_LINKS} homeLabel="Lohit // Variant — TVA case file" />
          <main className="relative z-10 flex flex-col">{children}</main>
          <Footer />
          <SacredTimelineRail />
          <MissMinutes />
        </ShortcutsProvider>
      </body>
    </html>
  );
}
