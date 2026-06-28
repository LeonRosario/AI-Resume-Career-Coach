import os
import uuid
from pathlib import Path
from fastapi import HTTPException, UploadFile, status
from app.config import get_settings

settings = get_settings()

ALLOWED_MIME_TYPES = {"application/pdf"}
ALLOWED_EXTENSIONS = {".pdf"}


def validate_pdf(file: UploadFile) -> None:
    """Raise 400 if the file is not a valid PDF within size limits."""
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are accepted.",
        )
    if file.content_type and file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid content-type. Upload a PDF.",
        )


async def save_upload(file: UploadFile) -> tuple[str, str]:
    """
    Save the uploaded file to UPLOAD_DIR with a UUID filename.
    Returns (original_filename, stored_filename).
    Raises 413 if the file exceeds MAX_FILE_SIZE_MB.
    """
    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(parents=True, exist_ok=True)

    ext = Path(file.filename or "resume").suffix.lower() or ".pdf"
    stored_name = f"{uuid.uuid4().hex}{ext}"
    dest = upload_dir / stored_name

    contents = await file.read()
    if len(contents) > settings.max_file_bytes:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds the {settings.MAX_FILE_SIZE_MB} MB limit.",
        )

    dest.write_bytes(contents)
    return file.filename or "resume.pdf", stored_name


def delete_upload(stored_filename: str) -> None:
    """Remove a stored file from disk (best-effort, no error if missing)."""
    try:
        path = Path(settings.UPLOAD_DIR) / stored_filename
        if path.exists():
            path.unlink()
    except OSError:
        pass
