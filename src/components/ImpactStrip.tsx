import { motion } from "framer-motion";

const highlights = [
  { label: "2+ Years", sub: "Experience" },
  { label: "SaaS", sub: "Applications" },
  { label: "Stripe", sub: "Payments" },
  { label: "Real-time", sub: "Systems" },
  { label: "Cross-platform", sub: "Development" },
];

const ImpactStrip = () => (
  <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {highlights.map((item, i) => (
        <motion.div
          key={item.label}
          className="text-center py-6 px-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-lg md:text-xl font-semibold text-foreground">{item.label}</p>
          <p className="text-xs text-muted-foreground mt-1 tracking-wide">{item.sub}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ImpactStrip;
