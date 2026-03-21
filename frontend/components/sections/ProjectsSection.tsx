'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'easymoto.com.np',
    category: 'websites',
    description: 'E-commerce platform for automotive accessories',
    image: '🏍️',
  },
  {
    id: 2,
    title: 'amicus.com.np',
    category: 'websites',
    description: 'Professional corporate website solution',
    image: '🏢',
  },
  {
    id: 3,
    title: 'aryalfarm.com.np',
    category: 'websites',
    description: 'Digital presence for modern agriculture',
    image: '🌾',
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
            <div
              key={project.id}
              className="project-card card group cursor-pointer hover:border-[#0061ff]/30"
            >
              <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="inline-block px-3 py-1 rounded-full bg-[#0061ff]/10 text-[#0061ff] text-xs capitalize font-semibold">
                {project.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
