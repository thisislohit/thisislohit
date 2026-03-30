import Navbar from "@/components/Navbar";
import GradientBlobs from "@/components/GradientBlobs";
import HeroSection from "@/components/HeroSection";
import ImpactStrip from "@/components/ImpactStrip";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <GradientBlobs />
      <Navbar />
      <HeroSection />
      <ImpactStrip />
      <AboutSection />
      <ProjectsSection />
      <TechStackSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
