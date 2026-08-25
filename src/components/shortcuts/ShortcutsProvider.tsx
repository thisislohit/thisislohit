"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ShortcutsDialog } from "./ShortcutsDialog";
import { matchShortcut, isSequencePrefix } from "@/lib/shortcuts";

interface ShortcutsContextValue {
  openDialog: () => void;
}

const ShortcutsContext = createContext<ShortcutsContextValue | null>(null);

// Lets any nested component (Navigation's "?" hint) open the dialog
// without prop-drilling a callback down from layout.tsx.
export function useShortcuts() {
  const ctx = useContext(ShortcutsContext);
  if (!ctx) {
    throw new Error("useShortcuts must be used within ShortcutsProvider");
  }
  return ctx;
}

const SEQUENCE_TIMEOUT_MS = 800;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

// architecture.md's third and last named Client Component boundary (after
// the mobile nav toggle and this dialog itself). Implements scope.md's
// keyboard shortcut rules:
// - Two-key sequences (G then a letter, within SEQUENCE_TIMEOUT_MS).
// - Never active while focus is in an input/textarea/select/contenteditable.
// - No mobile/touch effect — this needs no special-casing: touch
//   interactions never dispatch keydown events, so the requirement is
//   satisfied by what a keydown listener already is, not by extra code.
// - Doesn't shadow browser/OS shortcuts — none of G/H/P/S/C/? are used
//   unmodified by browsers.
// - Every shortcut has a visible non-keyboard equivalent: G-H/G-P/G-S/G-C
//   duplicate Navigation's existing link hrefs, "?" duplicates the hint
//   button this provider exposes via context.
export function ShortcutsProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const bufferRef = useRef<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetBuffer = useCallback(() => {
    bufferRef.current = [];
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event.target)) return;

      // "?" opens the dialog directly, independent of the G-sequence buffer.
      if (event.key === "?") {
        event.preventDefault();
        setDialogOpen(true);
        resetBuffer();
        return;
      }

      // Only single printable letters participate in sequences — ignore
      // modifier combos and non-character keys so they can't pollute or
      // silently reset an in-progress buffer.
      if (event.key.length !== 1 || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const key = event.key.toLowerCase();
      const nextBuffer = [...bufferRef.current, key];
      const action = matchShortcut(nextBuffer);

      if (action) {
        event.preventDefault();
        router.push(action);
        resetBuffer();
        return;
      }

      if (isSequencePrefix(nextBuffer)) {
        bufferRef.current = nextBuffer;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(resetBuffer, SEQUENCE_TIMEOUT_MS);
      } else {
        resetBuffer();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      resetBuffer();
    };
  }, [resetBuffer, router]);

  return (
    <ShortcutsContext.Provider value={{ openDialog: () => setDialogOpen(true) }}>
      {children}
      <ShortcutsDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </ShortcutsContext.Provider>
  );
}
