"use client";

import { LanguageProvider } from "./components/LanguageProvider";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutTerminal from "./components/AboutTerminal";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SkillsTerminal from "./components/SkillsTerminal";
import GitHubProjects from "./components/GitHubProjects";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <HeroSection />
        <AboutTerminal />
        <ExperienceTimeline />
        <SkillsTerminal />
        <GitHubProjects />
        <ContactSection />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
