import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { social } from "@/data/social";
import { ArrowUpRight } from "lucide-react";

// scope.md IA §07 "Contact": single, deliberate closing statement +
// email/social — no contact form (mailto: only). Data is real
// (src/data/social.ts). Redesigned to match the pulled Stitch contact design
// (stitch-design/html/contact-closing.html) exactly, including the
// asymmetric display heading, CTA layout, custom list row hovers,
// lime green availability badge, large "Built for Real Users" display heading,
// and the hallow stroked "TALK." watermark.
export default function Contact() {
  const contactItems = [
    ...(social.email
      ? [{ label: "Email", value: social.email, href: `mailto:${social.email}` }]
      : []),
    ...(social.phone
      ? [{ label: "Phone", value: social.phone, href: `tel:${social.phone.replace(/\s+/g, "")}` }]
      : []),
    ...social.links.map((link) => ({
      label: link.label,
      value: link.label.toUpperCase(),
      href: link.url,
    })),
    { label: "Location", value: "Hyderabad, Telangana, India" },
  ];

  return (
    <Section id="contact" aria-label="Contact" className="relative pb-stack-md">
      {/* Label */}
      <div className="col-span-4 lg:col-span-12 mb-stack-md">
        <Text variant="metadata" as="span">
          07 — Contact
        </Text>
      </div>

      {/* Main Heading (Asymmetric Display) */}
      <div className="col-span-4 lg:col-span-9 lg:col-start-2 mb-stack-lg">
        <Heading level="display-lg" as="h1" className="uppercase leading-none">
          Let&apos;s Build <br />
          <span className="block ml-0 lg:ml-[10%]">Something</span>
          <span className="block text-right pr-0 lg:pr-[15%]">Useful.</span>
        </Heading>
      </div>

      {/* Secondary Statement & Primary CTA */}
      <div className="col-span-4 lg:col-span-12 grid grid-cols-4 lg:grid-cols-12 gap-gutter mb-stack-xl items-end">
        <div className="col-span-4 lg:col-span-5 lg:col-start-2 mb-8 lg:mb-0">
          <Text variant="body-lg" className="text-text-secondary max-w-md">
            Have a mobile product, a difficult integration, or a system that needs to work better? Let&apos;s talk.
          </Text>
        </div>
        <div className="col-span-4 lg:col-span-5 lg:col-start-8">
          {social.email && (
            <Button
              href={`mailto:${social.email}`}
              variant="primary"
              className="w-full lg:w-auto font-metadata text-metadata !py-5 !px-8 uppercase tracking-widest flex items-center justify-center gap-2 group"
            >
              Start a Conversation
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="arrow-icon transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Button>
          )}
        </div>
      </div>

      {/* Contact Index & Metadata */}
      <div className="col-span-4 lg:col-span-12 grid grid-cols-4 lg:grid-cols-12 gap-gutter mb-stack-xl relative z-10">
        {/* Contact List */}
        <div className="col-span-4 lg:col-span-7 lg:col-start-2">
          <ul className="border-t border-border">
            {contactItems.map((item) => {
              const hasLink = !!item.href;
              const rowContent = (
                <div
                  className={`border-b border-border py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors duration-base ${
                    hasLink ? "group-hover:bg-text-primary/5 px-4 -mx-4" : ""
                  }`}
                >
                  <span className="font-metadata text-metadata text-text-secondary w-32 shrink-0">
                    {item.label.toUpperCase()}
                  </span>
                  {hasLink ? (
                    <span className="font-body-md text-body-md text-text-primary group-hover:text-accent-primary-text transition-colors flex-1 flex items-center justify-between w-full">
                      {item.value}
                      <ArrowUpRight
                        size={20}
                        strokeWidth={2}
                        className="arrow-icon text-text-secondary group-hover:text-accent-primary-text transition-all duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  ) : (
                    <span className="font-body-md text-body-md text-text-primary flex-1">
                      {item.value}
                    </span>
                  )}
                </div>
              );

              if (hasLink) {
                return (
                  <li key={item.label}>
                    <a href={item.href} className="block group">
                      {rowContent}
                    </a>
                  </li>
                );
              }

              return <li key={item.label}>{rowContent}</li>;
            })}
          </ul>
        </div>

        {/* Metadata / Availability Badge */}
        <div className="col-span-4 lg:col-span-3 lg:col-start-10 flex flex-col justify-end mt-8 lg:mt-0">
          <div className="border border-accent-utility p-4 inline-block self-start mb-6 bg-accent-utility">
            <span className="font-metadata text-metadata text-on-accent-utility uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-on-accent-utility animate-pulse"></span>
              Available for Work
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Oversized Watermark Word */}
      <div
        aria-hidden="true"
        className="watermark-text pointer-events-none absolute -bottom-20 -right-10 lg:-right-20 select-none text-[120px] lg:text-[250px] font-display-xl font-black uppercase leading-none tracking-display-xl z-0 overflow-hidden"
      >
        Talk.
      </div>

      {/* Final Statement before Footer */}
      <div className="col-span-4 lg:col-span-12 mt-stack-xl mb-stack-lg border-t border-border pt-stack-md relative z-10">
        <Heading level="display-lg" as="h2" className="text-center uppercase leading-none">
          Built for Real Users.
        </Heading>
      </div>
    </Section>
  );
}
