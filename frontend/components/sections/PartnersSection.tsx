'use client';

import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from "@/components/ui/sparkles"
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { useTheme } from "next-themes"

// SVGs for partner logos (Retool, Vercel, etc.)
const Retool = () => (
    <svg viewBox="0 0 180 56" fill="currentColor" className="w-full">
      <path d="M34 18.2a2.2 2.2 0 012.2-2.2h8.6a2.2 2.2 0 012.2 2.2v1.7a1.1 1.1 0 01-1.1 1.1H35.1a1.1 1.1 0 01-1.1-1.1v-1.7zM34 25.1a1.1 1.1 0 011.1-1.1h20.7a2.2 2.2 0 012.2 2.2v5.7a1.1 1.1 0 01-1.1 1.1H36.2a2.2 2.2 0 01-2.2-2.2v-5.7zM45 37.1a1.1 1.1 0 011.1-1.1h10.8a1.1 1.1 0 011.1 1.1v.7a2.2 2.2 0 01-2.2 2.2h-8.6a2.2 2.2 0 01-2.2-2.2v-.7zM71.596 30.741h2.311l4.293 7.017h5.256l-4.76-7.512c2.641-.909 4.182-2.945 4.182-5.89 0-4.127-2.89-6.356-7.54-6.356H67v19.758h4.596v-7.017zm0-3.742V21.88h3.494c2.174 0 3.275.936 3.275 2.56 0 1.595-1.1 2.558-3.275 2.558h-3.494zM91.363 38.06c2.89 0 5.531-1.458 6.605-4.237L94.28 32.64c-.413 1.266-1.486 1.926-2.862 1.926-1.678 0-2.862-1.128-3.164-3.11h9.824v-1.155c0-4.1-2.395-7.348-6.797-7.348-4.183 0-7.265 3.247-7.265 7.54 0 4.513 2.972 7.568 7.347 7.568zm-.138-11.694c1.624 0 2.477 1.1 2.505 2.394H88.39c.44-1.596 1.486-2.394 2.834-2.394zM100.573 33.878c0 2.972 1.569 4.018 4.706 4.018 1.046 0 1.871-.083 2.642-.193v-3.605c-.496.055-.743.083-1.266.083-1.101 0-1.734-.22-1.734-1.431v-5.862h2.834v-3.632h-2.834v-4.018h-4.348v4.018h-1.844v3.632h1.844v6.99zM123.672 30.52c0-4.512-3-7.567-7.265-7.567-4.293 0-7.265 3.055-7.265 7.568s2.972 7.54 7.265 7.54c4.265 0 7.265-3.027 7.265-7.54zm-10.154 0c0-2.53 1.128-3.962 2.889-3.962s2.89 1.431 2.89 3.963-1.129 3.962-2.89 3.962c-1.761 0-2.889-1.43-2.889-3.962zM139.527 30.52c0-4.512-2.999-7.567-7.265-7.567-4.293 0-7.265 3.055-7.265 7.568s2.972 7.54 7.265 7.54c4.266 0 7.265-3.027 7.265-7.54zm-10.154 0c0-2.53 1.128-3.962 2.889-3.962 1.762 0 2.89 1.431 2.89 3.963s-1.128 3.962-2.89 3.962c-1.761 0-2.889-1.43-2.889-3.962zM146 18h-4.403v19.758H146V18z" />
    </svg>
  )
  
  const Vercel = () => (
    <svg viewBox="0 0 180 54" fill="currentColor" className="w-full">
      <path d="M89.515 20.5c-4.424 0-7.614 2.925-7.614 7.313 0 4.387 3.59 7.312 8.014 7.312 2.673 0 5.03-1.072 6.488-2.88l-3.066-1.796c-.81.898-2.04 1.422-3.422 1.422-1.919 0-3.55-1.016-4.155-2.64h11.228c.088-.456.14-.927.14-1.423 0-4.383-3.19-7.308-7.613-7.308zm-3.791 5.89c.5-1.62 1.871-2.64 3.787-2.64 1.919 0 3.29 1.02 3.786 2.64h-7.573zm46.938-5.89c-4.424 0-7.613 2.925-7.613 7.313 0 4.387 3.59 7.312 8.014 7.312 2.672 0 5.028-1.072 6.487-2.88l-3.065-1.796c-.81.898-2.04 1.422-3.422 1.422-1.92 0-3.551-1.016-4.156-2.64h11.228c.088-.456.14-.927.14-1.423 0-4.383-3.189-7.308-7.613-7.308zm-3.787 5.89c.501-1.62 1.872-2.64 3.787-2.64 1.919 0 3.29 1.02 3.787 2.64h-7.574zm-15.639 1.422c0 2.438 1.571 4.063 4.007 4.063 1.651 0 2.889-.76 3.526-1.999l3.078 1.8c-1.275 2.153-3.663 3.449-6.604 3.449-4.428 0-7.613-2.925-7.613-7.313 0-4.387 3.189-7.312 7.613-7.312 2.941 0 5.325 1.296 6.604 3.45l-3.078 1.799c-.637-1.24-1.875-1.999-3.526-1.999-2.432 0-4.007 1.625-4.007 4.063zm33.05-11.78v18.687h-3.607V16.03h3.607zM47.806 14l14.806 26H33l14.806-26zm37.016 2.031l-11.103 19.5-11.103-19.5h4.163l6.94 12.188 6.94-12.188h4.163zm23.606 4.875v3.937a4.517 4.517 0 00-1.283-.2c-2.328 0-4.007 1.626-4.007 4.063v6.013h-3.606V20.906h3.606v3.738c0-2.064 2.369-3.738 5.29-3.738z" />
    </svg>
  )

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
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    ) 
  },
  { 
    name: 'Instagram', 
    href: 'https://instagram.com', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ) 
  },
  { 
    name: 'LinkedIn', 
    href: 'https://linkedin.com', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  },
];

