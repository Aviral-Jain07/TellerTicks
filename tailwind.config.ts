import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          accent: "#D47E30",
          cream: "#FDFBD4",
          "cream-card": "#F5F2C2",
        },
        ai: {
          cyan: "#06b6d4",
          "cyan-light": "#22d3ee",
          emerald: "#10b981",
          "emerald-light": "#34d399",
          violet: "#8b5cf6",
          "violet-light": "#a78bfa",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "monospace",
        ],
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 8px 2px rgba(212,126,48,0.4)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 20px 6px rgba(212,126,48,0.7)",
            transform: "scale(1.08)",
          },
        },
        "node-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 6px 2px rgba(34,211,238,0.3)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 18px 6px rgba(34,211,238,0.6)",
            transform: "scale(1.12)",
          },
        },
        "glow-ring": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "node-pulse": "node-pulse 2s ease-in-out infinite",
        "glow-ring": "glow-ring 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
