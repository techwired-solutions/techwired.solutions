'use client';

import React from 'react';
import Image from 'next/image';
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { useTheme } from "next-themes"

// SVGs for partner logos (Retool, Vercel, etc.)
const Retool = () => (
    <svg viewBox="0 0 180 56" fill="currentColor" className="w-full">
      <path d="M34 18.2a2.2 2.2 0 012.2-2.2h8.6a2.2 2.2 0 012.2 2.2v1.7a1.1 1.1 0 01-1.1 1.1H35.1a1.1 1.1 0 01-1.1-1.1v-1.7zM34 25.1a1.1 1.1 0 011.1-1.1h20.7a2.2 2.2 0 012.2 2.2v5.7a1.1 1.1 0 01-1.1 1.1H36.2a2.2 2.2 0 01-2.2-2.2v-5.7zM45 37.1a1.1 1.1 0 011.1-1.1h10.8a1.1 1.1 0 011.1 1.1v.7a2.2 2.2 0 01-2.2 2.2h-8.6a2.2 2.2 0 01-2.2-2.2v-.7zM71.596 30.741h2.311l4.293 7.017h5.256l-4.76-7.512c2.641-.909 4.182-2.945 4.182-5.89 0-4.127-2.89-6.356-7.54-6.356H67v19.758h4.596v-7.017zm0-3.742V21.88h3.494c2.174 0 3.275.936 3.275 2.56 0 1.595-1.1 2.558-3.275 2.558h-3.494zM91.363 38.06c2.89 0 5.531-1.458 6.605-4.237L94.28 32.64c-.413 1.266-1.486 1.926-2.862 1.926-1.678 0-2.862-1.128-3.164-3.11h9.824v-1.155c0-4.1-2.395-7.348-6.797-7.348-4.183 0-7.265 3.247-7.265 7.54 0 4.513 2.972 7.568 7.347 7.568zm-.138-11.694c1.624 0 2.477 1.1 2.505 2.394H88.39c.44-1.596 1.486-2.394 2.834-2.394zM100.573 33.878c0 2.972 1.569 4.018 4.706 4.018 1.046 0 1.871-.083 2.642-.193v-3.605c-.496.055-.743.083-1.266.083-1.101 0-1.734-.22-1.734-1.431v-5.862h2.834v-3.632h-2.834v-4.018h-4.348v4.018h-1.844v3.632h1.844v6.99zM123.672 30.52c0-4.512-3-7.567-7.265-7.567-4.293 0-7.265 3.055-7.265 7.568s2.972 7.54 7.265 7.54c4.265 0 7.265-3.027 7.265-7.54zm-10.154 0c0-2.53 1.128-3.962 2.889-3.962s2.89 1.431 2.89 3.963-1.129 3.962-2.89 3.962c-1.761 0-2.889-1.43-2.889-3.962zM139.527 30.52c0-4.512-2.999-7.567-7.265-7.567-4.293 0-7.265 3.055-7.265 7.568s2.972 7.54 7.265 7.54c4.266 0 7.265-3.027 7.265-7.54zm-10.154 0c0-2.53 1.128-3.962 2.889-3.962 1.762 0 2.89 1.431 2.89 3.963s-1.128 3.962-2.89 3.962c-1.761 0-2.889-1.43-2.889-3.962zM146 18h-4.403v19.758H146V18z" />
    </svg>
  )
  
  const Vercel = () => (
    <svg viewBox="0 0 180 54" fill="currentColor" className="w-full">
      <path d="M89.515 20.5c-4.424 0-7.614 2.925-7.614 7.313 0 4.387 3.59 7.312 8.014 7.312 2.673 0 5.03-1.072 6.488-2.88l-3.066-1.796c-.81.898-2.04 1.422-3.422 1.422-1.919 0-3.55-1.016-4.155-2.64h11.228c.088-.456.14-.927.14-1.423 0-4.383-3.19-7.308-7.613-7.308zm-3.791 5.89c.5-1.62 1.871-2.64 3.787-2.64 1.919 0 3.29 1.02 3.786 2.64h-7.573zm46.938-5.89c-4.424 0-7.613 2.925-7.613 7.313 0 4.387 3.59 7.312 8.014 7.312 2.672 0 5.028-1.072 6.487-2.88l-3.065-1.796c-.81.898-2.04 1.422-3.422 1.422-1.92 0-3.551-1.016-4.156-2.64h11.228c.088-.456.14-.927.14-1.423 0-4.383-3.189-7.308-7.613-7.308zm-3.787 5.89c.501-1.62 1.872-2.64 3.787-2.64 1.919 0 3.29 1.02 3.787 2.64h-7.574zm-15.639 1.422c0 2.438 1.571 4.063 4.007 4.063 1.651 0 2.889-.76 3.526-1.999l3.078 1.8c-1.275 2.153-3.663 3.449-6.604 3.449-4.428 0-7.613-2.925-7.613-7.313 0-4.387 3.189-7.312 7.613-7.312 2.941 0 5.325 1.296 6.604 3.45l-3.078 1.799c-.637-1.24-1.875-1.999-3.526-1.999-2.432 0-4.007 1.625-4.007 4.063zm33.05-11.78v18.687h-3.607V16.03h3.607zM47.806 14l14.806 26H33l14.806-26zm37.016 2.031l-11.103 19.5-11.103-19.5h4.163l6.94 12.188 6.94-12.188h4.163zm23.606 4.875v3.937a4.517 4.517 0 00-1.283-.2c-2.328 0-4.007 1.626-4.007 4.063v6.013h-3.606V20.906h3.606v3.738c0-2.064 2.369-3.738 5.29-3.738z" />
    </svg>
  )

