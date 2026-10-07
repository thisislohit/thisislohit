const LINES = [
  "THIS IS A TVA PUBLIC SERVICE ANNOUNCEMENT",
  "VARIANT LOHIT IS FREE TO SHIP",
  "THE SACRED TIMELINE REMAINS STABLE",
  "NO DEMOS. NO MAYBES.",
  "ZERO PRUNING REQUIRED",
  "FLUTTER · STRIPE · OFFLINE-FIRST",
  "ALL TIME. ALL THE TIME.",
];

export function Marquee({ className = "" }: { className?: string }) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {LINES.map((l) => (
        <span key={l} className="flex items-center gap-10 whitespace-nowrap">
          <span>{l}</span>
          <span aria-hidden="true">◆</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="animate-ticker flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
