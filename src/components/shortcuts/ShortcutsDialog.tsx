"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { Text } from "@/components/ui/Text";

interface ShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Structural content straight from scope.md's already-approved keyboard
// shortcut spec (§Functional Requirements) — not invented here.
const SHORTCUTS: { keys: string[]; description: string }[] = [
  { keys: ["G", "H"], description: "Go to Home" },
  { keys: ["G", "P"], description: "Go to Work" },
  { keys: ["G", "S"], description: "Go to Skills" },
  { keys: ["G", "C"], description: "Go to Contact" },
  { keys: ["?"], description: "Open this dialog" },
  { keys: ["Esc"], description: "Close this dialog" },
];

// architecture.md: "@radix-ui/react-dialog is the one justified dependency
// beyond styling — building an accessible focus-trapped modal from scratch
// is exactly the kind of foundational-but-tricky problem not worth
// reinventing." Controlled (open/onOpenChange), not self-triggering — the
// Phase 9 keyboard-shortcut provider owns this state, since it needs to
// open the dialog from both the "?" key and a visible click affordance
// (scope.md's discoverability requirement), and Escape-to-close is Radix
// Dialog's built-in behavior, not something this component reimplements.
//
// Styled per design.md's flat/no-shadow rule: separation from the page
// comes from a border (--color-border) and a solid scrim behind it, never
// a shadow. Radius-none throughout, matching "0px default for major
// components."
export function ShortcutsDialog({ open, onOpenChange }: ShortcutsDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-overlay bg-text-primary/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-dialog w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-none border border-border bg-background p-6">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title asChild>
              <Text variant="body-lg" as="span">
                Keyboard shortcuts
              </Text>
            </Dialog.Title>
            <Dialog.Close asChild>
              <IconButton icon={<X size={20} strokeWidth={2} />} aria-label="Close shortcuts dialog" />
            </Dialog.Close>
          </div>

          <ul className="flex flex-col divide-y divide-border">
            {SHORTCUTS.map((shortcut) => (
              <li key={shortcut.description} className="flex items-center justify-between py-3">
                <Text variant="body-md" as="span">
                  {shortcut.description}
                </Text>
                <div className="flex gap-1">
                  {shortcut.keys.map((key) => (
                    <kbd
                      key={key}
                      className="inline-flex items-center justify-center min-w-6 px-2 py-1 rounded-sm border border-border font-metadata text-metadata uppercase text-text-secondary"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
