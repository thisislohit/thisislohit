import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Work from "@/sections/Work";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import FoundationsEducation from "@/sections/FoundationsEducation";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

// Section order per scope.md's approved IA. GitHub/Open Source folds into
// Work (resolved). Beyond Mobile was added then cut — no real content to
// showcase there (resolved 2026-08-25, see scope.md).
export default function Home() {
  return (
    <main className="flex flex-col gap-stack-xl">
      <Hero />
      <About />
      <Work />
      <Skills />
      <Experience />
      <FoundationsEducation />
      <Contact />
      <Footer />
    </main>
  );
}
