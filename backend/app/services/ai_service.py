"""
AI Service
----------
Central module for all OpenAI / LangChain calls.

Every public function:
  - Returns structured Python dicts (never raw strings).
  - Falls back to a heuristic engine when OPENAI_API_KEY is not set.
  - Retries once on transient errors.

All prompts instruct the model to return JSON-only — no markdown fences,
no preamble. We strip any accidental fencing before parsing.
"""

import json
import re
import logging
from typing import Any

from app.config import get_settings

settings = get_settings()
logger = logging.getLogger(__name__)

# ── LangChain / OpenAI setup ─────────────────────────────────────────────────

def _get_llm():
    """Return a LangChain ChatOpenAI instance, or None if no key configured."""
    if not settings.OPENAI_API_KEY:
        return None
    try:
        from langchain_openai import ChatOpenAI
        return ChatOpenAI(
            model=settings.OPENAI_MODEL,
            api_key=settings.OPENAI_API_KEY,
            temperature=0.3,
            max_retries=2,
        )
    except Exception as e:
        logger.warning(f"Could not initialise LangChain LLM: {e}")
        return None


def _parse_json_response(raw: str) -> dict | list:
    """Strip markdown fences and parse JSON from LLM output."""
    cleaned = re.sub(r"```(?:json)?|```", "", raw).strip()
    return json.loads(cleaned)


async def _call_llm(prompt: str) -> str:
    """Send a prompt to the LLM and return the raw string response."""
    llm = _get_llm()
    if llm is None:
        raise RuntimeError("No LLM configured.")
    from langchain_core.messages import HumanMessage
    response = await llm.ainvoke([HumanMessage(content=prompt)])
    return response.content


# ═══════════════════════════════════════════════════════════════════════════════
# 1. RESUME ANALYSIS
# ═══════════════════════════════════════════════════════════════════════════════

RESUME_ANALYSIS_PROMPT = """
You are an expert ATS resume analyst and senior technical recruiter.
Analyse the resume text below and return ONLY a JSON object — no markdown, no explanation.

JSON shape:
{{
  "ats_score": <integer 0-100>,
  "strengths": [<up to 8 skill/strength strings>],
  "weaknesses": [<up to 6 missing skill/weakness strings>],
  "suggestions": [<3-5 specific, actionable improvement strings>],
  "extracted_skills": [<all technical skills found, as strings>]
}}

Rules:
- ats_score reflects how well this resume would pass automated ATS filters.
- strengths = things the candidate does well or has clearly demonstrated.
- weaknesses = important skills/sections missing for a competitive candidate.
- suggestions = concrete, specific changes the candidate can make today.
- extracted_skills = every technical skill/tool/language explicitly mentioned.

RESUME TEXT:
{resume_text}
"""


async def analyse_resume(resume_text: str) -> dict[str, Any]:
    """
    Analyse a resume and return structured results.
    Falls back to heuristic scoring if no LLM is configured.
    """
    if settings.OPENAI_API_KEY:
        try:
            prompt = RESUME_ANALYSIS_PROMPT.format(resume_text=resume_text[:5000])
            raw = await _call_llm(prompt)
            return _parse_json_response(raw)
        except Exception as e:
            logger.error(f"Resume analysis LLM error: {e} — falling back to heuristic.")

    return _heuristic_resume_analysis(resume_text)


# ═══════════════════════════════════════════════════════════════════════════════
# 2. ATS KEYWORD MATCHING
# ═══════════════════════════════════════════════════════════════════════════════

ATS_CHECK_PROMPT = """
You are an expert ATS (Applicant Tracking System) specialist.
Compare the RESUME and JOB DESCRIPTION below. Return ONLY a JSON object.

JSON shape:
{{
  "match_percentage": <integer 0-100>,
  "matched_skills": [<keywords/skills present in BOTH>],
  "missing_skills": [<important keywords in the JD but absent from resume>]
}}

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}
"""


async def check_ats(resume_text: str, job_description: str) -> dict[str, Any]:
    if settings.OPENAI_API_KEY:
        try:
            prompt = ATS_CHECK_PROMPT.format(
                resume_text=resume_text[:3000],
                job_description=job_description[:2000],
            )
            raw = await _call_llm(prompt)
            return _parse_json_response(raw)
        except Exception as e:
            logger.error(f"ATS check LLM error: {e} — falling back to heuristic.")

    return _heuristic_ats_check(resume_text, job_description)


