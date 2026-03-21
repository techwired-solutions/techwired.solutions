'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '50+', label: 'Projects Completed' },
  { number: '30+', label: 'Companies Served' },
  { number: '5+', label: 'Years of Experience' },
  { number: '100%', label: 'Client Satisfaction' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content Animation
      gsap.from(contentRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Visual Animation
      gsap.from(visualRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Stats Stagger
      gsap.from('.stat-card', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.4,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        }
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section bg-gray-50 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Visual */}
          <div ref={visualRef} className="relative h-96 lg:h-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-full flex items-center justify-center animate-float">
              <div className="text-9xl animate-pulse">

                  <img src="/images/logo.png" />
               
              </div>

              {/* Decorative Circles */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full scale-110" />
              <div className="absolute inset-0 border border-primary/10 rounded-full scale-125 border-dashed animate-spin-slow" />
            </div>
          </div>

          {/* Right Side - Content */}
          <div ref={contentRef}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
              About <br></br><span className="text-[#0061ff]">Techwired</span> <span className="text-[#facc15]">Solutions</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed ">
              Techwired Solutions is a full-service IT and digital solutions company focused on creating impactful online experiences for modern businesses. We provide end-to-end services including website design, UI/UX development, graphic design, promotional videos, digital advertising, video automation, product package design, and complete social media management. By blending creativity with cutting-edge technology, we deliver smart, scalable, and results-driven solutions that help brands grow and succeed in the digital world.
            </p>
    

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="stat-card card text-center p-6 border-l-4 border-l-primary"
                >
                  <div className="text-4xl font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
