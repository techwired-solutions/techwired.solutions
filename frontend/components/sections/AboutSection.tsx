'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 50,   suffix: '+', label: 'Projects Completed', icon: '🚀' },
  { number: 30,   suffix: '+', label: 'Companies Served',   icon: '🏢' },
  { number: 5,    suffix: '+', label: 'Years Experience',   icon: '⚡' },
  { number: 100,  suffix: '%', label: 'Client Satisfaction', icon: '💎' },
];

const milestones = [
  {
    year: '2019',
    title: 'Founded',
    desc: 'Techwired Solutions was born with a mission to democratize premium digital services in Nepal.',
  },
  {
    year: '2021',
    title: 'Growth Phase',
    desc: 'Expanded our team and launched full-stack web & mobile services for 20+ clients.',
  },
  {
    year: '2023',
    title: 'Full Digital Agency',
    desc: 'Became a full-service digital powerhouse — design, dev, SEO, video, branding all in-house.',
  },
  {
    year: '2025+',
    title: 'Going Global',
    desc: 'Serving clients beyond Nepal with our scalable, tech-first approach to digital transformation.',
  },
];

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
        const duration = 1800;
        const start = performance.now();
        const animate = (now: number) => {
          const elapsed = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - elapsed, 3);
          setCount(Math.round(ease * target));
          if (elapsed < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Fade in left/right panels
      gsap.from('.about-left', {
        opacity: 0, x: -60, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('.about-right', {
        opacity: 0, x: 60, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      // Milestone items stagger
      gsap.from('.milestone-item', {
        opacity: 0, y: 30, stagger: 0.15, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.milestones-section', start: 'top 80%' },
      });

      // Stat cards
      gsap.from('.stat-card-dark', {
        opacity: 0, scale: 0.85, stagger: 0.1, duration: 0.6, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section relative overflow-hidden" style={{ background: '#0D0D1A' }}>
      {/* Orbs */}
      <div className="orb orb-purple absolute w-[400px] h-[400px] top-0 right-0 opacity-30" />
      <div className="orb orb-blue absolute w-[300px] h-[300px] bottom-0 left-0 opacity-20" />

      <div className="container relative z-10">

        {/* Section label */}
        <div className="text-center mb-20">
          <div className="section-label mx-auto mb-6">Our Story</div>
          <h2
            className="font-display font-black mb-6"
            style={{
              background: 'linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            Built by Builders, <br />
            <span style={{
              background: 'linear-gradient(135deg, #3B82F6, #A855F7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              For Builders
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We&apos;re a passionate team of engineers, designers, and strategists united by one goal:
            making your brand thrive in the digital world.
          </p>
        </div>

        {/* Two-column intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Logo visual */}
          <div className="about-left relative flex items-center justify-center">
            <div className="relative w-72 h-72">
              {/* Glow halo */}
              <div className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)', filter: 'blur(30px)' }} />
              {/* Rings */}
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-spin-slow" style={{ transform: 'scale(1.3)' }} />
              <div className="absolute inset-0 rounded-full border border-purple-500/15 animate-spin-slow" style={{ transform: 'scale(1.55)', animationDirection: 'reverse', animationDuration: '30s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-52 h-52 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="relative w-36 h-36">
                    <Image src="/images/logo.png" alt="Techwired Solutions logo" fill className="object-contain" />
                  </div>
                </div>
              </div>
              {/* Floating chips */}
              <div className="absolute -top-4 -right-4 glass-card px-3 py-2 rounded-xl text-xs font-bold text-blue-300 border border-blue-500/20 animate-float">
                🌐 Web Dev
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card px-3 py-2 rounded-xl text-xs font-bold text-purple-300 border border-purple-500/20 animate-float" style={{ animationDelay: '1s' }}>
                📱 Mobile Apps
              </div>
              <div className="absolute top-1/2 -right-8 glass-card px-3 py-2 rounded-xl text-xs font-bold text-cyan-300 border border-cyan-500/20 animate-float" style={{ animationDelay: '2s' }}>
                🎨 Design
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="about-right space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              Techwired Solutions is a full-service IT and digital solutions company focused on
              creating impactful online experiences for modern businesses. We provide end-to-end
              services including website design, UI/UX development, graphic design, promotional
              videos, digital advertising, and complete social media management.
            </p>
            <p className="text-gray-400 leading-relaxed">
              By blending creativity with cutting-edge technology, we deliver smart, scalable, and
              results-driven solutions that help brands grow and succeed in the digital world.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['React / Next.js', 'React Native', 'Node.js', 'GSAP', 'Figma', 'SEO'].map(tag => (
                <span key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-blue-300 border border-blue-500/25"
                  style={{ background: 'rgba(59,130,246,0.08)' }}>
                  {tag}
                </span>
              ))}
            </div>
            <a href="#contact" className="btn btn-primary inline-flex mt-2">
              Work With Us →
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {stats.map(stat => (
            <div key={stat.label} className="stat-card-dark glass-card p-6 text-center neon-border-blue">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className="text-4xl font-black font-display mb-1"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #00D4FF)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}
              >
                <CountUp target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="milestones-section">
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4">Our Journey</div>
            <h3 className="text-2xl font-display font-bold text-white">From Startup to Full Agency</h3>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0" />
            <div className="space-y-8 md:space-y-0">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="milestone-item relative grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 md:gap-8 items-center mb-8"
                >
                  {i % 2 === 0 ? (
                    <>
                      <div className="glass-card p-6 rounded-2xl border border-white/[0.08] hover:border-blue-500/30 transition-colors">
                        <div className="text-blue-400 text-sm font-bold mb-2">{m.year}</div>
                        <h4 className="text-white font-bold text-lg mb-2">{m.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                      </div>
                      <div className="hidden md:flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-[#0D0D1A] ring-2 ring-blue-500/50" />
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div className="hidden md:flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-purple-500 border-4 border-[#0D0D1A] ring-2 ring-purple-500/50" />
                      </div>
                      <div className="glass-card p-6 rounded-2xl border border-white/8 hover:border-purple-500/30 transition-colors">
                        <div className="text-purple-400 text-sm font-bold mb-2">{m.year}</div>
                        <h4 className="text-white font-bold text-lg mb-2">{m.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