export default function PartnersSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const brandLogos = [
    { id: "easymoto", name: "Easymoto", type: 'image', src: '/images/partners/easymoto.jpg' },
    { id: "amicus", name: "Amicus Law", type: 'image', src: '/images/partners/amicus.jpg' },
    { id: "aryalfarm", name: "Aryal Farm", type: 'image', src: '/images/partners/aryal_farm.jfif' },
    { id: "retool", component: Retool, className: "w-28 opacity-60 hover:opacity-100 transition-opacity" },
    { id: "vercel", component: Vercel, className: "w-28 opacity-60 hover:opacity-100 transition-opacity" },
  ];

  if (!mounted) return <div className="py-24 bg-black" />;

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Background Ambience for top part */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-[50%]">
        <div className="orb orb-purple opacity-10 w-[600px] h-[600px]" style={{ top: ' -20%', left: '50%', transform: 'translateX(-50%)' }} />
      </div>

      <div className="container relative z-10 px-4 pt-24 pb-12 mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fadeIn">
          <div className="section-label mx-auto mb-6">Partnership</div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
            Trusted by Industrial <span className="text-gradient-blue italic">Leaders.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            We collaborate with visionaries and market giants to deliver high-performance digital solutions across Nepal and beyond.
          </p>
        </div>

        {/* Logo Slider Area */}
        <div className="relative h-[100px] w-full mt-10 group">
          <InfiniteSlider 
            className='flex h-full w-full items-center' 
            duration={30}
            gap={80}
            durationOnHover={60}
          >
            {brandLogos.map((brand) => (
              <div 
                key={brand.id} 
                className="flex items-center justify-center min-w-[140px] transition-all duration-300 filter grayscale hover:grayscale-0 contrast-125 hover:scale-110"
              >
                {brand.component ? (
                  <div className={brand.className}>
                    <brand.component />
                  </div>
                ) : brand.type === 'image' ? (
                  <div className="flex items-center gap-3 group/logo">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 glass p-1 flex items-center justify-center relative">
                        <Image 
                          src={brand.src} 
                          alt={brand.name} 
                          fill 
                          className="object-cover rounded-full"
                        />
                    </div>
                    <span className="text-white/60 font-bold text-sm tracking-widest group-hover/logo:text-white transition-colors uppercase whitespace-nowrap">{brand.name}</span>
                  </div>
                ) : null}
              </div>
            ))}
          </InfiniteSlider>

          <ProgressiveBlur
            className='pointer-events-none absolute top-0 left-0 h-full w-[150px] z-20'
            direction='left'
            blurIntensity={2}
          />
          <ProgressiveBlur
            className='pointer-events-none absolute top-0 right-0 h-full w-[150px] z-20'
            direction='right'
            blurIntensity={2}
          />
        </div>
      </div>

      {/* FOOTER INTEGRATION */}
      <div className="relative mt-24">
         {/* Background Sparkles & Curved Transition */}
         <div className="relative h-[250px] w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] -mb-32 pointer-events-none">
            <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--blue),transparent_70%)] before:opacity-30" />
            <div className="absolute -left-1/4 top-1/2 aspect-[1/0.5] z-0 w-[150%] rounded-[100%] border-t border-white/10 bg-black/80 backdrop-blur-3xl" />
            <Sparkles
                density={1200}
                className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                color="#ffffff"
                size={1.5}
                opacity={1}
            />
         </div>

         {/* Main Footer Content */}

            <div className="container px-4 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-4 max-w-5xl">
                        <div className="flex items-center gap-4 mb-8 group cursor-pointer">
                            <div className="relative w25 h-25">
                                <div className="absolute inset-0 rounded-xl bg-blue-500/30 blur-xl group-hover:bg-yellow-500/30 transition-colors duration-500" />
                                <div className="relative z-10 w-full h-full glass border border-white/10 rounded-xl flex items-center justify-center p-2.5 overflow-hidden">
                                     <Image src="/images/logo.png" alt="Techwired" width={100} height={100} className="object-contain" />
                                </div>
                            </div>
                            {/* <div>
                                <h3 className="font-display font-bold text-[15px] tracking-tight">
                                    <span className="text-blue-400">Techwired</span>
                                    <span className="text-yellow-400 ml-1">Solutions</span>
                                </h3>
                                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Engineering Excellence</p>
                            </div> */}
                        </div>
                        <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">
                            Crafting high-fidelity digital ecosystems that bridge the gap between imagination and reality. We build the future, one pixel at a time.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    className="w-10 h-10 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                                    aria-label={s.name}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((l) => (
                                <li key={l.name}>
                                    <NextLink href={l.href} className="text-gray-500 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2 group">
                                        <div className="w-1.5 h-[1px] bg-gray-800 group-hover:w-3 group-hover:bg-blue-400 transition-all duration-300" />
                                        {l.name}
                                    </NextLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Expertise</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {serviceLinks.map((s) => (
                                <div key={s} className="flex items-center gap-3 text-gray-500 hover:text-white text-sm transition-colors cursor-default group">
                                    <div className="w-1 h-1 rounded-full bg-blue-500/50 group-hover:bg-blue-400" />
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Get in Touch</h4>
                        <div className="space-y-6">
                            <a href="mailto:s.techwired@gmail.com" className="group flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-black transition-colors">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                                    </svg>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Email</p>
                                    <p className="text-gray-300 group-hover:text-white transition-colors">s.techwired@gmail.com</p>
                                </div>
                            </a>
                            <a href="https://wa.me/9779866243388" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                                <div className="p-2 rounded-lg bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-black transition-colors">
                                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                    </svg>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">WhatsApp</p>
                                    <p className="text-gray-300 group-hover:text-white transition-colors">+977 9866243388</p>
                                </div>
                            </a>
                            <div className="flex items-start gap-4 p-4">
                                <div className="p-2 rounded-lg bg-gray-500/10 text-gray-400">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                                    </svg>
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Location</p>
                                    <p className="text-gray-300 leading-relaxed">Remote</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-gray-500 text-xs font-light tracking-wide flex flex-wrap justify-center gap-2 items-center">
                        <span>© 2026 Techwired Solutions.</span>
                        <span className="hidden md:inline text-white/10">|</span>
                        <span>Designed & Developed by <span className="text-gray-300 font-bold">Techwired Team</span></span>
                        <span className="hidden md:inline text-white/10">|</span>
                        <span className="flex items-center gap-1">Built with <span className="text-red-500">❤️</span> in Nepal</span>
                    </div>

                    <button 
                        onClick={scrollToTop}
                        className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white">Slide to Top</span>
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-400 group-hover:text-black">
                                <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>

            {/* Floating Background Text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 select-none pointer-events-none z-[-1] opacity-[0.02]">
                <h2 className="text-[12vw] font-black leading-none whitespace-nowrap text-white">TECHWIRED</h2>
            </div>
         </div>
      
    </section>
  );
}
