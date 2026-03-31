import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark base
        base:     '#0A0A0F',
        surface:  '#0F0F1A',
        elevated: '#13131E',
        'card-bg':'#161625',

        // Brand
        blue: {
          DEFAULT: '#3B82F6',
          dark:    '#2563EB',
          light:   '#60A5FA',
          glow:    'rgba(59,130,246,0.35)',
        },
        purple: {
          DEFAULT: '#A855F7',
          dark:    '#7C3AED',
          light:   '#C084FC',
        },
        cyan: {
          DEFAULT: '#00D4FF',
          dark:    '#0EA5E9',
        },

        // Neutral (dark-adjusted)
        gray: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
      },

      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Inter', 'sans-serif'],
      },

      spacing: {
        xs:   '8px',  sm:   '16px', md:   '24px',
        lg:   '32px', xl:   '48px', '2xl':'64px',
        '3xl':'96px', '4xl':'128px',
      },

      borderRadius: {
        sm: '8px', md: '12px', lg: '16px',
        xl: '24px', '2xl': '32px',
      },

      fontSize: {
        '10xl': '10rem', '12xl': '12rem',
        '14xl': '14rem', '16xl': '16rem',
      },

      boxShadow: {
        'glow-blue':   '0 0 30px rgba(59,130,246,0.4)',
        'glow-purple': '0 0 30px rgba(168,85,247,0.4)',
        'glow-cyan':   '0 0 30px rgba(0,212,255,0.3)',
        'card':        '0 20px 60px rgba(0,0,0,0.5)',
        'card-hover':  '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.1)',
        'neon-blue':   '0 0 5px #3B82F6, 0 0 20px rgba(59,130,246,0.5)',
      },

      animation: {
        'float':        'float 6s ease-in-out infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'glow-pulse':   'glow-pulse 2.5s ease-in-out infinite',
        'marquee':      'marquee 30s linear infinite',
        'spin-slow':    'spin-slow 20s linear infinite',
        'gradient':     'gradient-shift 4s ease infinite',
        'slide-up':     'fadeInUp 0.7s ease-out forwards',
        'scale-in':     'scale-in 0.5s ease-out forwards',
        'neon-flicker': 'neon-flicker 4s ease-in-out infinite',
      },

      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'glow-pulse': {
          '0%,100%': { boxShadow: '0 0 20px rgba(59,130,246,0.3)' },
          '50%':     { boxShadow: '0 0 40px rgba(59,130,246,0.6)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'gradient-shift': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.85)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'neon-flicker': {
          '0%,90%,100%': { opacity: '1' },
          '91%,93%,97%': { opacity: '0.8' },
        },
      },

      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-blue-purple': 'linear-gradient(135deg, #3B82F6, #A855F7)',
        'gradient-blue-cyan':   'linear-gradient(135deg, #3B82F6, #00D4FF)',
        'dot-grid':          'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

export default config
