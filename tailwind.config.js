/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif']
      },
      colors: {
        base: 'rgb(var(--c-base) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        orange: {
          DEFAULT: '#FF6A1A',
          50: '#FFF3E9',
          100: '#FFE3CC',
          200: '#FFC79A',
          300: '#FFA85F',
          400: '#FF8A38',
          500: '#FF6A1A',
          600: '#E85300',
          700: '#BA4200',
          800: '#8C3200',
          900: '#5E2100'
        },
        amber: {
          DEFAULT: '#FFC94A'
        },
        ember: {
          DEFAULT: '#E8543F'
        }
      },
      boxShadow: {
        glass: '0 8px 32px rgb(0 0 0 / 0.12), inset 0 1px 0 0 rgb(255 255 255 / 0.08)',
        glow: '0 0 40px rgb(255 106 26 / 0.35)',
        'glow-sm': '0 0 16px rgb(255 106 26 / 0.3)'
      },
      backdropBlur: {
        xs: '2px'
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-16px, 12px) scale(1.06)' }
        },
        'drift-2': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(20px, -14px) scale(1.08)' }
        },
        radar: {
          '0%': { transform: 'scale(0.85)', opacity: '0.9' },
          '100%': { transform: 'scale(1.7)', opacity: '0' }
        },
        'rise-in': {
          '0%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'pop-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      animation: {
        drift: 'drift 9s ease-in-out infinite',
        'drift-2': 'drift-2 11s ease-in-out infinite',
        radar: 'radar 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite',
        'rise-in': 'rise-in 0.45s cubic-bezier(0.16,1,0.3,1) both',
        'pop-in': 'pop-in 0.3s cubic-bezier(0.16,1,0.3,1) both'
      }
    }
  },
  plugins: []
}
