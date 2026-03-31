'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Easymoto Rental Service',
    company: 'Easymoto Rental Service Pvt. Ltd.',
    domain: 'easymoto.com.np',
    description:
      'A full-featured motorbike rental service platform where users can browse, book, and manage rentals seamlessly. Built with a modern stack for performance and ease of use.',
    tags: ['Web App', 'Booking System', 'Nepal'],
    image: '🏍️',
    link: 'https://easymoto.com.np',
    accent: '#3B82F6',
  },
  {
    id: 2,
    title: 'Amicus Institute of Law',
    company: 'Amicus Institute of Law Pvt. Ltd.',
    domain: 'amicus.com.np',
    description:
      'A professional digital presence for Nepal\'s premier law institute. Showcasing programs, faculty, and resources with a clean, authoritative design that builds trust.',
    tags: ['Corporate Site', 'Legal', 'Education'],
    image: '⚖️',
    link: 'https://amicus.com.np',
    accent: '#A855F7',
  },
  {
    id: 3,
    title: 'Aryal Multipurpose Farm',
    company: 'Aryal Multipurpose Agricultural Farm Pvt. Ltd.',
    domain: 'aryalfarm.com.np',
    description:
      'Digital identity for a modern agricultural enterprise focused on premium dairy products. The site highlights their farm-to-table ethos with natural aesthetics and clear product presentation.',
    tags: ['Agriculture', 'E-commerce', 'Branding'],
    image: '🌾',
    link: 'https://aryalfarm.com.np',
    accent: '#10B981',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.projects-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      gsap.utils.toArray('.project-showcase').forEach((el: any, i) => {
        const fromX = i % 2 === 0 ? -60 : 60;
        gsap.from(el, {
          opacity: 0, x: fromX, y: 20,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section relative overflow-hidden" style={{ background: '#0A0A0F' }}>
      <div className="orb orb-cyan absolute w-[400px] h-[400px] top-0 left-1/2 -translate-x-1/2 opacity-15" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="projects-header text-center mb-20">
          <div className="section-label mx-auto mb-6">Our Work</div>
          <h2 className="font-display font-black mb-6 text-white">
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3B82F6, #A855F7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Super Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real products, real businesses, real impact. Here&apos;s what we&apos;ve shipped together with our clients.
          </p>
        </div>

        {/* Alternating Showcase */}
        <div className="space-y-24">
          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={project.id}
                className={`project-showcase grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:direction-rtl' : ''}`}
              >
                {/* Visual Card */}
                <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                  <div
                    className="group relative rounded-3xl overflow-hidden p-12 flex items-center justify-center min-h-[320px] transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}15 0%, ${project.accent}05 100%)`,
                      border: `1px solid ${project.accent}30`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 30px 80px rgba(0,0,0,0.4), 0 0 60px ${project.accent}25`;
                      (e.currentTarget as HTMLElement).style.border = `1px solid ${project.accent}60`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      (e.currentTarget as HTMLElement).style.border = `1px solid ${project.accent}30`;
                    }}
                  >
                    {/* Glow behind emoji */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ background: `radial-gradient(circle at center, ${project.accent}60 0%, transparent 60%)` }}
                    />
                    <div className="relative text-[120px] select-none group-hover:scale-110 transition-transform duration-500 group-hover:drop-shadow-2xl">
                      {project.image}
                    </div>

                    {/* Domain badge */}
                    <div
                      className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-semibold"
                      style={{
                        background: 'rgba(0,0,0,0.6)',
                        border: `1px solid ${project.accent}40`,
                        color: project.accent,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      {project.domain}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${!isEven ? 'lg:order-1' : ''} space-y-6`}>
                  {/* Company */}
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: project.accent }}>
                    {project.company}
                  </div>

                  <h3 className="text-white font-display font-black text-3xl md:text-4xl leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-lg leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: `${project.accent}15`,
                          border: `1px solid ${project.accent}30`,
                          color: project.accent,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)`,
                      boxShadow: `0 0 24px ${project.accent}40`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${project.accent}60`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${project.accent}40`;
                    }}
                  >
                    Visit Website
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-4">Interested in joining this list?</p>
          <a href="#contact" className="btn btn-secondary px-8 py-3">
            Start Your Project →
          </a>
        </div>
      </div>
    </section>
  );
}
