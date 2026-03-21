'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import HeroScene from '../3d/HeroScene';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Split text into characters for animation
      if (titleRef.current) {
        const titleSplit = new SplitType(titleRef.current, { types: 'chars,words' });
        
        gsap.from(titleSplit.chars, {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: 0.02,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
          },
        });
      }

      if (subtitleRef.current) {
        const subtitleSplit = new SplitType(subtitleRef.current, { types: 'words' });
        
        gsap.from(subtitleSplit.words, {
          opacity: 0,
          y: 50,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5,
        });
      }

      // Description fade in
      gsap.from(descRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1,
        ease: 'power2.out',
      });

      // CTA buttons
      gsap.from(ctaRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.6,
        delay: 1.3,
        ease: 'back.out(1.7)',
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <HeroScene />
      
      {/* Content */}
      <div className="container relative z-10 text-center py-32">
        <div className="max-w-8xl mx-auto">
          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-8xl md:text-16xl font-black mb-8 tracking-tighter select-none w-full text-center mx-auto"
            style={{ 
              lineHeight: 0.9,
              textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.5)',
              fontSize: '6rem'
            }}
          >
            <span className="text-[#0061ff]">Techwired</span>{' '}
            <span className="text-[#facc15]">Solutions</span>
          </h1>

          {/* Subtitle with Gradient */}
          <h2
            ref={subtitleRef}
            className="text-3xl md:text-8xl font-bold mb-10 text-gray-800 w-full text-center mx-auto"
            style={{ textShadow: '0 2px 20px rgba(255, 255, 255, 1)', marginTop: '1rem' }}
          >
            <span className="text-[#0]">Powering Your Digital Future</span>{' '}
          </h2>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ marginTop: '1rem' }}>
            <a
              href="#contact"
              className="btn btn-primary px-8 py-4 text-lg"
            >
              Build My Digital Presence
            </a>
            <a
              href="#services"
              className="btn btn-secondary px-8 py-4 text-lg"
            >
              View Our Solutions
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute  left-1/2 transform -translate-x-1/2 animate-bounce" >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
