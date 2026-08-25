import type { MetadataRoute } from "next";

// architecture.md: static robots.ts, no extra dependency.
//
// Domain locked in as thisislohit.dev (2026-08-25), not yet pointed — using
// the temporary Cloudflare Pages URL until then, matching layout.tsx's
// metadataBase. Swap to https://thisislohit.dev once the real domain is live.
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://thisislohit.pages.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
