'use client';

import React, { useRef } from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/CircularGallery';

const projects: GalleryItem[] = [
  {
    common: 'Easymoto Rental',
    binomial: 'Full-stack Booking Platform',
    link: 'https://easymoto.com.np',
    photo: {
      url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=900&auto=format&fit=crop&q=80',
      text: 'Motorcycle rental platform interface',
      pos: 'center',
      by: 'Techwired Solutions'
    }
  },
  {
    common: 'Amicus Law',
    binomial: 'Premier Legal Portal',
    link: 'https://amicus.com.np',
    photo: {
      url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=900&auto=format&fit=crop&q=80',
      text: 'Law institute resource platform',
      pos: 'center',
      by: 'Techwired Solutions'
    }
  },
  {
    common: 'Aryal Farm',
    binomial: 'Agricultural Digital Identity',
    link: 'https://aryalfarm.com.np',
    photo: {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&auto=format&fit=crop&q=80',
      text: 'Farming and dairy commerce',
      pos: 'center',
      by: 'Techwired Solutions'
    }
  },
  {
    common: 'NexGen ERP',
    binomial: 'Enterprise Resource Planning',
    photo: {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
      text: 'Business data analytics dashboard',
      pos: 'center',
      by: 'Techwired Solutions'
    }
  },
  {
    common: 'Cloud Commerce',
    binomial: 'Next-Gen E-commerce',
    photo: {
      url: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=900&auto=format&fit=crop&q=80',
      text: 'Online retail experience',
      pos: 'center',
      by: 'Techwired Solutions'
    }
  },
  {
    common: 'Fintech Neo',
    binomial: 'Digital Banking App',
    photo: {
      url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&auto=format&fit=crop&q=80',
      text: 'Mobile banking interface',
      pos: 'center',
      by: 'Techwired Solutions'
    }
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative w-full" 
      style={{ height: '400vh', background: 'transparent' }}
    >
      {/* Sticky container that keeps the gallery centered while we scroll the parent */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Absolute Background Orbs for depth */}
        <div className="orb orb-cyan absolute w-[800px] h-[800px] opacity-10" 
             style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'blur(120px)' }} />

        {/* Content Header */}
        <div className="absolute top-20 z-20 text-center px-4 w-full flex flex-col items-center">
          <div className="section-label mb-3">Portfolio</div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-2">
            Super <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm max-w-sm mx-auto text-center leading-relaxed opacity-80">
            Swipe or scroll to navigate our circular showcase. <br className="hidden md:block"/> Click any card to launch the project.
          </p>
        </div>

        {/* The 3D Circular Gallery - Tightly grouped below header */}
        <div className="w-full h-full relative z-10 transition-opacity duration-1000">
          <CircularGallery 
            items={projects} 
            radius={typeof window !== 'undefined' && window.innerWidth < 768 ? 240 : 460} 
            autoRotateSpeed={0.012}
          />
        </div>

        {/* Scroll Indicator helper */}
        <div className="absolute bottom-12 z-20 flex flex-col items-center gap-2 opacity-40">
           <span className="text-[10px] uppercase tracking-widest text-white">Scroll to Rotate</span>
           <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
