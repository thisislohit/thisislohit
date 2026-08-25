import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// No Stitch-provided icon/logo asset exists — confirmed during the Stitch
// implementation audit (only 2 decorative stock photos in the whole
// project, no logomark). This reuses the site's own established brand
// wordmark ("thisislohit", already the nav/footer wordmark) and its real
// tokens directly — near-black on warm white, 0px radius, no gradient —
// rather than inventing new imagery unrelated to the site.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f7f3",
          color: "#111111",
          fontSize: 22,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        t
      </div>
    ),
    { ...size },
  );
}
