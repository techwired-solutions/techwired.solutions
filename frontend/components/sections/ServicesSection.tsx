'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

/* ── per-service colors ── */
const serviceColor: Record<string, string> = {
  'web-development':        '#3B82F6',
  'mobile-apps':            '#3B82F6',
  'ecommerce':              '#3B82F6',
  'api-development':        '#3B82F6',
  'graphics-design':        '#A855F7',
  'video-production':       '#A855F7',
  '3d-animation':           '#A855F7',
  'domain-hosting':         '#00D4FF',
  'social-media-marketing': '#F97316',
  'google-business':        '#F97316',
  'seo-strategy':           '#10B981',
  'digital-transformation': '#10B981',
};

const VISIBLE = 4; // cards visible at once

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped]  = useState<Record<number, boolean>>({});
  const total = services.length;
  const pages  = Math.ceil(total / VISIBLE);

  const visibleServices = services.slice(current * VISIBLE, current * VISIBLE + VISIBLE);

  const goTo = (idx: number) => {
    setFlipped({});
    setCurrent(idx);
  };
  const prev = () => goTo((current - 1 + pages) % pages);
  const next = () => goTo((current + 1) % pages);

  const toggleFlip = (i: number) =>
    setFlipped(f => ({ ...f, [i]: !f[i] }));

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.srv-header', {
        opacity: 0, y: 40, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate cards in on page change
  useEffect(() => {
    gsap.fromTo('.flip-card-wrap',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' }
    );
  }, [current]);

  return (
    <section ref={sectionRef} id="services" className="section relative overflow-hidden" style={{ background: '#0D0D1A' }}>
      <div className="orb orb-blue   absolute w-[400px] h-[400px] top-0    right-0  opacity-15" />
      <div className="orb orb-purple absolute w-[350px] h-[350px] bottom-0 left-0   opacity-15" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="srv-header text-center mb-12">
          <div className="section-label mx-auto mb-5">What We Do</div>
          <h2 className="font-display font-black mb-4 text-white">
            Our{' '}
            <span style={{ background: 'linear-gradient(135deg,#FACC15,#F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Digital Services
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tap a card to see what&apos;s included. Navigate with the arrows to explore all services.
          </p>
        </div>

        {/* Flip-card carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {visibleServices.map((svc, i) => {
            const color = serviceColor[svc.id] ?? '#3B82F6';
            const isFlipped = !!flipped[i];
            return (
              <div
                key={svc.id}
                className="flip-card-wrap"
                style={{ perspective: '1000px', height: '240px', cursor: 'pointer' }}
                onClick={() => toggleFlip(i)}
              >
                <div
                  style={{
                    position: 'relative', width: '100%', height: '100%',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* FRONT */}
                  <div
                    style={{
                      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${color}30`,
                      borderRadius: '16px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', gap: '14px', padding: '24px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{
                      width: 56, height: 56, borderRadius: 14,
                      background: `${color}15`, border: `1px solid ${color}35`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 28,
                    }}>
                      {svc.icon}
                    </div>
                    <div style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
                      {svc.title}
                    </div>
                    <div style={{ color: color, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Tap to see details ↗
                    </div>
                    <div style={{ position: 'absolute', top: 10, right: 12, width: 8, height: 8, borderRadius: '50%', background: color, opacity: 0.6 }} />
                  </div>

                  {/* BACK */}
                  <div
                    style={{
                      position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
                      border: `1px solid ${color}50`,
                      borderRadius: '16px',
                      padding: '20px',
                      overflowY: 'auto',
                    }}
                  >
                    <div style={{ color, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                      {svc.title}
                    </div>
                    <p style={{ color: '#CBD5E1', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: 10 }}>
                      {svc.description}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {svc.features.slice(0, 3).map(ft => (
                        <li key={ft} style={{ color: '#94A3B8', fontSize: '0.75rem', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                          <span style={{ color, flexShrink: 0, marginTop: 2 }}>✓</span>
                          {ft}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prev}
            aria-label="Previous services"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: pages }).map((_, pi) => (
              <button
                key={pi}
                onClick={() => goTo(pi)}
                aria-label={`Page ${pi + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: pi === current ? 24 : 8, height: 8,
                  background: pi === current ? '#3B82F6' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next services"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          Showing {current * VISIBLE + 1}–{Math.min(current * VISIBLE + VISIBLE, total)} of {total} services
        </p>
      </div>
    </section>
  );
}
