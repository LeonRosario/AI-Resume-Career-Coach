export default function ResumePreview({ data }) {
  const { personal, summary, education, experience, projects, skills } = data;

  return (
    <div
      id="resume-preview"
      className="bg-white rounded-xl p-7 text-ink mx-auto"
      style={{
        width: "100%",
        maxWidth: 640,
        minHeight: 800,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header */}
      <div className="pb-5 mb-5" style={{ borderBottom: "2px solid #EFF6FF" }}>
        <h1
          className="font-heading font-normal text-2xl text-ink"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {personal.name || "Your Name"}
        </h1>
        <p className="text-primary-600 font-medium text-sm mt-0.5">
          {personal.title || "Your Professional Title"}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2">
          {[personal.email, personal.phone, personal.location]
            .filter(Boolean)
            .map((item, i) => (
              <span key={i} className="text-xs text-muted">
                {i > 0 && <span className="mr-3 text-slate-200">|</span>}
                {item}
              </span>
            ))}
          {!personal.email && !personal.phone && !personal.location && (
            <span className="text-xs text-muted">email@example.com · (000) 000-0000 · City, State</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <ResumeSection title="Summary">
          <p className="text-sm text-body leading-relaxed">{summary}</p>
        </ResumeSection>
      )}

      {/* Experience */}
      {experience.some((e) => e.company || e.role) && (
        <ResumeSection title="Experience">
          <div className="space-y-3.5">
            {experience.map((e) => (
              <div key={e.id}>
                <div className="flex justify-between items-baseline gap-2">
                  <p className="text-sm font-semibold text-ink">
                    {e.role || "Role"}
                    {e.company && <span className="font-normal text-muted"> · {e.company}</span>}
                  </p>
                  {e.duration && <span className="text-xs text-muted whitespace-nowrap">{e.duration}</span>}
                </div>
                {e.desc && <p className="text-xs text-body mt-0.5 leading-relaxed">{e.desc}</p>}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* Projects */}
      {projects.some((p) => p.name) && (
        <ResumeSection title="Projects">
          <div className="space-y-2.5">
            {projects.map((p) => (
              <div key={p.id}>
                <p className="text-sm font-semibold text-ink">{p.name}</p>
                {p.desc && <p className="text-xs text-body mt-0.5 leading-relaxed">{p.desc}</p>}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* Education */}
      {education.some((e) => e.school) && (
        <ResumeSection title="Education">
          <div className="space-y-2">
            {education.map((e) => (
              <div key={e.id} className="flex justify-between items-baseline gap-2">
                <p className="text-sm text-ink">
                  {e.degree && <span className="font-semibold">{e.degree}</span>}
                  {e.school && <span className="text-muted"> · {e.school}</span>}
                </p>
                {e.year && <span className="text-xs text-muted whitespace-nowrap">{e.year}</span>}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* Skills */}
      {skills && (
        <ResumeSection title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.split(",").map((s) => s.trim()).filter(Boolean).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-full text-xs font-medium text-primary-700 border border-primary-100"
                style={{ background: "#EFF6FF" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </ResumeSection>
      )}
    </div>
  );
}

function ResumeSection({ title, children }) {
  return (
    <div className="mb-5">
      <h2
        className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-600 mb-2 pb-1"
        style={{ borderBottom: "1px solid #DBEAFE" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
