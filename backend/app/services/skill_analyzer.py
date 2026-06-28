"""
Skill Analyser Service
----------------------
Wraps ai_service.analyse_skill_gap and persists extracted skills to the DB.
"""
from sqlalchemy.orm import Session
from app.services.ai_service import analyse_skill_gap
from app.database.models import Resume, Skill


async def get_skill_gap(role: str, resume_id: int | None, db: Session) -> dict:
    """
    Run skill gap analysis for a role, optionally seeded with skills
    extracted from a stored resume.
    """
    current_skills: list[str] = []

    if resume_id:
        resume = db.query(Resume).filter(Resume.id == resume_id).first()
        if resume:
            # Use skills already extracted and stored
            current_skills = [s.skill_name for s in resume.skills]

            # Fallback: if no skills recorded yet, use strengths from analysis
            if not current_skills and resume.strengths:
                current_skills = resume.strengths

    return await analyse_skill_gap(role, current_skills)


def persist_skills(resume_id: int, skills: list[str], db: Session) -> None:
    """
    Save extracted skills to the skills table (idempotent — clears old first).
    """
    db.query(Skill).filter(Skill.resume_id == resume_id).delete()
    for name in skills:
        db.add(Skill(resume_id=resume_id, skill_name=name.strip(), skill_type="technical"))
    db.commit()
