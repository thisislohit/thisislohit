import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import TextReveal from "./TextReveal";

const projects = [
  {
    title: "Grafterr POS",
    description:
      "A full-featured Point of Sale system with real-time order management, payment integration, and multi-location support for the hospitality industry.",
    tags: ["Flutter", "Dart", "REST API", "Payments"],
  },
  {
    title: "Grafterr GO",
    description:
      "Mobile ordering application enabling customers to browse menus, place orders, and pay seamlessly from their devices with real-time status updates.",
    tags: ["Flutter", "Firebase", "Real-time", "Mobile"],
  },
  {
    title: "Collection Display App",
    description:
      "An elegant display application for curating and showcasing collections with smooth animations and intuitive navigation patterns.",
    tags: ["Flutter", "UI/UX", "Animations", "Clean Architecture"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
      <FadeIn>
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
          Selected Work
        </p>
      </FadeIn>

      <div className="mb-16">
        <TextReveal
          text="Projects"
          className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
          delay={0}
          as="h2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="group bg-card rounded-2xl p-8 md:p-10 cursor-pointer transition-colors hover:bg-secondary/60"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="h-40 bg-secondary rounded-xl mb-6 flex items-center justify-center">
              <span className="text-3xl font-bold text-muted-foreground/30">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm md:text-base">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 bg-secondary text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
