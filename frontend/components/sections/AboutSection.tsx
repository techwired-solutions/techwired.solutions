'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered.current) {
        triggered.current = true;
        const t0 = performance.now();
        const run = (now: number) => {
          const p = Math.min((now - t0) / 1800, 1);
          setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { n: 50,  s: '+', label: 'Projects Completed', icon: '🚀' },
  { n: 30,  s: '+', label: 'Happy Clients',       icon: '🏢' },
  { n: 5,   s: '+', label: 'Years Experience',    icon: '⚡' },
  { n: 100, s: '%', label: 'Client Satisfaction', icon: '💎' },
];

const journey = [
  { year: '2019', color: '#3B82F6', title: 'Founded',       desc: 'Started with a mission to bring premium digital services to businesses in Nepal.' },
  { year: '2021', color: '#A855F7', title: 'Growth Phase',  desc: 'Expanded team and launched full-stack web & mobile development for 20+ clients.' },
  { year: '2023', color: '#00D4FF', title: 'Full Agency',   desc: 'Design, dev, SEO, video & branding — all in-house under one roof.' },
  { year: '2025+',color: '#10B981', title: 'Going Global',  desc: 'Serving clients beyond Nepal with a tech-first approach to digital transformation.' },
];

const skills = ['React / Next.js', 'React Native', 'Node.js', 'GSAP', 'Figma', 'SEO'];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.ab-visual', { opacity: 0, x: -60, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      gsap.from('.ab-copy',   { opacity: 0, x:  60, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      gsap.from('.ab-stat',   { opacity: 0, y: 30, scale: 0.9, stagger: 0.1, duration: 0.7, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.ab-stats', start: 'top 82%' } });
      gsap.from('.ab-journey-card', { opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '.ab-journey', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section relative overflow-hidden" style={{ background: '#0D0D1A' }}>
      {/* Orbs */}
      <div className="orb orb-purple absolute w-[600px] h-[600px] opacity-20" style={{ top: '-150px', right: '-150px' }} />
      <div className="orb orb-blue   absolute w-[500px] h-[500px] opacity-15" style={{ bottom: '-100px', left: '-100px' }} />

      <div className="container relative z-10">

        {/* ── Label + heading ── */}
        <div className="text-center" style={{ marginBottom: 80 }}>
          <div className="section-label mx-auto">About Us</div>
          <h2 className="font-display font-black" style={{ marginBottom: 24 }}>
            <span style={{ background: 'linear-gradient(135deg,#F1F5F9,#94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Built for</span>
            {' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Builders</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto" style={{ lineHeight: 1.8 }}>
            A passionate team of engineers, designers &amp; strategists making brands thrive in the digital world.
          </p>
        </div>

        {/* ── Two-column intro ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: 80, marginBottom: 100 }}>
          {/* Visual */}
          <div className="ab-visual flex items-center justify-center">
            <div className="relative" style={{ width: 280, height: 280 }}>
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }} />
              <div className="absolute rounded-full border border-blue-500/20 animate-spin-slow"   style={{ inset: '-28px' }} />
              <div className="absolute rounded-full border border-purple-500/15 animate-spin-slow" style={{ inset: '-56px', animationDirection: 'reverse', animationDuration: '30s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
                  <div className="relative w-36 h-36"><Image src="/images/logo.png" alt="Techwired Solutions logo" fill className="object-contain" /></div>
                </div>
              </div>
              {/* Chips */}
              {[
                { label: '🌐 Web Dev',    color: '#3B82F6', top: -28, right: -28, delay: '0s' },
                { label: '📱 Mobile',     color: '#A855F7', bottom: -28, left: -28, delay: '1.2s' },
                { label: '🎨 Design',     color: '#00D4FF', top: '50%', right: -52, delay: '2s' },
              ].map((c) => (
                <div key={c.label}
                  className="absolute px-3 py-2 rounded-xl text-xs font-bold animate-float"
                  style={{
                    background: `${c.color}15`, border: `1px solid ${c.color}30`, color: c.color,
                    top: c.top, right: c.right, bottom: (c as any).bottom, left: (c as any).left,
                    animationDelay: c.delay, transform: c.top === '50%' ? 'translateY(-50%)' : undefined,
                  }}>
                  {c.label}
                </div>
              ))}
            </div>
          </div>

          {/* Copy */}
          <div className="ab-copy" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p className="text-gray-300 text-lg" style={{ lineHeight: 1.85 }}>
              Techwired Solutions is a full-service IT &amp; digital agency focused on creating impactful online
              experiences for modern businesses — from website design and mobile apps to branding, video production,
              and complete digital marketing.
            </p>
            <p className="text-gray-400" style={{ lineHeight: 1.85 }}>
              We blend creativity with cutting-edge technology to deliver smart, scalable, results-driven solutions
              that help brands grow in the digital age.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, paddingTop: 4 }}>
              {skills.map(t => (
                <span key={t} className="text-xs font-semibold text-blue-300" style={{ padding: '6px 14px', borderRadius: 999, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}>{t}</span>
              ))}
            </div>
            <div style={{ paddingTop: 8 }}>
              <a href="#contact" className="btn btn-primary inline-flex">Work With Us →</a>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="ab-stats grid grid-cols-2 md:grid-cols-4" style={{ gap: 20, marginBottom: 100 }}>
          {stats.map(s => (
            <div key={s.label} className="ab-stat text-center" style={{ padding: '36px 20px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
              <div className="font-display font-black" style={{ fontSize: '2.5rem', marginBottom: 6, background: 'linear-gradient(135deg,#3B82F6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <CountUp target={s.n} suffix={s.s} />
              </div>
              <div className="text-gray-400 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Journey ── */}
        <div className="ab-journey">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <div className="section-label mx-auto">Our Journey</div>
            <h3 className="font-display font-bold text-white">From Startup to Full Agency</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 20 }}>
            {journey.map((m, i) => (
              <div key={m.year} className="ab-journey-card relative overflow-hidden" style={{ padding: '32px 28px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${m.color}40`; el.style.background = `${m.color}0D`; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.3)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.background = 'rgba(255,255,255,0.03)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, background: `${m.color}18`, border: `1px solid ${m.color}35`, color: m.color, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />{m.year}
                </div>
                <h4 className="text-white font-bold" style={{ fontSize: '1.1rem', marginBottom: 10 }}>{m.title}</h4>
                <p className="text-gray-400 text-sm" style={{ lineHeight: 1.75 }}>{m.desc}</p>
                <div className="absolute font-display font-black select-none" style={{ top: 12, right: 16, fontSize: '4rem', color: m.color, opacity: 0.06 }}>{i + 1}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
