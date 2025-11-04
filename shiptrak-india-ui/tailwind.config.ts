import { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './components/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0E7490', // teal blue
        accent: '#F59E0B'   // amber
      }
    }
  },
  plugins: [],
} as Config
