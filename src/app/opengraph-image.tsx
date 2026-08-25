import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Reuses the real, already-approved Hero copy and tokens directly, rather
// than inventing separate marketing imagery — the OG preview should match
// what the page itself actually says (design.md's "no gradients, no
// decorative UI" rule applies here too).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f7f7f3",
          color: "#111111",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(17,17,17,0.7)",
            marginBottom: 28,
          }}
        >
          Lohit Satya Sai Kuntamukkala
        </div>
        <div
          style={{
            fontSize: 128,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}
        >
          Flutter Developer.
        </div>
      </div>
    ),
    { ...size },
  );
}
