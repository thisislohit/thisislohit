

// Chromatic-aberration glitch driven purely by CSS (see .glitch in globals.css).
export function GlitchText({
  text,
  as: Tag = "span",
  className = "",
}: {
  text: string;
  as?: "span" | "div" | "h1" | "h2" | "p";
  className?: string;
}) {
  return (
    <Tag className={`glitch ${className}`} data-text={text}>
      {text}
    </Tag>
  );
}
