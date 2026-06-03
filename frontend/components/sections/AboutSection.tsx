'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated count-up ─── */
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

/* ─── Data ─── */
const stats = [
  { n: 50, s: '+', label: 'Projects Completed', icon: '🚀' },
  { n: 30, s: '+', label: 'Happy Clients',       icon: '🏢' },
  { n: 5,  s: '+', label: 'Years Experience',    icon: '⚡' },
  { n: 100,s: '%', label: 'Client Satisfaction', icon: '💎' },
];

const journey = [
  {
    year: '2019', color: '#3B82F6',
    title: 'Founded',
    desc: 'Started with a bold mission — bringing premium digital services to businesses in Nepal.',
    icon: '🌱',
  },
  {
    year: '2021', color: '#A855F7',
    title: 'Growth Phase',
    desc: 'Expanded our team and launched full-stack web & mobile development for 20+ clients.',
    icon: '📈',
  },
  {
    year: '2023', color: '#00D4FF',
    title: 'Full Agency',
    desc: 'Design, dev, SEO, video & branding — all in-house under one roof.',
    icon: '🏢',
  },
  {
    year: '2025+', color: '#10B981',
    title: 'Going Global',
    desc: 'Serving clients beyond Nepal with a tech-first approach to digital transformation.',
    icon: '🌍',
  },
];

const whyChoose = [
  {
    icon: '⚡',
    title: 'Lightning Fast Delivery',
    desc: 'We ship production-ready products on time — always. Sprint-based workflows ensure zero surprises.',
    color: '#FACC15',
  },
  {
    icon: '🎨',
    title: 'Premium Design Quality',
    desc: 'Every pixel is intentional. Our designers craft experiences that convert visitors into customers.',
    color: '#A855F7',
  },
  {
    icon: '🔒',
    title: 'Secure & Scalable',
    desc: 'Built on rock-solid architectures. Your product scales with you from day one to enterprise.',
    color: '#3B82F6',
  },
  {
    icon: '📞',
    title: '24/7 Dedicated Support',
    desc: 'We don\'t disappear after launch. Our team is always reachable — WhatsApp, email, calls.',
    color: '#10B981',
  },
  {
    icon: '💡',
    title: 'Strategy-First Approach',
    desc: 'We don\'t just build what you ask — we ask the right questions to build what you need.',
    color: '#00D4FF',
  },
  {
    icon: '🏆',
    title: 'Proven Track Record',
    desc: '50+ projects delivered with 100% client satisfaction. Our portfolio speaks for itself.',
    color: '#F97316',
  },
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
      gsap.from('.ab-why-card', { opacity: 0, y: 30, stagger: 0.08, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.ab-why', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section relative overflow-hidden" style={{ background: 'transparent' }}>
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
                { label: '🌐 Web Dev',  color: '#3B82F6', top: -28,   right: -28, delay: '0s' },
                { label: '📱 Mobile',   color: '#A855F7', bottom: -28, left: -28,  delay: '1.2s' },
                { label: '🎨 Design',   color: '#00D4FF', top: '50%',  right: -52, delay: '2s' },
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
            <div key={s.label} className="ab-stat text-center" style={{ padding: '36px 20px', borderRadius: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(59,130,246,0.2)', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
              <div className="font-display font-black" style={{ fontSize: '2.5rem', marginBottom: 6, background: 'linear-gradient(135deg,#3B82F6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <CountUp target={s.n} suffix={s.s} />
              </div>
              <div className="text-gray-400 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Our Journey ── */}
        <div className="ab-journey" style={{ marginBottom: 100 }}>
          <div className="text-center" style={{ marginBottom: 60 }}>
            <div className="section-label mx-auto">Our Journey</div>
            <h3 className="font-display font-bold text-white">From Startup to Full Agency</h3>
            <p className="text-gray-400 max-w-lg mx-auto" style={{ marginTop: 16, lineHeight: 1.8 }}>
              Five years of relentless growth — from a local dream to a full-service digital powerhouse.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2,
              background: 'linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(168,85,247,0.5), rgba(16,185,129,0.3))',
              transform: 'translateX(-50%)',
            }} className="hidden md:block" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {journey.map((m, i) => (
                <div key={m.year} className="ab-journey-card" style={{
                  display: 'flex',
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                  gap: 40, alignItems: 'center',
                }}>
                  {/* Card */}
                  <div style={{
                    flex: 1,
                    padding: '28px 32px', borderRadius: 20,
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${m.color}25`,
                    backdropFilter: 'blur(16px)',
                    transition: 'all 0.3s ease',
                    position: 'relative', overflow: 'hidden',
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${m.color}50`;
                      el.style.background = `${m.color}08`;
                      el.style.transform = 'translateY(-4px)';
                      el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4)`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${m.color}25`;
                      el.style.background = 'rgba(255,255,255,0.02)';
                      el.style.transform = 'translateY(0)';
                      el.style.boxShadow = 'none';
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <span style={{ fontSize: 24 }}>{m.icon}</span>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '4px 12px', borderRadius: 999,
                        background: `${m.color}18`, border: `1px solid ${m.color}35`,
                        color: m.color, fontSize: '0.7rem', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                        {m.year}
                      </div>
                    </div>
                    <h4 className="text-white font-bold" style={{ fontSize: '1.15rem', marginBottom: 10 }}>{m.title}</h4>
                    <p className="text-gray-400 text-sm" style={{ lineHeight: 1.75 }}>{m.desc}</p>
                    <div className="absolute font-display font-black select-none" style={{ bottom: 12, right: 16, fontSize: '5rem', color: m.color, opacity: 0.05 }}>{i + 1}</div>
                  </div>

                  {/* Center node (desktop) */}
                  <div className="hidden md:flex" style={{
                    width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                    background: `${m.color}20`, border: `2px solid ${m.color}60`,
                    alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 16px ${m.color}40`,
                    zIndex: 2,
                  }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: m.color }} />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div style={{ flex: 1 }} className="hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Why Choose Us ── */}
        <div className="ab-why">
          <div className="text-center" style={{ marginBottom: 60 }}>
            <div className="section-label mx-auto">Why Choose Us</div>
            <h3 className="font-display font-bold text-white">The Techwired Advantage</h3>
            <p className="text-gray-400 max-w-lg mx-auto" style={{ marginTop: 16, lineHeight: 1.8 }}>
              We don&apos;t just build products — we build partnerships. Here&apos;s why leading brands trust us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {whyChoose.map((item) => (
              <div key={item.title} className="ab-why-card" style={{
                padding: '32px 28px', borderRadius: 20,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                transition: 'all 0.3s ease',
                position: 'relative', overflow: 'hidden',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${item.color}40`;
                  el.style.background = `${item.color}08`;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${item.color}20`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.07)';
                  el.style.background = 'rgba(255,255,255,0.02)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}>
                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${item.color}15`, border: `1px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, marginBottom: 20,
                }}>
                  {item.icon}
                </div>
                <h4 className="text-white font-bold" style={{ fontSize: '1.05rem', marginBottom: 10 }}>{item.title}</h4>
                <p className="text-gray-400 text-sm" style={{ lineHeight: 1.75 }}>{item.desc}</p>
                {/* Corner accent */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 80, height: 80,
                  background: `radial-gradient(circle at top right, ${item.color}12, transparent 70%)`,
                  borderRadius: '0 20px 0 0',
                }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
