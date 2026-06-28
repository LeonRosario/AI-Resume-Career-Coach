from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import InterviewSession, InterviewTurn
from app.middleware.auth import CurrentUser
from app.schemas.interview import (
    InterviewStartRequest,
    InterviewStartResponse,
    InterviewQuestion,
    EvaluateRequest,
    EvaluateResponse,
    SessionSummary,
)
from app.services.ai_service import generate_interview_questions, evaluate_answer

router = APIRouter(prefix="/interview", tags=["AI Interview"])


# ── POST /interview/start ─────────────────────────────────────────────────────

@router.post(
    "/start",
    response_model=InterviewStartResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Start a new mock interview session",
)
async def start_interview(
    payload: InterviewStartRequest,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    questions_raw = await generate_interview_questions(payload.target_role)

    session = InterviewSession(
        user_id=current_user.id,
        target_role=payload.target_role,
        questions=questions_raw,
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    # Pre-create InterviewTurn rows (unanswered) for each question
    for q in questions_raw:
        db.add(InterviewTurn(
            session_id=session.id,
            question=q["question"],
            category=q.get("category", "Technical"),
        ))
    db.commit()

    return InterviewStartResponse(
        session_id=session.id,
        target_role=session.target_role,
        questions=[InterviewQuestion(**q) for q in questions_raw],
    )


# ── POST /interview/evaluate ──────────────────────────────────────────────────

@router.post(
    "/evaluate",
    response_model=EvaluateResponse,
    summary="Submit an answer and receive AI feedback + score",
)
async def evaluate(
    payload: EvaluateRequest,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    # Validate session ownership
    session = db.query(InterviewSession).filter(
        InterviewSession.id == payload.session_id,
        InterviewSession.user_id == current_user.id,
    ).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found.")

    if not payload.answer.strip():
        raise HTTPException(status_code=400, detail="Answer must not be empty.")

    # AI evaluation
    result = await evaluate_answer(payload.question, payload.answer)

    # Find the matching unanswered turn, or create a new one
    turn = db.query(InterviewTurn).filter(
        InterviewTurn.session_id == session.id,
        InterviewTurn.question == payload.question,
        InterviewTurn.answer.is_(None),
    ).first()

    if not turn:
        turn = InterviewTurn(session_id=session.id, question=payload.question, category=payload.category)
        db.add(turn)

    turn.answer = payload.answer
    turn.score = result["score"]
    turn.feedback = result["feedback"]
    turn.improvement = result["improvement"]
    turn.answered_at = datetime.utcnow()
    db.commit()
    db.refresh(turn)

    # Update session overall score (running average)
    answered_turns = db.query(InterviewTurn).filter(
        InterviewTurn.session_id == session.id,
        InterviewTurn.score.isnot(None),
    ).all()
    if answered_turns:
        session.overall_score = round(
            sum(t.score for t in answered_turns) / len(answered_turns), 1
        )
        if len(answered_turns) >= len(session.questions):
            session.completed = True
        db.commit()

    return EvaluateResponse(
        score=result["score"],
        feedback=result["feedback"],
        improvement=result["improvement"],
        turn_id=turn.id,
    )


# ── GET /interview/history ────────────────────────────────────────────────────

@router.get(
    "/history",
    summary="List all interview sessions for the current user",
)
def interview_history(
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    sessions = (
        db.query(InterviewSession)
        .filter(InterviewSession.user_id == current_user.id)
        .order_by(InterviewSession.created_at.desc())
        .all()
    )
    return {
        "sessions": [
            {
                "id": s.id,
                "target_role": s.target_role,
                "overall_score": s.overall_score,
                "completed": s.completed,
                "question_count": len(s.questions),
                "created_at": s.created_at.isoformat(),
            }
            for s in sessions
        ]
    }


# ── GET /interview/{session_id} ───────────────────────────────────────────────

@router.get(
    "/{session_id}",
    response_model=SessionSummary,
    summary="Get full details of an interview session",
)
def get_session(
    session_id: int,
    current_user: CurrentUser,
    db: Session = Depends(get_db),
):
    session = db.query(InterviewSession).filter(
        InterviewSession.id == session_id,
        InterviewSession.user_id == current_user.id,
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found.")

    turns = [
        {
            "id": t.id,
            "question": t.question,
            "category": t.category,
            "answer": t.answer,
            "score": t.score,
            "feedback": t.feedback,
            "improvement": t.improvement,
        }
        for t in session.turns
    ]

    return SessionSummary(
        session_id=session.id,
        target_role=session.target_role,
        overall_score=session.overall_score,
        completed=session.completed,
        created_at=session.created_at,
        turns=turns,
    )
