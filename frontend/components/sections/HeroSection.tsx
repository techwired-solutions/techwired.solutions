'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('../3d/HeroScene'), { ssr: false });

const WORDS = ['Websites', 'Mobile Apps', 'Brands', 'Solutions', 'Experiences'];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #06060F 0%, #0D0D1A 100%)',
      }}
    >
      {/* 3D scene */}
      {mounted && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <HeroScene />
        </div>
      )}

      {/* gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(6,6,15,0.6) 0%, rgba(6,6,15,0.75) 100%)' }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: 32,
        padding: '160px 24px 100px',
        maxWidth: 900, margin: '0 auto',
      }}>

        {/* Main headline */}
        <div>
          <h1 style={{
            fontFamily: "'Syne', 'Inter', sans-serif",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            margin: 0,
          }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              background: 'linear-gradient(135deg, #3B82F6 0%, #00D4FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Techwired
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              background: 'linear-gradient(135deg, #FACC15 0%, #F97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Solutions
            </span>
          </h1>
        </div>

        {/* Cycling subtitle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: '#94A3B8', fontWeight: 500 }} aria-live="polite">
          <span>Powering Your</span>
          <div style={{ position: 'relative', overflow: 'hidden', height: '1.6em', minWidth: 200 }} aria-label={WORDS[wordIdx]}>
            {WORDS.map((w, i) => (
              <span key={w} aria-hidden={i !== wordIdx} style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #3B82F6, #A855F7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                opacity: i === wordIdx ? 1 : 0,
                transform: i === wordIdx ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s, transform 0.5s',
              }}>{w}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: '1.1rem', color: '#64748B', maxWidth: 520, lineHeight: 1.85, margin: 0 }}>
          From domain to deployment — websites, mobile apps, branding, and
          everything digital to make your business stand out.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', paddingTop: 8 }}>
          <a href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 36px', borderRadius: 999, fontWeight: 700,
              fontSize: '1rem', color: '#fff', textDecoration: 'none',
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              boxShadow: '0 0 32px rgba(59,130,246,0.5)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 56px rgba(59,130,246,0.8)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(59,130,246,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Start My Project
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
          <a href="#services"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 36px', borderRadius: 999, fontWeight: 600,
              fontSize: '1rem', color: '#fff', textDecoration: 'none',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
          >
            Explore Services
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px 48px', paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.07)', width: '100%' }}>
          {[{ n: '50+', l: 'Projects' }, { n: '30+', l: 'Clients' }, { n: '5+', l: 'Years' }, { n: '100%', l: 'Satisfaction' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: "'Syne', sans-serif", background: 'linear-gradient(135deg,#FACC15,#F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.n}</div>
              <div style={{ fontSize: '0.72rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10 }} role="img" aria-label="Scroll down">
        <span style={{ fontSize: '0.65rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Scroll</span>
        <div style={{ width: 20, height: 32, borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'center', paddingTop: 6, animation: 'bounce 1.5s infinite' }}>
          <div style={{ width: 4, height: 8, borderRadius: 999, background: '#3B82F6', animation: 'pulse 1.5s infinite' }} />
        </div>
      </div>
    </section>
  );
}
