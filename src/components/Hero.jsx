import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassBadge from './GlassBadge';
import ResumeCard from './ResumeCard';

export default function Hero() {
  // Bubble variations for organic float animations
  const floatingBubbles = [
    { text: '+ ATS Score', top: '15%', left: '5%', delay: 0, duration: 6, xRange: [0, 8, 0], yRange: [0, -12, 0] },
    { text: '+ Skill Match', top: '22%', right: '8%', delay: 1.5, duration: 7, xRange: [0, -10, 0], yRange: [0, -15, 0] },
    { text: '+ Interview Ready', bottom: '25%', left: '12%', delay: 0.8, duration: 6.5, xRange: [0, 12, 0], yRange: [0, -10, 0] },
    { text: '+ Career Path', bottom: '15%', right: '15%', delay: 2.2, duration: 5.8, xRange: [0, -6, 0], yRange: [0, -14, 0] }
  ];

  return (
    <div className="relative w-full min-h-screen pt-16 pb-12 overflow-hidden flex flex-col justify-center">
      {/* Background Layer - Subtle Layered Gradient Glow in top-left using blurred ellipses */}
      <div className="absolute top-0 left-0 -translate-x-[20%] -translate-y-[20%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full bg-[#60B1FF] opacity-[0.22] blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-0 left-0 -translate-x-[30%] -translate-y-[30%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-[#0084FF] opacity-[0.18] blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column Content */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 w-full">
          
          {/* Trust Badge */}
          <div className="w-full flex justify-center lg:justify-start">
            <GlassBadge />
          </div>
          
          {/* Main Headline & Subheadline */}
          <div className="space-y-4 max-w-xl w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-fustat font-extrabold text-[40px] sm:text-[56px] md:text-[75px] leading-[1.05] tracking-[-2px] text-slate-900 select-none text-glow"
              style={{ letterSpacing: '-2px' }}
            >
              Build your career smarter with AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-[18px] leading-relaxed tracking-[-1px] text-[#555555] font-medium max-w-lg mx-auto lg:mx-0"
              style={{ letterSpacing: '-1px' }}
            >
              Upload your resume, get ATS insights, discover the right jobs, and prepare for interviews with your personal AI career coach.
            </motion.p>
          </div>

          {/* Primary CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full flex justify-center lg:justify-start"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/register"
                className="glass-btn inline-flex items-center gap-3 pl-6 pr-2 py-2 text-base md:text-lg font-bold text-white transition-all duration-300 shadow-lg shadow-blue-500/20"
              >
                <span>Analyze My Resume</span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/25 border border-white/40 shadow-[inset_0px_4px_4px_rgba(255,255,255,0.35)] backdrop-blur-sm">
                  <ArrowRight size={18} className="text-white" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating AI Resume Preview Card */}
          <div className="pt-2 w-full flex justify-center lg:justify-start">
            <ResumeCard />
          </div>

        </div>

        {/* Right Column Content - Floating Orb and Bubbles */}
        <div className="lg:col-span-6 flex justify-center items-center relative h-[450px] md:h-[600px] w-full mt-8 lg:mt-0">
          
          {/* Glass Orb Wrapper with overflow visible to bleed outside */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[320px] sm:w-[400px] md:w-[480px] h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center animate-float-slow"
          >
            {/* Ambient Back Glow for Orb */}
            <div className="absolute inset-0 bg-[#0084FF] opacity-10 rounded-full blur-[60px] pointer-events-none scale-90" />
            
            {/* The Video Orb */}
            <div className="w-full h-full relative z-10 flex items-center justify-center overflow-visible pointer-events-none select-none">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain mix-blend-screen scale-[1.25]"
                style={{
                  filter: 'hue-rotate(-55deg) saturate(250%) brightness(1.2) contrast(1.1)'
                }}
              >
                <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Floating Glass Bubbles */}
            {floatingBubbles.map((bubble, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: bubble.xRange,
                  y: bubble.yRange
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.4 + index * 0.15 },
                  scale: { duration: 0.6, delay: 0.4 + index * 0.15 },
                  x: { duration: bubble.duration, repeat: Infinity, ease: 'easeInOut', delay: bubble.delay },
                  y: { duration: bubble.duration, repeat: Infinity, ease: 'easeInOut', delay: bubble.delay }
                }}
                whileHover={{ scale: 1.08 }}
                style={{
                  position: 'absolute',
                  top: bubble.top || 'auto',
                  bottom: bubble.bottom || 'auto',
                  left: bubble.left || 'auto',
                  right: bubble.right || 'auto',
                  zIndex: 20
                }}
                className="glass-badge px-4 py-2.5 text-xs md:text-sm font-bold text-slate-800 shadow-lg shadow-slate-100/50 border border-white/40 shadow-[inset_0px_2px_4px_rgba(255,255,255,0.4)] select-none cursor-default hover:bg-white/50 transition-all duration-350"
              >
                {bubble.text}
              </motion.div>
            ))}
            
          </motion.div>
        </div>

      </div>
    </div>
  );
}
