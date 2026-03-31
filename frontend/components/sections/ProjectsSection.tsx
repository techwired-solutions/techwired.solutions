'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1, title: 'Easymoto Rental Service', company: 'Easymoto Rental Service Pvt. Ltd.',
    domain: 'easymoto.com.np', link: 'https://easymoto.com.np',
    desc: 'Motorbike rental platform — browse, book & manage rentals with ease.',
    tags: ['Web App', 'Booking', 'Nepal'], image: '🏍️', accent: '#3B82F6',
  },
  {
    id: 2, title: 'Amicus Institute of Law', company: 'Amicus Institute of Law Pvt. Ltd.',
    domain: 'amicus.com.np', link: 'https://amicus.com.np',
    desc: "Nepal's premier law institute — programs, faculty & resources online.",
    tags: ['Corporate', 'Legal', 'Education'], image: '⚖️', accent: '#A855F7',
  },
  {
    id: 3, title: 'Aryal Multipurpose Farm', company: 'Aryal Multipurpose Agricultural Farm Pvt. Ltd.',
    domain: 'aryalfarm.com.np', link: 'https://aryalfarm.com.np',
    desc: 'Premium dairy & farm products — farm-to-table ethos meets modern design.',
    tags: ['Agriculture', 'Branding', 'Nepal'], image: '🌾', accent: '#10B981',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.proj-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('.project-card', {
        opacity: 0, y: 40, scale: 0.96,
        stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section relative overflow-hidden" style={{ background: '#0A0A0F' }}>
      <div className="orb orb-cyan absolute w-[400px] h-[400px] top-0 left-1/2 -translate-x-1/2 opacity-10" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="proj-header text-center mb-14">
          <div className="section-label mx-auto mb-5">Our Work</div>
          <h2 className="font-display font-black mb-4 text-white">
            Super{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Real products built for real businesses — click to visit the live site.
          </p>
        </div>

        {/* Compact 3-column grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(p => (
            <a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group relative rounded-2xl overflow-hidden transition-all duration-350 block"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = `1px solid ${p.accent}45`;
                el.style.transform = 'translateY(-6px)';
                el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${p.accent}20`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = '1px solid rgba(255,255,255,0.07)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Image area */}
              <div className="relative h-44 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.accent}18 0%, ${p.accent}06 100%)` }}>
                <div className="absolute inset-0 opacity-10"
                  style={{ background: `radial-gradient(circle at center, ${p.accent} 0%, transparent 65%)` }} />
                <span className="text-7xl select-none group-hover:scale-110 transition-transform duration-400 relative z-10">
                  {p.image}
                </span>
                {/* Domain pill */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold"
                  style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${p.accent}35`, color: p.accent, backdropFilter: 'blur(8px)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  {p.domain}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: p.accent }}>
                  {p.company}
                </div>
                <h3 className="text-white font-bold text-lg mb-2 leading-snug">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ background: `${p.accent}12`, border: `1px solid ${p.accent}25`, color: p.accent }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: p.accent }}>
                  Visit Website
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Want to be our next success story?</p>
          <a href="#contact" className="btn btn-secondary px-8 py-3">Start Your Project →</a>
        </div>
      </div>
    </section>
  );
}
