import { motion } from "framer-motion";
import { CheckCircle2, PlayCircle, BarChart3, Sparkles, ShieldCheck, Workflow } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const features = [
  { icon: Workflow, title: "Meeting Workflows", text: "Automate pre-meeting prep, notes, and action items with AI-powered templates." },
  { icon: BarChart3, title: "Revenue Insights", text: "Track every customer touchpoint and surface trends with real-time dashboards." },
  { icon: ShieldCheck, title: "Enterprise Security", text: "SOC2-ready infrastructure with role controls, audit history, and encryption." },
];

const Home = () => {
  return (
    <div className="bg-[#f7f9fc] pt-28 text-slate-900">
      <section className="px-6 pb-24 pt-14">
        <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600"><Sparkles size={14} /> New workflow engine</p>
            <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.03em] text-slate-900 md:text-7xl">Run every customer meeting with confidence.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">Loomify centralizes preparation, collaboration, follow-ups, and analytics in one premium workspace designed for modern SaaS teams.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02]">Start Free Trial</button>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition-all hover:shadow-md"><PlayCircle size={16} /> Watch Demo</button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="absolute -left-10 top-12 h-40 w-40 rounded-full bg-sky-200/60 blur-3xl" />
            <div className="absolute -right-8 bottom-6 h-40 w-40 rounded-full bg-violet-200/60 blur-3xl" />
            <div className="relative rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
              <img src="https://images.unsplash.com/photo-1551281044-8f6d9f62d9f3?q=80&w=1400&auto=format&fit=crop" alt="dashboard preview" className="h-[420px] w-full rounded-2xl object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn><h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl">Built for high-performing customer teams</h2></FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <feature.icon className="mb-5 text-slate-800" size={22} />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">{feature.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 rounded-[32px] bg-slate-900 px-10 py-14 text-white lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">From insights to action in one unified flow</h2>
            <p className="mt-5 text-slate-300">Capture every key moment, assign follow-ups instantly, and sync outcomes across product, sales, and success teams.</p>
            <ul className="mt-8 space-y-4">
              {[
                "AI generated summaries and tasks",
                "Pipeline-level reporting and health alerts",
                "Native integrations with Slack, HubSpot, and Notion",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm"><CheckCircle2 size={18} className="text-emerald-400" /> {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop" alt="analytics" className="h-[360px] w-full rounded-xl object-cover" />
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-[860px] rounded-[30px] border border-slate-200 bg-white px-10 py-16 text-center shadow-sm">
          <p className="text-4xl font-semibold tracking-tight md:text-5xl">Ready to turn meetings into momentum?</p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">Join fast-growing SaaS teams shipping better customer outcomes with less operational overhead.</p>
          <button className="mt-10 rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02]">Get Started Now</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
