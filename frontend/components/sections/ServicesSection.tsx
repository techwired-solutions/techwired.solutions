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
      gsap.from('.srv-head', { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out', immediateRender: false, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Get cards: prev, current, next
  const getCard = (offset: number) => services[(current + offset + total) % total];
  const prev = getCard(-1);
  const curr = getCard(0);
  const next = getCard(1);

  return (
    <section ref={sectionRef} id="services" className="section relative overflow-hidden" style={{ background: 'transparent' }}>
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
            Our cards are interactive — click to flip and reveal the technical details within each service.
          </p>
        </div>

        {/* Carousel */}
        <div
          style={{ position: 'relative', height: 440, maxWidth: 900, margin: '0 auto', userSelect: 'none', perspective: 1500 }}
          onMouseDown={e => { setDragging(true); dragStart.current = e.clientX; }}
          onMouseMove={e => { 
            if (!dragging) return; 
            if (e.clientX - dragStart.current > 60) { go(-1); setDragging(false); } 
            if (e.clientX - dragStart.current < -60) { go(1); setDragging(false); } 
          }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={e => { dragStart.current = e.touches[0].clientX; }}
          onTouchEnd={e => { 
            const dx = e.changedTouches[0].clientX - dragStart.current; 
            if (dx > 50) go(-1); else if (dx < -50) go(1); 
          }}
        >
          {/* Left peek card */}
          <ServiceCard 
            svc={prev} 
            color={ACCENT[prev.id] ?? '#3B82F6'} 
            position="left" 
            onClick={() => go(-1)}
          />

          {/* Center card */}
          <ServiceCard 
            svc={curr} 
            color={ACCENT[curr.id] ?? '#3B82F6'} 
            position="center" 
          />

          {/* Right peek card */}
          <ServiceCard 
            svc={next} 
            color={ACCENT[next.id] ?? '#3B82F6'} 
            position="right" 
            onClick={() => go(1)}
          />
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
      </div>
    </section>
  );
}

function ServiceCard({ svc, color, position, onClick }: { svc: typeof services[0]; color: string; position: 'left' | 'right' | 'center'; onClick?: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isCenter = position === 'center';

  // State reset on card change
  useEffect(() => {
    setIsFlipped(false);
  }, [svc.id]);

  const toggleFlip = (e: React.MouseEvent) => {
    if (!isCenter) {
      if (onClick) onClick();
      return;
    }
    // Only flip if not dragging. Carousel container handles major dragging.
    setIsFlipped(!isFlipped);
  };

  const xOffset = position === 'left' ? 'calc(-50% - 280px)' : position === 'right' ? 'calc(-50% + 280px)' : '-50%';
  const scale = isCenter ? 1 : 0.85;
  const zIdx = isCenter ? 10 : 1;
  const opacity = isCenter ? 1 : 0.6;
  const filter = isCenter ? 'none' : 'blur(1px)';

  return (
    <div
      onClick={toggleFlip}
      style={{
        position: 'absolute', top: 0, left: '50%',
        transform: `translateX(${xOffset}) scale(${scale})`,
        width: '100%', maxWidth: isCenter ? 400 : 360, height: '100%',
        zIndex: zIdx, opacity, filter,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Container for flip */}
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        
        {/* Front Face */}
        <div style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          backfaceVisibility: 'hidden',
          background: isCenter ? `linear-gradient(145deg, ${color}18 0%, rgba(13,13,26,0.85) 100%)` : 'rgba(255,255,255,0.02)',
          border: isCenter ? `1px solid ${color}60` : '1px solid rgba(255,255,255,0.07)',
          borderRadius: 24,
          backdropFilter: 'blur(12px)',
          boxShadow: isCenter ? `0 32px 80px rgba(0,0,0,0.6), 0 0 60px ${color}25` : 'none',
          padding: '40px 32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 24 }}>
            {svc.icon}
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color, marginBottom: 12 }}>Service</div>
          <h3 style={{ color: '#F1F5F9', fontWeight: 800, fontSize: '1.6rem', marginBottom: 20, lineHeight: 1.2, fontFamily: "'Syne', sans-serif" }}>{svc.title}</h3>
          
          {isCenter && (
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, color: '#94A3B8', fontSize: '0.85rem', fontWeight: 500 }}>
              <span>Click for details</span>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          )}
        </div>

        {/* Back Face */}
        <div style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: `linear-gradient(145deg, rgba(13,13,26,0.95) 0%, ${color}25 100%)`,
          border: `1px solid ${color}80`,
          borderRadius: 24,
          backdropFilter: 'blur(16px)',
          padding: '32px 28px',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: '1.5rem' }}>{svc.icon}</span>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{svc.title}</h4>
          </div>
          
          <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 24 }}>{svc.description}</p>
          
          <div style={{ fontWeight: 700, fontSize: '0.7rem', color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Key Features</div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {svc.features.map(f => (
              <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#CBD5E1', fontSize: '0.82rem' }}>
                <span style={{ color, flexShrink: 0, fontWeight: 700 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 'auto', textAlign: 'center', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.08)', color: '#64748B', fontSize: '0.75rem' }}>
            Click to flip back
          </div>
        </div>

      </div>
    </div>
  );
}
