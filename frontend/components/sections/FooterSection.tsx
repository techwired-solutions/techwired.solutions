'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

const SERVICES = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'Branding',
  'SEO & Marketing',
  'Video Production',
];

const SOCIALS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/9779866243388',
    color: '#10B981',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:s.techwired@gmail.com',
    color: '#3B82F6',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    color: '#A855F7',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export default function FooterSection() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{
      position: 'relative',
      background: '#000000',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
    }}>
      {/* Top gradient border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), rgba(139,92,246,0.6), transparent)',
      }} />

      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', bottom: 0, left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: '-5%',
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* ── CTA Banner ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        margin: '0 auto', maxWidth: 1280, padding: '0 24px',
      }}>
        <div style={{
          margin: '0 auto', marginTop: 72,
          padding: '52px 64px', borderRadius: 28,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.08) 100%)',
          border: '1px solid rgba(59,130,246,0.2)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 32,
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 14px', borderRadius: 999,
              background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)',
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#60A5FA', marginBottom: 16,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 6px #3B82F6' }} />
              Ready to Build?
            </div>
            <h3 style={{
              fontFamily: "'Montserrat', 'Syne', sans-serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 800, color: '#F1F5F9',
              lineHeight: 1.2, margin: 0,
            }}>
              Let&apos;s Build Something{' '}
              <span style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Amazing</span>
            </h3>
            <p style={{ color: '#64748B', marginTop: 8, fontSize: '0.95rem' }}>
              Join 30+ businesses already growing with Techwired Solutions.
            </p>
          </div>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '16px 40px', borderRadius: 999, fontWeight: 700,
            fontSize: '1rem', color: '#fff', textDecoration: 'none',
            background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
            boxShadow: '0 0 30px rgba(59,130,246,0.4)',
            transition: 'all 0.3s ease', whiteSpace: 'nowrap',
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 0 52px rgba(59,130,246,0.7)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = '0 0 30px rgba(59,130,246,0.4)';
              el.style.transform = 'translateY(0)';
            }}>
            Start a Project
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </a>
        </div>
      </div>

      {/* ── Main footer content ── */}
      <div style={{
        position: 'relative', zIndex: 1,
        margin: '0 auto', maxWidth: 1280, padding: '80px 24px 40px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px 60px',
          marginBottom: 64,
        }}>

          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ position: 'relative', width: 44, height: 44 }}>
                <Image src="/images/logo.png" alt="Techwired Solutions" fill className="object-contain" />
              </div>
              <div>
                <div style={{ fontFamily: "'Montserrat', 'Syne', sans-serif", fontWeight: 800, fontSize: '1rem', color: '#F1F5F9', letterSpacing: '-0.01em' }}>Techwired</div>
                <div style={{ fontSize: '0.65rem', color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Solutions</div>
              </div>
            </div>
            <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: 24 }}>
              A full-service IT &amp; digital agency crafting premium websites, mobile apps, and digital experiences.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `${s.color}12`, border: `1px solid ${s.color}25`,
                    color: s.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${s.color}22`;
                    el.style.borderColor = `${s.color}55`;
                    el.style.transform = 'translateY(-3px)';
                    el.style.boxShadow = `0 8px 20px ${s.color}30`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${s.color}12`;
                    el.style.borderColor = `${s.color}25`;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#60A5FA', marginBottom: 24 }}>Quick Links</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href} style={{
                  color: '#64748B', fontSize: '0.9rem', textDecoration: 'none',
                  transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 8,
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#93C5FD';
                    el.style.paddingLeft = '4px';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#64748B';
                    el.style.paddingLeft = '0px';
                  }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#3B82F620', flexShrink: 0 }} />
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#A78BFA', marginBottom: 24 }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {SERVICES.map(s => (
                <a key={s} href="#services" style={{
                  color: '#64748B', fontSize: '0.9rem', textDecoration: 'none',
                  transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 8,
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#C4B5FD';
                    el.style.paddingLeft = '4px';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#64748B';
                    el.style.paddingLeft = '0px';
                  }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#A855F720', flexShrink: 0 }} />
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#34D399', marginBottom: 24 }}>Stay Updated</h4>
            <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 20 }}>
              Subscribe to receive tips, updates and insights from Techwired.
            </p>
            {subscribed ? (
              <div style={{
                padding: '12px 16px', borderRadius: 12,
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                color: '#34D399', fontSize: '0.85rem', fontWeight: 600,
              }}>
                ✅ You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    padding: '12px 16px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#F1F5F9', fontSize: '0.875rem',
                    outline: 'none', fontFamily: 'inherit',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                <button type="submit" style={{
                  padding: '12px 16px', borderRadius: 12, fontWeight: 700,
                  fontSize: '0.875rem', color: '#fff', border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  boxShadow: '0 0 20px rgba(59,130,246,0.35)',
                  transition: 'all 0.25s ease',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 35px rgba(59,130,246,0.55)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(59,130,246,0.35)'; }}>
                  Subscribe →
                </button>
              </form>
            )}

            {/* Contact quick access */}
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="mailto:s.techwired@gmail.com" style={{ color: '#475569', fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#93C5FD'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#475569'; }}>
                <span style={{ color: '#3B82F6' }}>✉</span> s.techwired@gmail.com
              </a>
              <a href="https://wa.me/9779866243388" style={{ color: '#475569', fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#34D399'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#475569'; }}>
                <span style={{ color: '#10B981' }}>💬</span> +977 9866243388
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 32,
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <p style={{ color: '#334155', fontSize: '0.82rem', margin: 0 }}>
            © {year} <span style={{ color: '#475569', fontWeight: 600 }}>Techwired Solutions</span>. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" style={{ color: '#334155', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#60A5FA'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#334155'; }}>
                {l}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#334155', fontSize: '0.78rem' }}>Online — Remote Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
