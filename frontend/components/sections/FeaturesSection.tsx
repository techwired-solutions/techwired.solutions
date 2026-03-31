'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: '👨‍💻', color: '#3B82F6', title: 'Expert Engineers',      desc: 'Battle-tested full-stack developers who build scalable, reliable apps.' },
  { icon: '🎨', color: '#A855F7', title: 'Creative Designers',     desc: 'UI/UX designers and video editors who turn ideas into stunning visuals.' },
  { icon: '⚡', color: '#00D4FF', title: 'Fast Delivery',          desc: 'We respect deadlines and deliver quality work on time, every time.' },
  { icon: '🔒', color: '#F97316', title: 'Secure by Default',      desc: 'Security-first architecture baked into every project from day one.' },
  { icon: '📈', color: '#10B981', title: 'Built to Scale',         desc: 'Future-proof solutions that grow with your business without costly rewrites.' },
  { icon: '🤝', color: '#FACC15', title: 'Dedicated Support',      desc: 'A dedicated point of contact who knows your project inside and out.' },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.why-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('.why-card', {
        opacity: 0, y: 50, scale: 0.95,
        stagger: 0.08, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.why-grid', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="section relative overflow-hidden" style={{ background: '#0A0A0F' }}>
      <div className="orb orb-blue   absolute w-[450px] h-[450px] top-1/2 left-[-200px] opacity-20" />
      <div className="orb orb-purple absolute w-[350px] h-[350px] bottom-0  right-[-100px] opacity-20" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="why-header text-center mb-16">
          <div className="section-label mx-auto mb-5">Why Choose Us</div>
          <h2 className="font-display font-black mb-5 text-white">
            Why{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Techwired
            </span>{' '}
            <span style={{ background: 'linear-gradient(135deg,#FACC15,#F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Solutions?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We combine technical excellence with creative innovation to deliver results that truly matter.
          </p>
        </div>

        {/* Cards grid */}
        <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="why-card group relative rounded-2xl p-7 transition-all duration-300 cursor-default overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = `1px solid ${f.color}45`;
                el.style.background = `${f.color}0D`;
                el.style.transform = 'translateY(-6px)';
                el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.35), 0 0 30px ${f.color}20`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = '1px solid rgba(255,255,255,0.07)';
                el.style.background = 'rgba(255,255,255,0.03)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* big number watermark */}
              <div className="absolute top-3 right-5 text-6xl font-black font-display opacity-[0.07] select-none"
                style={{ color: f.color }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* icon box */}
              <div className="w-13 h-13 w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                {f.icon}
              </div>

              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>

              {/* bottom glow line */}
              <div className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-10 rounded-2xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.09),rgba(168,85,247,0.09))', border: '1px solid rgba(59,130,246,0.2)' }}>
          <h3 className="text-white font-display font-bold text-xl mb-2">Ready to Build Something Great?</h3>
          <p className="text-gray-400 text-sm mb-6">Let&apos;s discuss your project and make it happen.</p>
          <a href="#contact" className="btn btn-primary px-8 py-3">Start a Conversation →</a>
        </div>
      </div>
    </section>
  );
}
