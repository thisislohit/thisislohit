import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import TextReveal from "./TextReveal";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Grafterr POS",
    description:
      "A full-featured Point of Sale system with real-time order management, payment integration, and multi-location support for the hospitality industry.",
    contributions: [
      "Built real-time order management with live kitchen display sync",
      "Integrated multiple payment gateways for seamless transactions",
      "Developed multi-location support with centralized reporting",
      "Implemented offline-first architecture for uninterrupted service",
    ],
    platform: "Android Tablet / iPad",
    tags: ["Flutter", "Dart", "REST API", "Payments"],
    accent: "bg-pastel-blue/40",
    availability: "enterprise",
  },
  {
    title: "Grafterr GO",
    description:
      "Mobile ordering application enabling customers to browse menus, place orders, and pay seamlessly from their devices with real-time status updates.",
    contributions: [
      "Designed intuitive menu browsing with category-based navigation",
      "Built real-time order tracking with push notification updates",
      "Implemented secure in-app payment flow with multiple options",
      "Optimized performance for smooth scrolling across large menus",
    ],
    platform: "iOS & Android",
    tags: ["Flutter", "Firebase", "Real-time", "Mobile"],
    accent: "bg-pastel-purple/40",
    links: {
      playStore: "#",
      appStore: "#",
    },
  },
  {
    title: "Collection Display App",
    description:
      "An elegant display application for curating and showcasing collections with smooth animations and intuitive navigation patterns.",
    contributions: [
      "Created fluid page transitions with custom animation curves",
      "Built responsive grid layouts adapting to various screen sizes",
      "Implemented gesture-based navigation for natural interaction",
      "Developed clean architecture with scalable state management",
    ],
    platform: "iOS & Android",
    tags: ["Flutter", "UI/UX", "Animations", "Clean Architecture"],
    accent: "bg-pastel-green/40",
    availability: "enterprise",
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

      <div className="mb-20">
        <TextReveal
          text="Projects"
          className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
          delay={0}
          as="h2"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            className="group relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-border/30 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Accent blob */}
            <div
              className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-60 ${project.accent} pointer-events-none`}
            />

            {/* Number + Tags */}
            <div className="flex items-start justify-between mb-4 relative z-10">
              <span className="text-xs font-medium text-muted-foreground tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 bg-secondary/60 text-muted-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 relative z-10">
              {project.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm max-w-xl mb-6 relative z-10">
              {project.description}
            </p>

            {/* Key Contributions */}
            <div className="mb-6 relative z-10">
              <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-3">
                Key Contributions
              </p>
              <ul className="space-y-2">
                {project.contributions.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-foreground/25 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform & Links */}
            <div className="flex items-end justify-between relative z-10">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-1">
                  Platform
                </p>
                <p className="text-xs text-foreground">{project.platform}</p>
              </div>

              <div>
                {project.links ? (
                  <div className="flex gap-3">
                    <a
                      href={project.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      Play Store <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={project.links.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      App Store <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    Enterprise · On request
                  </p>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
