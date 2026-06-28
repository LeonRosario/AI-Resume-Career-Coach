"""
SQLAlchemy ORM models for CareerAI.

Tables
------
users          — registered accounts
resumes        — uploaded PDF resumes + parsed data
skills         — skills extracted from a resume
roadmaps       — AI-generated career roadmaps
interview_sessions — mock interview sessions
interview_turns    — individual Q&A turns within a session
"""

from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Text, Float, Boolean,
    DateTime, ForeignKey, JSON, Enum as PgEnum,
)
from sqlalchemy.orm import relationship
import enum

from app.database.connection import Base


# ── Enums ────────────────────────────────────────────────────────────────────

class SkillType(str, enum.Enum):
    technical = "technical"
    soft = "soft"
    domain = "domain"


class InterviewCategory(str, enum.Enum):
    technical = "Technical"
    behavioural = "Behavioural"
    system_design = "System Design"
    situational = "Situational"


# ── User ─────────────────────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    resumes = relationship("Resume", back_populates="user", cascade="all, delete-orphan")
    roadmaps = relationship("Roadmap", back_populates="user", cascade="all, delete-orphan")
    interview_sessions = relationship("InterviewSession", back_populates="user", cascade="all, delete-orphan")


# ── Resume ───────────────────────────────────────────────────────────────────

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    filename = Column(String(255), nullable=False)
    stored_filename = Column(String(255), nullable=False)  # UUID name on disk
    resume_text = Column(Text, nullable=False)

    # AI analysis results (cached after first analysis)
    ats_score = Column(Float, nullable=True)
    strengths = Column(JSON, nullable=True)       # list[str]
    weaknesses = Column(JSON, nullable=True)      # list[str]
    suggestions = Column(JSON, nullable=True)     # list[str]
    analysis_raw = Column(JSON, nullable=True)    # full AI response

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="resumes")
    skills = relationship("Skill", back_populates="resume", cascade="all, delete-orphan")


# ── Skill ────────────────────────────────────────────────────────────────────

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id", ondelete="CASCADE"), nullable=False)
    skill_name = Column(String(120), nullable=False)
    skill_type = Column(String(20), default=SkillType.technical)
    confidence = Column(Float, default=1.0)  # 0–1 confidence from AI

    resume = relationship("Resume", back_populates="skills")


# ── Roadmap ──────────────────────────────────────────────────────────────────

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    target_role = Column(String(120), nullable=False)
    current_skills = Column(JSON, nullable=True)   # list[str] input
    roadmap_data = Column(JSON, nullable=False)    # full structured roadmap
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="roadmaps")


# ── Interview Session ─────────────────────────────────────────────────────────

class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    target_role = Column(String(120), nullable=False)
    questions = Column(JSON, nullable=False)       # list[{question, category}]
    overall_score = Column(Float, nullable=True)
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="interview_sessions")
    turns = relationship("InterviewTurn", back_populates="session", cascade="all, delete-orphan")


class InterviewTurn(Base):
    __tablename__ = "interview_turns"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("interview_sessions.id", ondelete="CASCADE"), nullable=False)
    question = Column(Text, nullable=False)
    category = Column(String(40), default=InterviewCategory.technical)
    answer = Column(Text, nullable=True)
    score = Column(Float, nullable=True)       # 0–10
    feedback = Column(Text, nullable=True)
    improvement = Column(Text, nullable=True)
    answered_at = Column(DateTime, nullable=True)

    session = relationship("InterviewSession", back_populates="turns")
