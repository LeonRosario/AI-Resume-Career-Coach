/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#050816",
        ink: "#E6F1FF",
        surface: {
          DEFAULT: "#0B1026",
          50: "#090E1E",
          100: "#0C1223",
          200: "#111B35",
          300: "#162543",
          400: "#1D325C",
          500: "#233F76",
        },
        primary: {
          DEFAULT: "#60B1FF",
          50: "#E7F4FF",
          100: "#D0EAFF",
          200: "#A8D5FF",
          300: "#74BDFF",
          400: "#4EA4FF",
          500: "#2B8BFF",
          600: "#1D72E6",
          700: "#175BBF",
          800: "#11449A",
          900: "#0C3271",
        },
        accent: {
          DEFAULT: "#9B6CFF",
          50: "#EFE6FF",
          100: "#DFCCFF",
          200: "#BFA2FF",
          300: "#9B6CFF",
          400: "#7A44FF",
          500: "#6A2EE6",
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
