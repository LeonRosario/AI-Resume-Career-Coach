import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Sparkles, Play, RotateCcw,
  User, ChevronRight, MessageSquare,
} from "lucide-react";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";
import ScoreRing from "../../components/ui/ScoreRing";
import Badge from "../../components/ui/Badge";
import { interviewQuestions } from "../../data/mockData";

function TypingDots() {
  return (
    <div className="flex gap-1 items-center px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary-400"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.16 }}
        />
      ))}
    </div>
  );
}

export default function InterviewPrep() {
  const [started,  setStarted]  = useState(false);
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState("");
  const [typing,   setTyping]   = useState(false);
  const [qIndex,   setQIndex]   = useState(0);
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
          { role: "ai", text: `Good detail. Quick follow-up — ${interviewQuestions[nextIndex].toLowerCase()}` },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "ai", text: "That wraps up this mock interview. Generating your feedback now..." },
        ]);
        setTimeout(() => {
          setFeedback({
            score: 84,
            strengths: ["Clear structure", "Good use of metrics", "Confident tone"],
            improve: ["Add more depth on trade-offs", "Slow down slightly for impact"],
          });
        }, 900);
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
    <div className="grid lg:grid-cols-[1.7fr,1fr] gap-5">

      {/* ── Chat panel ── */}
      <GlassCard className="p-0 flex flex-col overflow-hidden" style={{ height: 620 }} animate={false}>

        {/* Chat header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0 shadow-glow-sm">
              <Sparkles size={17} className="text-white" />
            </div>
            <div>
              <p className="font-heading text-sm text-ink leading-tight">AI Interviewer</p>
              <p className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </p>
            </div>
          </div>
          {started && (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink transition-colors"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          )}
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {!started && (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-gradient-soft border border-primary-100 flex items-center justify-center mb-5">
                <MessageSquare size={26} className="text-primary-600" strokeWidth={1.8} />
              </div>
              <h3 className="font-heading text-xl text-ink mb-2">Ready for a mock interview?</h3>
              <p className="text-sm text-muted max-w-xs mb-6 leading-relaxed">
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
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "ai" && (
                  <div className="w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center shrink-0 mr-2.5 mt-0.5 self-start shadow-glow-sm">
                    <Sparkles size={12} className="text-white" />
                  </div>
                )}
                <div
                  className={[
                    "max-w-[78%] px-4 py-3 text-sm leading-relaxed",
                    m.role === "user"
                      ? "chat-bubble-user"
                      : "chat-bubble-ai text-body",
                  ].join(" ")}
                >
                  {m.text}
                </div>
                {m.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0 ml-2.5 mt-0.5 self-start">
                    <User size={13} className="text-muted" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-start"
            >
              <div className="w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center shrink-0 mr-2.5 shadow-glow-sm">
                <Sparkles size={12} className="text-white" />
              </div>
              <div className="chat-bubble-ai px-4 py-3">
                <TypingDots />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input bar */}
        {started && !feedback && (
          <div className="px-4 py-4 border-t border-slate-100 flex items-center gap-3 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendAnswer()}
              placeholder="Type your answer... (Enter to send)"
              className="glass-input flex-1 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendAnswer}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0 shadow-glow-sm hover:shadow-glow transition-shadow disabled:opacity-40"
              aria-label="Send answer"
            >
              <Send size={16} className="text-white" />
            </motion.button>
          </div>
        )}
      </GlassCard>

      {/* ── Right panel ── */}
      <div className="space-y-5">

        {/* Progress */}
        <GlassCard className="p-6">
          <h4 className="font-heading text-base text-ink mb-4">Session Progress</h4>
          <div className="space-y-2.5">
            {interviewQuestions.map((q, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={[
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all",
                    i < qIndex || feedback
                      ? "bg-brand-gradient text-white shadow-glow-sm"
                      : i === qIndex && started
                      ? "bg-primary-50 text-primary-600 ring-2 ring-primary-300"
                      : "bg-slate-100 text-placeholder",
                  ].join(" ")}
                >
                  {(i < qIndex || feedback) ? "✓" : i + 1}
                </span>
                <span className="text-xs text-muted line-clamp-1 flex-1">{q}</span>
                {(i < qIndex || feedback) && (
                  <ChevronRight size={12} className="text-primary-400 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard variant="strong" className="p-6 text-center" accent>
                <p className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.16em] mb-4">
                  Interview Score
                </p>
                <ScoreRing value={feedback.score} size={110} stroke={9} label="out of 100" showToneLabel />

                <div className="text-left mt-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-2 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded bg-emerald-100 flex items-center justify-center text-[10px]">✓</span>
                      Strengths
                    </p>
                    <ul className="space-y-1">
                      {feedback.strengths.map((s) => (
                        <li key={s} className="text-xs text-body flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-600 mb-2 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded bg-amber-100 flex items-center justify-center text-[10px]">↑</span>
                      Improve
                    </p>
                    <ul className="space-y-1">
                      {feedback.improve.map((s) => (
                        <li key={s} className="text-xs text-body flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button variant="secondary" size="sm" full className="mt-5" onClick={reset}>
                  Try another round
                </Button>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip card */}
        {!feedback && (
          <GlassCard className="p-5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-gradient-soft border border-primary-100 flex items-center justify-center shrink-0">
              <User size={14} className="text-primary-600" />
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Answer as you would out loud — the AI evaluates structure, clarity, and
              relevant detail, not just keywords.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
