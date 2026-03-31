'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '../forms/ContactForm';

gsap.registerPlugin(ScrollTrigger);

const contactCards = [
  { icon: '📧', label: 'Email',    value: 's.techwired@gmail.com',        href: 'mailto:s.techwired@gmail.com', color: '#3B82F6' },
  { icon: '📱', label: 'Phone',    value: '+977 9843641508',               href: 'tel:+9779843641508',           color: '#A855F7' },
  { icon: '📍', label: 'Location', value: 'Budhanilkantha, Nepal (Remote)',href: null,                           color: '#10B981' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.contact-top', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
      gsap.from('.contact-info-item', {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'power2.out', delay: 0.2,
        scrollTrigger: { trigger: '.contact-grid', start: 'top 75%' },
      });
      gsap.from('.contact-form-box', {
        opacity: 0, x: 40, duration: 0.8, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: '.contact-grid', start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section relative overflow-hidden" style={{ background: '#0D0D1A' }}>
      <div className="orb orb-blue   absolute w-[400px] h-[400px] top-0    left-0   opacity-15" />
      <div className="orb orb-purple absolute w-[400px] h-[400px] bottom-0 right-0  opacity-15" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="contact-top text-center mb-14">
          <div className="section-label mx-auto mb-5">Get In Touch</div>
          <h2 className="font-display font-black mb-4 text-white">
            Start Your{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Digital Journey
            </span>
          </h2>
          <p className="text-gray-400 text-base max-w-md mx-auto">
            Tell us about your project — we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left — compact info column */}
          <div className="lg:col-span-2 space-y-4">
            {contactCards.map(c => (
              <div
                key={c.label}
                className="contact-info-item flex items-center gap-4 p-4 rounded-xl transition-all duration-250"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${c.color}35`;
                  (e.currentTarget as HTMLElement).style.background = `${c.color}08`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: c.color }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-white font-semibold text-sm hover:opacity-75 transition-opacity truncate block">{c.value}</a>
                  ) : (
                    <div className="text-white font-semibold text-sm">{c.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* What you get */}
            <div className="p-5 rounded-xl mt-2"
              style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.07),rgba(168,85,247,0.05))', border: '1px solid rgba(59,130,246,0.18)' }}>
              <h4 className="text-white font-bold mb-3 text-sm flex items-center gap-2">✨ What You Get</h4>
              <ul className="space-y-2">
                {['Free Consultation', 'Transparent Pricing', '24/7 Support', 'Fast Turnaround'].map(p => (
                  <li key={p} className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="text-green-400 text-xs">✓</span>{p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 font-medium">Typically replies within 24 hours</span>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-form-box lg:col-span-3 rounded-2xl p-7"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
