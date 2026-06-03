'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Merged feature cards from both sections ─── */
const features = [
  {
    icon: '👨‍💻',
    color: '#3B82F6',
    title: 'Expert Engineers',
    desc: 'Battle-tested full-stack devs who build scalable, reliable web and mobile applications with clean, maintainable code. 50+ projects shipped.',
    span: 'lg:col-span-2 lg:row-span-2',
    isLarge: true,
  },
  {
    icon: '💡',
    color: '#00D4FF',
    title: 'Strategy-First',
    desc: "We don't just build what you ask — we ask the right questions to build what you actually need.",
    span: 'lg:col-span-2 lg:row-span-1',
  },
  {
    icon: '⚡',
    color: '#FACC15',
    title: 'Fast Delivery',
    desc: 'Sprint-based workflows ensure zero surprises. We ship production-ready products on time — always.',
    span: 'lg:col-span-1 lg:row-span-1',
  },
  {
    icon: '🔒',
    color: '#F97316',
    title: 'Secure & Scalable',
    desc: 'Security-first architecture baked in from day one. Your product scales from MVP to enterprise.',
    span: 'lg:col-span-1 lg:row-span-1',
  },
  {
    icon: '🎨',
    color: '#A855F7',
    title: 'Premium Design',
    desc: 'Every pixel is intentional. Our UI/UX designers craft experiences that convert visitors into customers.',
    span: 'lg:col-span-2 lg:row-span-1',
  },
  {
    icon: '🤝',
    color: '#10B981',
    title: '24/7 Support',
    desc: "We don't disappear after launch. Our team is always reachable — WhatsApp, email, or calls.",
    span: 'lg:col-span-2 lg:row-span-1',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      /* ── Header ── */
      gsap.from('.wy-head', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      /* ── Bento cards ── */
      gsap.from('.feat-card', {
        opacity: 0,
        y: 50,
        scale: 0.95,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.wy-grid',
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="section relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="orb orb-blue   absolute w-[500px] h-[500px] opacity-15" style={{ top: '50%', left: '-200px', transform: 'translateY(-50%)' }} />
      <div className="orb orb-purple absolute w-[400px] h-[400px] opacity-15" style={{ bottom: '-100px', right: '-100px' }} />

      <div className="container relative z-10">
        {/* ── Header ── */}
        <div className="wy-head text-center" style={{ marginBottom: 72 }}>
          <div className="section-label mx-auto">Why Choose Us</div>
          <h2 className="font-display font-black" style={{ marginBottom: 20 }}>
            Why{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Techwired</span>{' '}
            <span style={{ background: 'linear-gradient(135deg,#FACC15,#F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Solutions?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ lineHeight: 1.8 }}>
            We combine technical excellence with creative innovation to deliver results that truly matter — from strategy to launch and beyond.
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="wy-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 20 }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`feat-card group relative ${f.span}`}
              style={{
                padding: f.isLarge ? '56px 40px' : '36px 32px',
                borderRadius: 24,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${f.color}50`;
                el.style.background   = `${f.color}10`;
                el.style.transform    = 'translateY(-5px) scale(1.01)';
                el.style.boxShadow    = `0 20px 50px rgba(0,0,0,0.5), 0 0 20px ${f.color}20`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.08)';
                el.style.background   = 'rgba(255,255,255,0.02)';
                el.style.transform    = 'translateY(0) scale(1)';
                el.style.boxShadow    = 'none';
              }}
            >
              {/* Watermark number */}
              <div
                className="absolute font-display font-black select-none pointer-events-none"
                style={{ top: 16, right: 24, fontSize: f.isLarge ? '6rem' : '4rem', color: f.color, opacity: 0.05 }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: f.isLarge ? 72 : 56,
                  height: f.isLarge ? 72 : 56,
                  borderRadius: 16,
                  background: `${f.color}15`,
                  border: `1px solid ${f.color}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: f.isLarge ? 32 : 24,
                  marginBottom: f.isLarge ? 32 : 24,
                  transition: 'all 0.3s ease',
                }}
              >
                {f.icon}
              </div>

              <h3
                className="text-white font-bold"
                style={{ fontSize: f.isLarge ? '1.5rem' : '1.1rem', marginBottom: 12, lineHeight: 1.2 }}
              >
                {f.title}
              </h3>
              <p
                className="text-gray-400"
                style={{ fontSize: f.isLarge ? '1rem' : '0.88rem', lineHeight: 1.7, maxWidth: f.isLarge ? '90%' : '100%' }}
              >
                {f.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* ── CTA block ── */}
        <div
          style={{
            marginTop: 72,
            padding: '56px 40px',
            borderRadius: 24,
            background: 'linear-gradient(135deg,rgba(59,130,246,0.05),rgba(168,85,247,0.04))',
            border: '1px solid rgba(59,130,246,0.2)',
            backdropFilter: 'blur(16px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <h3 className="font-display font-bold text-white" style={{ fontSize: '1.5rem', marginBottom: 12 }}>
            Ready to Build Something Great?
          </h3>
          <p className="text-gray-400 text-base" style={{ marginBottom: 28 }}>
            Let&apos;s discuss your project and make it happen.
          </p>
          <a href="#contact" className="btn btn-primary" style={{ padding: '14px 36px' }}>
            Start a Conversation →
          </a>
        </div>
      </div>
    </section>
  );
}
