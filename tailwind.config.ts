import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          0:   "#FAF7F5",
          25:  "#F2EEEA",
          50:  "#EBE5DF",
          100: "#DCD3CA",
          200: "#BFB2A6",
          300: "#A19487",
          400: "#83786C",
          500: "#665C52",
          600: "#48413A",
          700: "#2B2522",
        },
        "cool-green": {
          25:  "#E8F0EC",
          50:  "#C9D9D2",
          100: "#A9C1B7",
          200: "#8AABAA",
          300: "#6B9088",
          400: "#4D7A72",
          500: "#376559",
          600: "#25493D",
          700: "#1A3329",
        },
        "red-m": {
          25:  "#F7CCC3",
          50:  "#F0B7AB",
          100: "#E99487",
          200: "#DC6A5E",
          300: "#C94840",
        },
        "red-s": {
          25: "#F89C8A",
        },
        "yellow-s": {
          300: "#A76F00",
        },
        "blue-s": {
          0: "#B3E5FF",
        },
        "warm-green": {
          700: "#213200",
        },
        "orange-s": {
          700: "#320D00",
        },
      },
      fontFamily: {
        romie: ["Romie", "Cormorant Garamond", "Georgia", "serif"],
        "romie-trial": ["Romie Trial", "Romie", "Cormorant Garamond", "serif"],
        instrument: ["Instrument Sans", "system-ui", "sans-serif"],
        dm: ["DM Sans", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1600px",
      },
      letterSpacing: {
        overline: "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;
