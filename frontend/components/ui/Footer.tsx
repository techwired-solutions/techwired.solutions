'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const partners = [
  { name: 'EasyMoto',          url: 'https://easymoto.com.np',  logo: '/images/partners/easymoto.jpg',  emoji: '🏍️' },
  { name: 'Amicus Institute',  url: 'https://amicus.com.np',    logo: '/images/partners/amicus.jpg',    emoji: '⚖️' },
  { name: 'Aryal Farm',        url: 'https://aryalfarm.com.np', logo: '/images/partners/aryalfarm.jpg', emoji: '🌾' },
];

const quickLinks = [
  { name: 'Home',     href: '#home' },
  { name: 'About',    href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact',  href: '#contact' },
];

const serviceLinks = [
  'Web Development',
  'Mobile Apps',
  'Domain & Hosting',
  'Graphics Design',
  'Video Production',
  'SEO & Marketing',
];

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden border-t" style={{ background: '#0A0A0F', borderColor: 'rgba(255,255,255,0.06)' }}>
      {/* Partners — vertical list */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div className="container" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#334155', marginBottom: 40 }}>
            Trusted By Our Partners
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520, margin: '0 auto' }}>
            {partners.map((partner, i) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {/* Number */}
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: '#3B82F6', flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {/* Emoji + name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{partner.emoji}</span>
                    <span style={{ color: '#CBD5E1', fontWeight: 600, fontSize: '0.95rem' }}>{partner.name}</span>
                  </div>
                </div>
                {/* Domain pill */}
                <div style={{ fontSize: '0.72rem', color: '#3B82F6', fontFamily: 'monospace', padding: '3px 10px', borderRadius: 999, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', whiteSpace: 'nowrap' }}>
                  {partner.url.replace('https://', '')}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md" />
                <Image src="/images/logo.png" alt="Techwired" width={40} height={40} className="relative z-10 object-contain" />
              </div>
              <span className="font-display font-bold text-base">
                <span className="text-blue-400">Techwired</span>{' '}
                <span className="text-yellow-400">Solutions</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Engineering digital experiences that inspire. Complete digital solutions from domain to deployment.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#3B82F6';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.4)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.1)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#64748B';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-blue-400 transition-colors" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(s => (
                <li key={s} className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gray-700" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="mailto:s.techwired@gmail.com" className="text-gray-500 hover:text-blue-400 transition-colors flex items-start gap-2">
                  <span className="mt-0.5">📧</span>
                  <span>s.techwired@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+9779843641508" className="text-gray-500 hover:text-blue-400 transition-colors flex items-start gap-2">
                  <span>📱</span>
                  <span>+977 9843641508</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-500">
                <span>📍</span>
                <span>Budhanilkantha, Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 Techwired Solutions — Built with ❤️ in Nepal
            <span className="ml-2 text-gray-700">|</span>
            <span className="ml-2 text-gray-700">Developed by{' '}
              <span className="text-gray-500 font-medium">Techwired Solutions</span>
            </span>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-400 text-sm transition-colors duration-200 group"
          >
            Back to top
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-blue-500/20"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
