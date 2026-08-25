// Structural shortcut list straight from scope.md's already-approved spec
// (§Functional Requirements) — not invented here. Actions are real routes
// as of 2026-08-25's move from one page with anchors to separate pages
// (src/app/{about,work,experience,contact}/page.tsx). "g s" targets
// Skills's in-page id on the /work route, matching its scroll-only status
// on the old layout.
export interface ShortcutSequence {
  keys: string[];
  action: string;
}

export const NAVIGATION_SHORTCUTS: ShortcutSequence[] = [
  { keys: ["g", "h"], action: "/" },
  { keys: ["g", "p"], action: "/work" },
  { keys: ["g", "s"], action: "/work#skills" },
  { keys: ["g", "c"], action: "/contact" },
];

// Pure, DOM/timer-free matching so it's directly testable — the provider
// (ShortcutsProvider.tsx) owns all the stateful concerns (the key buffer,
// its reset timeout, ignoring typing targets); this only ever answers
// "given these keys pressed in order, what should happen."

// Returns the matched action for a complete key sequence, or null.
export function matchShortcut(buffer: string[]): string | null {
  const match = NAVIGATION_SHORTCUTS.find(
    (seq) => seq.keys.length === buffer.length && seq.keys.every((k, i) => k === buffer[i]),
  );
  return match ? match.action : null;
}

// True if the buffer is a valid, still-incomplete prefix of some sequence
// (e.g. ["g"] is a prefix of ["g","h"]) — tells the provider whether to
// keep waiting for the next key or reset immediately.
export function isSequencePrefix(buffer: string[]): boolean {
  return NAVIGATION_SHORTCUTS.some(
    (seq) =>
      seq.keys.length > buffer.length && seq.keys.slice(0, buffer.length).every((k, i) => k === buffer[i]),
  );
}
