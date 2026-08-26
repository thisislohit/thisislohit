interface LogoProps {
  className?: string;
}

// Icon-only mark reconstructed from the user-supplied logo SVG
// (2026-08-25) — an "L" formed by a 5-dot filled column + row inside a
// 5x5 dot grid, the rest of the grid left as a faint outline. Originally
// paired with a "thisislohit." / "Flutter Developer" text lockup rebuilt
// in this site's own Geist/token colors, but the user found the combined
// mark didn't look good and asked to drop the text, keeping just the dot
// grid — screen readers still get the site name via the wrapping <Link>'s
// aria-label in Navigation.tsx, not from this component.
//
// Hover animation (2026-08-25, user requested "add an animation for this
// logo"): the faint outline dots fill in on hover, staggered into a
// diagonal wave spreading away from the L — functional, not just
// decorative, since this icon is always a link back to "/" (design.md's
// "motion should be functional" rule: it signals "this is clickable" the
// same way Button's hover fill or ListRow's arrow-translate do elsewhere
// on the site). Pure CSS (`group`/`group-hover`), no JS — stays a Server
// Component. `prefers-reduced-motion` is handled by the existing global
// rule in globals.css (collapses the transition to ~instant), not a
// second guard here.
//
// Hover color (2026-08-25, user asked for "blue or something, or invert"):
// the whole icon (existing L dots + newly-filled ones) shifts to
// `accent-primary-text` on hover, not a new one-off color — the same
// AA-safe blue already used for Nav's active link, Link's hover state,
// and Button's hover fill, so the icon's hover reads as consistent with
// every other interactive element on the site rather than introducing a
// fourth treatment. Both circle groups use `fill="currentColor"`, so
// changing the <svg>'s own `color` recolors all of them at once.
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
  const outlined: [number, number][] = [16, 28, 40, 52]
    .flatMap((x) => [4.5, 16.5, 28.5, 40.5].map((y): [number, number] => [x, y]))
    .sort((a, b) => a[0] + a[1] - (b[0] + b[1]));

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 56 57"
      fill="none"
      aria-hidden="true"
      className={`group shrink-0 text-text-primary transition-colors duration-base hover:text-accent-primary-text ${className}`.trim()}
    >
      {outlined.map(([cx, cy], index) => (
        <circle
          key={`o-${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="4"
          stroke="currentColor"
          strokeOpacity="0.15"
          fill="currentColor"
          className="logo-dot"
          style={{ transitionDelay: `${index * 25}ms` }}
        />
      ))}
      {filled.map(([cx, cy]) => (
        <circle key={`f-${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" />
      ))}
    </svg>
  );
}
