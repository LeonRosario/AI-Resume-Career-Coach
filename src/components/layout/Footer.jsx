import { Globe, AtSign, Code } from "lucide-react";
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

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 pt-20 pb-10">
      <div className="max-w-6xl mx-auto glass rounded-glass p-10 md:p-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-ink/55 leading-relaxed max-w-xs">
              Your AI career coach — analyze your resume, close skill gaps, and land
              interviews with confidence.
            </p>
            <div className="flex gap-2 mt-5">
              {[AtSign, Globe, Code].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl glass-soft flex items-center justify-center text-ink/55 hover:text-primary-600 hover:bg-white/60 transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-semibold text-sm text-ink mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-ink/55 hover:text-primary-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/40 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink/45">© 2026 CareerAI. All rights reserved.</p>
          <p className="text-xs text-ink/45">Built with care, for your next role.</p>
        </div>
      </div>
    </footer>
  );
}
