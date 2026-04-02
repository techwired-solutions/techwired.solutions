'use client';

import React, { useState } from 'react';
import ContactForm from '../forms/ContactForm';

/* ─── Simple animated SVG character that reacts to form state ─── */
function AnimatedCharacter({ state }: { state: 'idle' | 'typing' | 'success' | 'error' }) {
  const eyeY = state === 'typing' ? 3 : state === 'success' ? 5 : 2;
  const mouthD = state === 'success'
    ? 'M 36 58 Q 44 65 52 58'   // big smile
    : state === 'error'
    ? 'M 36 62 Q 44 56 52 62'   // frown
    : state === 'typing'
    ? 'M 38 60 Q 44 63 50 60'   // slight smile
    : 'M 38 59 L 50 59';        // neutral

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <svg width="200" height="280" viewBox="0 0 88 280" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 32px rgba(59,130,246,0.3))' }}>

        {/* Glow halo */}
        <ellipse cx="44" cy="260" rx="30" ry="6" fill="rgba(59,130,246,0.15)" />

        {/* Body / torso */}
        <g style={{ animation: state === 'idle' ? 'float 3s ease-in-out infinite' : state === 'success' ? 'bounce 0.5s ease infinite' : 'none' }}>

          {/* Legs */}
          <rect x="30" y="190" width="10" height="60" rx="5"
            style={{ fill: '#1E3A5F', animation: state === 'success' ? 'wiggle 0.4s ease infinite alternate' : 'none' }} />
          <rect x="48" y="190" width="10" height="60" rx="5"
            style={{ fill: '#1E3A5F', animation: state === 'success' ? 'wiggle 0.4s ease infinite alternate-reverse' : 'none' }} />

          {/* Shoes */}
          <ellipse cx="35" cy="250" rx="12" ry="5" fill="#0F172A" />
          <ellipse cx="53" cy="250" rx="12" ry="5" fill="#0F172A" />

          {/* Body */}
          <rect x="22" y="120" width="44" height="75" rx="12"
            style={{ fill: 'url(#bodyGrad)' }} />

          {/* Techwired logo on shirt */}
          <text x="44" y="160" textAnchor="middle" fill="#3B82F6" fontSize="5" fontWeight="700" fontFamily="Inter, sans-serif">TW</text>

          {/* Left arm */}
          <g style={{ transformOrigin: '22px 130px', animation: state === 'typing' ? 'typeLeft 0.4s ease infinite alternate' : state === 'success' ? 'waveArm 0.5s ease infinite alternate' : 'none' }}>
            <rect x="6" y="122" width="18" height="9" rx="4.5" fill="#2563EB" transform="rotate(15 6 126)" />
            {/* Hand */}
            <circle cx="8" cy="135" r="6" fill="#FBBF24" />
          </g>

          {/* Right arm — holds form */}
          <g style={{ transformOrigin: '66px 130px', animation: state === 'typing' ? 'typeRight 0.4s ease infinite alternate-reverse' : 'none' }}>
            <rect x="64" y="122" width="18" height="9" rx="4.5" fill="#2563EB" transform="rotate(-15 82 126)" />
            {/* Hand */}
            <circle cx="80" cy="135" r="6" fill="#FBBF24" />
            {/* Mini form clipboard */}
            <rect x="76" y="100" width="28" height="36" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
            <rect x="80" y="107" width="20" height="2" rx="1" fill="rgba(59,130,246,0.5)" />
            <rect x="80" y="112" width="16" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
            <rect x="80" y="117" width="18" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
            <rect x="80" y="122" width="14" height="2" rx="1" fill="rgba(255,255,255,0.15)" />
          </g>

          {/* Neck */}
          <rect x="38" y="106" width="12" height="16" rx="4" fill="#FBBF24" />

          {/* Head */}
          <circle cx="44" cy="88" r="28" fill="#FBBF24"
            style={{ animation: state === 'typing' ? 'lookDown 0.3s ease forwards' : state === 'success' ? 'nod 0.5s ease infinite alternate' : 'none' }} />

          {/* Hair */}
          <ellipse cx="44" cy="63" rx="22" ry="8" fill="#1E293B" />
          <rect x="22" y="60" width="44" height="12" rx="6" fill="#1E293B" />

          {/* Eyes */}
          <g style={{ transition: 'transform 0.3s', transform: `translateY(${eyeY - 2}px)` }}>
            {/* Left eye */}
            <circle cx="34" cy="85" r="5" fill="white" />
            <circle cx={state === 'typing' ? 35 : 34} cy={state === 'typing' ? 87 : 85} r="3" fill="#1E293B" />
            <circle cx={state === 'typing' ? 36 : 35} cy={state === 'typing' ? 86 : 84} r="1" fill="white" />

            {/* Right eye */}
            <circle cx="54" cy="85" r="5" fill="white" />
            <circle cx={state === 'typing' ? 55 : 54} cy={state === 'typing' ? 87 : 85} r="3" fill="#1E293B" />
            <circle cx={state === 'typing' ? 56 : 55} cy={state === 'typing' ? 86 : 84} r="1" fill="white" />

            {/* Success eyes → happy squint */}
            {state === 'success' && (
              <>
                <path d="M 30 84 Q 34 80 38 84" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 50 84 Q 54 80 58 84" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
              </>
            )}
          </g>

          {/* Eyebrows */}
          <path d={state === 'error' ? 'M 30 77 Q 34 74 38 77' : 'M 30 78 Q 34 76 38 78'} stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" style={{ transition: 'all 0.3s' }} />
          <path d={state === 'error' ? 'M 50 77 Q 54 74 58 77' : 'M 50 78 Q 54 76 58 78'} stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" style={{ transition: 'all 0.3s' }} />

          {/* Mouth */}
          <path d={mouthD} stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" style={{ transition: 'all 0.4s' }} />

          {/* Blush — success only */}
          {state === 'success' && (
            <>
              <ellipse cx="28" cy="93" rx="6" ry="4" fill="rgba(251,113,133,0.35)" />
              <ellipse cx="60" cy="93" rx="6" ry="4" fill="rgba(251,113,133,0.35)" />
            </>
          )}

          {/* Thought bubble — typing */}
          {state === 'typing' && (
            <g>
              <circle cx="58" cy="55" r="3" fill="rgba(59,130,246,0.3)" />
              <circle cx="64" cy="48" r="4" fill="rgba(59,130,246,0.3)" />
              <rect x="62" y="34" width="28" height="16" rx="6" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
              <text x="76" y="44" textAnchor="middle" fill="#60A5FA" fontSize="8">✍️</text>
            </g>
          )}

          {/* Stars on success */}
          {state === 'success' && (
            <g style={{ animation: 'sparkle 0.6s ease infinite alternate' }}>
              <text x="8"  y="75" fontSize="12">⭐</text>
              <text x="72" y="72" fontSize="10">✨</text>
              <text x="62" y="48" fontSize="8">🎉</text>
            </g>
          )}
        </g>

        {/* Gradient def */}
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Character label */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3B82F6', marginBottom: 4 }}>Alex — Your Project Guide</div>
        <div style={{ fontSize: '0.75rem', color: '#475569' }}>
          {state === 'idle'    && 'Ready to hear about your project!'}
          {state === 'typing'  && 'Tell me more, I\'m taking notes! ✍️'}
          {state === 'success' && 'Awesome! We\'ll be in touch soon! 🎉'}
          {state === 'error'   && 'Hmm, something went wrong. Try again?'}
        </div>
      </div>

      <style>{`
        @keyframes float       { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes bounce      { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes wiggle      { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }
        @keyframes waveArm     { from { transform: rotate(-20deg); } to { transform: rotate(10deg); } }
        @keyframes typeLeft    { from { transform: rotate(10deg); } to { transform: rotate(30deg); } }
        @keyframes typeRight   { from { transform: rotate(-10deg); } to { transform: rotate(-25deg); } }
        @keyframes lookDown    { to { transform: rotate(8deg); } }
        @keyframes nod         { from { transform: rotate(-5deg); } to { transform: rotate(5deg); } }
        @keyframes sparkle     { from { opacity: 0.7; transform: scale(0.9); } to { opacity: 1; transform: scale(1.1); } }
      `}</style>
    </div>
  );
}

