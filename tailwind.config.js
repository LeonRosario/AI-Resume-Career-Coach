/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#FFFFFF",
        ink: "#0A0F1E",
        body: "#1E2A3B",
        muted: "#5B6B82",
        placeholder: "#8A9BB0",
        surface: "#F4F7FF",
        // Electric blue — primary brand color
        primary: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#0F2456",
        },
        // Soft indigo / violet accents
        violet: {
          DEFAULT: "#7C3AED",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        // Indigo bridge between blue and violet
        indigo: {
          DEFAULT: "#4F46E5",
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
      },
      fontFamily: {
        heading: ["'DM Serif Display'", "Georgia", "serif"],
        sans: ["'Poppins'", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["'Poppins'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backdropBlur: {
        glass: "28px",
        "glass-lg": "40px",
      },
      borderRadius: {
        glass: "20px",
        "glass-lg": "28px",
        "glass-xl": "36px",
      },
      boxShadow: {
        // Subtle glass depth
        glass: "0 4px 24px rgba(37,99,235,0.07), 0 1px 2px rgba(37,99,235,0.04), inset 0 1px 0 rgba(255,255,255,0.7)",
        "glass-md": "0 8px 32px rgba(37,99,235,0.1), 0 2px 4px rgba(37,99,235,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        "glass-lg": "0 16px 56px rgba(37,99,235,0.13), 0 4px 8px rgba(37,99,235,0.07), inset 0 1px 0 rgba(255,255,255,0.8)",
        "glass-xl": "0 24px 80px rgba(37,99,235,0.16), 0 6px 12px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
        // Brand glow effects
        glow: "0 0 40px rgba(37,99,235,0.4)",
        "glow-sm": "0 0 20px rgba(37,99,235,0.3)",
        "glow-violet": "0 0 40px rgba(124,58,237,0.35)",
        "glow-lg": "0 0 60px rgba(37,99,235,0.5)",
        // Card shadows
        card: "0 2px 8px rgba(10,15,30,0.06), 0 1px 2px rgba(10,15,30,0.04)",
        "card-hover": "0 8px 24px rgba(10,15,30,0.1), 0 2px 4px rgba(10,15,30,0.06)",
        // Inset for inputs
        "inner-blue": "inset 0 2px 4px rgba(37,99,235,0.05)",
      },
      backgroundImage: {
        // Primary gradients
        "brand-gradient": "linear-gradient(135deg, #2563EB 0%, #4F46E5 60%, #7C3AED 100%)",
        "brand-gradient-r": "linear-gradient(90deg, #2563EB 0%, #4F46E5 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(79,70,229,0.1) 60%, rgba(124,58,237,0.08) 100%)",
        "brand-gradient-subtle": "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(79,70,229,0.06) 100%)",
        // Aurora / mesh gradients
        "aurora-mesh": "radial-gradient(ellipse 110% 80% at 30% -10%, rgba(37,99,235,0.18) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 20%, rgba(79,70,229,0.14) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(124,58,237,0.1) 0%, transparent 60%)",
        // Section backgrounds
        "hero-bg": "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(37,99,235,0.12) 0%, transparent 65%)",
        // Noise texture overlay (subtle)
        "surface-gradient": "linear-gradient(180deg, #FFFFFF 0%, #F4F7FF 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(28px, -36px) scale(1.04)" },
          "66%": { transform: "translate(-18px, 18px) scale(0.97)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-22px, 32px) scale(1.06)" },
        },
        floatMd: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
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
          "0%": { transform: "rotate(0deg) scale(1)", opacity: "0.35" },
          "25%": { transform: "rotate(90deg) scale(1.1)", opacity: "0.45" },
          "50%": { transform: "rotate(180deg) scale(0.95)", opacity: "0.3" },
          "75%": { transform: "rotate(270deg) scale(1.05)", opacity: "0.4" },
          "100%": { transform: "rotate(360deg) scale(1)", opacity: "0.35" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(37,99,235,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(37,99,235,0.55)" },
        },
        "pulse-slow": {
          "0%, 100%": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(100%)",
          },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "cursor-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
      animation: {
        float: "float 18s ease-in-out infinite",
        "float-slow": "floatSlow 24s ease-in-out infinite",
        "float-delay": "float 20s ease-in-out infinite 4s",
        "float-md": "floatMd 6s ease-in-out infinite",
        shimmer: "shimmer 1.8s infinite linear",
        scanline: "scanline 2.4s ease-in-out infinite",
        "aurora-slow": "aurora 20s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 6s ease infinite",
        "cursor-blink": "cursor-blink 0.7s step-end infinite",
      },
    },
  },
  plugins: [],
};
