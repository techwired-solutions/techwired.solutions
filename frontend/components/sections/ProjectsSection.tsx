'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'easymoto rental service pvt ltd',
    category: 'websites',
    description: 'A motorbike rental service platform where users can easily rent motorbikes.',
    image: '🏍️',
    link: 'https://easymoto.com.np',
  },
  {
    id: 2,
    title: 'amicus institute of law pvt ltd',
    category: 'websites',
    description: 'A dedicated law institute providing top-tier legal education and resources.',
    image: '🏢',
    link: 'https://amicus.com.np',
  },
  {
    id: 3,
    title: 'aryal multipurpose agricultural farm pvt ltd',
    category: 'websites',
    description: 'An agricultural farm focusing on premium dairy products.',
    image: '🌾',
    link: 'https://aryalfarm.com.np',
  },
];

const categories = ['all', 'websites'];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);

  // Filter projects
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Find all project cards explicitly within this section context
      const cards = gsap.utils.toArray('.project-card');
      
      cards.forEach((card: any) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="projects" className="section bg-white border-t border-gray-100">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#0061ff]">Super Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcasing our best work across different domains
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 capitalize font-medium ${
                activeCategory === category
                  ? 'bg-[#0061ff] text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card card group cursor-pointer hover:border-[#0061ff]/30 block relative overflow-hidden"
            >
              <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 capitalize">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              {/* Bottom details */}
              <div className="flex items-center justify-between mt-auto">
                <div className="inline-block px-3 py-1 rounded-full bg-[#0061ff]/10 text-[#0061ff] text-xs capitalize font-semibold">
                  {project.category}
                </div>
                <div className="text-[#0061ff] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  Visit Site
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
