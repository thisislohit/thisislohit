import type { MetadataRoute } from "next";

// architecture.md: static sitemap.ts, no extra dependency. As of
// 2026-08-25 the site is split into real routes instead of one page with
// anchors (src/app/{about,work,experience,contact}/page.tsx) — one entry
// per route.
//
// Domain locked in as thisislohit.dev (2026-08-25), not yet pointed — using
// the temporary Cloudflare Pages URL until then, matching layout.tsx's
// metadataBase. Swap to https://thisislohit.dev once the real domain is live.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thisislohit.pages.dev";
  const routes = ["", "/about", "/work", "/experience", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
