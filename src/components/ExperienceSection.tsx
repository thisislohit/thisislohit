import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import TextReveal from "./TextReveal";

const experiences = [
  {
    company: "Abilio IT",
    role: "Flutter Developer",
    period: "Present",
    description:
      "Developing cross-platform applications with Flutter, building scalable SaaS products and POS systems for the hospitality sector.",
    highlights: ["SaaS POS system", "Real-time order management", "Multi-platform deployment"],
  },
  {
    company: "FIN Infocom",
    role: "Software Developer",
    period: "Previous",
    description:
      "Worked on frontend engineering and mobile application development, focusing on clean architecture and performance optimization.",
    highlights: ["Mobile app development", "Performance optimization", "Clean architecture"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <FadeIn>
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
          Career
        </p>
      </FadeIn>

      <div className="mb-16">
        <TextReveal
          text="Experience"
          className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
          delay={0}
          as="h2"
        />
      </div>

      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-border/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{exp.company}</h3>
                <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-foreground font-medium mb-2">{exp.role}</p>
                <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[11px] font-medium px-3 py-1 bg-secondary/60 text-muted-foreground rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
