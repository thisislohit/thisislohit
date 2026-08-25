import type { MetadataRoute } from "next";

// architecture.md: static sitemap.ts, no extra dependency. Single-route
// site (scope.md: "/" with in-page anchors) — one entry.
//
// Domain locked in as thisislohit.dev (2026-08-25), not yet pointed — using
// the temporary Cloudflare Pages URL until then, matching layout.tsx's
// metadataBase. Swap to https://thisislohit.dev once the real domain is live.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thisislohit.pages.dev";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
