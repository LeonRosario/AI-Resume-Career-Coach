export default function ResumePreview({ data }) {
  const { personal, summary, education, experience, projects, skills } = data;

  return (
    <div
      id="resume-preview"
      className="bg-white rounded-2xl p-8 text-ink shadow-inner mx-auto"
      style={{ width: "100%", maxWidth: 640, minHeight: 800, fontFamily: "Inter, sans-serif" }}
    >
      <div className="border-b border-ink/10 pb-4 mb-4">
        <h1 className="font-heading font-extrabold text-2xl">{personal.name || "Your Name"}</h1>
        <p className="text-primary-600 font-medium text-sm mt-0.5">{personal.title || "Your Title"}</p>
        <p className="text-xs text-muted mt-2">
          {[personal.email, personal.phone, personal.location].filter(Boolean).join("  ·  ") ||
            "email@example.com · (000) 000-0000 · City, State"}
        </p>
      </div>

      {summary && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wide text-primary-600 mb-1.5">Summary</h2>
          <p className="text-sm text-body leading-relaxed">{summary}</p>
        </div>
      )}

      {experience.some((e) => e.company || e.role) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wide text-primary-600 mb-2">Experience</h2>
          <div className="space-y-3">
            {experience.map((e) => (
              <div key={e.id}>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-semibold">{e.role || "Role"} {e.company && `· ${e.company}`}</p>
                  <span className="text-xs text-muted">{e.duration}</span>
                </div>
                <p className="text-xs text-body mt-0.5">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.some((p) => p.name) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wide text-primary-600 mb-2">Projects</h2>
          <div className="space-y-2">
            {projects.map((p) => (
              <div key={p.id}>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-body">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.some((e) => e.school) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wide text-primary-600 mb-2">Education</h2>
          <div className="space-y-1.5">
            {education.map((e) => (
              <div key={e.id} className="flex justify-between">
                <p className="text-sm">{e.degree} {e.school && `· ${e.school}`}</p>
                <span className="text-xs text-muted">{e.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wide text-primary-600 mb-1.5">Skills</h2>
          <p className="text-sm text-body">{skills}</p>
        </div>
      )}
    </div>
  );
}
