from datetime import datetime
from pydantic import BaseModel


class InterviewStartRequest(BaseModel):
    target_role: str
    resume_id: int | None = None


class InterviewQuestion(BaseModel):
    question: str
    category: str  # Technical | Behavioural | System Design | Situational


class InterviewStartResponse(BaseModel):
    session_id: int
    target_role: str
    questions: list[InterviewQuestion]


class EvaluateRequest(BaseModel):
    session_id: int
    question: str
    answer: str
    category: str = "Technical"


class EvaluateResponse(BaseModel):
    score: float       # 0–10
    feedback: str
    improvement: str
    turn_id: int


class SessionSummary(BaseModel):
    session_id: int
    target_role: str
    overall_score: float | None
    completed: bool
    created_at: datetime
    turns: list[dict]
