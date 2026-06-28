from datetime import datetime
from pydantic import BaseModel


class ResumeOut(BaseModel):
    id: int
    filename: str
    ats_score: float | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class AnalysisOut(BaseModel):
    ats_score: float
    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]


class UploadResponse(BaseModel):
    resume_id: int
    filename: str
    uploaded_at: datetime
    analysis: AnalysisOut


class ATSCheckRequest(BaseModel):
    resume_text: str
    job_description: str
    resume_id: int | None = None


class ATSCheckResponse(BaseModel):
    match_percentage: float
    matched_skills: list[str]
    missing_skills: list[str]


class ResumeHistoryItem(BaseModel):
    id: int
    filename: str
    ats_score: float | None
    created_at: datetime

    model_config = {"from_attributes": True}
