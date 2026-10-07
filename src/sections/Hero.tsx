import NextLink from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/tva/Reveal";
import { GlitchText } from "@/components/tva/GlitchText";
import { ScrambleText } from "@/components/tva/ScrambleText";
import { VariantDossier } from "@/components/tva/VariantDossier";
import { CountUp } from "@/components/tva/CountUp";
import { ScrollParallax } from "@/components/tva/ScrollParallax";
import { Marquee } from "@/components/tva/Marquee";

const STATS = [
  { to: 3, suffix: "+", label: "Years in production" },
  { to: 4, suffix: "", label: "Case files on record" },
  { to: 3, suffix: "", label: "Platforms: Android · iOS · Windows" },
  { to: 0, suffix: "", label: "Prunings required" },
];

export default function Hero() {
  return (
    <>
      <Section id="hero" aria-label="Variant file" className="pt-8 lg:pt-14">
        <div className="col-span-4 flex flex-col gap-10 lg:col-span-12">
          {/* bulletin ribbon */}
          <Reveal y={16} className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 font-mono text-[11px] uppercase tracking-[0.2em]">
            <span className="flex items-center gap-3 text-accent-primary">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-primary" />
              </span>
              <ScrambleText text="Nexus event · branch 616 · variant located" />
            </span>
            <span className="text-text-muted">
              Status: <b className="text-crt">Open for production work</b>
            </span>
          </Reveal>

          <div className="grid items-center gap-12 lg:grid-cols-12">
            <ScrollParallax y={[0, -110]} className="flex flex-col gap-7 lg:col-span-7">
              <Reveal delay={0.1} className="font-display text-sm font-black uppercase tracking-[0.5em] text-accent-utility">
                Variant file · Loki-class, but make it Flutter
              </Reveal>

              <h1 className="font-display font-black uppercase leading-[0.8] tracking-[-0.05em]">
                <Reveal variant="slip" delay={0.2} className="block text-[clamp(76px,11.5vw,190px)] text-text-primary glow-text-orange">
                  <GlitchText text="LOHIT" />
                </Reveal>
                <Reveal variant="slip" delay={0.4} className="mt-2 block text-[clamp(22px,3.7vw,58px)] tracking-[-0.03em]">
                  <span className="outline-text">Kuntamukkala</span>
                  <span className="ml-3 inline-block h-[0.16em] w-[0.16em] animate-pulse rounded-full bg-accent-primary align-middle shadow-[0_0_20px_#ff7a1a]" />
                </Reveal>
              </h1>

              <Reveal delay={0.55} className="max-w-xl">
                <p className="font-display text-2xl font-extrabold uppercase leading-tight text-text-primary sm:text-3xl">
                  Flutter Architect <span className="text-accent-primary">&amp;</span> Mobile Engineer
                </p>
                <p className="mt-4 font-mono text-sm leading-relaxed text-text-secondary">
                  The TVA has a file on me: three-plus years architecting payment infrastructure, white-label
                  monorepos and offline-first engines in Flutter. No demos. No maybes. Built for production reality —
                  the one timeline where it actually has to work.
                </p>
              </Reveal>

              <Reveal delay={0.7} className="flex flex-wrap items-center gap-5">
                <NextLink
                  href="#work"
                  data-cursor="OPEN"
                  className="group relative inline-flex items-center gap-2 overflow-hidden bg-accent-primary px-6 py-3.5 font-display text-sm font-black uppercase tracking-[0.18em] text-on-primary shadow-[0_0_30px_-4px_rgba(255,122,26,0.7)] transition-shadow hover:shadow-[0_0_46px_0_rgba(255,122,26,0.9)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-accent-utility transition-transform duration-500 group-hover:translate-x-0" />
                  <span className="relative">Open the case files</span>
                  <ArrowDown size={16} className="relative transition-transform group-hover:translate-y-1" />
                </NextLink>
                <NextLink
                  href="#contact"
                  data-cursor="TRANSMIT"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-primary underline decoration-dotted underline-offset-8 transition-colors hover:text-accent-utility"
                >
                  Report to the Time Door
                  <ArrowUpRight size={15} />
                </NextLink>
              </Reveal>
            </ScrollParallax>

            <ScrollParallax y={[0, 70]} rotate={[0, 4]} fade={false} className="lg:col-span-5">
              <Reveal delay={0.35} y={60} className="w-full">
                <VariantDossier />
              </Reveal>
            </ScrollParallax>
          </div>

          {/* telemetry */}
          <div className="grid grid-cols-2 border-y border-border lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} y={20} className="border-border p-5 odd:border-r lg:border-r lg:last:border-r-0">
                <div className="font-display text-5xl font-black leading-none text-accent-primary sm:text-6xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <div className="-mt-4 border-y-2 border-ink bg-accent-primary py-2.5 font-display text-xs font-black uppercase tracking-[0.3em] text-on-primary">
        <Marquee />
      </div>
    </>
  );
}
