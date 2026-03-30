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

      <div className="flex flex-col gap-12">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            className="group bg-card rounded-2xl p-8 md:p-12 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 border border-border/40"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-0.5 bg-secondary text-muted-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
              {project.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-2xl mb-8">
              {project.description}
            </p>

            {/* Two-column detail area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Key Contributions */}
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase mb-4">
                  Key Contributions
                </p>
                <ul className="space-y-2.5">
                  {project.contributions.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-foreground/30 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meta & Links */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase mb-2">
                    Platform
                  </p>
                  <p className="text-sm text-foreground">{project.platform}</p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase mb-3">
                    Availability
                  </p>
                  {project.links ? (
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={project.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        Play Store
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-border">|</span>
                      <a
                        href={project.links.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        App Store
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      Enterprise Application · Available on request
                    </p>
                  )}
                </div>

                <div className="mt-auto pt-2">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors"
                  >
                    View Details
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
