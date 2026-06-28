"""
ATS Checker Service
-------------------
Thin wrapper around ai_service.check_ats so the route stays clean.
Adds DB persistence of results.
"""
from sqlalchemy.orm import Session
from app.services.ai_service import check_ats
from app.database.models import Resume


async def run_ats_check(
    resume_text: str,
    job_description: str,
    resume_id: int | None,
    db: Session,
) -> dict:
    result = await check_ats(resume_text, job_description)

    # Optionally update the resume's ATS score in the DB
    if resume_id:
        resume = db.query(Resume).filter(Resume.id == resume_id).first()
        if resume:
            resume.ats_score = result.get("match_percentage")
            db.commit()

    return result
