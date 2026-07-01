import { AtSign, Globe, Code, Sparkles } from "lucide-react";
import Logo from "../ui/Logo";

const columns = [
  {
    title: "Product",
    links: ["Resume Analyzer", "ATS Checker", "Skill Gap", "Interview Prep", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Resume Templates", "Career Guides", "API Docs"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

const socials = [
  { icon: AtSign, label: "Email / X" },
  { icon: Globe,  label: "Website" },
  { icon: Code,   label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative bg-white px-6 pt-16 pb-10 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              Your AI career coach — analyze your resume, close skill gaps, and land
              interviews with confidence.
            </p>
            {/* Social links */}
            <div className="flex gap-2 mt-5">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-muted hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-body font-semibold text-xs text-ink uppercase tracking-[0.1em] mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted hover:text-primary-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">© 2026 CareerAI. All rights reserved.</p>
          <p className="text-xs text-muted flex items-center gap-1.5">
            <Sparkles size={11} className="text-primary-400" />
            Built with care, for your next role.
          </p>
        </div>
      </div>
    </footer>
  );
}
