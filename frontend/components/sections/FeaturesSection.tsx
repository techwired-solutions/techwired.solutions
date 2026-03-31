'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: '01',
    title: 'Experienced Full-Stack Engineers',
    description: 'Expert developers with years of industry experience building robust, scalable applications.',
    icon: '👨‍💻',
    color: 'blue',
  },
  {
    number: '02',
    title: 'Creative Designers & Video Editors',
    description: 'Award-winning creative team that transforms your vision into stunning visual experiences.',
    icon: '🎨',
    color: 'purple',
  },
  {
    number: '03',
    title: 'Fast Turnaround',
    description: 'We deliver quality work on tight deadlines — no compromises, no excuses.',
    icon: '⚡',
    color: 'cyan',
  },
  {
    number: '04',
    title: 'Enterprise-Grade Security',
    description: 'Every project built with security-first architecture and best practices.',
    icon: '🔒',
    color: 'blue',
  },
  {
    number: '05',
    title: 'Scalable Digital Solutions',
    description: 'Future-proof architectures that grow alongside your business without costly rewrites.',
    icon: '📈',
    color: 'purple',
  },
  {
    number: '06',
    title: 'Dedicated Client Support',
    description: '24/7 support and a dedicated account manager who knows your project inside out.',
    icon: '🤝',
    color: 'cyan',
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; num: string }> = {
  blue:   { border: 'rgba(59,130,246,0.3)',  bg: 'rgba(59,130,246,0.08)',  text: '#60A5FA', num: '#3B82F6' },
  purple: { border: 'rgba(168,85,247,0.3)',  bg: 'rgba(168,85,247,0.08)',  text: '#C084FC', num: '#A855F7' },
  cyan:   { border: 'rgba(0,212,255,0.3)',   bg: 'rgba(0,212,255,0.06)',   text: '#00D4FF', num: '#00D4FF' },
};

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        opacity: 0,
        y: 60,
        scale: 0.93,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
      gsap.from('.features-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="section relative overflow-hidden" style={{ background: '#0A0A0F' }}>
      <div className="orb orb-blue absolute w-[500px] h-[500px] top-1/2 left-[-200px] opacity-20" />
      <div className="orb orb-purple absolute w-[400px] h-[400px] bottom-0 right-[-100px] opacity-20" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="features-header text-center mb-20">
          <div className="section-label mx-auto mb-6">Why Choose Us</div>
          <h2 className="font-display font-black mb-6 text-white">
            Why{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3B82F6, #00D4FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Techwired</span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FACC15, #F97316)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Solutions</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We combine technical excellence with creative innovation to deliver results that truly matter.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const c = colorMap[feature.color];
            return (
              <div
                key={feature.title}
                className="feature-card group relative rounded-2xl p-8 transition-all duration-300 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid rgba(255,255,255,0.07)`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${c.border}`;
                  (e.currentTarget as HTMLElement).style.background = c.bg;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 30px ${c.border}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Number watermark */}
                <div
                  className="absolute top-4 right-6 text-5xl font-black font-display opacity-10 select-none"
                  style={{ color: c.num }}
                >
                  {feature.number}
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}
                >
                  {feature.icon}
                </div>

                <h3 className="text-white font-bold text-lg mb-3 leading-snug">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${c.num}, transparent)` }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-20 rounded-2xl p-10 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))',
            border: '1px solid rgba(59,130,246,0.2)',
          }}>
          <div className="orb orb-blue absolute w-64 h-64 -top-16 -left-16 opacity-40" />
          <div className="orb orb-purple absolute w-64 h-64 -bottom-16 -right-16 opacity-30" />
          <div className="relative z-10">
            <h3 className="text-white font-display font-bold text-2xl mb-3">
              Ready to Build Something Great?
            </h3>
            <p className="text-gray-400 mb-6">Let's discuss your project and make it happen.</p>
            <a href="#contact" className="btn btn-primary px-8 py-3">
              Start a Conversation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
