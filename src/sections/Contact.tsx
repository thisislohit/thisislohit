import { Mail, Phone, MapPin, Radio } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/tva/SectionHeader";
import { Transmissions, type Transmission } from "@/components/tva/Transmissions";
import { Reveal } from "@/components/tva/Reveal";
import { social } from "@/data/social";

export default function Contact() {
  const items: Transmission[] = [
    ...(social.email
      ? [{ label: "Email transmission", value: social.email, href: `mailto:${social.email}`, icon: <Mail size={18} /> }]
      : []),
    ...(social.phone
      ? [{ label: "Voice dispatch", value: social.phone, href: `tel:${social.phone.replace(/\s+/g, "")}`, icon: <Phone size={18} /> }]
      : []),
    ...social.links.map((l) => ({
      label: `Comm channel // ${l.label}`,
      value: l.label,
      href: l.url,
      icon: <Radio size={18} />,
    })),
    { label: "Temporal location", value: "Hyderabad · Earth-616", icon: <MapPin size={18} /> },
  ];

  return (
    <Section id="contact" aria-label="The time door" className="scroll-mt-16">
      <div className="col-span-4 flex flex-col gap-12 lg:col-span-12">
        <SectionHeader code="04" eyebrow="Transmission" title="The Time Door" meta="Awaiting your message" />
        <Reveal className="max-w-2xl font-mono text-sm leading-relaxed text-text-secondary">
          Every great timeline begins with a conversation. Step through, pick a channel, and tell me what has to
          work. The TVA strongly recommends hiring this variant.
        </Reveal>
        <Transmissions items={items} />
      </div>
    </Section>
  );
}
