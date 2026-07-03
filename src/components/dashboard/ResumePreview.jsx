export default function ResumePreview({ data, template = "modern" }) {
  const {
    personal = {}, summary = "",
    education = [], experience = [], projects = [],
    skills = {}, certifications = [], achievements = [],
    languages = [], interests = [], references = [],
  } = data || {};

  const skillEntries = Object.entries(skills).filter(([, v]) => Array.isArray(v) && v.length > 0);

  const templateStyles = {
    modern: {
      container: "",
      headerBorder: "border-b-2 border-primary-100",
      sectionBorder: "border-b border-primary-50",
      sectionTitle: "text-[10px] font-bold uppercase tracking-[0.22em] text-primary-600",
      nameClass: "font-heading text-2xl text-ink",
      roleClass: "text-primary-600 font-medium text-sm",
    },
    classic: {
      container: "",
      headerBorder: "border-b border-slate-300",
      sectionBorder: "border-b border-slate-200",
      sectionTitle: "text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700",
      nameClass: "font-heading text-2xl text-slate-900",
      roleClass: "text-slate-600 font-medium text-sm",
    },
    minimal: {
      container: "",
      headerBorder: "border-b border-gray-200",
      sectionBorder: "border-b border-gray-100",
      sectionTitle: "text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500",
      nameClass: "font-heading text-2xl text-gray-900",
      roleClass: "text-gray-600 text-sm",
    },
  };

  const t = templateStyles[template] || templateStyles.modern;

  return (
    <div
      id="resume-preview"
      className="bg-white rounded-xl text-ink mx-auto"
      style={{
        width: "100%",
        maxWidth: 640,
        minHeight: 800,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className={`p-7 ${t.container}`}>
        {/* Header */}
        <div className={`pb-5 mb-5 ${t.headerBorder}`}>
          <h1 className={t.nameClass} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            {personal.name || "Your Name"}
          </h1>
          <p className={t.roleClass}>
            {personal.role || "Your Professional Title"}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2">
            {[personal.email, personal.phone, personal.location].filter(Boolean).length > 0 ? (
              [personal.email, personal.phone, personal.location].filter(Boolean).map((item, i) => (
                <span key={i} className="text-xs text-muted">
                  {i > 0 && <span className="mr-3 text-slate-200">|</span>}
                  {item}
                </span>
              ))
            ) : (
              <span className="text-xs text-muted">email@example.com · (000) 000-0000 · City, State</span>
            )}
          </div>
          {(personal.linkedin || personal.github || personal.portfolio) && (
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
              {personal.linkedin && <span className="text-xs text-muted">linkedin.com/in/{personal.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</span>}
              {personal.github && <span className="text-xs text-muted">github.com/{personal.github.replace(/https?:\/\/(www\.)?github\.com\//, "")}</span>}
              {personal.portfolio && <span className="text-xs text-muted">{personal.portfolio}</span>}
            </div>
          )}
        </div>

        {/* Summary */}
        {summary && (
          <ResumeSection title="Professional Summary" styleClass={t.sectionBorder} titleClass={t.sectionTitle}>
            <p className="text-sm text-body leading-relaxed">{summary}</p>
          </ResumeSection>
        )}

        {/* Experience */}
        {experience.some((e) => e.company || e.role) && (
          <ResumeSection title="Experience" styleClass={t.sectionBorder} titleClass={t.sectionTitle}>
            <div className="space-y-4">
              {experience.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {e.role || "Role"}
                        {e.company && <span className="font-normal text-muted"> at {e.company}</span>}
                      </p>
                      {e.location && <p className="text-xs text-muted">{e.location}</p>}
                    </div>
                    {(e.startDate || e.endDate) && (
                      <span className="text-xs text-muted whitespace-nowrap">
                        {e.startDate}{e.startDate && e.endDate ? " – " : ""}{e.endDate || (e.current ? "Present" : "")}
                      </span>
                    )}
                  </div>
                  {e.description && (
                    <p className="text-xs text-body mt-1 leading-relaxed">{e.description}</p>
                  )}
                  {e.bulletPoints && e.bulletPoints.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {e.bulletPoints.map((bp, i) => (
                        <li key={i} className="text-xs text-body leading-relaxed flex gap-2">
                          <span className="text-primary-400 mt-1 shrink-0">•</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* Education */}
        {education.some((e) => e.school) && (
          <ResumeSection title="Education" styleClass={t.sectionBorder} titleClass={t.sectionTitle}>
            <div className="space-y-3">
              {education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <div>
                      <p className="text-sm font-semibold text-ink">{e.school}</p>
                      {e.degree && (
                        <p className="text-xs text-body">
                          {e.degree}{e.field ? ` in ${e.field}` : ""}{e.cgpa ? ` – GPA: ${e.cgpa}` : ""}
                        </p>
                      )}
                    </div>
                    {(e.startDate || e.endDate) && (
                      <span className="text-xs text-muted whitespace-nowrap">
                        {e.startDate}{e.startDate && e.endDate ? " – " : ""}{e.endDate}
                      </span>
                    )}
                  </div>
                  {e.achievements && <p className="text-xs text-body mt-1 leading-relaxed">{e.achievements}</p>}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* Projects */}
        {projects.some((p) => p.name) && (
          <ResumeSection title="Projects" styleClass={t.sectionBorder} titleClass={t.sectionTitle}>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="text-sm font-semibold text-ink">{p.name}</p>
                    <div className="flex gap-2">
                      {p.github && <span className="text-[10px] text-primary-500">GitHub</span>}
                      {p.liveDemo && <span className="text-[10px] text-primary-500">Live</span>}
                    </div>
                  </div>
                  {p.techStack && <p className="text-[11px] text-muted mt-0.5">{p.techStack}</p>}
                  {p.description && <p className="text-xs text-body mt-1 leading-relaxed">{p.description}</p>}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* Skills */}
        {skillEntries.length > 0 && (
          <ResumeSection title="Skills" styleClass={t.sectionBorder} titleClass={t.sectionTitle}>
            <div className="space-y-2">
              {skillEntries.map(([category, items]) => (
                <div key={category}>
                  <p className="text-[11px] font-semibold text-ink capitalize mb-1">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium text-primary-700"
                        style={{ background: "#EFF6FF", border: "1px solid #DBEAFE" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* Certifications */}
        {certifications.some((c) => c.name) && (
          <ResumeSection title="Certifications" styleClass={t.sectionBorder} titleClass={t.sectionTitle}>
            <div className="space-y-2">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline gap-2">
                  <div>
                    <p className="text-sm font-semibold text-ink">{c.name}</p>
                    {c.issuer && <p className="text-xs text-muted">{c.issuer}</p>}
                  </div>
                  {c.date && <span className="text-xs text-muted whitespace-nowrap">{c.date}</span>}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* Achievements */}
        {achievements.some((a) => a.title) && (
          <ResumeSection title="Achievements" styleClass={t.sectionBorder} titleClass={t.sectionTitle}>
            <div className="space-y-2">
              {achievements.map((a) => (
                <div key={a.id}>
                  <p className="text-sm font-semibold text-ink">{a.title}</p>
                  {a.description && <p className="text-xs text-body mt-0.5 leading-relaxed">{a.description}</p>}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* Languages */}
        {languages.some((l) => l.language) && (
          <ResumeSection title="Languages" styleClass={t.sectionBorder} titleClass={t.sectionTitle}>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {languages.map((l) => (
                <span key={l.id} className="text-xs text-body">
                  {l.language}{l.proficiency ? <span className="text-muted"> ({l.proficiency})</span> : ""}
                </span>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <ResumeSection title="Interests" styleClass={t.sectionBorder} titleClass={t.sectionTitle}>
            <div className="flex flex-wrap gap-1.5">
              {interests.map((i) => (
                <span key={i.id} className="text-xs text-body">{i.interest}</span>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* References */}
        {references.some((r) => r.name) && (
          <ResumeSection title="References" styleClass={t.sectionBorder} titleClass={t.sectionTitle}>
            <div className="space-y-2">
              {references.map((r) => (
                <div key={r.id}>
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                  {(r.title || r.company) && (
                    <p className="text-xs text-muted">{r.title}{r.title && r.company ? " at " : ""}{r.company}</p>
                  )}
                  {(r.email || r.phone) && (
                    <p className="text-xs text-muted">{r.email}{r.email && r.phone ? " · " : ""}{r.phone}</p>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* Empty state */}
        {!personal.name && !summary && !experience.some((e) => e.company) && !education.some((e) => e.school) && skillEntries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center mb-4">
              <FileTextIcon />
            </div>
            <p className="text-sm font-medium text-ink">Your resume preview</p>
            <p className="text-xs text-muted mt-1 max-w-[240px]">
              Start filling in your details on the left and see a live ATS-friendly preview here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResumeSection({ title, children, styleClass, titleClass }) {
  return (
    <div className={`mb-5 pb-4 ${styleClass || ""}`}>
      <h2 className={`${titleClass || "text-[10px] font-bold uppercase tracking-[0.22em] text-primary-600"} mb-2.5`}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function FileTextIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
