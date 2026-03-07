import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#F04E30",
          light: "#FF7F50",
          dark: "#C93D22",
        },
        golden: {
          DEFAULT: "#FFD93D",
          light: "#FFE270",
          dark: "#F0C20A",
        },
        amazon: {
          navy: "#232F3E",
          orange: "#FF9900",
        },
      },
    },
  },
  plugins: [],
};
export default config;
