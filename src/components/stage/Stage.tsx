"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, ExternalLink, X, MousePointerClick } from "lucide-react";
import { GlitchText } from "@/components/tva/GlitchText";
import { ScrambleText } from "@/components/tva/ScrambleText";
import { PruneButton, PRUNE_EVENT } from "@/components/tva/PruneButton";
import { social } from "@/data/social";
import { FilePanel } from "./panels/FilePanel";
import { WorkPanel } from "./panels/WorkPanel";
import { ExperiencePanel } from "./panels/ExperiencePanel";
import { SkillsPanel } from "./panels/SkillsPanel";
import { ContactPanel } from "./panels/ContactPanel";

export type PanelId = "file" | "work" | "experience" | "skills" | "contact";

const NODES: { id: PanelId; n: string; label: string; hint: string }[] = [
  { id: "file", n: "00", label: "Variant File", hint: "who I am" },
  { id: "work", n: "01", label: "Case Files", hint: "projects" },
  { id: "experience", n: "02", label: "Incident Log", hint: "experience" },
  { id: "skills", n: "03", label: "Temporal Loom", hint: "skills" },
  { id: "contact", n: "04", label: "Time Door", hint: "contact" },
];

const TITLES: Record<PanelId, string> = {
  file: "Variant File",
  work: "Case Files",
  experience: "Incident Log",
  skills: "Temporal Loom",
  contact: "The Time Door",
};

const isPanel = (v: string): v is PanelId => NODES.some((n) => n.id === v);
const fromHash = (): PanelId | null => {
  const h = window.location.hash.replace("#", "");
  return isPanel(h) ? h : null;
};

