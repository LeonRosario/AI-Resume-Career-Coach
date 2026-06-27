import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Play, RotateCcw, User } from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import ScoreRing from "../../components/ui/ScoreRing";
import { interviewQuestions } from "../../data/mockData";

function TypingDots() {
  return (
    <div className="flex gap-1 px-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary-400"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default function InterviewPrep() {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const startInterview = () => {
    setStarted(true);
    setMessages([{ role: "user", text: "Start Mock Interview" }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "ai", text: interviewQuestions[0] }]);
    }, 1400);
  };

  const sendAnswer = () => {
    if (!input.trim()) return;
    const answer = input.trim();
    setMessages((m) => [...m, { role: "user", text: answer }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const nextIndex = qIndex + 1;
      if (nextIndex < interviewQuestions.length) {
        setQIndex(nextIndex);
        setMessages((m) => [
          ...m,
          {
            role: "ai",
            text: `Good detail. Quick follow-up — ${interviewQuestions[nextIndex].toLowerCase()}`,
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "ai", text: "That wraps up this mock interview. Generating your feedback now..." },
        ]);
        setTimeout(() => setFeedback({ score: 8.4, strengths: ["Clear structure", "Good use of metrics"], improve: ["Add more depth on trade-offs", "Slow down slightly"] }), 900);
      }
    }, 1600);
  };

  const reset = () => {
    setStarted(false);
    setMessages([]);
    setQIndex(0);
    setFeedback(null);
    setInput("");
  };

  return (
    <div className="grid lg:grid-cols-[1.6fr,1fr] gap-5">
      {/* Chat */}
      <GlassCard className="p-0 flex flex-col h-[600px] overflow-hidden">
        <div className="px-6 py-4 border-b border-[rgba(0,132,255,0.12)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-ink">AI Interviewer</p>
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
              </p>
            </div>
          </div>
          {started && (
            <button
              onClick={reset}
              className="text-xs font-medium text-muted hover:text-ink flex items-center gap-1.5"
            >
              <RotateCcw size={13} /> Reset
            </button>
          )}
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {!started && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-gradient-soft flex items-center justify-center mb-5">
                <Sparkles size={26} className="text-primary-600" />
              </div>
              <h3 className="font-heading font-bold text-ink text-lg mb-2">
                Ready for a mock interview?
              </h3>
              <p className="text-sm text-body max-w-xs mb-6">
                The AI will ask role-specific questions and score your answers when you're done.
              </p>
              <Button variant="primary" icon={Play} onClick={startInterview}>
                Start Mock Interview
              </Button>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand-gradient text-white rounded-br-md"
                      : "glass-soft text-body rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="glass-soft rounded-2xl rounded-bl-md px-4 py-3">
                <TypingDots />
              </div>
            </motion.div>
          )}
        </div>

        {started && !feedback && (
          <div className="p-4 border-t border-[rgba(0,132,255,0.12)] flex items-center gap-2 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendAnswer()}
              placeholder="Type your answer..."
              className="glass-input flex-1 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary-400/60"
            />
            <Button variant="primary" size="md" icon={Send} className="!px-3.5" onClick={sendAnswer} aria-label="Send answer" />
          </div>
        )}
      </GlassCard>

      {/* Feedback / progress side panel */}
      <div className="space-y-5">
        <GlassCard className="p-6">
          <h4 className="font-heading font-bold text-ink mb-4">Session Progress</h4>
          <div className="space-y-2.5">
            {interviewQuestions.map((q, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                    i < qIndex || feedback
                      ? "bg-brand-gradient text-white"
                      : i === qIndex && started
                      ? "bg-primary-100 text-primary-600 ring-2 ring-primary-400"
                      : "bg-primary-900/8 text-muted"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-xs text-body line-clamp-1">{q}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard variant="strong" className="p-6 text-center">
                <p className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-3">
                  Feedback Score
                </p>
                <ScoreRing value={Math.round(feedback.score * 10)} size={120} label="out of 100" />
                <div className="text-left mt-5 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1">Strengths</p>
                    {feedback.strengths.map((s) => (
                      <p key={s} className="text-xs text-body">• {s}</p>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-600 mb-1">Improve</p>
                    {feedback.improve.map((s) => (
                      <p key={s} className="text-xs text-body">• {s}</p>
                    ))}
                  </div>
                </div>
                <Button variant="glass" size="sm" full className="mt-5" onClick={reset}>
                  Try another round
                </Button>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {!feedback && (
          <GlassCard className="p-6 flex items-start gap-3">
            <User size={18} className="text-primary-500 mt-0.5 shrink-0" />
            <p className="text-xs text-body leading-relaxed">
              Answer as you would out loud — the AI evaluates structure, clarity, and
              relevant detail, not just keywords.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
