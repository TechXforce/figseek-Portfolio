import { Navbar } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { AboutSection } from './components/about-section';
import { SkillsSection } from './components/skills-section';
import { ProjectsSection } from './components/projects-section';
import { ExperienceSection } from './components/experience-section';
import { ContactSection } from './components/contact-section';
import { Footer } from './components/footer';
import { ParallaxBackground } from './components/parallax-background';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParallaxBackground />
      <div className="relative z-10">
        <Navbar />
        <main id="home">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}