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
// "motion should be functional" rule). Pure CSS (`group`/`group-hover`),
// no JS — stays a Server Component.
//
// Hover color, third iteration (2026-08-25): tried (1) recoloring the
// whole icon blue, (2) keeping the L black and only coloring the
// animated reveal blue. User then asked for a full invert instead — a
// blue badge appears behind the icon and every dot (L included) turns
// white on top of it, like a color-invert filter. The badge uses plain
// `hover:` (not `group-hover:`) since it's reacting to its own hover,
// not a descendant's — `group-hover:` only matches descendants of the
// `.group` element, so putting it on the `.group` element itself is a
// no-op (found via computed-style verification, not assumption). The
// icon color still uses `group-hover:text-on-primary` since the <svg>
// is a real descendant of the wrapping `.group` span.
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
    <span
      className={`group inline-flex items-center justify-center rounded-sm p-1.5 transition-colors duration-base hover:bg-accent-primary-text ${className}`.trim()}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 56 57"
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-text-primary transition-colors duration-base group-hover:text-on-primary"
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
    </span>
  );
}
