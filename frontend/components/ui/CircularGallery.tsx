'use client';

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Define the type for a single gallery item
export interface GalleryItem {
  id?: number | string;
  common: string;
  binomial: string;
  link?: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by: string;
  };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Effect to handle scroll-based rotation
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360;
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // Effect for auto-rotation when not scrolling
    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;
    
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

            return (
              <div
                key={item.id || item.photo.url} 
                role="group"
                aria-label={item.common}
                className="absolute w-[200px] h-[280px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-100px',
                  marginTop: '-45px', // Lifted back up slightly to clear the bottom gap
                  opacity: opacity,
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div 
                  className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-white/10 bg-black/80 backdrop-blur-2xl cursor-pointer flex flex-col items-center"
                  onClick={() => item.link && window.open(item.link, '_blank')}
                >
                  {/* Image Area - Fully contained */}
                  <div className="relative w-full aspect-[4/3] bg-white/5 overflow-hidden flex items-center justify-center p-6">
                    <img
                      src={item.photo.url}
                      alt={item.photo.text}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content Area - Minimized font for perfect visibility */}
                  <div className="flex-1 px-1.5 py-3 flex flex-col items-center justify-center text-center w-full min-w-0">
                    <h2 className="text-[6.5px] font-black font-sans text-white mb-0.5 group-hover:text-blue-400 transition-colors tracking-tight leading-none">
                      {item.common}
                    </h2>
                    <em className="text-[5.5px] font-sans text-gray-500 block mb-2 leading-none">
                      {item.binomial}
                    </em>
                    
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-[5px] font-bold text-blue-400 uppercase tracking-tighter hover:bg-blue-500/20 transition-colors">
                      <span>Launch Site</span>
                    </div>
                  </div>

                  {/* Dot indicator */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
