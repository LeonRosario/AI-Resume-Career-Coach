from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import Resume
from app.middleware.auth import CurrentUser
from app.schemas.jobs import JobRecommendRequest, JobRecommendResponse, JobMatch
from app.services.ai_service import recommend_jobs

router = APIRouter(prefix="/jobs", tags=["Job Recommendations"])


@router.post(
    "/recommend",
    response_model=JobRecommendResponse,
    summary="Get personalised job recommendations based on skills",
)
async def job_recommend(
    payload: JobRecommendRequest,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    # Merge user-supplied skills with skills extracted from their latest resume
    skills = list(payload.skills)

    latest_resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.created_at.desc())
        .first()
    )
    if latest_resume and latest_resume.strengths:
        # De-duplicate, keeping user-supplied skills first
        existing_lower = {s.lower() for s in skills}
        for s in latest_resume.strengths:
            if s.lower() not in existing_lower:
                skills.append(s)

    jobs_raw = await recommend_jobs(skills)

    return JobRecommendResponse(
        jobs=[JobMatch(**j) for j in jobs_raw],
        total=len(jobs_raw),
    )


@router.get(
    "/",
    response_model=JobRecommendResponse,
    summary="Quick job list using latest resume skills (no body needed)",
)
async def jobs_from_resume(
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    latest = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.created_at.desc())
        .first()
    )
    skills = latest.strengths if latest and latest.strengths else []
    jobs_raw = await recommend_jobs(skills)
    return JobRecommendResponse(jobs=[JobMatch(**j) for j in jobs_raw], total=len(jobs_raw))
