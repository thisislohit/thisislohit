// One shared SVG sprite, rendered once in the layout. Every seal on the site
// (nav, footer, boot, dossier) is a <use> of these symbols instead of its own
// 60-tick SVG tree, so the browser parses, styles and rasterises the artwork
// a single time.
export function SvgSprite() {
  const ticks = Array.from({ length: 60 }, (_, i) => i);
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <path id="tva-ring-text" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />

        {/* outer chronometer ring: ticks + orbiting wordmark (rotated by CSS) */}
        <g id="tva-ring">
          <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="2" />
          {ticks.map((i) => (
            <line
              key={i}
              x1="100"
              y1="8"
              x2="100"
              y2={i % 5 === 0 ? 20 : 14}
              stroke="currentColor"
              strokeWidth={i % 5 === 0 ? 2.4 : 1}
              transform={`rotate(${i * 6} 100 100)`}
            />
          ))}
          <text fontSize="11" fontWeight="800" letterSpacing="4.2" fill="currentColor" fontFamily="var(--font-archivo), sans-serif">
            <textPath href="#tva-ring-text">TIME VARIANCE AUTHORITY · ALL TIME. ALL THE TIME. ·</textPath>
          </text>
        </g>

        {/* static hub: inner ring + hourglass */}
        <g id="tva-hub">
          <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M78 74 H122 L104 100 L122 126 H78 L96 100 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M88 118 H112 L100 106 Z" fill="currentColor" />
        </g>
      </defs>
    </svg>
  );
}
