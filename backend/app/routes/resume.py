from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import Resume
from app.middleware.auth import CurrentUser
from app.schemas.resume import (
    UploadResponse,
    AnalysisOut,
    ATSCheckRequest,
    ATSCheckResponse,
    ResumeHistoryItem,
)
from app.services.resume_parser import extract_text
from app.services.ai_service import analyse_resume
from app.services.ats_checker import run_ats_check
from app.services.skill_analyzer import persist_skills
from app.utils.file_handler import validate_pdf, save_upload, delete_upload
from app.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/resume", tags=["Resume"])


# ── POST /resume/upload ───────────────────────────────────────────────────────

@router.post(
    "/upload",
    response_model=UploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload a PDF resume — triggers AI analysis",
)
async def upload_resume(
    current_user: CurrentUser,
    file: UploadFile = File(..., description="PDF resume, max 10 MB"),
    db: Session = Depends(get_db),
):
    # 1. Validate
    validate_pdf(file)

    # 2. Save to disk
    original_name, stored_name = await save_upload(file)

    # 3. Extract text
    pdf_path = Path(settings.UPLOAD_DIR) / stored_name
    try:
        resume_text = extract_text(pdf_path)
    except (ValueError, FileNotFoundError) as exc:
        delete_upload(stored_name)
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc))

    # 4. AI analysis
    analysis = await analyse_resume(resume_text)

    # 5. Persist resume record
    resume = Resume(
        user_id=current_user.id,
        filename=original_name,
        stored_filename=stored_name,
        resume_text=resume_text,
        ats_score=analysis.get("ats_score"),
        strengths=analysis.get("strengths", []),
        weaknesses=analysis.get("weaknesses", []),
        suggestions=analysis.get("suggestions", []),
        analysis_raw=analysis,
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)

    # 6. Persist extracted skills
    if skills := analysis.get("extracted_skills", []):
        persist_skills(resume.id, skills, db)

    return UploadResponse(
        resume_id=resume.id,
        filename=original_name,
        uploaded_at=resume.created_at,
        analysis=AnalysisOut(
            ats_score=analysis["ats_score"],
            strengths=analysis.get("strengths", []),
            weaknesses=analysis.get("weaknesses", []),
            suggestions=analysis.get("suggestions", []),
        ),
    )


# ── GET /resume/history ───────────────────────────────────────────────────────

@router.get(
    "/history",
    response_model=list[ResumeHistoryItem],
    summary="List all resumes uploaded by the current user",
)
def resume_history(
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.created_at.desc())
        .all()
    )
    return resumes


# ── GET /resume/{id}/analysis ─────────────────────────────────────────────────

@router.get(
    "/{resume_id}/analysis",
    response_model=AnalysisOut,
    summary="Return stored AI analysis for a resume",
)
def get_analysis(
    resume_id: int,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    resume = _get_resume_or_404(resume_id, current_user.id, db)
    if resume.ats_score is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No analysis found for this resume. Re-upload to trigger analysis.",
        )
    return AnalysisOut(
        ats_score=resume.ats_score,
        strengths=resume.strengths or [],
        weaknesses=resume.weaknesses or [],
        suggestions=resume.suggestions or [],
    )


# ── POST /resume/ats-check ────────────────────────────────────────────────────

@router.post(
    "/ats-check",
    response_model=ATSCheckResponse,
    summary="Compare a resume against a job description",
)
async def ats_check(
    payload: ATSCheckRequest,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    resume_text = payload.resume_text

    # If caller passes a resume_id, use stored text instead
    if payload.resume_id:
        resume = _get_resume_or_404(payload.resume_id, current_user.id, db)
        resume_text = resume.resume_text

    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="resume_text must not be empty.")
    if not payload.job_description.strip():
        raise HTTPException(status_code=400, detail="job_description must not be empty.")

    result = await run_ats_check(
        resume_text, payload.job_description, payload.resume_id, db
    )
    return ATSCheckResponse(**result)


# ── DELETE /resume/{id} ───────────────────────────────────────────────────────

@router.delete(
    "/{resume_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a resume",
)
def delete_resume(
    resume_id: int,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    resume = _get_resume_or_404(resume_id, current_user.id, db)
    delete_upload(resume.stored_filename)
    db.delete(resume)
    db.commit()


# ── Helper ────────────────────────────────────────────────────────────────────

def _get_resume_or_404(resume_id: int, user_id: int, db: Session) -> Resume:
    resume = db.query(Resume).filter(
        Resume.id == resume_id, Resume.user_id == user_id
    ).first()
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found.",
        )
    return resume
