import { motion } from "framer-motion";
import InfiniteSlider from "./infinite-slider";
import ProgressiveBlur from "./progressive-blur";

const logos = [
  {
    id: "react",
    label: "React",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#61DAFB" />
        <path d="M12 6.5c3.2 0 5.8 1.2 7.4 3.2-1.6 2-4.2 3.2-7.4 3.2s-5.8-1.2-7.4-3.2C6.2 7.7 8.8 6.5 12 6.5Zm0 8c-3.2 0-5.8 1.2-7.4 3.2 1.6 2 4.2 3.2 7.4 3.2s5.8-1.2 7.4-3.2C17.8 15.7 15.2 14.5 12 14.5Z" fill="#20232A" />
      </svg>
    ),
  },
  {
    id: "typescript",
    label: "TypeScript",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#3178C6" />
        <path d="M8.5 8.5h2.7v6.9h3.6v1.8H8.5z" fill="white" />
        <path d="M14.8 8.5h2.8l1.7 3.4 1.7-3.4h2.8v9.7h-2.5v-5.3l-1.9 3.4h-1.2l-1.9-3.4v5.3h-2.5z" fill="white" />
      </svg>
    ),
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M6 18c1.5-4 3.2-6 6-6 2.4 0 3.8 1.4 4.4 4.2.4 1.8 1 2.8 2.1 3.8H6Z" fill="#06B6D4" />
        <path d="M6 12c1.5-4 3.2-6 6-6 2.4 0 3.8 1.4 4.4 4.2.4 1.8 1 2.8 2.1 3.8H6Z" fill="#0F172A" opacity="0.2" />
      </svg>
    ),
  },
  {
    id: "fastapi",
    label: "FastAPI",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#009688" />
        <path d="M12 7.2c-2.5 0-4.6 2.1-4.6 4.6 0 2.5 2.1 4.6 4.6 4.6 2.1 0 3.9-1.4 4.4-3.3h-2.6v-2.6h4.8c.1 1.4-.3 2.8-1.1 3.9-.8 1.1-2 1.9-3.4 2.2-1.3.2-2.6 0-3.8-.6-1.2-.6-2.2-1.6-2.8-2.8-.6-1.1-.8-2.4-.6-3.6.2-1.2.8-2.3 1.6-3.1.8-.8 1.9-1.4 3.1-1.7 1.2-.3 2.4-.2 3.6.2l1.4-2.1c-1.2-.7-2.6-1-4-1Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "python",
    label: "Python",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 3c-2.7 0-2.5 1.2-2.5 1.2v2.1h2.5v.6H8.1c-1.6 0-3 1-3 2.8v1.4h2.4V9.7c0-1 .8-1.8 1.8-1.8h4.3c1 0 1.8.8 1.8 1.8v1.4h2.4V8.2c0-1.8-1.4-2.8-3-2.8H12Zm-4.8 6.5v1.4H6.8v-1.4h.4Zm7.6 0v1.4h-.4v-1.4h.4Z" fill="#3776AB" />
        <path d="M12 21c2.7 0 2.5-1.2 2.5-1.2v-2.1H12v-.6h4.4c1.6 0 3-1 3-2.8v-1.4h-2.4v1.4c0 1-.8 1.8-1.8 1.8H12c-1 0-1.8-.8-1.8-1.8v-1.4H7.8v1.4c0 1.8 1.4 2.8 3 2.8H12Zm-4.8-6.5v-1.4H6.8v1.4h.4Zm7.6 0v-1.4h-.4v1.4h.4Z" fill="#FFD43B" />
      </svg>
    ),
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 3c-1.8 0-3.2.6-4.1 1.7-.8 1-.9 2.3-.8 3.6.1 1.1.4 2.1 1.2 2.9.8.8 2 .9 3.1.8 1.6-.1 2.9-1.1 3.5-2.5.7-1.8.2-3.9-1.2-5.3C13.7 3.2 12.9 3 12 3Z" fill="#336791" />
        <path d="M9.6 17.4c-.8-.4-1.4-1-1.7-1.8-.4-.8-.5-1.8-.3-2.8h.7c-.2.8-.1 1.6.1 2.3.3.7.8 1.3 1.6 1.7.8.4 1.8.4 2.6.1.8-.3 1.4-.9 1.8-1.6.5-.8.6-1.7.5-2.7h.7c.1 1.1-.1 2.2-.6 3.2-.4.9-1 1.7-1.8 2.2-.9.6-2 .8-3 .7-.9-.1-1.7-.4-2.4-1.1Z" fill="#336791" />
      </svg>
    ),
  },
  {
    id: "openai",
    label: "OpenAI",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 3a4.1 4.1 0 0 0-3.6 2.2 4.1 4.1 0 0 0-4.6 1.7A4.1 4.1 0 0 0 2 10.2a4.1 4.1 0 0 0 1.6 4.4 4.1 4.1 0 0 0 .2 5.3A4.1 4.1 0 0 0 7.7 22a4.1 4.1 0 0 0 4.3-1.4A4.1 4.1 0 0 0 16.6 22a4.1 4.1 0 0 0 3.9-2.1 4.1 4.1 0 0 0 2.7-4.1 4.1 4.1 0 0 0-1.7-3.2 4.1 4.1 0 0 0 .1-5.4 4.1 4.1 0 0 0-3.9-2.1 4.1 4.1 0 0 0-4.2 1.9A4.1 4.1 0 0 0 12 3Z" fill="#10A37F" />
        <path d="M14.9 8.2c.1 0 .2 0 .3.1l1.3.8c.2.1.3.4.2.6l-.3 1c-.1.2-.2.3-.4.4l-1 .4c-.2.1-.4 0-.6-.1l-.8-.7c-.2-.2-.2-.5 0-.7l.6-.8c.1-.1.2-.2.3-.2.1 0 .2-.1.4-.1Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "gemini",
    label: "Google Gemini",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#4285F4" />
        <path d="M12 7.1c-.7.3-1.3.7-1.8 1.3a4.8 4.8 0 0 0 0 6.7c.5.6 1.1 1 1.8 1.3v-1.5a3.2 3.2 0 0 1 0-5.3V7.1Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "docker",
    label: "Docker",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M5 10.5h2.4v1.8H5zm3.1 0h2.4v1.8H8.1zm3.1 0h2.4v1.8h-2.4zm3.1 0h2.4v1.8H14.3zm3.1 0h2.4v1.8h-2.4zM5 13.4h2.4v1.8H5zm3.1 0h2.4v1.8H8.1zm3.1 0h2.4v1.8h-2.4zm3.1 0h2.4v1.8H14.3z" fill="#2496ED" />
        <path d="M4.4 8.1h1.2v1.4H4.4zm2.2 0h1.2v1.4H6.6zm2.2 0h1.2v1.4H8.8zm2.2 0h1.2v1.4h-1.2zm2.2 0h1.2v1.4h-1.2zm2.2 0h1.2v1.4h-1.2z" fill="#2496ED" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "aws",
    label: "AWS",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 4 4.8 7.6v8.8L12 20l7.2-3.6V7.6L12 4Zm0 2.3 4.1 2.1v5.4L12 15.9l-4.1-2.1V8.4L12 6.3Z" fill="#FF9900" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.18c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.9 1.52 2.35 1.08 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.43 9.43 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.54 1.38.2 2.41.1 2.66.64.7 1.02 1.59 1.02 2.68 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="#0F172A" />
      </svg>
    ),
  },
  {
    id: "vercel",
    label: "Vercel",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="m12 4 8 14H4l8-14Z" fill="#000000" />
      </svg>
    ),
  },
  {
    id: "node",
    label: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M12 3 5 7v10l7 4 7-4V7l-7-4Zm0 2.3 4.7 2.7v6.0L12 16.7 7.3 14V8l4.7-2.7Z" fill="#5FA04E" />
      </svg>
    ),
  },
  {
    id: "jwt",
    label: "JWT",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" fill="#F7A600" />
        <path d="M13.2 8.6v2.2l2.2-.6-2.2-.6Zm-2.4 1.3 2.2.6-2.2 2.2V9.9Zm0 4.3 2.2-2.2 2.2 2.2-2.2 1.1-2.2-1.1Z" fill="white" />
      </svg>
    ),
  },
  {
    id: "render",
    label: "Render",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M6 5h12v3H6zm0 5h12v3H6zm0 5h12v3H6z" fill="#46ECA1" />
      </svg>
    ),
  },
];

export default function LogoCloud() {
  return (
    <section id="trusted-technologies" className="relative px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong overflow-hidden rounded-[24px] border border-white/70 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="brand-pill mb-4 inline-flex">Powered by modern technologies</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-ink">
              Built with industry leading technologies
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted">
              CareerAI combines modern frontend, backend, AI, and cloud technologies to deliver fast,
              secure, and intelligent resume analysis and career guidance.
            </p>
          </div>

          <div className="relative mt-10">
            <ProgressiveBlur direction="both" className="bg-[linear-gradient(90deg,rgba(244,247,255,0.96)_0%,rgba(244,247,255,0.72)_45%,rgba(244,247,255,0)_100%)]" />
            <InfiniteSlider items={logos} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
