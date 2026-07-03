import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Undo2, Redo2, Download, FileText, Eye, Palette,
  Save, Clock, Upload, Share2, Copy,
} from "lucide-react";
import Button from "../ui/Button";

export default function TopToolbar({
  resumeName,
  onNameChange,
  saving,
  lastSaved,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onExportPDF,
  onExportDOCX,
  onImport,
  onDuplicate,
  onShare,
}) {
  const [themeOpen, setThemeOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/90 backdrop-blur-xl rounded-[20px] px-5 py-3.5 flex items-center gap-3 border border-slate-200/60 shadow-sm"
    >
      {/* Resume Name */}
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm shrink-0">
          <FileText size={14} className="text-white" strokeWidth={2.2} />
        </div>
        <div className="min-w-0">
          <input
            value={resumeName}
            onChange={handleNameChange}
            className="w-full bg-transparent text-sm font-semibold text-ink outline-none border-none placeholder:text-placeholder truncate"
            placeholder="My Resume"
          />
        </div>
      </div>

      {/* Save Indicator */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={saving ? "saving" : lastSaved ? "saved" : "empty"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex items-center gap-1.5 text-xs whitespace-nowrap"
        >
          {saving ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 border border-amber-200/60 font-medium">
              <Save size={12} className="animate-pulse" />
              Saving...
            </span>
          ) : lastSaved ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60 font-medium">
              <Clock size={12} />
              Saved {lastSaved}
            </span>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="w-px h-7 bg-slate-200/60 shrink-0" />

      {/* Undo / Redo */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-ink hover:bg-slate-100 transition-all disabled:opacity-25 disabled:pointer-events-none"
          title="Undo"
        >
          <Undo2 size={15} strokeWidth={1.8} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-ink hover:bg-slate-100 transition-all disabled:opacity-25 disabled:pointer-events-none"
          title="Redo"
        >
          <Redo2 size={15} strokeWidth={1.8} />
        </button>
      </div>

      <div className="w-px h-7 bg-slate-200/60 shrink-0" />

      {/* Actions */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="xs" icon={Upload} onClick={onImport}>
          Import
        </Button>
        <Button variant="ghost" size="xs" icon={Download} onClick={onExportPDF}>
          PDF
        </Button>
        <Button variant="ghost" size="xs" icon={FileText} onClick={onExportDOCX}>
          DOCX
        </Button>
        <Button variant="ghost" size="xs" icon={Share2} onClick={onShare}>
          Share
        </Button>
        <Button variant="ghost" size="xs" icon={Copy} onClick={onDuplicate}>
          Duplicate
        </Button>
      </div>

      <div className="w-px h-7 bg-slate-200/60 shrink-0" />

      {/* Preview Toggle */}
      <button
        onClick={() => setPreviewMode((p) => !p)}
        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
          previewMode ? "bg-primary-100 text-primary-600 shadow-sm" : "text-slate-400 hover:text-ink hover:bg-slate-100"
        }`}
        title="Toggle Preview"
      >
        <Eye size={15} strokeWidth={1.8} />
      </button>

      {/* Theme */}
      <div className="relative">
        <button
          onClick={() => setThemeOpen((t) => !t)}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-ink hover:bg-slate-100 transition-all"
          title="Theme"
        >
          <Palette size={15} strokeWidth={1.8} />
        </button>
        <AnimatePresence>
          {themeOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setThemeOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 z-20 bg-white/95 backdrop-blur-xl rounded-2xl p-2 min-w-[180px] shadow-lg border border-slate-200/60"
              >
                {[
                  { name: "Modern", desc: "Clean & professional" },
                  { name: "Classic", desc: "Traditional ATS" },
                  { name: "Minimal", desc: "Simple & elegant" },
                  { name: "Creative", desc: "Bold & unique" },
                ].map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setThemeOpen(false)}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors hover:bg-primary-50 group"
                  >
                    <span className="font-medium text-ink group-hover:text-primary-700">{t.name}</span>
                    <span className="block text-xs text-muted/70 mt-0.5">{t.desc}</span>
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
