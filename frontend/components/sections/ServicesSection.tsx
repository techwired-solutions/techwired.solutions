'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

const ACCENT: Record<string, string> = {
  'web-development': '#3B82F6', 'mobile-apps': '#3B82F6',    'ecommerce': '#3B82F6',
  'api-development': '#3B82F6', 'graphics-design': '#A855F7', 'video-production': '#A855F7',
  '3d-animation': '#A855F7',   'domain-hosting': '#00D4FF',  'social-media-marketing': '#F97316',
  'google-business': '#F97316','seo-strategy': '#10B981',    'digital-transformation': '#10B981',
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const total = services.length;

  const go = useCallback((dir: number) => {
    setCurrent(c => (c + dir + total) % total);
  }, [total]);

  // keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.srv-head', { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Get cards: prev, current, next
  const getCard = (offset: number) => services[(current + offset + total) % total];
  const prev = getCard(-1);
  const curr = getCard(0);
  const next = getCard(1);

  const cardStyle = (isCenter: boolean, side: 'left' | 'right' | 'center'): React.CSSProperties => {
    const color = ACCENT[isCenter ? curr.id : (side === 'left' ? prev.id : next.id)] ?? '#3B82F6';
    if (isCenter) return {
      position: 'absolute', top: 0, left: '50%',
      transform: 'translateX(-50%)',
      width: '100%', maxWidth: 420, zIndex: 3,
      background: `linear-gradient(145deg, ${color}18 0%, rgba(13,13,26,0.95) 100%)`,
      border: `1px solid ${color}60`,
      borderRadius: 24,
      boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 60px ${color}25`,
      transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
    };
    const xOffset = side === 'left' ? 'calc(-50% - 280px)' : 'calc(-50% + 280px)';
    return {
      position: 'absolute', top: 0, left: '50%',
      transform: `translateX(${xOffset}) scale(0.85)`,
      width: '100%', maxWidth: 380, zIndex: 1,
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 24,
      opacity: 0.6, filter: 'blur(1px)',
      transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
      cursor: 'pointer',
      overflow: 'hidden',
    };
  };

  return (
    <section ref={sectionRef} id="services" className="section relative overflow-hidden" style={{ background: '#0D0D1A' }}>
      <div className="orb orb-blue   absolute w-[500px] h-[500px] opacity-15" style={{ top: 0, right: 0 }} />
      <div className="orb orb-purple absolute w-[400px] h-[400px] opacity-15" style={{ bottom: 0, left: 0 }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="srv-head text-center" style={{ marginBottom: 72 }}>
          <div className="section-label mx-auto">What We Do</div>
          <h2 className="font-display font-black" style={{ marginBottom: 20 }}>
            Our{' '}
            <span style={{ background: 'linear-gradient(135deg,#FACC15,#F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Digital Services
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto" style={{ lineHeight: 1.8 }}>
            Swipe or use arrows to explore. Each card reveals what&apos;s included in that service.
          </p>
        </div>

        {/* Carousel */}
        <div
          style={{ position: 'relative', height: 520, maxWidth: 900, margin: '0 auto', userSelect: 'none' }}
          onMouseDown={e => { setDragging(true); dragStart.current = e.clientX; }}
          onMouseMove={e => { if (!dragging) return; if (e.clientX - dragStart.current > 60) { go(-1); setDragging(false); } if (e.clientX - dragStart.current < -60) { go(1); setDragging(false); } }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={e => { dragStart.current = e.touches[0].clientX; }}
          onTouchEnd={e => { const dx = e.changedTouches[0].clientX - dragStart.current; if (dx > 50) go(-1); else if (dx < -50) go(1); }}
        >
          {/* Left peek card */}
          <div style={cardStyle(false, 'left')} onClick={() => go(-1)}>
            <ServiceCardContent svc={prev} color={ACCENT[prev.id] ?? '#3B82F6'} compact />
          </div>

          {/* Center card */}
          <div style={cardStyle(true, 'center')}>
            <ServiceCardContent svc={curr} color={ACCENT[curr.id] ?? '#3B82F6'} />
          </div>

          {/* Right peek card */}
          <div style={cardStyle(false, 'right')} onClick={() => go(1)}>
            <ServiceCardContent svc={next} color={ACCENT[next.id] ?? '#3B82F6'} compact />
          </div>
        </div>

        {/* Nav arrows + dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 48 }}>
          <button onClick={() => go(-1)} aria-label="Previous service"
            style={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', transition: 'all 0.2s', color: '#94A3B8' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            {services.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Service ${i + 1}`}
                style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 999, border: 'none', cursor: 'pointer', transition: 'all 0.3s', background: i === current ? '#3B82F6' : 'rgba(255,255,255,0.15)' }} />
            ))}
          </div>

          <button onClick={() => go(1)} aria-label="Next service"
            style={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer', transition: 'all 0.2s', color: '#94A3B8' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <p style={{ textAlign: 'center', color: '#334155', fontSize: '0.8rem', marginTop: 16 }}>{current + 1} of {total} services</p>
      </div>
    </section>
  );
}

function ServiceCardContent({ svc, color, compact = false }: { svc: typeof services[0]; color: string; compact?: boolean }) {
  return (
    <div style={{ padding: compact ? '32px 28px' : '48px 40px', height: '100%', pointerEvents: 'none' }}>
      {/* Icon */}
      <div style={{ width: 72, height: 72, borderRadius: 18, background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 28 }}>
        {svc.icon}
      </div>

      <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color, marginBottom: 12 }}>Service</div>
      <h3 style={{ color: '#F1F5F9', fontWeight: 800, fontSize: compact ? '1.3rem' : '1.6rem', marginBottom: 16, lineHeight: 1.2, fontFamily: "'Syne', sans-serif" }}>{svc.title}</h3>

      {!compact && (
        <>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 28 }}>{svc.description}</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {svc.features.map(f => (
              <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#CBD5E1', fontSize: '0.88rem' }}>
                <span style={{ color, flexShrink: 0, marginTop: 2, fontWeight: 700 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
