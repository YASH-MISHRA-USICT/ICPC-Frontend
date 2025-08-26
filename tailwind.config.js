/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // toggle <html class="dark">
  theme: {
    extend: {
      colors: {
        // custom surfaces (so you don’t hardcode gray-800 everywhere)
        surface: {
          0: '#ffffff',
          1: '#f9fafb',
          card: '#ffffff',
          // dark mode versions
          dark0: '#0a0a0a',
          dark1: '#111827',
          darkCard: '#1f2937',
        },
        brand: {
          blue: {
            DEFAULT: '#3b82f6',
            dark: '#60a5fa',
          },
        },
      },
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
          link: 'var(--color-text-link)',
        },
      },
      backgroundColor: {
        skin: {
          fill: 'var(--color-fill)',
          card: 'var(--color-card)',
          button: 'var(--color-button)',
          hover: 'var(--color-button-hover)',
        },
      },
      screens: {
        xs: '475px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1280px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
};
