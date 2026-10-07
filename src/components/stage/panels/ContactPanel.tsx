"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, ExternalLink } from "lucide-react";
import { social } from "@/data/social";

// A small Time Door that swings open, then four ways through it.
export function ContactPanel() {
  const items = [
    ...(social.email ? [{ label: "Email", value: social.email, href: `mailto:${social.email}`, icon: <Mail size={16} /> }] : []),
    ...(social.phone ? [{ label: "Phone", value: social.phone, href: `tel:${social.phone.replace(/\s+/g, "")}`, icon: <Phone size={16} /> }] : []),
    ...social.links.map((l) => ({ label: l.label, value: l.url.replace("https://", ""), href: l.url, icon: <ExternalLink size={16} /> })),
  ];

  return (
    <div className="grid items-center gap-6 sm:grid-cols-[150px_1fr]">
      <div className="relative mx-auto aspect-[3/4] w-32 overflow-hidden rounded-t-[999px] border-4 border-accent-primary bg-[radial-gradient(ellipse_at_50%_60%,#fff1d0_0%,#ffb25e_30%,#ff7a1a_65%,#7a2e00_100%)] shadow-[0_0_40px_-6px_rgba(255,122,26,0.8)] sm:w-full">
        {(["l", "r"] as const).map((s) => (
          <motion.div
            key={s}
            className={`absolute inset-y-0 w-1/2 bg-gradient-to-b from-[#3a2414] to-[#23140a] ${s === "l" ? "left-0 border-r" : "right-0 border-l"} border-ink`}
            initial={{ x: 0 }}
            animate={{ x: s === "l" ? "-96%" : "96%" }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-2 border border-accent-primary/30" />
          </motion.div>
        ))}
      </div>

      <ul className="flex flex-col gap-2.5">
        {items.map((it, i) => (
          <motion.li key={it.label} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 140, damping: 18 }}>
            <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer noopener" data-cursor="TRANSMIT" className="group flex items-center gap-3 border border-border p-3 transition-colors hover:border-accent-primary hover:bg-accent-primary/5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-accent-primary/50 text-accent-primary">{it.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-text-muted">{it.label}</span>
                <span className="block truncate font-display text-base font-extrabold uppercase text-text-primary group-hover:text-accent-primary">{it.value}</span>
              </span>
              <ArrowUpRight size={16} className="shrink-0 text-accent-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.li>
        ))}
        <li className="flex items-center gap-2 pt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
          <MapPin size={12} className="text-accent-primary" /> Hyderabad · Earth-616
        </li>
      </ul>
    </div>
  );
}
