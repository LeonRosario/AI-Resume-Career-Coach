import { motion } from 'framer-motion';
import {
  FileSearch,
  Map,
  MessageSquare,
  Target,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const features = [
  {
    icon: FileSearch,
    title: 'ATS Resume Analyzer',
    description:
      'Upload your resume and get instant ATS compatibility scores, keyword gaps, and formatting fixes.',
    color: '#0084FF',
  },
  {
    icon: Target,
    title: 'Smart Job Matching',
    description:
      'AI matches your skills to the right roles and highlights where you stand out against job descriptions.',
    color: '#319AFF',
  },
  {
    icon: Map,
    title: 'Career Roadmap',
    description:
      'Get a personalized learning path with skills to acquire, certifications, and milestones to hit your dream role.',
    color: '#60B1FF',
  },
  {
    icon: MessageSquare,
    title: 'AI Interview Coach',
    description:
      'Practice with realistic mock interviews, receive feedback on answers, and build confidence before the real thing.',
    color: '#0084FF',
  },
  {
    icon: Sparkles,
    title: 'Resume Rewriter',
    description:
      'Transform bullet points into impact-driven statements tailored to each job you apply for.',
    color: '#319AFF',
  },
  {
    icon: TrendingUp,
    title: 'Salary Insights',
    description:
      'Understand market rates for your role and experience level so you negotiate with confidence.',
    color: '#60B1FF',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="glass-badge mb-4 inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0084FF]">
            Features
          </span>
          <h2 className="font-fustat text-3xl font-bold text-slate-900 md:text-5xl">
            Everything you need to land your dream job
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 md:text-lg">
            From resume optimization to interview prep — your AI career coach handles it all in one beautiful dashboard.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <GlassCard className="group h-full p-8">
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/40 bg-white/40"
                  style={{ color: feature.color }}
                >
                  <feature.icon size={22} />
                </div>
                <h3 className="font-fustat mb-2 text-xl font-bold text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
