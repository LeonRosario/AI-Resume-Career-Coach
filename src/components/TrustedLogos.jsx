import React from 'react';

export default function TrustedLogos() {
  return (
    <section className="w-full py-12 border-t border-slate-100 mt-20">
      <div className="max-w-[1600px] mx-auto px-6 text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-10 select-none">
          Trusted by students and professionals from top companies
        </p>
        
        {/* Logos container with responsive wrap and specified gap */}
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-[100px] opacity-50 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-500">
          
          {/* Google Style */}
          <div className="h-7 flex items-center" title="Google">
            <svg viewBox="0 0 24 24" className="h-full w-auto text-slate-800 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C18.155 1.185 15.449 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.89 11.57-11.79 0-.795-.085-1.4-.195-1.925H12.24Z"/>
            </svg>
          </div>

          {/* Microsoft Style */}
          <div className="h-6 flex items-center" title="Microsoft">
            <svg viewBox="0 0 23 23" className="h-full w-auto text-slate-800 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/>
            </svg>
          </div>

          {/* Amazon Style */}
          <div className="h-7 flex items-center pt-1" title="Amazon">
            <svg viewBox="0 0 24 24" className="h-full w-auto text-slate-800 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.82 2.22c-3.1 0-5.75 1.63-5.75 4.54 0 2.29 1.43 3.4 3.32 3.4 1.76 0 2.88-.86 3.43-1.88v1.54c0 1.9-.92 2.97-2.92 2.97-1.74 0-2.88-.82-3.18-2.2H5.16c.38 3.1 3.25 4.77 6.64 4.77 4.1 0 6.6-2.27 6.6-6.83V3.41c-.96.67-2.02 1.12-3.3 1.12-1.89 0-3.32-1.07-3.32-3.41v1.1zm.99 4.39c0 1.25-.66 2.05-1.74 2.05-.98 0-1.57-.75-1.57-1.97 0-1.29.62-2.12 1.67-2.12 1.01 0 1.64.83 1.64 2.04zM23.53 17.5C17.9 21.32 10.3 23 3 23c-1.12 0-2 .1-2 .1v-1.93s.92.1 1.83.1c6.54 0 13.56-1.53 18.73-5.11l1.97 1.34z"/>
            </svg>
          </div>

          {/* Meta Style */}
          <div className="h-6 flex items-center" title="Meta">
            <svg viewBox="0 0 24 24" className="h-full w-auto text-slate-800 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.48 4.48c-1.91 0-3.66.97-4.48 2.56-.82-1.59-2.57-2.56-4.48-2.56C4.54 4.48 2.08 6.57 2 9.25c-.09 3.02 2.04 5.67 4.9 6.27 1.64.35 3.32.06 4.76-.84.28-.17.56-.37.82-.59.26.22.54.42.82.59 1.44.9 3.12 1.19 4.76.84 2.86-.6 4.99-3.25 4.9-6.27-.08-2.68-2.54-4.77-5.52-4.77zm.12 9.28c-1.14.25-2.31.04-3.31-.58-.6-.37-1.15-.9-1.57-1.51v-.02c-.42.61-.97 1.14-1.57 1.51-1 .62-2.17.83-3.31.58-1.9-.4-3.3-2.15-3.24-4.14.05-1.74 1.6-3.1 3.49-3.1 1.25 0 2.4.65 2.97 1.7l.56.98.56-.98c.57-1.05 1.72-1.7 2.97-1.7 1.89 0 3.44 1.36 3.49 3.1.06 1.99-1.34 3.74-3.24 4.14z"/>
            </svg>
          </div>

          {/* Tesla Style */}
          <div className="h-6 flex items-center" title="Tesla">
            <svg viewBox="0 0 24 24" className="h-full w-auto text-slate-800 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.68c-.2 0-.39.06-.52.19L.39 12.8c-.28.28-.28.73 0 1.01l1.41 1.41c.28.28.73.28 1.01 0l6.6-6.6v12.7c0 .39.31.7.7.7h2c.39 0 .7-.31.7-.7V8.62l6.6 6.6c.28.28.73.28 1.01 0l1.41-1.41c.28-.28.28-.73 0-1.01L12.52 2.87c-.13-.13-.32-.19-.52-.19z"/>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