# ═══════════════════════════════════════════════════════════════════════════════
# 3. SKILL GAP ANALYSIS
# ═══════════════════════════════════════════════════════════════════════════════

SKILL_GAP_PROMPT = """
You are a senior engineering career coach.
Given the TARGET ROLE and USER'S CURRENT SKILLS below, return ONLY a JSON object.

JSON shape:
{{
  "role": "{role}",
  "current_skills": [<skills from the list that are relevant to the role>],
  "missing_skills": [<high-value skills missing for this role>],
  "roadmap": [
    {{
      "week": "Week 1",
      "title": "<topic title>",
      "description": "<1-2 sentence description>",
      "topics": [<3-5 specific subtopic strings>],
      "difficulty": "<Beginner|Intermediate|Advanced>",
      "progress": 0
    }}
  ]
}}

Generate exactly 4 roadmap steps covering the most critical missing skills.

TARGET ROLE: {role}
CURRENT SKILLS: {skills}
"""


async def analyse_skill_gap(role: str, current_skills: list[str]) -> dict[str, Any]:
    if settings.OPENAI_API_KEY:
        try:
            prompt = SKILL_GAP_PROMPT.format(
                role=role,
                skills=", ".join(current_skills) if current_skills else "None provided",
            )
            raw = await _call_llm(prompt)
            return _parse_json_response(raw)
        except Exception as e:
            logger.error(f"Skill gap LLM error: {e} — falling back to heuristic.")

    return _heuristic_skill_gap(role, current_skills)


# ═══════════════════════════════════════════════════════════════════════════════
# 4. CAREER ROADMAP GENERATION
# ═══════════════════════════════════════════════════════════════════════════════

ROADMAP_PROMPT = """
You are an expert engineering career coach.
Generate a personalised 4-step career roadmap for someone who wants to become a {role}.
Their current skills are: {skills}.

Return ONLY a JSON object:
{{
  "target_role": "{role}",
  "steps": [
    {{
      "week": "Week 1",
      "title": "<step title>",
      "description": "<2-3 sentence description>",
      "topics": [<4-6 specific subtopic strings>],
      "difficulty": "<Beginner|Intermediate|Advanced>",
      "progress": 0
    }}
  ]
}}

Make each step build on the previous. Focus on what they are MISSING, not what they already know.
"""


async def generate_roadmap(target_role: str, current_skills: list[str]) -> dict[str, Any]:
    if settings.OPENAI_API_KEY:
        try:
            prompt = ROADMAP_PROMPT.format(
                role=target_role,
                skills=", ".join(current_skills) or "None",
            )
            raw = await _call_llm(prompt)
            return _parse_json_response(raw)
        except Exception as e:
            logger.error(f"Roadmap LLM error: {e} — falling back to heuristic.")

    return _heuristic_roadmap(target_role, current_skills)


# ═══════════════════════════════════════════════════════════════════════════════
# 5. JOB RECOMMENDATION
# ═══════════════════════════════════════════════════════════════════════════════

JOB_RECOMMEND_PROMPT = """
You are a technical recruiter AI. Given a candidate's skills, recommend 6 job roles.

Return ONLY a JSON array:
[
  {{
    "role": "<job title>",
    "company": "<example company name>",
    "match": <integer 0-100>,
    "skills": [<3-5 key skills for this role>],
    "salary_range": "<e.g. $90k – $120k>",
    "location": "<Remote|Hybrid|On-site>",
    "experience": "<e.g. 2-4 yrs>"
  }}
]

CANDIDATE SKILLS: {skills}
"""


async def recommend_jobs(skills: list[str]) -> list[dict[str, Any]]:
    if settings.OPENAI_API_KEY:
        try:
            prompt = JOB_RECOMMEND_PROMPT.format(skills=", ".join(skills))
            raw = await _call_llm(prompt)
            return _parse_json_response(raw)
        except Exception as e:
            logger.error(f"Job recommend LLM error: {e} — falling back to heuristic.")

    return _heuristic_job_recommend(skills)


# ═══════════════════════════════════════════════════════════════════════════════
# 6. INTERVIEW QUESTION GENERATION
# ═══════════════════════════════════════════════════════════════════════════════

INTERVIEW_GEN_PROMPT = """
You are a senior technical interviewer at a top tech company.
Generate 5 interview questions for a {role} candidate.
Mix categories: Technical, Behavioural, System Design, Situational.

Return ONLY a JSON array:
[
  {{
    "question": "<question text>",
    "category": "<Technical|Behavioural|System Design|Situational>"
  }}
]
"""


