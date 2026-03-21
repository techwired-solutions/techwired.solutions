'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'websites',
    description: 'Full-stack e-commerce solution with payment integration',
    image: '🛍️',
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'apps',
    description: 'Secure mobile banking application for iOS and Android',
    image: '💳',
  },
  {
    id: 3,
    title: 'Brand Identity Design',
    category: 'branding',
    description: 'Complete brand identity for tech startup',
    image: '🎨',
  },
  {
    id: 4,
    title: 'Corporate Video',
    category: 'videos',
    description: 'Professional corporate video production',
    image: '🎬',
  },
  {
    id: 5,
    title: 'Cloud Hosting Solution',
    category: 'hosting',
    description: 'Scalable cloud hosting infrastructure',
    image: '☁️',
  },
  {
    id: 6,
    title: 'Social Media Campaign',
    category: 'marketing',
    description: 'Viral social media marketing campaign',
    image: '📱',
  },
];

const categories = ['all', 'websites', 'apps', 'branding', 'videos', 'hosting', 'marketing'];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Filter projects
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Reset animations when category changes
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="projects" className="section bg-white">
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
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="card group cursor-pointer hover:border-primary/30"
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
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs capitalize font-semibold">
                {project.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
