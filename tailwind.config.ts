import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E8C97A',
          dark:    '#9B7B2E',
          50:      'rgba(201,168,76,0.05)',
          100:     'rgba(201,168,76,0.08)',
          200:     'rgba(201,168,76,0.15)',
          300:     'rgba(201,168,76,0.25)',
          400:     'rgba(201,168,76,0.40)',
        },
        noir: {
          root:    '#0A0A0A',
          card:    '#111111',
          surface: '#1A1A1A',
          sidebar: '#0D0D0D',
          border:  '#2A2A2A',
          muted:   '#1E1E1E',
          sep:     '#3A3A3A',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          muted:   '#A89880',
          faint:   '#6B5E4E',
          ghost:   '#3A3A3A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #C9A84C, #9B7B2E)',
        'gold-text':      'linear-gradient(135deg, #FFFFFF 0%, #C9A84C 40%, #E8C97A 60%, #FFFFFF 100%)',
        'hero-radial':    'radial-gradient(ellipse at 50% 0%, #1A1208 0%, #0A0A0A 60%, #000000 100%)',
        'card-gradient':  'linear-gradient(145deg, #141414, #0F0F0F)',
        'gold-shimmer':   'linear-gradient(90deg, #1A1A1A 25%, #2A2A2A 50%, #1A1A1A 75%)',
      },
      boxShadow: {
        'gold':        '0 0 20px rgba(201,168,76,0.2)',
        'gold-md':     '0 0 30px rgba(201,168,76,0.25)',
        'gold-lg':     '0 0 40px rgba(201,168,76,0.4)',
        'gold-xl':     '0 0 80px rgba(201,168,76,0.15)',
        'card':        '0 4px 24px rgba(0,0,0,0.5)',
        'card-hover':  '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,76,0.08)',
        'sidebar':     '4px 0 24px rgba(0,0,0,0.6)',
      },
      borderRadius: {
        card: '12px',
        modal: '16px',
      },
      animation: {
        'shimmer':       'shimmer 1.8s ease-in-out infinite',
        'pulse-gold':    'pulse-gold 2s ease-in-out infinite',
        'fade-in':       'fade-in 0.25s ease',
        'slide-up':      'slide-up 0.3s ease',
        'slide-in-left': 'slide-in-left 0.3s ease',
        'glow':          'glow 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%':      { boxShadow: '0 0 0 20px rgba(201,168,76,0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-10px)', opacity: '0' },
          to:   { transform: 'translateX(0)',     opacity: '1' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(201,168,76,0.3)' },
          '50%':      { textShadow: '0 0 25px rgba(201,168,76,0.6)' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
