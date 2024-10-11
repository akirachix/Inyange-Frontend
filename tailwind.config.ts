import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens:{
        'nh': {'raw': '(min-width: 1024px) and (max-width: 1279px)'},
        'nhm': {'raw': '(min-width: 1280px) and (max-width: 1440px)'},
      }
    },
  },
  plugins: [],
};
export default config;
