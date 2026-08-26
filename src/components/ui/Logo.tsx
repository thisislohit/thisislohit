interface LogoProps {
  className?: string;
}

// Icon mark reconstructed from the user-supplied logo SVG (2026-08-25) —
// an "L" formed by a 5-dot filled column + row inside a 5x5 dot grid, the
// rest of the grid left as a faint outline. The source SVG baked its own
// colors (light dots for a dark background) and wordmark text as vector
// letterform paths in a different typeface; neither fits this site's
// light background or Geist type system, so only the icon geometry is
// reused here — the wordmark/tagline below render as real text in our
// own tokens (`currentColor`/`text-primary`/`text-secondary`), matching
// the user's request to "change the font style to our standards and
// colors as well".
export function Logo({ className = "" }: LogoProps) {
  const filled: [number, number][] = [
    [4, 4.5],
    [4, 16.5],
    [4, 28.5],
    [4, 40.5],
    [4, 52.5],
    [16, 52.5],
    [28, 52.5],
    [40, 52.5],
    [52, 52.5],
  ];
  const outlined: [number, number][] = [16, 28, 40, 52].flatMap((x) =>
    [4.5, 16.5, 28.5, 40.5].map((y): [number, number] => [x, y]),
  );

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 56 57"
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-text-primary"
      >
        {outlined.map(([cx, cy]) => (
          <circle key={`o-${cx}-${cy}`} cx={cx} cy={cy} r="4" stroke="currentColor" strokeOpacity="0.15" />
        ))}
        {filled.map(([cx, cy]) => (
          <circle key={`f-${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" />
        ))}
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="font-sans text-lg font-headline lowercase tracking-tight text-text-primary">
          thisislohit.
        </span>
        <span className="font-sans text-metadata font-metadata uppercase tracking-metadata text-text-secondary">
          Flutter Developer
        </span>
      </span>
    </span>
  );
}
