// Structural shortcut list straight from scope.md's already-approved spec
// (§Functional Requirements) — not invented here. Actions are bare section
// ids (no leading '#'), matching the real ids in src/sections/*.
export interface ShortcutSequence {
  keys: string[];
  action: string;
}

export const NAVIGATION_SHORTCUTS: ShortcutSequence[] = [
  { keys: ["g", "h"], action: "hero" },
  { keys: ["g", "p"], action: "work" },
  { keys: ["g", "s"], action: "skills" },
  { keys: ["g", "c"], action: "contact" },
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
