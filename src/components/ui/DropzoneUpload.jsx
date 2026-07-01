import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";
import Button from "./Button";

export default function DropzoneUpload({ onFile, file, onClear, accept = ".pdf" }) {
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (accepted, rejected) => {
      if (rejected?.length) {
        setError("Please upload a PDF file under 10MB.");
        return;
      }
      setError("");
      if (accepted?.[0]) onFile(accepted[0]);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  // File already uploaded state
  if (file) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-soft rounded-[18px] p-5 flex items-center justify-between gap-4 border border-emerald-200/60"
        style={{ background: "rgba(240,253,244,0.7)" }}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <FileText size={20} className="text-emerald-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{file.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
              <p className="text-xs text-emerald-600 font-medium">
                {(file.size / 1024).toFixed(0)} KB · Ready for analysis
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onClear}
          className="p-2 rounded-xl text-muted hover:text-red-500 hover:bg-red-50 transition-all"
          aria-label="Remove file"
        >
          <X size={16} />
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={[
          "relative rounded-[20px] border-2 border-dashed p-10 md:p-14 text-center cursor-pointer",
          "transition-all duration-200",
          isDragActive
            ? "border-primary-500 bg-primary-50/50"
            : "border-primary-200 hover:border-primary-400 glass-soft hover:shadow-glass-md",
        ].join(" ")}
      >
        <input {...getInputProps()} />

        {/* Drag overlay glow */}
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-[20px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)" }}
          />
        )}

        <motion.div
          animate={isDragActive ? { y: -8, scale: 1.08 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-5 shadow-glow-sm"
        >
          <UploadCloud size={28} className="text-white" strokeWidth={2} />
        </motion.div>

        <p className="font-heading text-xl text-ink">
          {isDragActive ? "Drop it right here" : "Drag & drop your resume"}
        </p>
        <p className="text-sm text-muted mt-2 mb-6">PDF up to 10MB</p>

        <Button type="button" variant="primary" size="md">
          Browse files
        </Button>

        {/* Supported format hint */}
        <p className="text-xs text-placeholder mt-4">
          Supported: PDF · We recommend a single-page resume for best results
        </p>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-red-500 mt-2 text-center flex items-center justify-center gap-1.5"
        >
          <X size={12} /> {error}
        </motion.p>
      )}
    </div>
  );
}