// The home screen. No scrolling: the living Sacred Timeline fills the view
// and five nodes ride its ribbon. Selecting one dives the camera toward it
// (the backdrop's "warp") and opens a compact TVA card with just the
// essentials; closing it pulls back out.
export function Stage() {
  const [open, setOpen] = useState<PanelId | null>(null);
  const nodeEls = useRef<(HTMLButtonElement | null)[]>([]);
  const pos = useRef<{ x: number; y: number }[]>([]);
  const [ready, setReady] = useState(false);
  // where the card flies out of / back into: the selected node, relative to screen centre
  const [from, setFrom] = useState({ x: 0, y: 0 });

  // Tell the backdrop we're on the stage, and pin nodes to the ribbon.
  useEffect(() => {
    document.documentElement.dataset.stage = "1";
    let first = true;
    const onNodes = (e: Event) => {
      const pts = (e as CustomEvent<{ x: number; y: number }[]>).detail;
      pos.current = pts;
      pts.forEach((p, i) => {
        const el = nodeEls.current[i];
        if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      });
      if (first) {
        first = false;
        setReady(true);
      }
    };
    window.addEventListener("tva:nodes", onNodes);
    return () => {
      delete document.documentElement.dataset.stage;
      window.removeEventListener("tva:nodes", onNodes);
    };
  }, []);

  const apply = useCallback((id: PanelId | null) => {
    setOpen(id);
    window.dispatchEvent(new CustomEvent("tva:section", { detail: id ?? "hero" }));
    const i = id ? NODES.findIndex((n) => n.id === id) : -1;
    const p = pos.current[i] ?? { x: window.innerWidth / 2, y: window.innerHeight * 0.6 };
    window.dispatchEvent(new CustomEvent("tva:warp", { detail: { on: id !== null, x: p.x, y: p.y } }));
    if (id) setFrom({ x: p.x - window.innerWidth / 2, y: p.y - window.innerHeight / 2 });
  }, []);

  // Open / switch / close, keeping the URL hash and the back button honest.
  const go = useCallback(
    (id: PanelId | null) => {
      if (id) {
        if (window.location.hash === `#${id}`) return apply(id);
        const method = fromHash() ? "replaceState" : "pushState";
        history[method]({ tva: 1 }, "", `#${id}`);
        apply(id);
      } else if (history.state?.tva) {
        history.back(); // popstate → apply(null)
      } else {
        history.replaceState(null, "", window.location.pathname);
        apply(null);
      }
    },
    [apply],
  );

  useEffect(() => {
    // deep link (/#work) or arriving from another page
    const initial = fromHash();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL hash is browser-only
    if (initial) apply(initial);
    const onPop = () => apply(fromHash());
    // nav links like /#work open panels instead of scrolling
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      const href = a?.getAttribute("href") ?? "";
      if (!href.startsWith("/#") && !href.startsWith("#")) return;
      const id = href.slice(href.indexOf("#") + 1);
      if (!isPanel(id)) return;
      e.preventDefault();
      e.stopPropagation();
      go(id);
    };
    const onPrune = () => apply(null);
    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick, true);
    window.addEventListener(PRUNE_EVENT, onPrune);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(PRUNE_EVENT, onPrune);
    };
  }, [apply, go]);

  return (
    <div className="relative h-[calc(100dvh-65px)] min-h-[520px] overflow-hidden">
      {/* ——— hero copy: kept deliberately small ——— */}
      <div className="prune-block pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col gap-3 px-margin-page-mobile pt-6 sm:pt-10 md:px-margin-page">
        <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent-primary sm:text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-primary" />
          </span>
          <ScrambleText text="Variant located · branch 616" />
        </div>
        <h1 className="font-display text-[clamp(64px,11vw,150px)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-text-primary glow-text-orange">
          <GlitchText text="LOHIT" />
        </h1>
        <p className="font-display text-base font-extrabold uppercase tracking-wide text-text-primary sm:text-xl">
          Flutter Architect <span className="text-accent-primary">&amp;</span> Mobile Engineer
        </p>
        <p className="max-w-md font-mono text-xs leading-relaxed text-text-secondary sm:text-sm">
          Payments &amp; hospitality software that has to work. No demos. No maybes.
        </p>
        <div className="pointer-events-auto mt-1 flex flex-wrap items-center gap-2">
          {social.email && (
            <a href={`mailto:${social.email}`} data-cursor="MAIL" className="inline-flex items-center gap-1.5 border border-accent-primary bg-accent-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-on-primary hover:bg-accent-utility">
              <Mail size={13} /> Email
            </a>
          )}
          {social.links.map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noreferrer noopener" data-cursor="OPEN" className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-text-secondary hover:border-accent-primary hover:text-accent-primary">
              {l.label} <ExternalLink size={12} />
            </a>
          ))}
        </div>
      </div>

      {/* ——— nodes riding the Sacred Timeline ——— */}
      <div className="prune-block pointer-events-none fixed inset-0 z-30">
        {NODES.map((node, i) => (
          <button
            key={node.id}
            ref={(el) => {
              nodeEls.current[i] = el;
            }}
            onClick={() => go(node.id)}
            aria-label={`${node.label} — ${node.hint}`}
            data-cursor="DIVE IN"
            className="group pointer-events-auto absolute left-0 top-0 will-change-transform"
            style={{ opacity: ready ? 1 : 0, transition: `opacity 0.8s ${0.2 * i + 0.4}s` }}
          >
            <span className="absolute -left-6 -top-6 flex h-12 w-12 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full border border-accent-primary opacity-40" style={{ animationDuration: `${2.4 + i * 0.3}s` }} />
              <span className="absolute h-9 w-9 rounded-full border-2 border-accent-primary bg-background/60 transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125" style={{ boxShadow: "0 0 22px 3px rgba(255,122,26,0.75), inset 0 0 12px rgba(255,122,26,0.5)" }} />
              <span className="relative font-mono text-[11px] font-black text-accent-utility">{node.n}</span>
            </span>
            <span className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center ${i % 2 ? "top-9" : "-top-[4.4rem]"}`}>
              <span className="hidden font-display text-sm font-black uppercase tracking-[0.12em] text-text-primary transition-colors group-hover:text-accent-primary sm:block">
                {node.label}
              </span>
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted sm:block">{node.hint}</span>
            </span>
          </button>
        ))}
      </div>

      {/* ——— bottom bar ——— */}
      <div className="prune-block absolute inset-x-0 bottom-3 z-10 flex flex-col items-center gap-3 px-4 sm:bottom-5">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
          <MousePointerClick size={13} className="text-accent-primary" /> Select a node on the timeline
        </div>
        <PruneButton />
      </div>

      {/* ——— the card that opens ——— */}
      <Dialog.Root open={open !== null} onOpenChange={(v) => !v && go(null)}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[110] bg-[radial-gradient(ellipse_at_center,rgba(18,10,5,0.35),rgba(10,5,2,0.85))]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </Dialog.Overlay>
              <div className="pointer-events-none fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6">
                <Dialog.Content asChild forceMount aria-describedby={undefined}>
                  <motion.div
                    key={open}
                    initial={{ opacity: 0, scale: 0.15, x: from.x, y: from.y, clipPath: "inset(40% 40% 40% 40%)" }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0, scale: 0.15, x: from.x, y: from.y, clipPath: "inset(40% 40% 40% 40%)" }}
                    transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
                    className="tva-panel pointer-events-auto relative flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-2xl border-accent-primary/50 sm:max-h-[80dvh] sm:max-w-[820px] sm:rounded-none"
                  >
                    <div className="tva-stripes h-[3px] w-full shrink-0" aria-hidden="true" />
                    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-3">
                      <Dialog.Title className="flex items-center gap-3 font-display text-lg font-black uppercase tracking-tight text-text-primary">
                        <span className="bg-accent-primary px-2 py-0.5 font-mono text-[11px] text-on-primary">
                          {NODES.find((n) => n.id === open)?.n}
                        </span>
                        {TITLES[open]}
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button aria-label="Close and return to the timeline" data-cursor="CLOSE" className="p-1.5 text-text-muted hover:text-accent-primary">
                          <X size={20} />
                        </button>
                      </Dialog.Close>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6" data-lenis-prevent>
                      {open === "file" && <FilePanel />}
                      {open === "work" && <WorkPanel />}
                      {open === "experience" && <ExperiencePanel />}
                      {open === "skills" && <SkillsPanel />}
                      {open === "contact" && <ContactPanel />}
                    </div>
                  </motion.div>
                </Dialog.Content>
              </div>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  );
}