async def generate_interview_questions(role: str) -> list[dict[str, Any]]:
    if settings.OPENAI_API_KEY:
        try:
            prompt = INTERVIEW_GEN_PROMPT.format(role=role)
            raw = await _call_llm(prompt)
            return _parse_json_response(raw)
        except Exception as e:
            logger.error(f"Interview gen LLM error: {e} — falling back to heuristic.")

    return _heuristic_interview_questions(role)


# ═══════════════════════════════════════════════════════════════════════════════
# 7. INTERVIEW ANSWER EVALUATION
# ═══════════════════════════════════════════════════════════════════════════════

EVALUATE_PROMPT = """
You are an expert technical interviewer evaluating a candidate's answer.

Return ONLY a JSON object:
{{
  "score": <float 0.0-10.0>,
  "feedback": "<2-3 sentence overall assessment>",
  "improvement": "<1-2 specific, actionable suggestions>"
}}

QUESTION: {question}
CANDIDATE ANSWER: {answer}
"""


async def evaluate_answer(question: str, answer: str) -> dict[str, Any]:
    if settings.OPENAI_API_KEY:
        try:
            prompt = EVALUATE_PROMPT.format(question=question, answer=answer)
            raw = await _call_llm(prompt)
            return _parse_json_response(raw)
        except Exception as e:
            logger.error(f"Answer evaluation LLM error: {e} — falling back to heuristic.")

    return _heuristic_evaluate(answer)


# ═══════════════════════════════════════════════════════════════════════════════
# HEURISTIC FALLBACKS  (no API key needed)
# ═══════════════════════════════════════════════════════════════════════════════

_TECH_KEYWORDS = [
    "python","javascript","typescript","react","vue","angular","node","express",
    "fastapi","django","flask","sql","postgresql","mysql","mongodb","redis",
    "docker","kubernetes","aws","gcp","azure","terraform","git","linux",
    "machine learning","tensorflow","pytorch","langchain","openai","rest","graphql",
    "html","css","tailwind","java","golang","rust","c++","ci/cd","testing",
]

_STOP = {
    "the","a","an","and","or","but","in","on","at","to","for","of","with",
    "is","are","be","will","we","you","our","their","this","that","have",
    "from","by","as","it","not","can","should","must","also","work","team",
    "role","looking","required","preferred","years","experience","strong",
}

def _norm(s: str) -> str:
    return s.lower().replace("/", " ").replace("-", " ").strip()

def _extract_tech(text: str) -> list[str]:
    lower = _norm(text)
    return [k for k in _TECH_KEYWORDS if k in lower]


def _heuristic_resume_analysis(text: str) -> dict:
    skills = _extract_tech(text)
    import re as _re
    has_metrics = bool(_re.search(r'\d+\s*%|\$[\d,]+|\d+[km]\b', text, _re.I))
    has_summary = bool(_re.search(r'summary|objective|profile', text, _re.I))
    sections = sum(bool(_re.search(p, text, _re.I)) for p in
                   [r'experience', r'education', r'skills', r'projects'])
    score = min(100, 40 + len(skills) * 3 + (15 if has_metrics else 0) +
                (10 if has_summary else 0) + sections * 5)
    missing = [k for k in _TECH_KEYWORDS if k not in [_norm(s) for s in skills]][:5]
    suggestions = []
    if not has_metrics:
        suggestions.append("Quantify achievements with numbers (%, time saved, users impacted).")
    if not has_summary:
        suggestions.append("Add a 2-3 line professional summary at the top.")
    if sections < 3:
        suggestions.append("Ensure you have clear sections: Experience, Education, Skills, Projects.")
    suggestions.append("Tailor keywords to each job description before applying.")
    return {
        "ats_score": float(score),
        "strengths": [s.title() for s in skills[:6]],
        "weaknesses": [m.title() for m in missing],
        "suggestions": suggestions,
        "extracted_skills": [s.title() for s in skills],
    }


def _heuristic_ats_check(resume: str, jd: str) -> dict:
    resume_words = set(_norm(resume).split()) - _STOP
    jd_words = [w for w in _norm(jd).split() if len(w) > 3 and w not in _STOP]
    matched = list({w for w in jd_words if w in resume_words})
    missing = list({w for w in jd_words if w not in resume_words})
    total = len(set(jd_words)) or 1
    pct = round(len(matched) / total * 100, 1)
    return {
        "match_percentage": min(98.0, max(10.0, pct)),
        "matched_skills": [m.title() for m in matched[:8]],
        "missing_skills": [m.title() for m in missing[:6]],
    }


