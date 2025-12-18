
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import AdCard from './components/AdCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import { AdCopy, GenerationConfig } from './types';
import { generateAds } from './services/geminiService';

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
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2c] to-[#0d2a2a] text-white selection:bg-teal-500/30">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Controls */}
          <section className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                Power Your <br />Conversion.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Transform product features into persuasive ad copies that sell. Engineered for modern growth teams.
              </p>
            </div>
            
            <InputForm onGenerate={handleGenerate} isLoading={loading} />
            
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
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 border-2 border-dashed border-white/5 rounded-3xl p-12">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-300">Ready to convert?</h3>
                  <p className="text-gray-500 max-w-sm">Fill in your product details to generate ad variations optimized for engagement and conversion.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2024 Conversion Studio. Powered by Gemini Pro Vision & Conversion Intelligence.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-gray-500 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white">Terms of Service</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
