'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animated counter
function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const t = Math.min((now - start) / 1800, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setCount(Math.round(ease * target));
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { number: 50, suffix: '+', label: 'Projects',   icon: '🚀' },
  { number: 30, suffix: '+', label: 'Clients',    icon: '🏢' },
  { number: 5,  suffix: '+', label: 'Years Exp.', icon: '⚡' },
  { number: 100,suffix: '%', label: 'Satisfied',  icon: '💎' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.about-visual', {
        opacity: 0, x: -50, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
      gsap.from('.about-copy', {
        opacity: 0, x: 50, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
      gsap.from('.stat-card', {
        opacity: 0, y: 30, scale: 0.9, stagger: 0.1, duration: 0.6, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.stats-row', start: 'top 85%' },
      });
      gsap.from('.timeline-item', {
        opacity: 0, y: 24, stagger: 0.12, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.timeline-row', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section relative overflow-hidden" style={{ background: '#0D0D1A' }}>
      {/* Orbs */}
      <div className="orb orb-purple absolute w-[500px] h-[500px] top-[-100px] right-[-100px] opacity-25" />
      <div className="orb orb-blue   absolute w-[400px] h-[400px] bottom-0  left-[-100px] opacity-15" />

      <div className="container relative z-10">

        {/* Label + Heading */}
        <div className="text-center mb-16">
          <div className="section-label mx-auto mb-5">About Us</div>
          <h2 className="font-display font-black mb-5">
            <span style={{ background: 'linear-gradient(135deg, #F1F5F9, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Built for
            </span>
            {' '}
            <span style={{ background: 'linear-gradient(135deg, #3B82F6, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Builders
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A passionate team of engineers, designers &amp; strategists making
            brands thrive in the digital world.
          </p>
        </div>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">

          {/* Visual — logo with rotating rings */}
          <div className="about-visual flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)', filter: 'blur(32px)' }} />
              {/* Spin rings */}
              <div className="absolute rounded-full border border-blue-500/20 animate-spin-slow"
                style={{ inset: '-24px' }} />
              <div className="absolute rounded-full border border-purple-500/15 animate-spin-slow"
                style={{ inset: '-48px', animationDirection: 'reverse', animationDuration: '30s' }} />
              {/* Logo circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="relative w-32 h-32">
                    <Image src="/images/logo.png" alt="Techwired Solutions" fill className="object-contain" />
                  </div>
                </div>
              </div>
              {/* Floating chips */}
              <div className="absolute -top-6 -right-6 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-300 animate-float"
                style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
                🌐 Web Dev
              </div>
              <div className="absolute -bottom-6 -left-6 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-300 animate-float"
                style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)', animationDelay: '1.2s' }}>
                📱 Mobile
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-12 px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-300 animate-float"
                style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', animationDelay: '2s' }}>
                🎨 Design
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="about-copy space-y-5">
            <p className="text-gray-300 text-lg leading-relaxed">
              Techwired Solutions is a full-service IT & digital agency focused on creating
              impactful online experiences for modern businesses — from website design and
              mobile apps to branding, video production, and complete digital marketing.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We blend creativity with cutting-edge technology to deliver smart, scalable,
              results-driven solutions that help brands grow in the digital age.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['React/Next.js', 'React Native', 'Node.js', 'GSAP', 'Figma', 'SEO'].map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold text-blue-300"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}>
                  {t}
                </span>
              ))}
            </div>
            <a href="#contact" className="btn btn-primary inline-flex mt-1">Work With Us →</a>
          </div>
        </div>

        {/* Stats row */}
        <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map(s => (
            <div key={s.label} className="stat-card text-center p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-4xl font-black font-display mb-1"
                style={{ background: 'linear-gradient(135deg,#3B82F6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <CountUp target={s.number} suffix={s.suffix} />
              </div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Journey timeline — SIMPLIFIED horizontal strip */}
        <div className="timeline-row">
          <div className="text-center mb-10">
            <div className="section-label mx-auto mb-3">Our Journey</div>
            <h3 className="text-white font-display font-bold text-2xl">From Startup to Full Agency</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { year: '2019', color: '#3B82F6', title: 'Founded',          desc: 'Started with a mission to bring premium digital services to Nepal.' },
              { year: '2021', color: '#A855F7', title: 'Growth Phase',      desc: 'Expanded team and launched full-stack web & mobile for 20+ clients.' },
              { year: '2023', color: '#00D4FF', title: 'Full Agency',       desc: 'Design, dev, SEO, video & branding — all in-house under one roof.' },
              { year: '2025+',color: '#10B981', title: 'Going Global',      desc: 'Serving clients beyond Nepal with our tech-first digital approach.' },
            ].map((m, i) => (
              <div key={m.year} className="timeline-item relative p-6 rounded-2xl transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${m.color}40`;
                  (e.currentTarget as HTMLElement).style.background = `${m.color}0D`;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {/* year badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ background: `${m.color}18`, border: `1px solid ${m.color}35`, color: m.color }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {m.year}
                </div>
                <h4 className="text-white font-bold mb-2">{m.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                {/* step number */}
                <div className="absolute top-4 right-5 text-5xl font-black opacity-[0.06] font-display select-none"
                  style={{ color: m.color }}>
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
