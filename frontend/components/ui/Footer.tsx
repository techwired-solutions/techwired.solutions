'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Web Development',
    'Mobile Apps',
    'Domain & Hosting',
    'Graphics Design',
    'Video Production',
    'SEO & Marketing',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#C084FC] rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">T</span>
              </div>
              <span className="text-lg font-bold gradient-text">
                <span className="text-[#0061ff]">Techwired</span> <span className="text-[#facc15]">Solutions</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Engineering digital experiences that inspire. Complete digital solutions from domain to deployment.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons - placeholder for now */}
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#8B5CF6] transition-smooth cursor-pointer">
                <span className="text-xs">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#8B5CF6] transition-smooth cursor-pointer">
                <span className="text-xs">IG</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#8B5CF6] transition-smooth cursor-pointer">
                <span className="text-xs">LI</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#C084FC] transition-smooth text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-gray-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-gray-400">
                <span>📧</span>
                <a
                  href="mailto:s.techwired@gmail.com"
                  className="hover:text-[#C084FC] transition-smooth"
                >
                  s.techwired@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <span>📱</span>
                <a
                  href="tel:+9779843641508"
                  className="hover:text-[#C084FC] transition-smooth"
                >
                  +977 9843641508
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <span>📍</span>
                <span>Budhanilkantha, Kathmandu, Nepal</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-400 text-sm">
            © 2025 Techwired Solutions — Built with ❤️ in Nepal
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
