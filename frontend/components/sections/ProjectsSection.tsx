'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1, title: 'Easymoto Rental Service',
    company: 'Easymoto Rental Service Pvt. Ltd.',
    domain: 'easymoto.com.np', link: 'https://easymoto.com.np',
    desc: 'A full-featured motorbike rental platform where users can browse, book, and manage rentals seamlessly.',
    tags: ['Web App', 'Booking System', 'Nepal'], image: '🏍️', accent: '#3B82F6',
  },
  {
    id: 2, title: 'Amicus Institute of Law',
    company: 'Amicus Institute of Law Pvt. Ltd.',
    domain: 'amicus.com.np', link: 'https://amicus.com.np',
    desc: "Nepal's premier law institute — programs, faculty and resources presented with a clean, authoritative design.",
    tags: ['Corporate Site', 'Legal', 'Education'], image: '⚖️', accent: '#A855F7',
  },
  {
    id: 3, title: 'Aryal Multipurpose Farm',
    company: 'Aryal Multipurpose Agricultural Farm Pvt. Ltd.',
    domain: 'aryalfarm.com.np', link: 'https://aryalfarm.com.np',
    desc: 'Premium dairy & agricultural products — farm-to-table ethos meets modern digital design.',
    tags: ['Agriculture', 'Branding', 'Products'], image: '🌾', accent: '#10B981',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.pj-head', { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.project-card', { opacity: 0, y: 40, scale: 0.96, stagger: 0.15, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.pj-grid', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section relative overflow-hidden" style={{ background: '#0A0A0F' }}>
      <div className="orb orb-cyan absolute w-[400px] h-[400px] opacity-10" style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="pj-head text-center" style={{ marginBottom: 72 }}>
          <div className="section-label mx-auto">Our Work</div>
          <h2 className="font-display font-black" style={{ marginBottom: 20 }}>
            Super{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto" style={{ lineHeight: 1.8 }}>
            Real products built for real businesses. Click any card to visit the live site.
          </p>
        </div>

        {/* 3-column grid */}
        <div className="pj-grid grid grid-cols-1 md:grid-cols-3" style={{ gap: 28 }}>
          {projects.map(p => (
            <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer"
              className="project-card block relative overflow-hidden group"
              style={{ borderRadius: 24, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.35s ease', textDecoration: 'none' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.border = `1px solid ${p.accent}45`; el.style.transform = 'translateY(-8px)'; el.style.boxShadow = `0 28px 64px rgba(0,0,0,0.45), 0 0 48px ${p.accent}22`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.border = '1px solid rgba(255,255,255,0.08)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
            >
              {/* Image area */}
              <div className="relative flex items-center justify-center overflow-hidden" style={{ height: 180, background: `linear-gradient(135deg, ${p.accent}18 0%, ${p.accent}08 100%)` }}>
                <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at center, ${p.accent} 0%, transparent 65%)` }} />
                <span className="text-7xl select-none relative z-10 group-hover:scale-110 transition-transform duration-500">{p.image}</span>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs font-mono font-semibold" style={{ padding: '5px 14px', borderRadius: 999, background: 'rgba(0,0,0,0.6)', border: `1px solid ${p.accent}35`, color: p.accent, backdropFilter: 'blur(8px)', whiteSpace: 'nowrap' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />{p.domain}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '28px 28px 32px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: p.accent, marginBottom: 8 }}>{p.company}</div>
                <h3 className="text-white font-bold" style={{ fontSize: '1.2rem', marginBottom: 12, lineHeight: 1.3 }}>{p.title}</h3>
                <p className="text-gray-400 text-sm" style={{ lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ padding: '4px 12px', borderRadius: 999, fontSize: '0.73rem', fontWeight: 600, background: `${p.accent}12`, border: `1px solid ${p.accent}28`, color: p.accent }}>{t}</span>
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

        <div className="text-center" style={{ marginTop: 64 }}>
          <p className="text-gray-500" style={{ marginBottom: 20 }}>Want to be our next success story?</p>
          <a href="#contact" className="btn btn-secondary" style={{ padding: '14px 36px' }}>Start Your Project →</a>
        </div>
      </div>
    </section>
  );
}
