# CareerAI — FastAPI Backend

Production-ready REST API for the CareerAI Resume & Career Coach frontend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI |
| Database | PostgreSQL (SQLite for local dev) |
| ORM | SQLAlchemy 2.0 |
| Migrations | Alembic |
| Auth | JWT (python-jose) + passlib/bcrypt |
| PDF Parsing | pdfplumber + PyMuPDF (fallback) |
| AI | OpenAI GPT-4o-mini via LangChain |
| Validation | Pydantic v2 |

---

## Project Structure

```
app/
├── main.py                   ← FastAPI app, routers, CORS, startup
├── config.py                 ← Pydantic settings (reads .env)
│
├── database/
│   ├── connection.py         ← SQLAlchemy engine, session, Base
│   └── models.py             ← ORM models: User, Resume, Skill, Roadmap, Interview
│
├── routes/
│   ├── auth.py               ← POST /auth/register  POST /auth/login  GET /auth/me
│   ├── resume.py             ← POST /resume/upload  GET /resume/{id}/analysis  POST /resume/ats-check
│   ├── skills.py             ← GET /skills/{role}   POST /roadmap/generate
│   ├── jobs.py               ← POST /jobs/recommend
│   └── interview.py          ← POST /interview/start  POST /interview/evaluate
│
├── services/
│   ├── ai_service.py         ← ALL OpenAI/LangChain prompts + heuristic fallbacks
│   ├── resume_parser.py      ← PDF text extraction (pdfplumber + PyMuPDF)
│   ├── ats_checker.py        ← ATS wrapper + DB persistence
│   ├── skill_analyzer.py     ← Skill gap + skill persistence
│   └── roadmap_generator.py  ← Roadmap generation + DB persistence
│
├── schemas/
│   ├── auth.py               ← Pydantic I/O models for auth
│   ├── resume.py             ← Resume upload / analysis / ATS schemas
│   ├── skills.py             ← Skill gap + roadmap schemas
│   ├── jobs.py               ← Job recommendation schemas
│   └── interview.py          ← Interview start / evaluate schemas
│
├── middleware/
│   └── auth.py               ← JWT creation, decode, get_current_user dependency
│
└── utils/
    ├── security.py           ← hash_password, verify_password
    └── file_handler.py       ← PDF validation, save_upload, delete_upload
```

---

## Quick Start

### 1. Clone & install

```bash
cd careerai-fastapi
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env — set DATABASE_URL and OPENAI_API_KEY
```

### 3. Start PostgreSQL (Docker quickstart)

```bash
docker run -d \
  --name careerai-db \
  -e POSTGRES_DB=careerai \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:16
```

Or use SQLite for zero-config local dev:
```
DATABASE_URL=sqlite:///./careerai.db
```

### 4. Run migrations

```bash
alembic revision --autogenerate -m "initial"
alembic upgrade head
```

### 5. Start the server

```bash
uvicorn app.main:app --reload --port 8000
```

API docs: **http://localhost:8000/docs**
ReDoc: **http://localhost:8000/redoc**

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite:///./careerai.db` | PostgreSQL or SQLite URL |
| `SECRET_KEY` | *(dev only)* | JWT signing secret — **change in production** |
| `ALGORITHM` | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `10080` | Token lifetime (7 days) |
| `CORS_ORIGINS` | `http://localhost:5173` | Comma-separated allowed origins |
| `UPLOAD_DIR` | `uploads` | Directory for uploaded PDFs |
| `MAX_FILE_SIZE_MB` | `10` | Max PDF size |
| `OPENAI_API_KEY` | *(optional)* | If set, uses GPT-4o-mini for all AI |
| `OPENAI_MODEL` | `gpt-4o-mini` | OpenAI model name |

---

## API Reference

All routes prefixed with `/api`. Protected routes require:
```
Authorization: Bearer <jwt_token>
```

---

### Auth  `/api/auth`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | — | Register, returns JWT |
| POST | `/auth/login` | — | Login, returns JWT |
| GET | `/auth/me` | ✓ | Current user |
| PATCH | `/auth/me` | ✓ | Update name |

**Register**
```json
POST /api/auth/register
{ "name": "Jordan Lee", "email": "jordan@example.com", "password": "secret123" }

→ { "access_token": "...", "token_type": "bearer", "user": { "id": 1, "name": "Jordan Lee", "email": "..." } }
```

---

