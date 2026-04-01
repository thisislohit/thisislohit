import FadeIn from "@/components/FadeIn";

const experiences = [
  {
    company: "Abilio IT",
    role: "Flutter Developer",
    duration: "Jan 2024 → Present",
    current: true,
    description: "Building cross-platform SaaS applications and POS systems for the hospitality sector. Working with real-time data, complex state management, and production Flutter codebases.",
    impact: [
      "Built real-time order management system used across multiple restaurant locations",
      "Integrated Stripe and Razorpay payment flows handling live transactions",
      "Delivered cross-platform app (iOS, Android, Web) from architecture to App Store",
      "Reduced app crash rate by 60% through systematic error handling and monitoring",
    ],
    tech: ["Flutter", "Firebase", "BLoC", "Stripe", "WebSocket"],
  },
  {
    company: "FIN Infocom",
    role: "Software Developer",
    duration: "Jun 2023 → Dec 2023",
    current: false,
    description: "Focused on frontend engineering and mobile application development for client projects.",
    impact: [
      "Developed Flutter-based mobile applications for enterprise clients",
      "Implemented responsive UI components with custom animations",
    ],
    tech: ["Flutter", "React", "Dart", "REST API"],
  },
  {
    company: "Freelance",
    role: "Flutter & React Developer",
    duration: "2022 → 2023",
    current: false,
    description: "Independent development work building mobile apps and web frontends for startups and small businesses.",
    impact: [
      "Shipped 5+ apps to Google Play Store and Apple App Store",
      "Built custom e-commerce flows with payment gateway integration",
    ],
    tech: ["Flutter", "React", "Firebase", "Stripe"],
  },
];

const Experience = () => {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 max-w-[1200px] mx-auto">
      <FadeIn>
        <p className="font-mono text-xs text-blue-accent tracking-[4px] uppercase mb-4">Career</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-16">
          Where I've built things.
        </h1>
      </FadeIn>

      <div className="relative">
        <div className="hidden md:block absolute left-[20px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-accent via-cyan-accent to-transparent" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <FadeIn key={exp.company} delay={i * 0.15}>
              <div className="relative md:ml-12 md:pl-8">
                <div className="hidden md:block absolute -left-[52px] top-8 w-[10px] h-[10px] rounded-full bg-blue-accent shadow-[0_0_12px_rgba(79,142,247,0.6)]" />

                <div className="glass-card p-8 border-l-[3px] border-l-blue-accent rounded-r-2xl rounded-l-none hover:border-l-cyan-accent transition-colors duration-300">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-display text-sm font-bold text-foreground">{exp.company}</span>
                    {exp.current && (
                      <span className="px-2 py-0.5 rounded-full bg-green-success/[0.08] border border-green-success/25 text-green-success font-mono text-[10px] uppercase tracking-wider">Current</span>
                    )}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-1">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground font-mono mb-4">{exp.duration}</p>
                  <p className="text-muted-foreground text-[15px] leading-[1.7] mb-5">{exp.description}</p>

                  <div className="space-y-2 mb-5">
                    {exp.impact.map((point) => (
                      <p key={point} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-blue-accent shrink-0">→</span>
                        {point}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-blue-accent/[0.08] border border-blue-accent/20 text-blue-accent font-mono text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