_ROLE_SKILLS: dict[str, dict] = {
    "full stack developer": {
        "required": ["React","Node.js","SQL","REST APIs","Git","HTML/CSS"],
        "missing": ["Docker","AWS","System Design","TypeScript","GraphQL","Testing"],
    },
    "frontend developer": {
        "required": ["React","JavaScript","CSS","HTML","Git"],
        "missing": ["TypeScript","Next.js","Testing","Performance Optimisation","Accessibility"],
    },
    "backend engineer": {
        "required": ["Node.js","Python","SQL","REST APIs","Authentication"],
        "missing": ["Docker","PostgreSQL","Redis","Kubernetes","System Design"],
    },
    "data scientist": {
        "required": ["Python","SQL","Pandas","Statistics","Machine Learning"],
        "missing": ["TensorFlow","PyTorch","MLOps","Spark","Data Visualisation"],
    },
    "ai/ml engineer": {
        "required": ["Python","Machine Learning","TensorFlow","Statistics"],
        "missing": ["LangChain","Vector Databases","MLOps","Distributed Training","LLM Fine-tuning"],
    },
    "devops engineer": {
        "required": ["Linux","Docker","CI/CD","Git","Bash"],
        "missing": ["Kubernetes","Terraform","AWS","Monitoring","Security"],
    },
    "mobile developer": {
        "required": ["React Native","JavaScript","REST APIs","Git"],
        "missing": ["TypeScript","Firebase","App Store Deployment","Testing","Performance"],
    },
}

_ROADMAP_TEMPLATES: dict[str, list[dict]] = {
    "devops engineer": [
        {"week":"Week 1","title":"Containers with Docker","description":"Master containerisation fundamentals.","topics":["Docker images","Containers","docker-compose","Volumes","Networking"],"difficulty":"Beginner","progress":0},
        {"week":"Week 2","title":"Container Orchestration","description":"Scale containers with Kubernetes.","topics":["Pods","Deployments","Services","Ingress","Helm charts"],"difficulty":"Intermediate","progress":0},
        {"week":"Week 3","title":"Cloud Infrastructure","description":"Provision and manage AWS resources.","topics":["EC2","S3","IAM","VPC","CloudWatch"],"difficulty":"Intermediate","progress":0},
        {"week":"Week 4","title":"Infrastructure as Code","description":"Automate everything with Terraform.","topics":["Terraform basics","State management","Modules","CI/CD pipelines","Monitoring"],"difficulty":"Advanced","progress":0},
    ],
    "default": [
        {"week":"Week 1","title":"Core Foundations","description":"Build the essential base for this role.","topics":["Key concepts","Core tooling","Best practices","First project"],"difficulty":"Beginner","progress":0},
        {"week":"Week 2","title":"Intermediate Skills","description":"Go deeper with specialised knowledge.","topics":["Advanced patterns","Testing","Performance","Security basics"],"difficulty":"Intermediate","progress":0},
        {"week":"Week 3","title":"Real-World Projects","description":"Apply skills by building production-quality work.","topics":["End-to-end project","Code review","Documentation","Deployment"],"difficulty":"Intermediate","progress":0},
        {"week":"Week 4","title":"Job-Ready Polish","description":"Prepare to pass interviews and land the role.","topics":["System design","Portfolio","Mock interviews","Resume alignment"],"difficulty":"Advanced","progress":0},
    ],
}


def _heuristic_skill_gap(role: str, current_skills: list[str]) -> dict:
    role_key = next((k for k in _ROLE_SKILLS if k in role.lower()), "full stack developer")
    data = _ROLE_SKILLS[role_key]
    norm_current = [_norm(s) for s in current_skills]
    present = [s for s in data["required"] if _norm(s) in norm_current]
    missing = [s for s in data["missing"] if _norm(s) not in norm_current]
    roadmap_key = next((k for k in _ROADMAP_TEMPLATES if k in role.lower()), "default")
    return {
        "role": role,
        "current_skills": present or data["required"][:3],
        "missing_skills": missing,
        "roadmap": _ROADMAP_TEMPLATES[roadmap_key],
    }


def _heuristic_roadmap(role: str, current_skills: list[str]) -> dict:
    roadmap_key = next((k for k in _ROADMAP_TEMPLATES if k in role.lower()), "default")
    return {
        "target_role": role,
        "steps": _ROADMAP_TEMPLATES[roadmap_key],
    }


