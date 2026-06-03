'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home',     href: '#home' },
  { name: 'About',    href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileOpen,     setIsMobileOpen]     = useState(false);
  const [activeLink,       setActiveLink]       = useState('Home');
  const [isMounted,        setIsMounted]        = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* SSR skeleton */
  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <div
          className="flex items-center gap-8 px-8 py-4 rounded-full"
          style={{
            background: 'rgba(14,14,19,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span style={{ color: '#85adff' }}>Techwired</span>{' '}
            <span style={{ color: '#FACC15' }}>Solutions</span>
          </span>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* ── Main floating navbar ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingTop: isScrolled ? 12 : 20, transition: 'padding-top 0.4s ease' }}
      >
        <motion.div
          animate={{
            scale: isScrolled ? 0.97 : 1,
          }}
          transition={{ duration: 0.35 }}
          className="relative w-full max-w-6xl flex items-center justify-between rounded-full"
          style={{
            padding: isScrolled ? '10px 28px' : '14px 36px',
            background: isScrolled
              ? 'rgba(8,8,14,0.92)'
              : 'rgba(14,14,19,0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: isScrolled
              ? '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(133,173,255,0.08)'
              : '0 4px 24px rgba(0,0,0,0.25)',
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative w-8 h-8"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'rgba(133,173,255,0.2)',
                  filter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                }}
              />
              <Image
                src="/images/logo.png"
                alt="Techwired Solutions"
                width={32}
                height={32}
                className="object-contain relative z-10"
              />
            </motion.div>
            <span
              className="hidden sm:block font-bold text-sm tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span style={{ color: '#85adff' }}>Techwired</span>{' '}
              <span style={{ color: '#FACC15' }}>Solutions</span>
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 group"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: isActive ? '#85adff' : 'rgba(242,245,253,0.65)',
                    background: isActive ? 'rgba(133,173,255,0.08)' : 'transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#f2f5fd';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(242,245,253,0.65)';
                  }}
                >
                  {link.name}
                  {/* active / hover dot */}
                  <span
                    className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-200"
                    style={{
                      background: '#85adff',
                      opacity: isActive ? 1 : 0,
                      boxShadow: isActive ? '0 0 6px #85adff' : 'none',
                      transform: `translateX(-50%) scale(${isActive ? 1 : 0})`,
                    }}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── CTA + hamburger ── */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <motion.a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: 'linear-gradient(135deg, #3B82F6, #A855F7)',
                boxShadow: '0 0 20px rgba(59,130,246,0.35)',
                letterSpacing: '0.02em',
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 32px rgba(59,130,246,0.55), 0 0 16px rgba(168,85,247,0.3)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Get Started
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 origin-center"
                style={{ background: 'rgba(242,245,253,0.8)' }}
                transition={{ duration: 0.22 }}
              />
              <motion.span
                animate={isMobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-4 h-0.5"
                style={{ background: 'rgba(242,245,253,0.8)' }}
                transition={{ duration: 0.22 }}
              />
              <motion.span
                animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 origin-center"
                style={{ background: 'rgba(242,245,253,0.8)' }}
                transition={{ duration: 0.22 }}
              />
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed top-24 left-4 right-4 z-50 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(14,14,19,0.97)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(133,173,255,0.12)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
              }}
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Inner glow top */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(133,173,255,0.3), transparent)' }}
              />

              <div className="p-6">
                {/* Links */}
                <div className="space-y-1 mb-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: activeLink === link.name ? '#85adff' : 'rgba(242,245,253,0.7)',
                          background: activeLink === link.name ? 'rgba(133,173,255,0.08)' : 'transparent',
                          fontWeight: 500,
                        }}
                        onClick={() => { setActiveLink(link.name); setIsMobileOpen(false); }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background =
                            activeLink === link.name ? 'rgba(133,173,255,0.08)' : 'transparent';
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: activeLink === link.name ? '#85adff' : 'rgba(255,255,255,0.2)' }}
                        />
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile CTA */}
                <motion.a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: 'linear-gradient(135deg, #3B82F6, #A855F7)',
                    boxShadow: '0 0 20px rgba(59,130,246,0.3)',
                    letterSpacing: '0.03em',
                  }}
                  onClick={() => setIsMobileOpen(false)}
                  whileTap={{ scale: 0.97 }}
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
