/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Syne'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        slate: {
          850: "#1a2235",
          925: "#0d1424",
        },
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(34, 197, 94, 0.15)",
        "card": "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 25px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "mesh-gradient": "radial-gradient(at 40% 20%, hsla(160,60%,10%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,55%,8%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(140,50%,7%,1) 0px, transparent 50%)",
      },
      animation: {
        "slide-in": "slideIn 0.2s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        slideIn: { from: { transform: "translateX(-10px)", opacity: 0 }, to: { transform: "translateX(0)", opacity: 1 } },
        fadeIn: { from: { opacity: 0, transform: "translateY(8px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        scaleIn: { from: { transform: "scale(0.95)", opacity: 0 }, to: { transform: "scale(1)", opacity: 1 } },
      },
    },
  },
  plugins: [],
};
