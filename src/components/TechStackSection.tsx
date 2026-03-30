import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import TextReveal from "./TextReveal";

const techs = [
  "Flutter", "Dart", "BLoC", "GetX", "Firebase",
  "Stripe", "REST APIs", "WebSockets", "React",
  "TypeScript", "Tailwind CSS", "Git", "Figma",
];

const pastelBgs = [
  "bg-pastel-blue/60",
  "bg-pastel-purple/60",
  "bg-pastel-green/60",
  "bg-pastel-pink/60",
];

const TechStackSection = () => (
  <section id="stack" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
    <FadeIn>
      <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
        Technologies
      </p>
    </FadeIn>

    <div className="mb-16">
      <TextReveal
        text="Tech Stack"
        className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
        delay={0}
        as="h2"
      />
    </div>

    <div className="flex flex-wrap gap-3">
      {techs.map((tech, i) => (
        <motion.span
          key={tech}
          className={`px-5 py-2.5 rounded-full text-sm font-medium text-foreground/80 backdrop-blur-sm border border-border/20 cursor-default transition-transform duration-200 hover:scale-105 ${pastelBgs[i % pastelBgs.length]}`}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {tech}
        </motion.span>
      ))}
    </div>
  </section>
);

export default TechStackSection;
