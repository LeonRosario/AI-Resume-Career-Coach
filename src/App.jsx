import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedLogos from './components/TrustedLogos';

function App() {
  return (
    <div className="relative min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-8 flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          <Hero />
        </main>
      </div>
      <TrustedLogos />
    </div>
  );
}

export default App;
