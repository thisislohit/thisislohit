"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, CircleHelp } from "lucide-react";
import { IconButton } from "./IconButton";
import { Logo } from "./Logo";
import { useShortcuts } from "@/components/shortcuts/ShortcutsProvider";

export interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  links: NavLink[];
  homeHref?: string;
  homeLabel: string;
}

// design.md doesn't visually specify Navigation — DESIGN_SYSTEM.md Part 3
// derives it from the IA + shape rules: minimal text links, no pill/box
// background, current section via accent-primary text (not a box), mobile
// as a full-screen overlay. This is one of architecture.md's three named
// Client Component boundaries (mobile nav toggle) — everything else on the
// page stays server-rendered.
//
// The mobile overlay is built on Radix Dialog, not hand-rolled — found
// during the 2026-08-25 QA pass that an earlier hand-rolled version had a
// real bug: the top-bar wordmark/hamburger stayed keyboard-focusable
// underneath the visually-covering overlay (no focus trap, no focus
// restoration on close). architecture.md's own reasoning for depending on
// Radix at all — "building an accessible focus-trapped modal from scratch
// is exactly the kind of foundational-but-tricky problem not worth
// reinventing" — applies here word-for-word, same as it does to
// ShortcutsDialog.
//
// Wordmark replaced with the `Logo` component (2026-08-25, user-supplied
// icon+lockup) — the icon geometry only, rebuilt with this site's own
// Geist/token colors rather than the source SVG's baked dark-background
// palette and vector-path lettering. Nav padding reduced (py-6 → py-3,
// both here and in the mobile sheet) per the user's "smaller header"
// request.

export function Navigation({ links, homeHref = "/", homeLabel }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openDialog } = useShortcuts();

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-nav border-b border-border-subtle bg-background/80 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-margin-page-mobile md:px-margin-page py-3">
        <Link href={homeHref} aria-label={homeLabel}>
          <Logo />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={
                      "font-sans text-metadata font-metadata uppercase tracking-metadata transition-colors duration-fast " +
                      (isActive
                        ? // Persistent, not just a hover flash — stays
                          // visible for as long as that section is
                          // scrolled to, so it needs the AA-safe text
                          // color (see globals.css accent-primary-text),
                          // not the literal design.md blue. Bold +
                          // underline (border, not text-decoration) per
                          // the updated nav design, 2026-08-25.
                          "border-b-2 border-accent-primary-text font-bold text-accent-primary-text"
                        : "text-text-primary hover:text-accent-primary")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Visible discoverability affordance for the "?" shortcut
              (scope.md) — every keyboard shortcut has a non-keyboard
              equivalent; this is "?"'s. Desktop-only, matching the
              shortcut system itself being desktop-only. */}
          <IconButton
            icon={<CircleHelp size={20} strokeWidth={2} />}
            aria-label="Open keyboard shortcuts"
            onClick={openDialog}
          />
        </div>

        <div className="lg:hidden">
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <IconButton icon={<Menu size={24} strokeWidth={2} />} aria-label="Open menu" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content className="fixed inset-0 z-nav bg-background flex flex-col">
                <Dialog.Title className="sr-only">Mobile navigation</Dialog.Title>
                <div className="flex items-center justify-between px-margin-page-mobile py-3">
                  <Logo />
                  <Dialog.Close asChild>
                    <IconButton icon={<X size={24} strokeWidth={2} />} aria-label="Close menu" />
                  </Dialog.Close>
                </div>
                <ul className="flex flex-col gap-6 px-margin-page-mobile py-6">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Dialog.Close asChild>
                        <Link
                          href={link.href}
                          className="text-headline-lg-mobile font-headline tracking-headline-lg-mobile text-text-primary"
                        >
                          {link.label}
                        </Link>
                      </Dialog.Close>
                    </li>
                  ))}
                </ul>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </nav>
  );
}
