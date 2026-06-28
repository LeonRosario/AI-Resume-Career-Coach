from pydantic import BaseModel


class RoadmapStep(BaseModel):
    week: str
    title: str
    description: str
    topics: list[str]
    difficulty: str  # Beginner | Intermediate | Advanced
    progress: int = 0  # 0–100


class SkillGapResponse(BaseModel):
    role: str
    current_skills: list[str]
    missing_skills: list[str]
    roadmap: list[RoadmapStep]


class RoadmapGenerateRequest(BaseModel):
    target_role: str
    current_skills: list[str]


class RoadmapGenerateResponse(BaseModel):
    target_role: str
    steps: list[RoadmapStep]
