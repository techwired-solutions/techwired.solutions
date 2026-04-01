'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: '👨‍💻', color: '#3B82F6', title: 'Expert Engineers',    desc: 'Battle-tested full-stack devs who build scalable, reliable apps.' },
  { icon: '🎨', color: '#A855F7', title: 'Creative Designers',   desc: 'UI/UX designers who turn ideas into stunning visual experiences.' },
  { icon: '⚡', color: '#00D4FF', title: 'Fast Turnaround',      desc: 'We respect your deadlines and deliver quality on time, every time.' },
  { icon: '🔒', color: '#F97316', title: 'Secure by Default',    desc: 'Security-first architecture baked into every project from day one.' },
  { icon: '📈', color: '#10B981', title: 'Built to Scale',       desc: 'Future-proof solutions that grow with your business.' },
  { icon: '🤝', color: '#FACC15', title: 'Dedicated Support',    desc: 'A point of contact who knows your project inside out.' },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.wy-head', { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.wy-card', { opacity: 0, y: 50, scale: 0.95, stagger: 0.09, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.wy-grid', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="section relative overflow-hidden" style={{ background: '#0A0A0F' }}>
      <div className="orb orb-blue   absolute w-[500px] h-[500px] opacity-15" style={{ top: '50%', left: '-200px', transform: 'translateY(-50%)' }} />
      <div className="orb orb-purple absolute w-[400px] h-[400px] opacity-15" style={{ bottom: '-100px', right: '-100px' }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="wy-head text-center" style={{ marginBottom: 72 }}>
          <div className="section-label mx-auto">Why Choose Us</div>
          <h2 className="font-display font-black" style={{ marginBottom: 20 }}>
            Why{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Techwired</span>{' '}
            <span style={{ background: 'linear-gradient(135deg,#FACC15,#F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Solutions?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ lineHeight: 1.8 }}>
            We combine technical excellence with creative innovation to deliver results that truly matter.
          </p>
        </div>

        {/* Grid */}
        <div className="wy-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
          {features.map((f, i) => (
            <div key={f.title} className="wy-card group relative overflow-hidden"
              style={{ padding: '40px 36px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', transition: 'all 0.3s ease', cursor: 'default' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.border = `1px solid ${f.color}45`; el.style.background = `${f.color}0D`; el.style.transform = 'translateY(-7px)'; el.style.boxShadow = `0 24px 56px rgba(0,0,0,0.35), 0 0 32px ${f.color}20`; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.border = '1px solid rgba(255,255,255,0.07)'; el.style.background = 'rgba(255,255,255,0.03)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}
            >
              {/* watermark number */}
              <div className="absolute font-display font-black select-none" style={{ top: 16, right: 20, fontSize: '4.5rem', color: f.color, opacity: 0.07 }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* icon */}
              <div style={{ width: 60, height: 60, borderRadius: 14, background: `${f.color}15`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 24, transition: 'transform 0.3s ease' }}>
                {f.icon}
              </div>

              <h3 className="text-white font-bold" style={{ fontSize: '1.15rem', marginBottom: 12 }}>{f.title}</h3>
              <p className="text-gray-400 text-sm" style={{ lineHeight: 1.75 }}>{f.desc}</p>

              {/* bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.3s', background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div style={{ marginTop: 72, padding: '56px 40px', borderRadius: 24, background: 'linear-gradient(135deg,rgba(59,130,246,0.09),rgba(168,85,247,0.07))', border: '1px solid rgba(59,130,246,0.2)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <h3 className="font-display font-bold text-white" style={{ fontSize: '1.5rem', marginBottom: 12 }}>Ready to Build Something Great?</h3>
          <p className="text-gray-400 text-base" style={{ marginBottom: 28 }}>Let&apos;s discuss your project and make it happen.</p>
          <a href="#contact" className="btn btn-primary" style={{ padding: '14px 36px' }}>Start a Conversation →</a>
        </div>
      </div>
    </section>
  );
}
