'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Experienced Full-Stack Engineers',
    description: 'Expert developers with years of industry experience',
    icon: '👨‍💻',
  },
  {
    title: 'Creative Designers & Video Editors',
    description: 'Award-winning creative team',
    icon: '🎨',
  },
  {
    title: 'Fast Turnaround',
    description: 'Quick delivery without compromising quality',
    icon: '⚡',
  },
  {
    title: 'Secure Infrastructure',
    description: 'Enterprise-grade security and reliability',
    icon: '🔒',
  },
  {
    title: 'Scalable Digital Solutions',
    description: 'Built to grow with your business',
    icon: '📈',
  },
  {
    title: 'Dedicated Client Support',
    description: '24/7 support for all our clients',
    icon: '🤝',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate cards on scroll
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          opacity: 0,
          y: 60,
          x: index % 2 === 0 ? -30 : 30,
          rotation: index % 2 === 0 ? -5 : 5,
          scale: 0.9,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="solutions" className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
              Why <span className="text-[#0061ff]">Techwired</span> <span className="text-[#facc15]">Solutions</span> ?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We combine technical excellence with creative innovation
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              ref={(el) => {cardsRef.current[index] = el}}
              className="card group cursor-pointer h-full hover:-translate-y-2 transition-transform duration-300 bg-white"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
