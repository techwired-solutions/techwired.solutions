'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '../forms/ContactForm';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: '📧',
    label: 'Email Us',
    value: 's.techwired@gmail.com',
    href: 'mailto:s.techwired@gmail.com',
    color: '#3B82F6',
  },
  {
    icon: '📱',
    label: 'Call Us',
    value: '+977 9843641508',
    href: 'tel:+9779843641508',
    color: '#A855F7',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Budhanilkantha, Nepal (Remote)',
    href: null,
    color: '#10B981',
  },
];

const perks = [
  'Free Consultation Call',
  'Transparent Pricing',
  '24/7 Support Access',
  'Domain → Deployment',
  'Fast Turnaround',
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(infoRef.current, {
        opacity: 0, x: -50, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from(formRef.current, {
        opacity: 0, x: 50, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('.contact-info-card', {
        opacity: 0, y: 20, stagger: 0.12, duration: 0.6, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: infoRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section relative overflow-hidden" style={{ background: '#0D0D1A' }}>
      <div className="orb orb-blue absolute w-[400px] h-[400px] top-0 left-0 opacity-20" />
      <div className="orb orb-purple absolute w-[400px] h-[400px] bottom-0 right-0 opacity-20" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mx-auto mb-6">Get In Touch</div>
          <h2 className="font-display font-black mb-6 text-white">
            Start Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #3B82F6, #00D4FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Digital Journey
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tell us about your project — we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left — Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            {/* Contact cards */}
            {contactInfo.map(info => (
              <div
                key={info.label}
                className="contact-info-card flex items-start gap-4 p-5 rounded-2xl transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${info.color}40`;
                  (e.currentTarget as HTMLElement).style.background = `${info.color}08`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${info.color}15`, border: `1px solid ${info.color}30` }}
                >
                  {info.icon}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: `${info.color}` }}>
                    {info.label}
                  </div>
                  {info.href ? (
                    <a href={info.href} className="text-white font-semibold hover:text-blue-400 transition-colors break-all">
                      {info.value}
                    </a>
                  ) : (
                    <div className="text-white font-semibold">{info.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Perks card */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(168,85,247,0.06))',
                border: '1px solid rgba(59,130,246,0.2)',
              }}
            >
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span>✨</span> What You Get
              </h4>
              <ul className="space-y-3">
                {perks.map(perk => (
                  <li key={perk} className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs flex-shrink-0">
                      ✓
                    </div>
                    <span className="text-sm font-medium">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-sm font-medium">We typically respond within 24 hours</span>
            </div>
          </div>

          {/* Right — Form */}
          <div
            ref={formRef}
            className="lg:col-span-3 rounded-3xl p-8 md:p-10"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
