import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        pacifico: ["Pacifico"],
      },
      keyframes: {
        gelatine: {
          "from, to": { transform: "scale(1, 1)" },
          "25%": { transform: "scale(0.95, 1.05)" },
          "50%": { transform: "scale(1.05, 0.95)" },
          "75%": { transform: "scale(0.95, 1.05)" },
        },
        textOpacity: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        middleToTopLarge: {
          "0%": {
            transform: "translate(-49%, -50%) translateY(50%)",
            opacity: "0",
          },
          "100%": {
            transform: "translate(-49%, -50%) translateY(10%)",
            opacity: "1",
          },
        },
        middleToTopSmall: {
          "0%": {
            transform: "translate(-49%, -50%) translateY(50%)",
            opacity: "0",
          },
          "100%": {
            transform: "translate(-49%, -50%) translateY(14.5%)",
            opacity: "1",
          },
        },
        topToMiddleLarge: {
          "0%": {
            transform: "translate(-49%, -50%) translateY(10%)",
            opacity: "0",
          },
          "85%": {
            transform: "translate(-49%, -52%) translateY(50%)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-49%, -52%) translateY(50%)",
            opacity: "0",
          },
        },
        topToMiddleSmall: {
          "0%": {
            transform: "translate(-49%, -50%) translateY(14.5%)",
            opacity: "0",
          },
          "85%": {
            transform: "translate(-49%, -52%) translateY(48%)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-49%, -52%) translateY(48%)",
            opacity: "0",
          },
        },

        hoverScale: {
          "from, to": { transform: "scale(1, 1.1)" },
          "0%": { transform: "scale(1, 1)" },
          "100%": { transform: "scale(1.1, 1.1)" },
        },
        hoverScaleReverse: {
          "from, to": { transform: "scale(1.1, 1.1)" },
          "0%": { transform: "scale(1.1, 1.1)" },
          "100%": { transform: "scale(1, 1)" },
        },
      },

      animation: {
        gelatine: "gelatine 1.5s infinite",
        textOpacity: "textOpacity 0.8s",
        middleToTopLarge: "middleToTopLarge 1.5s",
        middleToTopSmall: "middleToTopSmall 1.5s",
        topToMiddleLarge: "topToMiddleLarge 1.5s",
        topToMiddleSmall: "topToMiddleSmall 1.5s",
        hoverScale: "hoverScale 0.1s ease-out forwards",
        hoverScaleReverse: "hoverScaleReverse 0.1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
