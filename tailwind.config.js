/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FFFFFF",
        ink: "#0B1220",
        primary: {
          DEFAULT: "#0084FF",
          50: "#EAF5FF",
          100: "#D6EBFF",
          200: "#ADD7FF",
          300: "#7FC0FF",
          400: "#60B1FF",
          500: "#319AFF",
          600: "#0084FF",
          700: "#0066CC",
          800: "#004C99",
          900: "#003366",
        },
      },
      fontFamily: {
        heading: ["Fustat", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        glass: "30px",
      },
      borderRadius: {
        glass: "24px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 100, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-lg": "0 20px 60px rgba(0, 100, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
        glow: "0 0 40px rgba(49, 154, 255, 0.35)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #60B1FF 0%, #319AFF 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(96,177,255,0.18) 0%, rgba(49,154,255,0.18) 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.97)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-25px, 35px) scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        float: "float 18s ease-in-out infinite",
        "float-slow": "floatSlow 24s ease-in-out infinite",
        "float-delay": "float 20s ease-in-out infinite 4s",
        shimmer: "shimmer 1.8s infinite linear",
        scanline: "scanline 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
