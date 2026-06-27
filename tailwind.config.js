/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FFFFFF",
        ink: "#0F172A",
        body: "#475569",
        sub: "#334155",
        muted: "#64748B",
        label: "#475569",
        placeholder: "#94A3B8",
        surface: {
          DEFAULT: "#FFFFFF",
          50: "#FAFBFC",
          100: "#F0F4F8",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
        },
        primary: {
          DEFAULT: "#0084FF",
          50: "#EBF5FF",
          100: "#D6EBFF",
          200: "#ADD6FF",
          300: "#85C2FF",
          400: "#5CADFF",
          500: "#3399FF",
          600: "#0084FF",
          700: "#0066CC",
          800: "#004D99",
          900: "#003366",
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
        poppins: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      backdropBlur: {
        glass: "30px",
      },
      borderRadius: {
        glass: "24px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 132, 255, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-lg": "0 20px 60px rgba(0, 132, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-sidebar": "0 20px 60px rgba(0, 132, 255, 0.12)",
        glow: "0 0 40px rgba(0, 132, 255, 0.35)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #60B1FF 0%, #0084FF 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(96,177,255,0.18) 0%, rgba(0,132,255,0.18) 100%)",
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
