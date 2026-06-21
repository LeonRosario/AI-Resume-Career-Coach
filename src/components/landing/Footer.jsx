import { Link } from 'react-router-dom';
import { Globe, Share2, Code2, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Resume Analyzer', href: '#features' },
    { label: 'Job Matching', href: '#features' },
    { label: 'Interview Coach', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

const socials = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: Share2, href: '#', label: 'Share' },
  { icon: Code2, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/40 bg-white/20 backdrop-blur-[30px]">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="font-fustat text-2xl font-extrabold text-[#0084FF]">
              Career<span className="text-[#60B1FF]">AI</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              Your personal AI career coach. Upload your resume, get insights, and land your dream job faster.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/35 text-slate-500 backdrop-blur-[30px] transition-all hover:bg-white/50 hover:text-[#0084FF]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-fustat mb-4 text-sm font-bold text-slate-800">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-[#0084FF]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/30 pt-8 md:flex-row">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} CareerAI. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built with AI for job seekers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
