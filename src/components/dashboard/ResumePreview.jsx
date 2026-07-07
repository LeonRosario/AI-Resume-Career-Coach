export default function ResumePreview({ data, template = "modern" }) {
  const {
    personal = {}, summary = "",
    education = [], experience = [], projects = [],
    skills = {}, certifications = [], achievements = [],
    languages = [], interests = [], references = [],
  } = data || {};

  const skillEntries = Object.entries(skills).filter(([, v]) => Array.isArray(v) && v.length > 0);

  const t = {
    modern: {
      container: "",
      headerBorder: "border-b-2 border-primary-100",
      sectionBorder: "border-b border-primary-50",
      sectionTitle: "text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600",
      nameClass: "font-heading text-[26px] text-ink leading-tight tracking-tight",
      roleClass: "text-primary-600 font-semibold text-sm mt-1",
      divider: "bg-primary-100",
    },
    classic: {
      container: "",
      headerBorder: "border-b border-slate-300",
      sectionBorder: "border-b border-slate-200",
      sectionTitle: "text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700",
      nameClass: "font-heading text-[24px] text-slate-900 leading-tight",
      roleClass: "text-slate-600 font-semibold text-sm mt-1",
      divider: "bg-slate-200",
    },
    minimal: {
      container: "",
      headerBorder: "border-b border-gray-200",
      sectionBorder: "border-b border-gray-100",
      sectionTitle: "text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500",
      nameClass: "font-heading text-[24px] text-gray-900 leading-tight",
      roleClass: "text-gray-600 text-sm mt-1",
      divider: "bg-gray-200",
    },
  };

  if (template === "ats") {
    return <AtsResume data={data} />;
  }

  const s = t[template] || t.modern;

  return (
    <div
      id="resume-preview"
      className="bg-white text-ink mx-auto"
      style={{
        width: "100%",
        maxWidth: 640,
        minHeight: 800,
        fontFamily: "'Inter', ui-sans-serif, sans-serif",
      }}
    >
      <div className={`p-8 ${s.container}`}>
        {/* ── Header ── */}
        <div className={`pb-5 mb-5 ${s.headerBorder}`}>
          <h1 className={s.nameClass} style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            {personal.name || "Your Name"}
          </h1>
          <p className={s.roleClass}>
            {personal.role || "Your Professional Title"}
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2">
            {(() => {
              const items = [personal.email, personal.phone, personal.location].filter(Boolean);
              return items.length > 0 ? items.map((item, i) => (
                <span key={i} className="text-xs text-muted/80">
                  {i > 0 && <span className="mr-3 text-slate-200">|</span>}
                  {item}
                </span>
              )) : (
                <span className="text-xs text-muted/50">email@example.com · (000) 000-0000 · City, State</span>
              );
            })()}
          </div>
          {(personal.linkedin || personal.github || personal.portfolio) && (
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
              {personal.linkedin && <span className="text-[11px] text-muted/70">{personal.linkedin.replace(/https?:\/\/(www\.)?/, "")}</span>}
              {personal.github && <span className="text-[11px] text-muted/70">{personal.github.replace(/https?:\/\/(www\.)?/, "")}</span>}
              {personal.portfolio && <span className="text-[11px] text-muted/70">portfolio: {personal.portfolio.replace(/https?:\/\/(www\.)?/, "")}</span>}
            </div>
          )}
        </div>

        {/* ── Summary ── */}
        {summary && (
          <Section title="Professional Summary" styleClass={s.sectionBorder} titleClass={s.sectionTitle}>
            <p className="text-[12.5px] text-body leading-[1.8]">{summary}</p>
          </Section>
        )}

        {/* ── Experience ── */}
        {experience.some((e) => e.company || e.role) && (
          <Section title="Experience" styleClass={s.sectionBorder} titleClass={s.sectionTitle}>
            <div className="space-y-4">
              {experience.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <div>
                      <p className="text-[13px] font-semibold text-ink">
                        {e.role || "Role"}
                        {e.company && <span className="font-medium text-muted/80"> — {e.company}</span>}
                      </p>
                      {e.location && <p className="text-[11px] text-muted/70 mt-0.5">{e.location}</p>}
                    </div>
                    {(e.startDate || e.endDate) && (
                      <span className="text-[11px] text-muted/60 whitespace-nowrap shrink-0">
                        {e.startDate}{e.startDate && e.endDate ? " – " : ""}{e.endDate || (e.current ? "Present" : "")}
                      </span>
                    )}
                  </div>
                  {e.description && (
                    <p className="text-[12px] text-body/90 mt-1.5 leading-[1.7]">{e.description}</p>
                  )}
                  {e.bulletPoints && e.bulletPoints.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {e.bulletPoints.map((bp, i) => (
                        <li key={i} className="text-[12px] text-body/90 leading-[1.7] flex gap-2.5">
                          <span className="text-primary-400 mt-[5px] shrink-0">•</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Education ── */}
        {education.some((e) => e.school) && (
          <Section title="Education" styleClass={s.sectionBorder} titleClass={s.sectionTitle}>
            <div className="space-y-3">
              {education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <div>
                      <p className="text-[13px] font-semibold text-ink">{e.school}</p>
                      {e.degree && (
                        <p className="text-[12px] text-body/90 mt-0.5">
                          {e.degree}{e.field ? `, ${e.field}` : ""}{e.cgpa ? ` — GPA: ${e.cgpa}` : ""}
                        </p>
                      )}
                    </div>
                    {(e.startDate || e.endDate) && (
                      <span className="text-[11px] text-muted/60 whitespace-nowrap shrink-0">
                        {e.startDate}{e.startDate && e.endDate ? " – " : ""}{e.endDate}
                      </span>
                    )}
                  </div>
                  {e.achievements && <p className="text-[12px] text-body/80 mt-1.5 leading-[1.7]">{e.achievements}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Projects ── */}
        {projects.some((p) => p.name) && (
          <Section title="Projects" styleClass={s.sectionBorder} titleClass={s.sectionTitle}>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="text-[13px] font-semibold text-ink">{p.name}</p>
                    {(p.github || p.liveDemo) && (
                      <div className="flex gap-2.5">
                        {p.github && <span className="text-[10px] text-primary-500 font-medium">GitHub</span>}
                        {p.liveDemo && <span className="text-[10px] text-primary-500 font-medium">Live</span>}
                      </div>
                    )}
                  </div>
                  {p.techStack && <p className="text-[11px] text-muted/70 mt-0.5 font-medium">{p.techStack}</p>}
                  {p.description && <p className="text-[12px] text-body/90 mt-1 leading-[1.7]">{p.description}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Skills ── */}
        {skillEntries.length > 0 && (
          <Section title="Skills" styleClass={s.sectionBorder} titleClass={s.sectionTitle}>
            <div className="space-y-2.5">
              {skillEntries.map(([category, items]) => (
                <div key={category}>
                  <p className="text-[10.5px] font-semibold text-ink/80 uppercase tracking-wider mb-1">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium text-primary-700 bg-primary-50 border border-primary-100/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Certifications ── */}
        {certifications.some((c) => c.name) && (
          <Section title="Certifications" styleClass={s.sectionBorder} titleClass={s.sectionTitle}>
            <div className="space-y-2">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline gap-2">
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{c.name}</p>
                    {c.issuer && <p className="text-[11px] text-muted/70">{c.issuer}</p>}
                  </div>
                  {c.date && <span className="text-[11px] text-muted/60 whitespace-nowrap shrink-0">{c.date}</span>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Achievements ── */}
        {achievements.some((a) => a.title) && (
          <Section title="Achievements" styleClass={s.sectionBorder} titleClass={s.sectionTitle}>
            <div className="space-y-2">
              {achievements.map((a) => (
                <div key={a.id}>
                  <p className="text-[13px] font-semibold text-ink">{a.title}</p>
                  {a.description && <p className="text-[12px] text-body/80 mt-0.5 leading-[1.7]">{a.description}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Languages ── */}
        {languages.some((l) => l.language) && (
          <Section title="Languages" styleClass={s.sectionBorder} titleClass={s.sectionTitle}>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {languages.map((l) => (
                <span key={l.id} className="text-[12px] text-body/90">
                  {l.language}{l.proficiency ? <span className="text-muted/60"> ({l.proficiency})</span> : ""}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* ── Interests ── */}
        {interests.length > 0 && (
          <Section title="Interests" styleClass={s.sectionBorder} titleClass={s.sectionTitle}>
            <div className="flex flex-wrap gap-1.5">
              {interests.map((i) => (
                <span key={i.id} className="text-[12px] text-body/80">{i.interest}</span>
              ))}
            </div>
          </Section>
        )}

        {/* ── References ── */}
        {references.some((r) => r.name) && (
          <Section title="References" styleClass={s.sectionBorder} titleClass={s.sectionTitle}>
            <div className="space-y-2">
              {references.map((r) => (
                <div key={r.id}>
                  <p className="text-[13px] font-semibold text-ink">{r.name}</p>
                  {(r.title || r.company) && (
                    <p className="text-[11px] text-muted/70">{r.title}{r.title && r.company ? " · " : ""}{r.company}</p>
                  )}
                  {(r.email || r.phone) && (
                    <p className="text-[11px] text-muted/60">{r.email}{r.email && r.phone ? " · " : ""}{r.phone}</p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Empty State ── */}
        {!personal.name && !summary && !experience.some((e) => e.company) && !education.some((e) => e.school) && skillEntries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary-50 border border-primary-100/60 flex items-center justify-center mb-5">
              <FileIcon />
            </div>
            <p className="text-base font-heading text-ink">Your resume preview</p>
            <p className="text-sm text-muted/70 mt-1.5 max-w-[260px] leading-relaxed">
              Start filling in your details to see a live ATS-friendly preview here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AtsResume({ data }) {
  const {
    personal = {}, summary = "",
    education = [], experience = [], projects = [],
    skills = {}, certifications = [], achievements = [],
    languages = [], interests = [], references = [],
  } = data || {};

  const skillEntries = Object.entries(skills).filter(([, v]) => Array.isArray(v) && v.length > 0);

  const bodyStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "11pt", lineHeight: 1.3, color: "#000" };
  const nameStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "24pt", fontWeight: 700, textAlign: "center", color: "#000", margin: 0, lineHeight: 1.15 };
  const roleStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "12pt", textAlign: "center", color: "#000", margin: "3px 0 0 0", lineHeight: 1.2 };
  const contactStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "10pt", textAlign: "center", color: "#000", margin: "4px 0 0 0", lineHeight: 1.3 };
  const sectionTitleStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "13pt", fontWeight: 700, letterSpacing: "0.03em", color: "#000", margin: 0, padding: 0 };
  const hrStyle = { border: "none", borderTop: "1px solid #000", margin: "10px 0 5px 0" };
  const entryTitleStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "11pt", fontWeight: 700, color: "#000", margin: 0, lineHeight: 1.3 };
  const entrySubStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "10.5pt", color: "#000", margin: "1px 0 0 0", lineHeight: 1.3 };
  const dateStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "10.5pt", color: "#000", whiteSpace: "nowrap" };
  const bulletStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "10.5pt", color: "#000", margin: 0, lineHeight: 1.3, paddingLeft: "18px", textIndent: "-18px" };
  const techStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "10pt", color: "#000", fontStyle: "italic", margin: "2px 0 0 0", lineHeight: 1.3 };
  const skillCatStyle = { fontFamily: "'Times New Roman', Times, Georgia, serif", fontSize: "10.5pt", color: "#000", margin: "1px 0", lineHeight: 1.3 };

  const contactItems = [personal.email, personal.phone, personal.location].filter(Boolean);
  const linkItems = [];
  if (personal.linkedin) linkItems.push(personal.linkedin.replace(/https?:\/\/(www\.)?/, ""));
  if (personal.github) linkItems.push(personal.github.replace(/https?:\/\/(www\.)?/, ""));

  return (
    <div
      id="resume-preview"
      style={{
        width: "100%",
        maxWidth: 640,
        minHeight: 800,
        background: "#fff",
        margin: "0 auto",
        padding: "30px 40px",
        ...bodyStyle,
      }}
    >
      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: "2px" }}>
        <h1 style={nameStyle}>{personal.name || "Your Name"}</h1>
        {personal.role && <p style={roleStyle}>{personal.role}</p>}
        {contactItems.length > 0 && (
          <p style={contactStyle}>{contactItems.join("  |  ")}</p>
        )}
        {linkItems.length > 0 && (
          <p style={contactStyle}>{linkItems.join("  |  ")}</p>
        )}
      </div>

      {/* ── Professional Summary ── */}
      {summary && (
        <>
          <hr style={hrStyle} />
          <h2 style={{ ...sectionTitleStyle, marginTop: "5px", marginBottom: "3px" }}>PROFESSIONAL SUMMARY</h2>
          <hr style={hrStyle} />
          <p style={{ ...bodyStyle, fontSize: "10.5pt", margin: "3px 0 0 0", lineHeight: 1.4 }}>{summary}</p>
        </>
      )}

      {/* ── Work Experience ── */}
      {experience.some((e) => e.company || e.role) && (
        <>
          <hr style={{ ...hrStyle, marginTop: "8px" }} />
          <h2 style={{ ...sectionTitleStyle, marginTop: "5px", marginBottom: "3px" }}>WORK EXPERIENCE</h2>
          <hr style={hrStyle} />
          {experience.filter((e) => e.company || e.role).map((e) => (
            <div key={e.id} style={{ marginTop: "5px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={entryTitleStyle}>
                  {[e.role, e.company].filter(Boolean).join(", ")}
                </p>
                {(e.startDate || e.endDate) && (
                  <span style={dateStyle}>
                    {e.startDate}{e.startDate && e.endDate ? " – " : ""}{e.endDate || (e.current ? "Present" : "")}
                  </span>
                )}
              </div>
              {e.location && <p style={entrySubStyle}>{e.location}</p>}
              {e.bulletPoints && e.bulletPoints.length > 0 && (
                <div style={{ marginTop: "1px" }}>
                  {e.bulletPoints.map((bp, i) => (
                    <p key={i} style={bulletStyle}>{"\u2022" + " " + bp}</p>
                  ))}
                </div>
              )}
              {(!e.bulletPoints || e.bulletPoints.length === 0) && e.description && (
                <p style={{ ...bodyStyle, fontSize: "10.5pt", margin: "2px 0 0 0", lineHeight: 1.4 }}>{e.description}</p>
              )}
              {/* Extract technologies from bullet points or description */}
            </div>
          ))}
        </>
      )}

      {/* ── Projects ── */}
      {projects.some((p) => p.name) && (
        <>
          <hr style={{ ...hrStyle, marginTop: "8px" }} />
          <h2 style={{ ...sectionTitleStyle, marginTop: "5px", marginBottom: "3px" }}>PROJECTS</h2>
          <hr style={hrStyle} />
          {projects.filter((p) => p.name).map((p) => (
            <div key={p.id} style={{ marginTop: "5px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={entryTitleStyle}>{p.name}</p>
                {p.github && (
                  <span style={dateStyle}>
                    {p.github.replace(/https?:\/\/(www\.)?/, "")}
                  </span>
                )}
              </div>
              {p.techStack && <p style={techStyle}>Technologies: {p.techStack}</p>}
              {p.description && <p style={{ ...bodyStyle, fontSize: "10.5pt", margin: "2px 0 0 0", lineHeight: 1.4 }}>{p.description}</p>}
            </div>
          ))}
        </>
      )}

      {/* ── Skills ── */}
      {skillEntries.length > 0 && (
        <>
          <hr style={{ ...hrStyle, marginTop: "8px" }} />
          <h2 style={{ ...sectionTitleStyle, marginTop: "5px", marginBottom: "3px" }}>SKILLS</h2>
          <hr style={hrStyle} />
          <div style={{ marginTop: "2px" }}>
            {skillEntries.map(([category, items]) => (
              <p key={category} style={skillCatStyle}>
                <strong>{category.replace(/([A-Z])/g, " $1").trim()}:</strong>{" "}
                {items.join(", ")}
              </p>
            ))}
          </div>
        </>
      )}

      {/* ── Education ── */}
      {education.some((e) => e.school) && (
        <>
          <hr style={{ ...hrStyle, marginTop: "8px" }} />
          <h2 style={{ ...sectionTitleStyle, marginTop: "5px", marginBottom: "3px" }}>EDUCATION</h2>
          <hr style={hrStyle} />
          {education.filter((e) => e.school).map((e) => (
            <div key={e.id} style={{ marginTop: "5px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={entryTitleStyle}>{e.school}</p>
                {(e.startDate || e.endDate) && (
                  <span style={dateStyle}>
                    {e.startDate}{e.startDate && e.endDate ? " – " : ""}{e.endDate}
                  </span>
                )}
              </div>
              {e.degree && (
                <p style={entrySubStyle}>
                  {e.degree}{e.field ? `, ${e.field}` : ""}{e.cgpa ? ` — GPA: ${e.cgpa}` : ""}
                </p>
              )}
              {e.achievements && <p style={{ ...bodyStyle, fontSize: "10.5pt", margin: "2px 0 0 0", lineHeight: 1.4 }}>{e.achievements}</p>}
            </div>
          ))}
        </>
      )}

      {/* ── Certifications ── */}
      {certifications.some((c) => c.name) && (
        <>
          <hr style={{ ...hrStyle, marginTop: "8px" }} />
          <h2 style={{ ...sectionTitleStyle, marginTop: "5px", marginBottom: "3px" }}>CERTIFICATIONS</h2>
          <hr style={hrStyle} />
          {certifications.filter((c) => c.name).map((c) => (
            <div key={c.id} style={{ marginTop: "4px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div>
                <p style={entryTitleStyle}>{c.name}</p>
                {c.issuer && <p style={entrySubStyle}>{c.issuer}</p>}
              </div>
              {c.date && <span style={dateStyle}>{c.date}</span>}
            </div>
          ))}
        </>
      )}

      {/* ── Achievements ── */}
      {achievements.some((a) => a.title) && (
        <>
          <hr style={{ ...hrStyle, marginTop: "8px" }} />
          <h2 style={{ ...sectionTitleStyle, marginTop: "5px", marginBottom: "3px" }}>ACHIEVEMENTS</h2>
          <hr style={hrStyle} />
          {achievements.filter((a) => a.title).map((a) => (
            <div key={a.id} style={{ marginTop: "4px" }}>
              <p style={entryTitleStyle}>{a.title}</p>
              {a.description && <p style={{ ...bodyStyle, fontSize: "10.5pt", margin: "1px 0 0 0", lineHeight: 1.4 }}>{a.description}</p>}
            </div>
          ))}
        </>
      )}

      {/* ── Languages ── */}
      {languages.some((l) => l.language) && (
        <>
          <hr style={{ ...hrStyle, marginTop: "8px" }} />
          <h2 style={{ ...sectionTitleStyle, marginTop: "5px", marginBottom: "3px" }}>LANGUAGES</h2>
          <hr style={hrStyle} />
          <p style={skillCatStyle}>
            {languages.filter((l) => l.language).map((l) =>
              `${l.language}${l.proficiency ? ` (${l.proficiency})` : ""}`
            ).join("  |  ")}
          </p>
        </>
      )}

      {/* ── Empty state ── */}
      {!personal.name && !summary && !experience.some((e) => e.company) && !education.some((e) => e.school) && skillEntries.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#999" }}>
          <p style={{ fontSize: "14pt", margin: "0 0 8px 0" }}>Your resume preview</p>
          <p style={{ fontSize: "11pt", margin: 0 }}>Start filling in your details to see a live ATS-friendly preview here.</p>
        </div>
      )}
    </div>
  );
}

function Section({ title, children, styleClass, titleClass }) {
  return (
    <div className={`mb-5 pb-4 ${styleClass || ""}`}>
      <h2 className={`${titleClass || "text-[10px] font-bold uppercase tracking-[0.22em] text-primary-600"} mb-3`}>
        {title}
      </h2>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}
