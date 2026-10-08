// Original TVA-style seal built from the shared sprite (see SvgSprite).
// The ring turns via a CSS transform on its own layer — no JS per frame, and
// the artwork is rasterised once, not once per rotation step.
export function TVAEmblem({ size = 120, className = "" }: { size?: number; className?: string }) {
  const box = { width: size, height: size };
  return (
    <span className={`relative inline-block shrink-0 ${className}`} style={box} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="tva-ring-spin absolute inset-0" {...box}>
        <use href="#tva-ring" />
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0" {...box}>
        <use href="#tva-hub" />
      </svg>
    </span>
  );
}
