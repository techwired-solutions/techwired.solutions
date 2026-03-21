'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  neonBorder?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  neonBorder = false,
}: GlassCardProps) {
  const baseStyles = 'glass-card p-6 transition-smooth';
  const borderStyles = neonBorder ? 'neon-border' : '';
  
  return (
    <motion.div
      className={`${baseStyles} ${borderStyles} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={
        hover
          ? {
              y: -8,
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
              transition: { duration: 0.3 },
            }
          : {}
      }
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}