/* ─── Contact info pills ─── */
const INFO = [
  { icon: '📧', label: 'Email',    val: 's.techwired@gmail.com',        href: 'mailto:s.techwired@gmail.com', color: '#3B82F6' },
  { icon: '📱', label: 'Phone',    val: '+977 9843641508',               href: 'tel:+9779843641508',           color: '#A855F7' },
  { icon: '📍', label: 'Location', val: 'Budhanilkantha, Nepal',         href: null,                           color: '#10B981' },
];

export default function ContactSection() {
  const [charState, setCharState] = useState<'idle' | 'typing' | 'success' | 'error'>('idle');

  return (
    <section id="contact" className="section relative overflow-hidden" style={{ background: '#0D0D1A' }}>
      <div className="orb orb-blue   absolute w-[500px] h-[500px] opacity-12" style={{ top: '-50px',    left: '-100px' }} />
      <div className="orb orb-purple absolute w-[400px] h-[400px] opacity-12" style={{ bottom: '-50px', right: '-100px' }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 80 }}>
          <div className="section-label mx-auto">Get In Touch</div>
          <h2 className="font-display font-black" style={{ marginBottom: 20 }}>
            Start Your{' '}
            <span style={{ background: 'linear-gradient(135deg,#3B82F6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Digital Journey
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto" style={{ lineHeight: 1.85 }}>
            Tell us about your project — we reply within 24 hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>

          {/* Left — character + contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
            {/* Animated character */}
            <AnimatedCharacter state={charState} />

            {/* Contact info */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {INFO.map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${c.color}0D`; el.style.borderColor = `${c.color}35`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${c.color}15`, border: `1px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: c.color, marginBottom: 3 }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>{c.val}</a>
                      : <span style={{ color: '#F1F5F9', fontWeight: 600, fontSize: '0.9rem' }}>{c.val}</span>}
                  </div>
                </div>
              ))}

              {/* Response time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 12, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                <span style={{ color: '#34D399', fontSize: '0.85rem', fontWeight: 500 }}>Typically replies within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right — open spacious form */}
          <div style={{ padding: '52px 48px', borderRadius: 28, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(24px)' }}>
            <h3 className="font-display font-bold text-white" style={{ fontSize: '1.4rem', marginBottom: 8 }}>Send Us a Message</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: 40 }}>Fill in the details below and we&apos;ll get back to you.</p>
            <ContactFormWithState onStateChange={setCharState} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Wrapper that passes form state up to the character */
function ContactFormWithState({ onStateChange }: { onStateChange: (s: 'idle' | 'typing' | 'success' | 'error') => void }) {
  return (
    <div
      onFocus={() => onStateChange('typing')}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) onStateChange('idle'); }}
    >
      <ContactForm
        onSuccess={() => onStateChange('success')}
        onError={() => onStateChange('error')}
      />
    </div>
  );
}
