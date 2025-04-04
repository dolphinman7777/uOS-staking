import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['monospace'],
      },
      colors: {
        background: '#1e2124',
        accent: '#6c5ce7',
        white: '#f7f7f7',
        black: '#000000'
      },
      backdropBlur: {
        'sm': '4px',
      },
    },
  },
  plugins: [animate, typography],
}

export default config; 