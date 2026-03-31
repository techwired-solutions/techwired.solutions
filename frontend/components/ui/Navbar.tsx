'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home',      href: '#home' },
  { name: 'About',     href: '#about' },
  { name: 'Services',  href: '#services' },
  { name: 'Projects',  href: '#projects' },
  { name: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [isScrolled,        setIsScrolled]        = useState(false);
  const [isMobileMenuOpen,  setIsMobileMenuOpen]  = useState(false);
  const [isMounted,         setIsMounted]         = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
        <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
          <span className="text-lg font-bold">
            <span className="text-blue-400">Techwired</span>{' '}
            <span className="text-yellow-400">Solutions</span>
          </span>
        </div>
      </nav>
    );
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          animate={{
            scale:         isScrolled ? 0.97 : 1,
            paddingTop:    isScrolled ? '10px' : '12px',
            paddingBottom: isScrolled ? '10px' : '12px',
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-6 px-5 rounded-full border border-white/[0.08] backdrop-blur-2xl"
          style={{
            background: isScrolled
              ? 'rgba(10,10,15,0.85)'
              : 'rgba(15,15,26,0.6)',
            boxShadow: isScrolled
              ? '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)'
              : '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="relative w-9 h-9"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md group-hover:bg-blue-500/40 transition-all duration-300" />
              <Image
                src="/images/logo.png"
                alt="Techwired Solutions"
                width={36}
                height={36}
                className="object-contain relative z-10"
              />
            </motion.div>
            <span className="text-sm font-bold hidden sm:block tracking-tight">
              <span className="text-blue-400">Techwired</span>{' '}
              <span className="text-yellow-400">Solutions</span>
            </span>
          </Link>

          {/* Separator */}
          <div className="hidden md:block w-px h-5 bg-white/10" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/5 group"
              >
                {link.name}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400 scale-0 group-hover:scale-100 transition-transform duration-200" />
              </Link>
            ))}
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px h-5 bg-white/10" />

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              boxShadow: '0 0 20px rgba(59,130,246,0.4)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(59,130,246,0.7)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(59,130,246,0.4)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Get Started
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-gray-300 origin-center"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-4 h-0.5 bg-gray-300"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-gray-300 origin-center"
              transition={{ duration: 0.2 }}
            />
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Menu Panel */}
            <motion.div
              className="fixed top-20 left-4 right-4 z-50 rounded-2xl border border-white/10 p-6"
              style={{ background: 'rgba(15,15,26,0.98)', backdropFilter: 'blur(20px)' }}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="space-y-1 mb-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 font-medium transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <a
                href="#contact"
                className="btn btn-primary w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started →
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
