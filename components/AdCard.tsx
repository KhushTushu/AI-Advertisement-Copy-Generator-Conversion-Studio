
import React, { useState } from 'react';
import { AdCopy } from '../types';

interface AdCardProps {
  ad: AdCopy;
  index: number;
}

const AdCard: React.FC<AdCardProps> = ({ ad, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `Headline: ${ad.headline}\n\nBody: ${ad.primaryText}\n\nCTA: ${ad.callToAction}`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderHighlightedText = () => {
    if (!ad.persuasivePhrase) return ad.primaryText;
    
    const parts = ad.primaryText.split(ad.persuasivePhrase);
    if (parts.length === 1) return ad.primaryText;

    return (
      <>
        {parts[0]}
        <span className="text-teal-400 font-bold underline decoration-teal-500/40 decoration-2 underline-offset-4 bg-teal-500/10 px-1 rounded transition-all duration-300">
          {ad.persuasivePhrase}
        </span>
        {parts.slice(1).join(ad.persuasivePhrase)}
      </>
    );
  };

  return (
    <div 
      className="group relative bg-[#13141f]/80 backdrop-blur-md border border-white/10 rounded-3xl p-7 hover:bg-[#1a1c2c] hover:border-teal-500/40 transition-all duration-500 animate-fade-in-up shadow-xl overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Glossy overlay effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-500 px-3 py-1 bg-teal-500/10 rounded-full border border-teal-500/20">
            {ad.platform}
          </span>
        </div>
        <button 
          onClick={handleCopy}
          className={`relative p-2.5 rounded-xl transition-all duration-300 ${copied ? 'bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.5)]' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
        >
          {copied ? (
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          )}
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">High-Intent Headline</h3>
          <p className="text-2xl font-bold text-white leading-[1.15] tracking-tight group-hover:text-teal-400 transition-colors duration-300">
            {ad.headline}
          </p>
        </div>

        <div>
          <h3 className="text-teal-400/60 text-[10px] font-bold uppercase tracking-widest mb-2">Conversion Copy</h3>
          <p className="text-gray-300 leading-relaxed text-[15px] font-medium">
            {renderHighlightedText()}
          </p>
        </div>

        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="relative group/btn">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-xl blur opacity-30 group-hover/btn:opacity-60 transition duration-500" />
            <div className="relative bg-gradient-to-r from-teal-500 to-indigo-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg cursor-default">
              {ad.callToAction}
            </div>
          </div>
          <div className="text-[10px] text-gray-500 font-mono tracking-tighter">
            STUDIO_VAR_{index + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
