'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import PartnersSection from '@/components/sections/PartnersSection';
import FooterSection from '@/components/sections/FooterSection';

export default function Home() {
  useSmoothScroll();

  return (
    <main className="min-h-screen" style={{ background: '#000000' }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <PartnersSection />
      <FooterSection />
    </main>
  );
}
