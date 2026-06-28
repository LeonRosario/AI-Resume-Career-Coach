from pydantic import BaseModel


class JobRecommendRequest(BaseModel):
    skills: list[str]
    experience_years: int = 0
    preferred_location: str | None = None


class JobMatch(BaseModel):
    role: str
    company: str | None = None
    match: float  # 0–100
    skills: list[str]
    salary_range: str | None = None
    location: str | None = None
    experience: str | None = None


class JobRecommendResponse(BaseModel):
    jobs: list[JobMatch]
    total: int
