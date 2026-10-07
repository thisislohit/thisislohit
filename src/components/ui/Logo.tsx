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
// Hover treatment, fifth iteration (2026-08-25): tried (1) recoloring
// the whole icon blue, (2) coloring only the reveal blue, (3) a blue
// badge with a full white invert, (4) black fill-in with the L punched
// out white. None of those landed, and the user had no further specific
// direction ("i don't know do something"), so settled on the simplest,
// most restrained option — matching design.md's flat/functional-not-
// decorative bias rather than trying another elaborate color trick: the
// grid dots fade in to a single solid color (text-primary, same as the
// L) with the diagonal stagger, nothing inverts or recolors.
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
      className={`group shrink-0 text-text-primary ${className}`.trim()}
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
