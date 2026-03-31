'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['Websites', 'Mobile Apps', 'Brands', 'Solutions', 'Experiences'];

const STATS = [
  { num: '50+',  label: 'Projects' },
  { num: '30+',  label: 'Clients' },
  { num: '5+',   label: 'Years' },
  { num: '100%', label: 'Satisfaction' },
];

export default function HeroSection() {
  const heroRef    = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const [wordIdx, setWordIdx] = useState(0);

  // Cycling word typewriter
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Title character reveal
      const split = new SplitType(titleRef.current!, { types: 'chars,words' });
      gsap.from(split.chars, {
        opacity: 0,
        y: 60,
        rotateX: -80,
        stagger: 0.018,
        duration: 0.9,
        ease: 'back.out(1.7)',
        delay: 0.2,
      });

      // Badge
      gsap.from(badgeRef.current, {
        opacity: 0, y: -20, scale: 0.8,
        duration: 0.7, ease: 'back.out(2)', delay: 0.1,
      });

      // CTA buttons
      gsap.from(ctaRef.current?.children ?? [], {
        opacity: 0, y: 40, scale: 0.9,
        stagger: 0.12, duration: 0.7,
        ease: 'back.out(1.7)', delay: 0.9,
      });

      // Subtle parallax
      gsap.to(heroRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0D0D1A 100%)' }}
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40 z-0" />

      {/* Ambient orbs */}
      <div className="orb orb-blue absolute w-[700px] h-[700px] top-[-200px] left-[-200px] opacity-60" />
      <div className="orb orb-purple absolute w-[500px] h-[500px] bottom-[-100px] right-[-100px] opacity-50" />
      <div className="orb orb-cyan absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

      {/* Background noise layer */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="container relative z-10 text-center flex flex-col items-center gap-8 py-40">

        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-semibold tracking-wide"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          🇳🇵 Nepal&apos;s Premier Digital Agency
        </div>

        {/* Main headline */}
        <div>
          <h1
            ref={titleRef}
            className="font-display font-black tracking-tighter text-white leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #00D4FF 50%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Techwired
            </span>
            <br />
            <span className="text-white">Solutions</span>
          </h1>
        </div>

        {/* Dynamic subtitle */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-xl sm:text-2xl text-gray-400 font-medium" aria-live="polite">
          <span>Powering Your</span>
          <div className="relative overflow-hidden h-9 w-48 sm:w-56" aria-label={WORDS[wordIdx]}>
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
        <p className="max-w-2xl text-lg text-gray-400 leading-relaxed">
          From domain to deployment — we build stunning websites, mobile apps, and complete
          digital identities that make your brand unforgettable.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          <a
            href="#contact"
            className="btn btn-primary text-base px-8 py-4 inline-flex items-center gap-2"
          >
            Start My Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#services"
            className="btn btn-secondary text-base px-8 py-4"
          >
            Explore Services
          </a>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-8 border-t border-white/[0.08] w-full">
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-black font-display"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #00D4FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.num}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10"
        aria-label="Scroll down"
        role="img"
      >
        <span className="text-xs text-gray-600 uppercase tracking-widest" aria-hidden="true">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5" aria-hidden="true">
          <div className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
