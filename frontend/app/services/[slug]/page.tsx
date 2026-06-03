'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import ContactSection from '@/components/sections/ContactSection';
import { services } from '@/data/services';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const heroRef = useRef<HTMLElement>(null);
  
  const service = services.find((s) => s.id === slug);

  useEffect(() => {
     if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll('.animate-hero'), {
           y: 50,
           opacity: 0,
           duration: 1,
           stagger: 0.2,
           ease: 'power3.out',
           immediateRender: false,
        });
     }
  }, []);

  if (!service) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-24 mt-20 overflow-hidden bg-white">
         {/* Background Elements */}
         <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-gray-50 to-transparent" />
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#0061ff]/5 rounded-full blur-3xl" />
         </div>

         <div className="container relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
               <div className="lg:w-1/2">
                  <div className="animate-hero flex items-center gap-3 text-sm font-bold text-[#0061ff] mb-6 uppercase tracking-wider">
                     <span className="w-8 h-[2px] bg-[#0061ff]"></span>
                     Service Details
                  </div>
                  
                  <h1 className="animate-hero text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                     {service.title}
                  </h1>
                  
                  <p className="animate-hero text-xl text-gray-600 leading-relaxed mb-10 max-w-xl">
                     {service.description}
                  </p>
                  
                  <div className="animate-hero flex gap-4">
                     <a href="#service-contact" className="px-8 py-4 bg-[#0061ff] text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25">
                        Start Project
                     </a>
                     <a href="#overview" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all">
                        Learn More
                     </a>
                  </div>
               </div>
               
               {/* Hero Visual */}
               <div className="animate-hero lg:w-1/2 relative">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 p-8">
                     <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50"></div>
                     
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[10rem] text-[#0061ff]/10 filter drop-shadow-sm">
                           {service.icon}
                        </div>
                     </div>
                     
                     {/* Floating Information Cards - Light Theme */}
                     <div className="absolute top-12 right-12 p-5 bg-white shadow-xl border border-gray-100 rounded-2xl animate-float max-w-[200px]">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                           <span className="text-sm font-bold text-gray-900">Active</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full w-3/4 bg-green-500 rounded-full"></div>
                        </div>
                     </div>
                     
                     <div className="absolute bottom-12 left-12 p-5 bg-white shadow-xl border border-gray-100 rounded-2xl animate-float animation-delay-2000">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-[#0061ff]/10 flex items-center justify-center text-[#0061ff]">
                              ★
                           </div>
                           <div>
                              <div className="text-sm font-bold text-gray-900">Premium</div>
                              <div className="text-xs text-gray-500">Quality Assured</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Main Content */}
      <section id="overview" className="py-24 bg-gray-50/50">
        <div className="container px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Content */}
            <div className="lg:w-2/3">
               <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Overview</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                     {service.longDescription}
                  </p>
               </div>

               <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                     {service.features.map((feature, i) => (
                        <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#0061ff]/30 hover:shadow-md transition-all group">
                           <div className="w-10 h-10 rounded-full bg-[#0061ff]/5 flex items-center justify-center flex-shrink-0 text-[#0061ff] group-hover:bg-[#0061ff] group-hover:text-white transition-colors">
                              ✓
                           </div>
                           <div>
                              <h3 className="font-bold text-gray-900 mb-1">{feature}</h3>
                              <p className="text-sm text-gray-500">Professional implementation</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Sidebar - Light Theme */}
            <div className="lg:w-1/3">
               <div className="sticky top-32 space-y-8">
                  <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                     <h3 className="text-2xl font-bold text-gray-900 mb-6">Strategic Benefits</h3>
                     <ul className="space-y-4">
                        {service.benefits.map((benefit, i) => (
                           <li key={i} className="flex items-start gap-3">
                              <span className="text-[#facc15] text-xl mt-0.5">★</span>
                              <span className="text-gray-600 font-medium">{benefit}</span>
                           </li>
                        ))}
                     </ul>
                  </div>

                  <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl">
                     <h3 className="text-2xl font-bold text-gray-900 mb-4">Have questions?</h3>
                     <p className="text-gray-600 font-medium mb-6">Our experts are ready to discuss your specific requirements.</p>
                     <a href="https://wa.me/9779866243388" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[#0061ff] border border-[#0061ff]/20 rounded-xl font-bold hover:bg-[#0061ff] hover:text-white transition-all">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                           <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                        </svg>
                        WhatsApp Us
                     </a>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Process Section - Light Theme */}
      <section className="py-24 bg-white border-t border-gray-100">
         <div className="container px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">How We Work</h2>
               <p className="text-gray-600 max-w-2xl mx-auto">Our proven methodology ensures we deliver excellence, every time.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
               {[
                  { title: "Discovery", desc: "We analyze your needs and goals." },
                  { title: "Strategy", desc: "We devise a tailored roadmap." },
                  { title: "Execution", desc: "We build with precision and care." },
                  { title: "Launch", desc: "We deploy and monitor success." }
               ].map((step, i) => (
                  <div key={i} className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 relative group hover:bg-white hover:shadow-xl transition-all duration-300">
                     <div className="text-6xl font-black text-gray-100 absolute top-4 right-4 z-0 group-hover:text-blue-50 transition-colors">0{i+1}</div>
                     <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{step.title}</h3>
                     <p className="text-gray-500 relative z-10">{step.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <div id="service-contact">
         <ContactSection />
      </div>
    </main>
  );
}