_JOB_CATALOGUE = [
    {"role":"Full Stack Developer","company":"Nimbus Labs","match":0,"skills":["React","Node.js","SQL","Docker"],"salary_range":"$110k – $135k","location":"Remote","experience":"2-4 yrs"},
    {"role":"Frontend Developer","company":"Lumen Health","match":0,"skills":["React","TypeScript","CSS","Testing"],"salary_range":"$95k – $120k","location":"Hybrid","experience":"1-3 yrs"},
    {"role":"Backend Engineer","company":"Datasphere","match":0,"skills":["Python","PostgreSQL","Docker","Redis"],"salary_range":"$105k – $130k","location":"Remote","experience":"2-4 yrs"},
    {"role":"DevOps Engineer","company":"Scalepath","match":0,"skills":["Docker","Kubernetes","AWS","Terraform"],"salary_range":"$115k – $140k","location":"Remote","experience":"2-5 yrs"},
    {"role":"Data Scientist","company":"Analytix","match":0,"skills":["Python","Machine Learning","SQL","TensorFlow"],"salary_range":"$100k – $130k","location":"Hybrid","experience":"1-3 yrs"},
    {"role":"AI/ML Engineer","company":"Cortex AI","match":0,"skills":["Python","LangChain","PyTorch","MLOps"],"salary_range":"$130k – $165k","location":"Remote","experience":"2-5 yrs"},
]

def _heuristic_job_recommend(skills: list[str]) -> list[dict]:
    norm_skills = {_norm(s) for s in skills}
    results = []
    for job in _JOB_CATALOGUE:
        job_skills = {_norm(s) for s in job["skills"]}
        matched = norm_skills & job_skills
        score = round(len(matched) / len(job_skills) * 100) if job_skills else 50
        results.append({**job, "match": min(99, max(20, score))})
    return sorted(results, key=lambda j: j["match"], reverse=True)


_QUESTION_BANK: dict[str, list[dict]] = {
    "devops engineer": [
        {"question":"Explain the difference between Docker and a VM. When would you choose one over the other?","category":"Technical"},
        {"question":"Walk me through how you'd set up a CI/CD pipeline from scratch.","category":"Technical"},
        {"question":"Describe a production incident you resolved. What was your process?","category":"Behavioural"},
        {"question":"How would you design a zero-downtime deployment strategy for a stateful application?","category":"System Design"},
        {"question":"A service is consuming 95% CPU in production. Walk me through your investigation.","category":"Situational"},
    ],
    "default": [
        {"question":"Tell me about a project you're most proud of. What was your specific contribution?","category":"Behavioural"},
        {"question":"Explain your approach to debugging a hard-to-reproduce production bug.","category":"Technical"},
        {"question":"How would you design a scalable URL shortening service?","category":"System Design"},
        {"question":"Describe a time you disagreed with a technical decision. How did you handle it?","category":"Behavioural"},
        {"question":"How do you ensure code quality and maintainability in a fast-moving team?","category":"Technical"},
    ],
}

def _heuristic_interview_questions(role: str) -> list[dict]:
    key = next((k for k in _QUESTION_BANK if k in role.lower()), "default")
    return _QUESTION_BANK[key]


_EVAL_SIGNALS = [
    (r'\b(built|shipped|implemented|led|designed|improved|reduced|increased)\b', 1.5),
    (r'\b\d+\s*%|\$[\d,]+|\d+[km]\b', 1.5),
    (r'\b(because|since|so that|in order to)\b', 0.8),
    (r'\b(result|outcome|impact|learned|takeaway)\b', 0.8),
    (r'\b(challenge|problem|issue|bug)\b', 0.5),
]

def _heuristic_evaluate(answer: str) -> dict:
    import re as _re
    word_count = len(answer.split())
    score = 4.0
    if word_count >= 100: score += 2.0
    elif word_count >= 60: score += 1.0
    for pattern, weight in _EVAL_SIGNALS:
        if _re.search(pattern, answer, _re.I):
            score += weight
    score = round(min(10.0, max(1.0, score)), 1)
    feedback = (
        "Good answer with clear structure." if score >= 7
        else "Answer covers the basics but needs more depth."
    )
    improvement = (
        "Add specific metrics to quantify your impact."
        if not _re.search(r'\d', answer)
        else "Try the STAR format: Situation, Task, Action, Result."
    )
    return {"score": score, "feedback": feedback, "improvement": improvement}
