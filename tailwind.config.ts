import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#F4F4F2',
          dark: '#111111',
        },
        text: {
          dark: '#111111',
          light: '#F4F4F2',
          muted: '#666666',
          mutedDark: '#A0A0A0'
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
      },
    },
  },
  plugins: [],
}

export default config
