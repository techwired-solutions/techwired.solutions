'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '../forms/ContactForm';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Info Animation
      gsap.from(infoRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Form Animation
      gsap.from(formRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section bg-white border-t border-gray-200">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Start Your <span className="text-[#0061ff]">Digital Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's build something amazing together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 items-start">
          {/* Left Side - Contact Info (Takes 2/5 columns) */}
          <div ref={infoRef} className="lg:col-span-2 space-y-8 sticky top-32">
            <div className="card bg-white border border-gray-100 shadow-xl p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#0061ff]/5 flex items-center justify-center text-2xl flex-shrink-0 text-[#0061ff]">
                    📧
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Email Us</div>
                    <a
                      href="mailto:s.techwired@gmail.com"
                      className="text-gray-900 hover:text-[#0061ff] transition-colors font-bold text-lg break-all"
                    >
                      s.techwired@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#0061ff]/5 flex items-center justify-center text-2xl flex-shrink-0 text-[#0061ff]">
                    📱
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Call Us</div>
                    <a
                      href="tel:+9779843641508"
                      className="text-gray-900 hover:text-[#0061ff] transition-colors font-bold text-lg"
                    >
                      +977 9843641508
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#0061ff]/5 flex items-center justify-center text-2xl flex-shrink-0 text-[#0061ff]">
                    📍
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-1">Location</div>
                    <div className="text-gray-900 font-bold text-lg">
                      Budhanilkantha, Nepal <span className="text-gray-400 font-normal">(Remote)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="card bg-gray-50 border border-gray-200 p-8 rounded-3xl">
              <h4 className="text-xl font-bold text-gray-900 mb-6">
                What You Get:
              </h4>
              <ul className="space-y-4">
                {[
                  'Free Consultation',
                  'Affordable Packages',
                  '24/7 Support',
                  'Everything from Domain → Deployment',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 text-sm font-bold">✓</div>
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Form (Takes 3/5 columns & Gray Background) */}
          <div
            ref={formRef}
            className="lg:col-span-3 bg-gradient-to-br from-gray-50 to-gray-100 p-10 md:p-16 rounded-3xl shadow-xl flex justify-center"
          >
            <div className="w-full max-w-3xl">
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
