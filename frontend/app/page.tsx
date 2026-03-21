'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import PartnersSection from '@/components/sections/PartnersSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  useSmoothScroll();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ServicesSection />
      <ProjectsSection />
      <PartnersSection />
      <ContactSection />
    </main>
  );
}