### Resume  `/api/resume`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/resume/upload` | ✓ | Upload PDF → triggers AI analysis |
| GET | `/resume/history` | ✓ | List user's resumes |
| GET | `/resume/{id}/analysis` | ✓ | Get stored analysis |
| POST | `/resume/ats-check` | ✓ | Compare resume vs JD |
| DELETE | `/resume/{id}` | ✓ | Delete resume |

**Upload** `multipart/form-data`, field: `resume` (PDF)
```json
→ {
  "resume_id": 1,
  "filename": "my_resume.pdf",
  "uploaded_at": "2026-06-23T...",
  "analysis": {
    "ats_score": 85,
    "strengths": ["React", "Python", "Docker"],
    "weaknesses": ["Kubernetes", "Terraform"],
    "suggestions": ["Add metrics to bullet points.", "..."]
  }
}
```

**ATS Check**
```json
POST /api/resume/ats-check
{ "resume_text": "...", "job_description": "...", "resume_id": 1 }

→ { "match_percentage": 88, "matched_skills": ["React", "Node"], "missing_skills": ["AWS"] }
```

---

### Skills & Roadmap  `/api/skills`  `/api/roadmap`

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/skills/roles` | ✓ | List supported roles |
| GET | `/skills/{role}` | ✓ | Skill gap for a role |
| POST | `/roadmap/generate` | ✓ | Generate + save AI roadmap |
| GET | `/roadmap/history` | ✓ | List user's roadmaps |

**Skill Gap**
```json
GET /api/skills/DevOps Engineer

→ {
  "role": "DevOps Engineer",
  "current_skills": ["Linux", "Git", "Docker"],
  "missing_skills": ["Kubernetes", "Terraform", "AWS"],
  "roadmap": [
    {
      "week": "Week 1",
      "title": "Containers with Docker",
      "description": "Master containerisation fundamentals.",
      "topics": ["Docker images", "Containers", "docker-compose"],
      "difficulty": "Beginner",
      "progress": 0
    }
  ]
}
```

**Generate Roadmap**
```json
POST /api/roadmap/generate
{ "target_role": "Full Stack Developer", "current_skills": ["React", "Node.js"] }
```

---

### Jobs  `/api/jobs`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/jobs/recommend` | ✓ | Personalised job recommendations |
| GET | `/jobs/` | ✓ | Quick list from latest resume |

```json
POST /api/jobs/recommend
{ "skills": ["React", "Python", "Docker"], "experience_years": 3 }

→ {
  "jobs": [
    { "role": "Full Stack Developer", "company": "Nimbus Labs",
      "match": 94, "skills": ["React", "Node.js"], "salary_range": "$110k – $135k" }
  ],
  "total": 6
}
```

---

### Interview  `/api/interview`

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/interview/start` | ✓ | Start session, get questions |
| POST | `/interview/evaluate` | ✓ | Submit answer, get score + feedback |
| GET | `/interview/history` | ✓ | All past sessions |
| GET | `/interview/{id}` | ✓ | Full session detail |

**Start**
```json
POST /api/interview/start
{ "target_role": "DevOps Engineer" }

→ {
  "session_id": 1,
  "target_role": "DevOps Engineer",
  "questions": [
    { "question": "Explain Docker vs VM...", "category": "Technical" }
  ]
}
```

**Evaluate**
```json
POST /api/interview/evaluate
{ "session_id": 1, "question": "Explain Docker vs VM...", "answer": "Docker uses..." }

→ { "score": 8.5, "feedback": "Strong answer...", "improvement": "Add latency benchmarks.", "turn_id": 3 }
```

---

### Health

```
GET /api/health
→ { "status": "ok", "app": "CareerAI", "version": "1.0.0", "ai_mode": "openai" }
```

---

## AI Mode

**Heuristic mode** (no API key) — keyword matching + scoring engine. Fast, free, deterministic.

**OpenAI mode** — set `OPENAI_API_KEY` in `.env`. Switches all 7 AI features to GPT-4o-mini. Same response shape, richer results.

---

## Connecting to the React Frontend

Add to your frontend `.env`:
```
VITE_API_URL=http://localhost:8000/api
```

Update `AuthContext.jsx`:
```js
const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem('careerai_token', res.data.access_token);
  setUser(res.data.user);
};
```

---

## Database Migrations

```bash
# Create a new migration after changing models
alembic revision --autogenerate -m "add column"

# Apply all pending migrations
alembic upgrade head

# Roll back one migration
alembic downgrade -1
```

---

## License

MIT
