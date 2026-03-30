import FadeIn from "./FadeIn";
import TextReveal from "./TextReveal";

const AboutSection = () => (
  <section id="about" className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
    <FadeIn>
      <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
        About
      </p>
    </FadeIn>

    <div className="mb-16">
      <TextReveal
        text="Who I Am"
        className="text-4xl md:text-6xl font-bold tracking-tight text-foreground"
        delay={0}
        as="h2"
      />
    </div>

    <FadeIn delay={0.2}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        <div className="space-y-5">
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            I'm a Flutter developer and frontend engineer focused on building
            production-grade SaaS applications. My work spans real-time order
            management systems, Stripe-integrated payment platforms, and
            cross-platform mobile experiences used daily by businesses.
          </p>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            I care deeply about clean architecture, performance optimization,
            and delivering interfaces that feel fast and intentional. Every line
            of code I write is aimed at shipping products that work reliably at
            scale.
          </p>
        </div>

        <div className="space-y-8">
          {[
            { title: "SaaS & Payments", desc: "Multi-tenant platforms with Stripe, subscription management, and real-time billing." },
            { title: "Real-time Systems", desc: "Live order tracking, kitchen display sync, and WebSocket-powered dashboards." },
            { title: "Performance", desc: "Offline-first architecture, optimistic updates, and sub-second load times." },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  </section>
);

export default AboutSection;
