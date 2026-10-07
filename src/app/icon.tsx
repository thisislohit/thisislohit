import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// TVA-style seal: orange ring and hourglass on the site's burnt-umber
// background — the same mark as the TVAEmblem in the nav, simplified so it
// stays legible at favicon size.
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
          background: "#120a05",
          borderRadius: 32,
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#ff7a1a" strokeWidth="5" />
          <path d="M20 17 H44 L35 32 L44 47 H20 L29 32 Z" fill="none" stroke="#ff7a1a" strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M26 44 H38 L32 37 Z" fill="#e8b84a" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
