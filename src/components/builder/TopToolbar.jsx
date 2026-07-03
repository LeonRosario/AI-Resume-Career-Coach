import { useState } from "react";
import { motion } from "framer-motion";
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
      className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-3 flex-wrap"
    >
      {/* Resume Name */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <FileText size={16} className="text-primary-500 shrink-0" />
        <input
          value={resumeName}
          onChange={handleNameChange}
          className="bg-transparent text-sm font-semibold text-ink outline-none border-none min-w-0 flex-1 placeholder:text-placeholder"
          placeholder="My Resume"
        />
      </div>

      {/* Save Indicator */}
      <div className="flex items-center gap-1.5 text-xs text-muted whitespace-nowrap">
        {saving ? (
          <>
            <Save size={13} className="text-amber-500 animate-pulse" />
            <span>Saving...</span>
          </>
        ) : lastSaved ? (
          <>
            <Clock size={13} className="text-emerald-500" />
            <span>Saved {lastSaved}</span>
          </>
        ) : null}
      </div>

      <div className="w-px h-6 bg-slate-200" />

      {/* Undo / Redo */}
      <div className="flex items-center gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-ink hover:bg-white/60 transition-all disabled:opacity-30 disabled:pointer-events-none"
          title="Undo"
        >
          <Undo2 size={15} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-ink hover:bg-white/60 transition-all disabled:opacity-30 disabled:pointer-events-none"
          title="Redo"
        >
          <Redo2 size={15} />
        </button>
      </div>

      <div className="w-px h-6 bg-slate-200" />

      {/* Actions */}
      <div className="flex items-center gap-1.5">
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

      <div className="w-px h-6 bg-slate-200" />

      {/* Preview Toggle */}
      <button
        onClick={() => setPreviewMode((p) => !p)}
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
          previewMode ? "bg-primary-100 text-primary-600" : "text-muted hover:text-ink hover:bg-white/60"
        }`}
        title="Toggle Preview"
      >
        <Eye size={15} />
      </button>

      {/* Theme */}
      <div className="relative">
        <button
          onClick={() => setThemeOpen((t) => !t)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-ink hover:bg-white/60 transition-all"
          title="Theme"
        >
          <Palette size={15} />
        </button>
        {themeOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setThemeOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 top-full mt-2 z-20 glass-strong rounded-xl p-2 min-w-[160px] shadow-glass-lg"
            >
              {["Modern", "Classic", "Minimal", "Creative"].map((t) => (
                <button
                  key={t}
                  onClick={() => setThemeOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-body hover:bg-primary-50 hover:text-primary-700 transition-colors"
                >
                  {t}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
