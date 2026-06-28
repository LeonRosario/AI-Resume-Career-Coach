"""
Roadmap Generator Service
-------------------------
Generates and persists AI career roadmaps.
"""
from sqlalchemy.orm import Session
from app.services.ai_service import generate_roadmap
from app.database.models import Roadmap


async def create_roadmap(
    user_id: int,
    target_role: str,
    current_skills: list[str],
    db: Session,
) -> dict:
    """Generate a roadmap, store it, and return the structured result."""
    result = await generate_roadmap(target_role, current_skills)

    roadmap_record = Roadmap(
        user_id=user_id,
        target_role=target_role,
        current_skills=current_skills,
        roadmap_data=result,
    )
    db.add(roadmap_record)
    db.commit()
    db.refresh(roadmap_record)

    return {**result, "roadmap_id": roadmap_record.id}


def get_user_roadmaps(user_id: int, db: Session) -> list[dict]:
    records = (
        db.query(Roadmap)
        .filter(Roadmap.user_id == user_id)
        .order_by(Roadmap.created_at.desc())
        .all()
    )
    return [
        {
            "id": r.id,
            "target_role": r.target_role,
            "current_skills": r.current_skills,
            "roadmap_data": r.roadmap_data,
            "created_at": r.created_at.isoformat(),
        }
        for r in records
    ]
