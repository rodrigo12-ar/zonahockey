import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        surface: "#0f172a",
        surface2: "#111827",
        accent: "#c7f14f",
        accentDark: "#94b80e",
        text: "#f8fafc",
        muted: "#94a3b8",
        danger: "#fb7185"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
