import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Grafterr POS",
    type: "SaaS · Flutter",
    description: "A full-featured Point of Sale system with real-time order management, payment integration, and multi-location support for the hospitality industry.",
    contributions: [
      "Built real-time order management with live kitchen display sync",
      "Integrated multiple payment gateways for seamless transactions",
      "Developed multi-location support with centralized reporting",
    ],
    platform: "Android Tablet / iPad",
    accent: "bg-pastel-blue/40",
    enterprise: true,
  },
  {
    title: "Grafterr GO",
    type: "Mobile · Flutter",
    description: "Mobile ordering application enabling customers to browse menus, place orders, and pay seamlessly with real-time status updates.",
    contributions: [
      "Designed intuitive menu browsing with category navigation",
      "Built real-time order tracking with push notifications",
      "Implemented secure in-app payment flow",
    ],
    platform: "iOS & Android",
    accent: "bg-pastel-purple/40",
    links: { playStore: "#", appStore: "#" },
  },
  {
    title: "Collection Display App",
    type: "Mobile · Flutter",
    description: "An elegant display application for curating and showcasing collections with smooth animations and intuitive navigation.",
    contributions: [
      "Created fluid page transitions with custom curves",
      "Built responsive grid layouts for various screens",
      "Implemented gesture-based navigation",
    ],
    platform: "iOS & Android",
    accent: "bg-pastel-green/40",
    enterprise: true,
  },
  {
    title: "Project Alpha",
    type: "SaaS · React",
    description: "SaaS platform with Stripe integration for subscription billing, team management, and analytics dashboard.",
    contributions: [
      "Architected subscription billing with Stripe",
      "Built role-based access control system",
      "Developed analytics dashboard with real-time data",
    ],
    platform: "Web",
    accent: "bg-pastel-sand/40",
    links: { github: "#", live: "#" },
  },
  {
    title: "Project Beta",
    type: "Real-time · React",
    description: "Real-time chat and notification system with WebSocket-powered live updates and collaborative features.",
    contributions: [
      "Built WebSocket infrastructure for real-time messaging",
      "Implemented push notification pipeline",
      "Designed optimistic UI updates for instant feel",
    ],
    platform: "Web",
    accent: "bg-pastel-blue/40",
    links: { github: "#" },
  },
];

const Work = () => (
  <div className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
    <FadeIn>
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">Portfolio</p>
      <h1 className="font-serif text-4xl md:text-6xl font-semibold text-foreground mb-4">
        Selected Projects
      </h1>
      <p className="text-muted-foreground text-lg mb-16">Real products. Real users. Real impact.</p>
    </FadeIn>

    <div className="space-y-8">
      {projects.map((project, i) => (
        <motion.article
          key={project.title}
          className="group bg-card rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
        >
          <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-50 ${project.accent} pointer-events-none`} />

          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">{project.title}</h2>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                  {project.type}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">{project.description}</p>

            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">Key Contributions</p>
              <ul className="space-y-2">
                {project.contributions.map((c, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-foreground/25 mt-2 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-1">Platform</p>
                <p className="text-sm text-foreground">{project.platform}</p>
              </div>
              <div className="flex gap-3">
                {project.links ? (
                  <>
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-muted-foreground transition-colors">
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-muted-foreground transition-colors">
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.links.playStore && (
                      <a href={project.links.playStore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-muted-foreground transition-colors">
                        Play Store
                      </a>
                    )}
                    {project.links.appStore && (
                      <a href={project.links.appStore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-muted-foreground transition-colors">
                        App Store
                      </a>
                    )}
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Enterprise · On request</p>
                )}
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </div>
);

export default Work;
