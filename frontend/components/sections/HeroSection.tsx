'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Restore 3D background scene
const HeroScene = dynamic(() => import('../3d/HeroScene'), { ssr: false });

const WORDS = ['Websites', 'Mobile Apps', 'Brands', 'Solutions', 'Experiences'];

const STATS = [
  { num: '50+',  label: 'Projects' },
  { num: '30+',  label: 'Clients' },
  { num: '5+',   label: 'Years' },
  { num: '100%', label: 'Satisfaction' },
];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [mounted,  setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06060F 0%, #0D0D1A 100%)' }}
    >
      {/* ── 3D scene background ── */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>
      )}

      {/* dark gradient overlay so text stays readable */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(180deg, rgba(6,6,15,0.55) 0%, rgba(6,6,15,0.7) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center gap-7 px-4 max-w-5xl mx-auto py-36">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          🇳🇵 Nepal&apos;s Premier Digital Agency
        </div>

        {/* Headline — two words, NO SplitType so gradient stays intact */}
        <div>
          <h1 className="font-display font-black tracking-tight leading-none"
            style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)', lineHeight: 1.05 }}>
            {/* "Techwired" in neon blue exactly as before */}
            <span
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #00D4FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'block',
              }}
            >
              Techwired
            </span>
            <span className="text-white" style={{ display: 'block' }}>Solutions</span>
          </h1>
        </div>

        {/* Cycling subtitle */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-lg sm:text-2xl text-gray-300 font-medium" aria-live="polite">
          <span>Powering Your</span>
          <div className="relative overflow-hidden h-9 min-w-[170px]" aria-label={WORDS[wordIdx]}>
            {WORDS.map((word, i) => (
              <span
                key={word}
                aria-hidden={i !== wordIdx}
                className="absolute inset-0 flex items-center justify-center font-bold transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: i === wordIdx ? 1 : 0,
                  transform: i === wordIdx ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="max-w-xl text-base sm:text-lg text-gray-400 leading-relaxed">
          From domain to deployment — websites, mobile apps, branding, and
          everything digital to make your business stand out.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              boxShadow: '0 0 28px rgba(59,130,246,0.5)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 48px rgba(59,130,246,0.75)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(59,130,246,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Start My Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-base border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
          >
            Explore Services
          </a>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 pt-6 border-t border-white/[0.08] w-full mt-2">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black font-display"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #00D4FF)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                {s.num}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" aria-label="Scroll down" role="img">
        <span className="text-xs text-gray-600 uppercase tracking-widest" aria-hidden="true">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5 animate-bounce" aria-hidden="true">
          <div className="w-1 h-2 bg-blue-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}
