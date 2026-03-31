'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Dev', 'Design', 'Marketing', 'Strategy'];

const serviceCategories: Record<string, string> = {
  'web-development':       'Dev',
  'mobile-apps':           'Dev',
  'ecommerce':             'Dev',
  'api-development':       'Dev',
  'graphics-design':       'Design',
  'video-production':      'Design',
  '3d-animation':          'Design',
  'domain-hosting':        'Dev',
  'social-media-marketing':'Marketing',
  'google-business':       'Marketing',
  'seo-strategy':          'Strategy',
  'digital-transformation':'Strategy',
};

const serviceColors: Record<string, string> = {
  Dev:       '#3B82F6',
  Design:    '#A855F7',
  Marketing: '#F97316',
  Strategy:  '#10B981',
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? services
    : services.filter(s => serviceCategories[s.id] === active);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.services-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Re-animate cards when filter changes
  useEffect(() => {
    gsap.from('.service-card', {
      opacity: 0, y: 30, scale: 0.95,
      stagger: 0.06, duration: 0.5, ease: 'power2.out',
    });
  }, [active]);

  return (
    <section ref={sectionRef} id="services" className="section relative overflow-hidden" style={{ background: '#0D0D1A' }}>
      <div className="orb orb-blue absolute w-[400px] h-[400px] top-0 right-0 opacity-20" />
      <div className="orb orb-purple absolute w-[300px] h-[300px] bottom-0 left-0 opacity-20" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="services-header text-center mb-12">
          <div className="section-label mx-auto mb-6">What We Do</div>
          <h2 className="font-display font-black mb-6 text-white">
            Our Complete{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FACC15, #F97316)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Digital Services
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From concept to deployment — every digital solution you need, under one roof.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {CATEGORIES.map(cat => {
            const color = cat === 'All' ? '#3B82F6' : serviceColors[cat] ?? '#3B82F6';
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background:   isActive ? color : 'rgba(255,255,255,0.05)',
                  color:        isActive ? '#fff' : '#94A3B8',
                  border:       isActive ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.08)',
                  boxShadow:    isActive ? `0 0 20px ${color}50` : 'none',
                  transform:    isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((service) => {
            const cat   = serviceCategories[service.id] ?? 'Dev';
            const color = serviceColors[cat] ?? '#3B82F6';
            return (
              <div
                key={service.id}
                className="service-card group relative rounded-2xl p-6 transition-all duration-300 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = `1px solid ${color}50`;
                  el.style.background = `${color}0D`;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${color}20`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = '1px solid rgba(255,255,255,0.07)';
                  el.style.background = 'rgba(255,255,255,0.03)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Category tag */}
                <div
                  className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
                >
                  {cat}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  {service.icon}
                </div>

                <h3 className="text-white font-bold mb-2 leading-snug">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>

                {/* Features peek on hover */}
                <div className="mt-4 space-y-1 max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500">
                  {service.features.slice(0, 2).map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                      <span style={{ color }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          {filtered.length} service{filtered.length !== 1 ? 's' : ''} available
        </p>
      </div>
    </section>
  );
}
