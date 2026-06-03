'use client';

import React, { useEffect, useState } from 'react';

const WORDS = ['Websites', 'Mobile Apps', 'Brands', 'Solutions', 'Experiences'];

const STATS = [
  { n: '50+', l: 'Projects' },
  { n: '30+', l: 'Clients' },
  { n: '5+', l: 'Years' },
  { n: '100%', l: 'Satisfaction' },
];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Ambient orb — blue */}
      <div style={{
        position: 'absolute', top: '-15%', left: '-10%', zIndex: 0, pointerEvents: 'none',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)',
        filter: 'blur(60px)',
        animation: 'orbDrift1 12s ease-in-out infinite alternate',
      }} />

      {/* Ambient orb — purple */}
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-8%', zIndex: 0, pointerEvents: 'none',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 65%)',
        filter: 'blur(70px)',
        animation: 'orbDrift2 15s ease-in-out infinite alternate',
      }} />

      {/* Ambient orb — cyan small */}
      <div style={{
        position: 'absolute', top: '40%', right: '15%', zIndex: 0, pointerEvents: 'none',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 65%)',
        filter: 'blur(50px)',
        animation: 'orbDrift1 9s ease-in-out infinite alternate-reverse',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: 20,
        padding: '160px 24px 60px',
        maxWidth: 900, margin: '0 auto',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 18px', borderRadius: 999,
          background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)',
          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#60A5FA',
          animation: mounted ? 'fadeInDown 0.6s ease-out forwards' : 'none',
          opacity: mounted ? undefined : 0,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 6px #3B82F6' }} />
          Full-Service Digital Agency
        </div>

        {/* Main heading */}
        <h1 style={{
          margin: 0,
          fontFamily: "'Montserrat', 'Syne', sans-serif",
          fontSize: 'clamp(2.8rem, 7vw, 6rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #93C5FD 45%, #3B82F6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.35))',
          animation: mounted ? 'fadeInUp 0.7s ease-out 0.1s forwards' : 'none',
          opacity: mounted ? undefined : 0,
        }}>
          TECHWIRED<br />SOLUTIONS
        </h1>

        {/* Cycling subtitle */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
          color: '#94A3B8', fontWeight: 500,
          animation: mounted ? 'fadeInUp 0.7s ease-out 0.25s forwards' : 'none',
          opacity: mounted ? undefined : 0,
        }} aria-live="polite">
          <span>Powering Your</span>
          <div style={{ position: 'relative', overflow: 'hidden', height: '1.6em', minWidth: 180 }} aria-label={WORDS[wordIdx]}>
            {WORDS.map((w, i) => (
              <span key={w} aria-hidden={i !== wordIdx} style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                opacity: i === wordIdx ? 1 : 0,
                transform: i === wordIdx ? 'translateY(0)' : i < wordIdx ? 'translateY(-24px)' : 'translateY(24px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}>{w}</span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '1.05rem', color: '#64748B',
          maxWidth: 520, lineHeight: 1.85, margin: 0,
          animation: mounted ? 'fadeInUp 0.7s ease-out 0.35s forwards' : 'none',
          opacity: mounted ? undefined : 0,
        }}>
          From domain to deployment — websites, mobile apps, branding, and
          everything digital to make your business stand out.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', paddingTop: 4,
          animation: mounted ? 'fadeInUp 0.7s ease-out 0.45s forwards' : 'none',
          opacity: mounted ? undefined : 0,
        }}>
          <a href="#contact" className="hero-cta-primary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '15px 36px', borderRadius: 999, fontWeight: 700,
              fontSize: '1rem', color: '#fff', textDecoration: 'none',
              background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
              boxShadow: '0 0 28px rgba(59,130,246,0.4)',
              transition: 'all 0.3s ease',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 0 52px rgba(59,130,246,0.7)';
              el.style.transform = 'translateY(-2px) scale(1.02)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 0 28px rgba(59,130,246,0.4)';
              el.style.transform = 'translateY(0) scale(1)';
            }}
          >
            Start My Project
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
          <a href="#services"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '15px 36px', borderRadius: 999, fontWeight: 600,
              fontSize: '1rem', color: '#fff', textDecoration: 'none',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(59,130,246,0.1)';
              el.style.borderColor = 'rgba(59,130,246,0.5)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(255,255,255,0.04)';
              el.style.borderColor = 'rgba(255,255,255,0.18)';
              el.style.transform = 'translateY(0)';
            }}
          >
            Explore Services
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '12px 48px', paddingTop: 44,
          borderTop: '1px solid rgba(255,255,255,0.07)', width: '100%',
          animation: mounted ? 'fadeInUp 0.7s ease-out 0.6s forwards' : 'none',
          opacity: mounted ? undefined : 0,
        }}>
          {STATS.map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem', fontWeight: 900,
                fontFamily: "'Montserrat', 'Syne', sans-serif",
                background: 'linear-gradient(135deg, #FACC15, #F97316)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                filter: 'drop-shadow(0 0 12px rgba(250,204,21,0.3))',
              }}>{s.n}</div>
              <div style={{ fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10,
      }}>
        <span style={{ fontSize: '0.6rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Scroll</span>
        <div style={{
          width: 20, height: 32, borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', justifyContent: 'center', paddingTop: 6,
        }}>
          <div style={{ width: 3, height: 8, borderRadius: 999, background: '#3B82F6', animation: 'scrollPulse 1.6s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes orbDrift1 {
          from { transform: translate(0px, 0px) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes orbDrift2 {
          from { transform: translate(0px, 0px) scale(1); }
          to   { transform: translate(-30px, -40px) scale(1.05); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(8px); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
