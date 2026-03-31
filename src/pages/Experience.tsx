import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const experiences = [
  {
    company: "Abilio IT",
    role: "Flutter Developer",
    period: "Jan 2024 – Present",
    highlights: [
      "Built and shipped Grafterr POS — a full-featured Point of Sale system used across hospitality venues",
      "Integrated Stripe and multiple payment gateways, processing real transactions",
      "Architected offline-first mobile architecture for uninterrupted service",
      "Led real-time kitchen display sync with WebSocket-powered order management",
    ],
    tech: ["Flutter", "Dart", "REST API", "Stripe", "Firebase"],
  },
  {
    company: "FIN Infocom",
    role: "Frontend Developer",
    period: "Jun 2023 – Dec 2023",
    highlights: [
      "Developed responsive web applications with React and Tailwind CSS",
      "Improved page load performance by 40% through code splitting and lazy loading",
      "Built reusable component library used across 3 internal projects",
      "Collaborated with design team to implement pixel-perfect UI from Figma mockups",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "REST API"],
  },
  {
    company: "Freelance",
    role: "Flutter & React Developer",
    period: "2022 – 2023",
    highlights: [
      "Delivered cross-platform mobile apps for multiple clients",
      "Built custom UI components with complex animations in Flutter",
      "Developed full-stack web solutions with React and Firebase",
    ],
    tech: ["Flutter", "React", "Firebase", "Figma"],
  },
];

const Experience = () => (
  <div className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
    <FadeIn>
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">Career</p>
      <h1 className="font-serif text-4xl md:text-6xl font-semibold text-foreground mb-16">
        Where I've Worked
      </h1>
    </FadeIn>

    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-12">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            className="relative pl-12 md:pl-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-2.5 md:left-4.5 top-2 w-3 h-3 rounded-full bg-foreground border-2 border-background" />

            <div className="bg-card rounded-2xl p-8 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold text-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.period}</p>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-4">{exp.role}</h3>

              <ul className="space-y-2 mb-5">
                {exp.highlights.map((h, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-foreground/25 mt-2 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default Experience;
