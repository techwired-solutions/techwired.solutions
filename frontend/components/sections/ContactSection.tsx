'use client';

import React from 'react';
import ContactForm from '../forms/ContactForm';

/* ─── Contact info ─── */
const INFO = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: 'Email Us',
    val: 's.techwired@gmail.com',
    href: 'mailto:s.techwired@gmail.com',
    color: '#3B82F6',
    desc: 'Drop us a line anytime',
  },
  {
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" width="22" height="22">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
      </svg>
    ),
    label: 'WhatsApp',
    val: '+977 9866243388',
    href: 'https://wa.me/9779866243388',
    color: '#10B981',
    desc: 'Chat with us directly',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Location',
    val: 'Remote — Worldwide',
    href: null,
    color: '#A855F7',
    desc: 'We work across all timezones',
  },
];

const FEATURES = [
  { icon: '⚡', text: 'Reply within 24 hours' },
  { icon: '🔒', text: 'Your info stays private' },
  { icon: '💬', text: 'Free consultation call' },
  { icon: '🚀', text: 'Project kickoff in 48h' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section relative overflow-hidden" style={{ background: 'transparent' }}>
      {/* Orbs */}
      <div className="orb orb-blue   absolute w-[500px] h-[500px] opacity-12" style={{ top: '-50px',    left: '-100px' }} />
      <div className="orb orb-purple absolute w-[400px] h-[400px] opacity-12" style={{ bottom: '-50px', right: '-100px' }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 64 }}>
          <div className="section-label mx-auto">Get In Touch</div>
          <h2 className="font-display font-black" style={{ marginBottom: 20 }}>
            Start Your{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Digital Journey
            </span>
          </h2>
          <p className="text-center text-gray-400 text-lg max-w-md mx-auto" style={{ lineHeight: 1.85 }}>
            Tell us about your project — we reply within 24 hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>

          {/* ── Left panel: info + features ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Contact cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {INFO.map(c => (
                <div key={c.label}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 16,
                    padding: '20px 24px', borderRadius: 18,
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${c.color}20`,
                    backdropFilter: 'blur(16px)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${c.color}0C`;
                    el.style.borderColor = `${c.color}40`;
                    el.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.02)';
                    el.style.borderColor = `${c.color}20`;
                    el.style.transform = 'translateX(0)';
                  }}>
                  {/* Icon box */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: `${c.color}15`, border: `1px solid ${c.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: c.color, flexShrink: 0,
                  }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: c.color, marginBottom: 4 }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', display: 'block', marginBottom: 2 }}>{c.val}</a>
                      : <span style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '0.95rem', display: 'block', marginBottom: 2 }}>{c.val}</span>}
                    <span style={{ color: '#475569', fontSize: '0.8rem' }}>{c.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature pills */}
            <div style={{
              padding: '28px 28px', borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.04) 100%)',
              border: '1px solid rgba(59,130,246,0.15)',
              backdropFilter: 'blur(16px)',
            }}>
              <h4 style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '0.95rem', marginBottom: 20 }}>What to Expect</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {FEATURES.map(f => (
                  <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 10,
                      background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, flexShrink: 0,
                    }}>{f.icon}</div>
                    <span style={{ color: '#94A3B8', fontSize: '0.83rem', fontWeight: 500, lineHeight: 1.4 }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Online indicator */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 22px', borderRadius: 12,
              background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', animation: 'pulse 2s infinite', flexShrink: 0 }} />
              <span style={{ color: '#34D399', fontSize: '0.85rem', fontWeight: 500 }}>Typically replies within 24 hours</span>
            </div>
          </div>

          {/* ── Right: form card ── */}
          <div style={{
            padding: '52px 48px', borderRadius: 28,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Corner glow */}
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 200, height: 200,
              background: 'radial-gradient(circle at top right, rgba(59,130,246,0.12), transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 14px', borderRadius: 999,
                  background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#60A5FA',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3B82F6' }} />
                  Free Consultation
                </span>
              </div>
              <h3 className="font-display font-bold text-white" style={{ fontSize: '1.5rem', marginBottom: 8 }}>Send Us a Message</h3>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: 40 }}>Fill in the details below and we&apos;ll get back to you within 24 hours.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
