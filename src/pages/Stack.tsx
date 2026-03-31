import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const categories = [
  {
    icon: "📱",
    title: "Mobile",
    color: "bg-pastel-blue/50",
    tags: ["Flutter", "Dart"],
  },
  {
    icon: "🧠",
    title: "State Management",
    color: "bg-pastel-purple/50",
    tags: ["BLoC", "GetX", "Riverpod"],
  },
  {
    icon: "🔥",
    title: "Backend & DB",
    color: "bg-pastel-sand/50",
    tags: ["Firebase", "Firestore", "Supabase"],
  },
  {
    icon: "💳",
    title: "Payments",
    color: "bg-pastel-green/50",
    tags: ["Stripe", "Razorpay"],
  },
  {
    icon: "🌐",
    title: "APIs",
    color: "bg-pastel-blue/50",
    tags: ["REST APIs", "WebSockets", "GraphQL"],
  },
  {
    icon: "🖥️",
    title: "Frontend",
    color: "bg-pastel-purple/50",
    tags: ["React", "Tailwind CSS", "TypeScript"],
  },
  {
    icon: "🛠️",
    title: "Tools",
    color: "bg-pastel-sand/50",
    tags: ["Git", "Figma", "Postman", "VS Code"],
  },
];

const Stack = () => (
  <div className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
    <FadeIn>
      <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">Stack</p>
      <h1 className="font-serif text-4xl md:text-6xl font-semibold text-foreground mb-4">
        Tools I Work With
      </h1>
      <p className="text-muted-foreground text-lg mb-16">Carefully chosen. Deeply understood.</p>
    </FadeIn>

    <div className="space-y-12">
      {categories.map((cat, catIdx) => (
        <FadeIn key={cat.title} delay={catIdx * 0.06}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{cat.icon}</span>
              <h2 className="font-serif text-xl font-semibold text-foreground">{cat.title}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {cat.tags.map((tag, tagIdx) => (
                <motion.span
                  key={tag}
                  className={`px-4 py-2 rounded-full text-sm font-medium text-foreground ${cat.color} hover:scale-105 hover:shadow-sm transition-all duration-200 cursor-default`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: catIdx * 0.06 + tagIdx * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  </div>
);

export default Stack;
