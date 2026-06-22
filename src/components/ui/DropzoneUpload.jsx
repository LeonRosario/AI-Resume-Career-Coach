import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud, FileText, X } from "lucide-react";
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

  if (file) {
    return (
      <div className="glass-soft rounded-glass p-6 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-brand-gradient-soft flex items-center justify-center shrink-0">
            <FileText size={20} className="text-primary-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink truncate">{file.name}</p>
            <p className="text-xs text-ink/45">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
        </div>
        <button
          onClick={onClear}
          className="p-2 rounded-xl hover:bg-white/50 text-ink/40 hover:text-rose-500 transition-colors shrink-0"
          aria-label="Remove file"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`relative rounded-glass border-2 border-dashed p-10 md:p-14 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary-500 bg-primary-50/40"
            : "border-primary-300/50 glass-soft hover:border-primary-400/70"
        }`}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={isDragActive ? { y: -6, scale: 1.05 } : { y: 0, scale: 1 }}
          className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-5 shadow-glow"
        >
          <UploadCloud size={28} className="text-white" />
        </motion.div>
        <p className="font-heading font-bold text-ink text-lg">
          {isDragActive ? "Drop it right here" : "Drag & Drop Resume"}
        </p>
        <p className="text-sm text-ink/45 mt-1.5 mb-5">PDF up to 10MB</p>
        <Button type="button" variant="primary" size="md">
          Upload PDF
        </Button>
      </div>
      {error && <p className="text-xs text-rose-500 mt-2 text-center">{error}</p>}
    </div>
  );
}
