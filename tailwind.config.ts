import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        blue: '#3294F8',
        'base-title': '#E7EDF4',
        'base-subtitle': '#C4D4E3',
        'base-text': '#AFC2D4',
        'base-span': '#7B96B2',
        'base-label': '#3A536B',
        'base-border': '#1C2F41',
        'base-post': '#112131',
        'base-profile': '#0B1B2B',
        'base-background': '#071422',
        'base-input': '#040F1A',
      },
      keyframes: {
        dash1: {
          '0%': { strokeDashoffset: '153.087px', strokeDasharray: '153.087px' },
          '100%': { strokeDashoffset: '0', strokeDasharray: '153.087px' },
        },
        dash2: {
          '0%': { strokeDashoffset: '846.809px', strokeDasharray: '846.809px' },
          '100%': { strokeDashoffset: '0', strokeDasharray: '846.809px' },
        },
        fill2: {
          '0%': { fill: 'transparent' },
          '100%': { fill: 'rgb(50, 148, 248)' },
        },
      },
      animation: {
        'dash-1': 'dash1 1s cubic-bezier(0.47, 0, 0.745, 0.715) forwards',
        'dash-2':
          'dash2 1s cubic-bezier(0.47, 0, 0.745, 0.715) forwards, fill2 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s forwards',
      },
    },
  },
  plugins: [],
}
export default config
