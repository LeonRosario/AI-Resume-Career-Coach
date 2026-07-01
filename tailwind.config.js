/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FFFFFF",
        ink: "#0F172A",
        body: "#334155",
        muted: "#64748B",
        placeholder: "#94A3B8",
        primary: {
          DEFAULT: "#2196F3",
          50: "#E3F2FD",
          100: "#BBDEFB",
          200: "#90CAF9",
          300: "#64B5F6",
          400: "#42A5F5",
          500: "#2196F3",
          600: "#1E88E5",
          700: "#1976D2",
          800: "#1565C0",
          900: "#0D47A1",
        },
      },
      fontFamily: {
        heading: ["'DM Serif Display'", "serif"],
        headingAlt: ["'DM Serif Display'", "serif"],
        sans: ["'Poppins'", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["'Poppins'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        glass: "30px",
      },
      borderRadius: {
        glass: "24px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(33,150,243,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-lg": "0 20px 60px rgba(33,150,243,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
        glow: "0 0 40px rgba(33,150,243,0.35)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #2196F3 0%, #42A5F5 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(33,150,243,0.12) 0%, rgba(66,165,245,0.12) 100%)",
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
        aurora: {
          "0%": { transform: "rotate(0deg) scale(1)", opacity: "0.4" },
          "25%": { transform: "rotate(90deg) scale(1.1)", opacity: "0.5" },
          "50%": { transform: "rotate(180deg) scale(0.95)", opacity: "0.35" },
          "75%": { transform: "rotate(270deg) scale(1.05)", opacity: "0.45" },
          "100%": { transform: "rotate(360deg) scale(1)", opacity: "0.4" },
        },
      },
      animation: {
        float: "float 18s ease-in-out infinite",
        "float-slow": "floatSlow 24s ease-in-out infinite",
        "float-delay": "float 20s ease-in-out infinite 4s",
        shimmer: "shimmer 1.8s infinite linear",
        scanline: "scanline 2.4s ease-in-out infinite",
        "aurora-slow": "aurora 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
