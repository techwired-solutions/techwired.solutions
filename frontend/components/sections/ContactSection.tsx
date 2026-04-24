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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="200" height="200" viewBox="0 40 100 150" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 32px rgba(59,130,246,0.3))' }}>


        {/* Body / torso */}
        <g style={{ animation: state === 'idle' ? 'float 3s ease-in-out infinite' : state === 'success' ? 'bounce 0.5s ease infinite' : 'none' }}>



          {/* Body */}
          <circle cx="44" cy="140" r="44"
            style={{ fill: 'url(#bodyGrad)' }} />

          {/* Techwired logo on shirt */}
          <text x="44" y="160" textAnchor="middle" fill="#889cbcff" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">Tech~Guy</text>

          {/* Left arm */}
          <g style={{ transformOrigin: '22px 130px', animation: state === 'typing' ? 'typeLeft 0.4s ease infinite alternate' : state === 'success' ? 'waveArm 0.5s ease infinite alternate' : 'none' }}>
            
            {/* Hand */}
            <circle cx="8" cy="135" r="12" fill="#FBBF24" />
          </g>

          {/* Right arm — holds form */}
          <g style={{ transformOrigin: '66px 130px', animation: state === 'typing' ? 'typeRight 0.4s ease infinite alternate-reverse' : 'none' }}>
            {/* Hand */}
            <circle cx="80" cy="135" r="12" fill="#FBBF24" />
            {/* Mini form clipboard */}
            <rect x="76" y="100" width="28" height="36" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
            <rect x="80" y="107" width="20" height="2" rx="1" fill="rgba(59,130,246,0.5)" />
            <rect x="80" y="112" width="16" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
            <rect x="80" y="117" width="18" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
            <rect x="80" y="122" width="14" height="2" rx="1" fill="rgba(255,255,255,0.15)" />
          </g>

      

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
  { icon: (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
  ), label: 'WhatsApp', val: '+977 9866243388', href: 'https://wa.me/9779866243388', color: '#10B981' },
  { icon: '📍', label: 'Location', val: 'Remote',                   href: null,                           color: '#10B981' },
];

export default function ContactSection() {
  const [charState, setCharState] = useState<'idle' | 'typing' | 'success' | 'error'>('idle');

  return (
    <section id="contact" className="section relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="orb orb-blue   absolute w-[500px] h-[500px] opacity-12" style={{ top: '-50px',    left: '-100px' }} />
      <div className="orb orb-purple absolute w-[400px] h-[400px] opacity-12" style={{ bottom: '-50px', right: '-100px' }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 20 }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>

          {/* Left — character + contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Animated character */}
            <AnimatedCharacter state={charState} />

            {/* Contact info */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {INFO.map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${c.color}0D`; el.style.borderColor = `${c.color}35`; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.02)'; el.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
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
          <div style={{ padding: '52px 48px', borderRadius: 28, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(24px)' }}>
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
