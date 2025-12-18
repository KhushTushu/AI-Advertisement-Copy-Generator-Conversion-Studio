
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import AdCard from './components/AdCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import { AdCopy, GenerationConfig } from './types';
import { generateAds } from './services/geminiService';

const MarketingLogosOverlay = () => {
  // SVG icons for Meta, Google, LinkedIn, X, TikTok
  const logos = [
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />, // FB
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />, // Google G
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />, // LinkedIn
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.034l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />, // X
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-20 p-10 rotate-12 scale-125">
        {Array.from({ length: 48 }).map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" className="w-12 h-12 fill-white" xmlns="http://www.w3.org/2000/svg">
            {logos[i % logos.length]}
          </svg>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [ads, setAds] = useState<AdCopy[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (config: GenerationConfig) => {
    setLoading(true);
    setError(null);
    try {
      const results = await generateAds(config);
      setAds(results);
    } catch (err: any) {
      console.error(err);
      setError('Failed to generate ad copy. Please check your API key and network connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative bg-[#0a0b10] text-white selection:bg-teal-500/30">
      {/* Artistic Blobs Background Layer */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="bg-blob bg-teal-500/20 w-[600px] h-[600px] -top-20 -left-20 animate-float" />
        <div className="bg-blob bg-purple-600/15 w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'float 25s infinite reverse' }} />
        <div className="bg-blob bg-rose-500/10 w-[700px] h-[700px] -bottom-40 -right-20 animate-float" style={{ animationDuration: '15s' }} />
      </div>

      <MarketingLogosOverlay />

      <div className="relative z-10">
        <Header />
        
        <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
          <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Controls */}
            <section className="space-y-8">
              <div className="space-y-3">
                <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                  <span className="block text-white">Power Your</span>
                  <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent">Conversion.</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                  The studio where data meets creativity. Generate persuasive ad copies engineered for performance.
                </p>
              </div>
              
              <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <InputForm onGenerate={handleGenerate} isLoading={loading} />
              </div>
              
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-400 text-sm animate-pulse">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}
            </section>

            {/* Right Column: Results */}
            <section className="min-h-[600px]">
              {loading ? (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-teal-400">Strategizing Variations</h3>
                    <div className="h-px flex-1 bg-white/10"></div>
                  </div>
                  <LoadingSkeleton />
                </div>
              ) : ads.length > 0 ? (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-teal-400">Generated Ad Sets</h3>
                      <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    <button 
                      onClick={() => setAds([])}
                      className="ml-4 text-[10px] font-bold uppercase text-gray-500 hover:text-white transition-colors"
                    >
                      Clear Results
                    </button>
                  </div>
                  
                  <div className="grid gap-6">
                    {ads.map((ad, idx) => (
                      <AdCard key={ad.id} ad={ad} index={idx} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 border border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-3xl p-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-teal-500/20 blur-2xl rounded-full" />
                    <div className="relative w-24 h-24 bg-gradient-to-tr from-white/5 to-white/10 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-gray-200">Creative Engine Idle</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      Fill in the marketing brief on the left to activate the generation engine. Your high-converting copy is seconds away.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>

        <footer className="py-12 px-6 border-t border-white/5 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">© 2024 Conversion Studio.</span>
              <div className="flex gap-2">
                {['Meta', 'Google', 'LinkedIn'].map(p => (
                  <span key={p} className="text-[10px] px-1.5 py-0.5 border border-white/10 rounded text-gray-600 font-medium">{p}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">API Docs</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
