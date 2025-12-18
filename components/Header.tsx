
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-6 flex justify-between items-center border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-teal-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Conversion Studio</h1>
          <p className="text-xs text-teal-400 font-medium uppercase tracking-widest">Ad Copy Intelligence</p>
        </div>
      </div>
      <nav className="hidden md:flex gap-8">
        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Frameworks</a>
        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">History</a>
        <a href="#" className="text-sm font-semibold text-teal-400">Generator</a>
      </nav>
    </header>
  );
};

export default Header;
