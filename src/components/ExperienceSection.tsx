import FadeIn from "./FadeIn";
import TextReveal from "./TextReveal";

const experiences = [
  {
    company: "Abilio IT",
    role: "Flutter Developer",
    period: "Present",
    description:
      "Developing cross-platform applications with Flutter, building scalable SaaS products and POS systems for the hospitality sector.",
  },
  {
    company: "FIN Infocom",
    role: "Software Developer",
    period: "Previous",
    description:
      "Worked on frontend engineering and mobile application development, focusing on clean architecture and performance optimization.",
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

      <div className="space-y-0 divide-y divide-border">
        {experiences.map((exp, i) => (
          <FadeIn key={exp.company} delay={i * 0.15}>
            <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{exp.company}</h3>
                <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-foreground font-medium mb-2">{exp.role}</p>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
