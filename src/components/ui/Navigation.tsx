"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Menu, X, CircleHelp } from "lucide-react";
import { IconButton } from "./IconButton";
import { useShortcuts } from "@/components/shortcuts/ShortcutsProvider";
import { TVAEmblem } from "@/components/tva/TVAEmblem";
import { ScrambleText } from "@/components/tva/ScrambleText";
import { SECTIONS, useActiveSection } from "@/lib/useActiveSection";

export interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  links: NavLink[];
  homeHref?: string;
  homeLabel: string;
}

function TVAStandardTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour12: false });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only sync with a browser-only value
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hidden flex-col items-end leading-none xl:flex" aria-label="TVA standard time">
      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted">TVA std time · IST</span>
      <span className="mt-1 font-mono text-sm font-bold tabular-nums text-crt">{now ?? "--:--:--"}</span>
    </div>
  );
}

// TVA header: sealed emblem, scroll-spied section links that decode on hover,
// a live TVA clock, and a Radix-backed full-screen "TemPad" menu on mobile
// (focus trap + restoration come from Radix, not hand-rolled).
export function Navigation({ links, homeHref = "/", homeLabel }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { openDialog } = useShortcuts();
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);

  const isActive = (href: string) =>
    pathname === "/" ? href === `/#${active}` : pathname === href;

  return (
    <nav aria-label="Primary" className="sticky top-0 z-nav border-b border-border bg-background/95">
      <div className="tva-stripes h-[3px] w-full" aria-hidden="true" />
      <div className="flex items-center justify-between gap-4 px-margin-page-mobile py-2.5 md:px-margin-page">
        <Link href={homeHref} aria-label={homeLabel} data-cursor="HOME" className="group flex items-center gap-3">
          <TVAEmblem size={40} className="text-accent-primary transition-transform duration-500 group-hover:rotate-[30deg]" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-black uppercase tracking-tight text-text-primary">
              Lohit <span className="text-accent-primary">{"//"}</span> Variant
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-muted">
              TVA monitored · Earth-616
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          <ul className="flex items-center gap-5 xl:gap-6">
            {links.map((link) => {
              const on = isActive(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    aria-current={on ? "true" : undefined}
                    className={`whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-colors ${
                      on ? "text-accent-primary" : "text-text-secondary hover:text-accent-primary"
                    }`}
                  >
                    <ScrambleText text={link.label} auto={false} />
                  </Link>
                  {on && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent-primary shadow-[0_0_10px_rgba(255,122,26,0.9)]"
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <div className="h-5 w-px bg-border" />
          <TVAStandardTime />
          <IconButton
            icon={<CircleHelp size={18} strokeWidth={2} />}
            aria-label="Open keyboard shortcuts"
            onClick={openDialog}
            className="text-text-muted hover:text-accent-primary"
          />
        </div>

        <div className="lg:hidden">
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <IconButton icon={<Menu size={24} strokeWidth={2} />} aria-label="Open menu" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content className="fixed inset-0 z-[120] flex flex-col bg-background">
                <Dialog.Title className="sr-only">Mobile navigation</Dialog.Title>
                <div className="tva-stripes h-[3px]" aria-hidden="true" />
                <div className="flex items-center justify-between px-margin-page-mobile py-3">
                  <TVAEmblem size={40} className="text-accent-primary" />
                  <Dialog.Close asChild>
                    <IconButton icon={<X size={24} strokeWidth={2} />} aria-label="Close menu" />
                  </Dialog.Close>
                </div>
                <ul className="flex flex-col gap-5 px-margin-page-mobile py-8">
                  {links.map((link, i) => (
                    <motion.li key={link.href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i }}>
                      <Dialog.Close asChild>
                        <Link href={link.href} className="font-display text-4xl font-black uppercase tracking-tight text-text-primary hover:text-accent-primary">
                          <span className="mr-3 font-mono text-xs text-accent-primary">0{i}</span>
                          {link.label}
                        </Link>
                      </Dialog.Close>
                    </motion.li>
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
