"""
CareerAI FastAPI Backend
========================
Entry point — creates the FastAPI app, registers middleware,
mounts all routers, and creates DB tables on startup.
"""

import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.config import get_settings
from app.database.connection import create_tables

# Routes
from app.routes import auth, resume, skills, jobs, interview

settings = get_settings()
logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)


# ── Lifespan (startup / shutdown) ─────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    # ── Startup ──────────────────────────────────────────────────────────────
    logger.info("🚀  CareerAI backend starting up...")

    # Create upload directory
    Path(settings.UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
    logger.info(f"📁  Upload directory: {settings.UPLOAD_DIR}")

    # Create DB tables (idempotent)
    create_tables()
    logger.info("✅  Database tables ready.")

    if settings.OPENAI_API_KEY:
        logger.info(f"🤖  OpenAI connected — model: {settings.OPENAI_MODEL}")
    else:
        logger.warning("⚠️   OPENAI_API_KEY not set — running in heuristic mode.")

    yield

    # ── Shutdown ─────────────────────────────────────────────────────────────
    logger.info("🛑  CareerAI backend shutting down.")


# ── App factory ───────────────────────────────────────────────────────────────

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "AI-powered Resume & Career Coach API.\n\n"
        "Features: Resume analysis · ATS checking · Skill gap analysis · "
        "Career roadmaps · Job recommendations · AI mock interviews."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)


# ── CORS ─────────────────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Global exception handler ─────────────────────────────────────────────────

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error on {request.method} {request.url}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An unexpected error occurred. Please try again."},
    )


# ── Static files (uploaded resumes) ──────────────────────────────────────────

app.mount(
    "/uploads",
    StaticFiles(directory=settings.UPLOAD_DIR, check_dir=False),
    name="uploads",
)


# ── Routers ───────────────────────────────────────────────────────────────────

app.include_router(auth.router,      prefix="/api")
app.include_router(resume.router,    prefix="/api")
app.include_router(skills.router,    prefix="/api")
app.include_router(jobs.router,      prefix="/api")
app.include_router(interview.router, prefix="/api")


# ── Health check ─────────────────────────────────────────────────────────────

@app.get("/api/health", tags=["Health"], summary="Server health check")
def health():
    return {
        "status": "ok",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "ai_mode": "openai" if settings.OPENAI_API_KEY else "heuristic",
    }


@app.get("/", include_in_schema=False)
def root():
    return {"message": f"Welcome to {settings.APP_NAME} API. Docs at /docs"}