export default function PartnersSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const brandLogos = [
    { id: "easymoto", name: "Easymoto", type: 'image', src: '/images/partners/easymoto.jpg' },
    { id: "amicus", name: "Amicus Law", type: 'image', src: '/images/partners/amicus.jpg' },
    { id: "aryalfarm", name: "Aryal Farm", type: 'image', src: '/images/partners/aryal_farm.jfif' },
    { id: "retool", component: Retool, className: "w-28 opacity-60 hover:opacity-100 transition-opacity" },
    { id: "vercel", component: Vercel, className: "w-28 opacity-60 hover:opacity-100 transition-opacity" },
  ];

  if (!mounted) return <div className="py-24 bg-black" />;

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Background Ambience for top part */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-[50%]">
        <div className="orb orb-purple opacity-10 w-[600px] h-[600px]" style={{ top: ' -20%', left: '50%', transform: 'translateX(-50%)' }} />
      </div>

      <div className="container relative z-10 px-4 pt-24 pb-12 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="section-label mx-auto mb-6">Partnership</div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6 leading-tight">
            Trusted by Industrial <span className="text-gradient-blue italic">Leaders.</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            We collaborate with visionaries and market giants to deliver high-performance digital solutions across Nepal and beyond.
          </p>
        </div>

        {/* Logo Slider Area */}
        <div className="relative h-[100px] w-full mt-10 group">
          <InfiniteSlider 
            className='flex h-full w-full items-center' 
            duration={30}
            gap={80}
            durationOnHover={60}
          >
            {brandLogos.map((brand) => (
              <div 
                key={brand.id} 
                className="flex items-center justify-center min-w-[140px] transition-all duration-300 filter grayscale hover:grayscale-0 contrast-125 hover:scale-110"
              >
                {brand.component ? (
                  <div className={brand.className}>
                    <brand.component />
                  </div>
                ) : brand.type === 'image' ? (
                  <div className="flex items-center gap-3 group/logo">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 glass p-1 flex items-center justify-center relative">
                        <Image 
                          src={brand.src} 
                          alt={brand.name} 
                          fill 
                          className="object-cover rounded-full"
                        />
                    </div>
                    <span className="text-white/60 font-bold text-sm tracking-widest group-hover/logo:text-white transition-colors uppercase whitespace-nowrap">{brand.name}</span>
                  </div>
                ) : null}
              </div>
            ))}
          </InfiniteSlider>

          <ProgressiveBlur
            className='pointer-events-none absolute top-0 left-0 h-full w-[150px] z-20'
            direction='left'
            blurIntensity={2}
          />
          <ProgressiveBlur
            className='pointer-events-none absolute top-0 right-0 h-full w-[150px] z-20'
            direction='right'
            blurIntensity={2}
          />
        </div>
      </div>
    </section>
  );
}
