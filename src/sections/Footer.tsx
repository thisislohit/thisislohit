import NextLink from "next/link";
import { ArrowUp } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SocialLink } from "@/components/ui/SocialLink";
import { TVAEmblem } from "@/components/tva/TVAEmblem";
import { PruneButton } from "@/components/tva/PruneButton";
import { social } from "@/data/social";

export default function Footer() {
  const socialLinks = [
    ...(social.email ? [{ label: "Email", href: `mailto:${social.email}` }] : []),
    ...(social.phone ? [{ label: "Phone", href: `tel:${social.phone.replace(/\s+/g, "")}` }] : []),
    ...social.links.map((link) => ({ label: link.label, href: link.url })),
  ];

  return (
    <Section as="footer" className="relative z-10 mt-stack-lg border-t-2 border-accent-primary bg-surface/70 backdrop-blur-sm">
      <div className="col-span-4 flex flex-col gap-8 py-10 lg:col-span-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="flex items-center gap-5">
            <TVAEmblem size={72} className="text-accent-primary" />
            <div>
              <div className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-primary sm:text-4xl">
                All time. <span className="text-accent-primary">All the time.</span>
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
                Variant Lohit · Case 616-L · Sacred Timeline: stable
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <PruneButton />
            <NextLink
              href="#hero"
              data-cursor="TOP"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent-primary hover:text-accent-utility"
            >
              Back to origin <ArrowUp size={14} />
            </NextLink>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {socialLinks.map((l) => (
              <li key={l.label}>
                <SocialLink label={l.label} href={l.href} />
              </li>
            ))}
          </ul>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
            © {new Date().getFullYear()} Lohit Satya Sai Kuntamukkala · A fan tribute to Marvel&apos;s Loki — not affiliated with Marvel or Disney
          </p>
        </div>
      </div>
    </Section>
  );
}
