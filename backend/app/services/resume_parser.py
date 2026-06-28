"""
Resume Parser Service
---------------------
Extracts clean plain text from a PDF resume.

Strategy:
  1. Try pdfplumber (best for text-heavy PDFs).
  2. Fall back to PyMuPDF (fitz) for complex layouts or encrypted files.
  3. Return cleaned, normalised text ready for AI analysis.
"""

import re
from pathlib import Path

import pdfplumber
import fitz  # PyMuPDF


def extract_text(pdf_path: str | Path) -> str:
    """
    Extract text from a PDF file.
    Returns cleaned plain text, or raises ValueError if extraction fails.
    """
    path = Path(pdf_path)
    if not path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    text = _extract_pdfplumber(path)

    # If pdfplumber got very little (e.g. scanned/image PDF), try PyMuPDF
    if len(text.strip()) < 100:
        text = _extract_pymupdf(path)

    if not text.strip():
        raise ValueError(
            "Could not extract text from this PDF. "
            "It may be a scanned image — please upload a text-based PDF."
        )

    return _clean_text(text)


def _extract_pdfplumber(path: Path) -> str:
    lines: list[str] = []
    try:
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text(x_tolerance=2, y_tolerance=2)
                if page_text:
                    lines.append(page_text)
    except Exception:
        return ""
    return "\n".join(lines)


def _extract_pymupdf(path: Path) -> str:
    lines: list[str] = []
    try:
        doc = fitz.open(str(path))
        for page in doc:
            lines.append(page.get_text("text"))  # type: ignore[arg-type]
        doc.close()
    except Exception:
        return ""
    return "\n".join(lines)


def _clean_text(text: str) -> str:
    """Normalise whitespace, remove control chars, collapse blank lines."""
    # Remove non-printable chars except newlines/tabs
    text = re.sub(r"[^\x20-\x7E\n\t]", " ", text)
    # Collapse multiple spaces
    text = re.sub(r"[ \t]+", " ", text)
    # Collapse 3+ newlines → 2
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()
