
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

  // Logic to highlight the persuasive phrase within the primary text
  const renderHighlightedText = () => {
    if (!ad.persuasivePhrase) return ad.primaryText;
    
    const parts = ad.primaryText.split(ad.persuasivePhrase);
    if (parts.length === 1) return ad.primaryText;

    return (
      <>
        {parts[0]}
        <span className="text-teal-400 font-bold underline decoration-teal-500/30 decoration-2 underline-offset-4 bg-teal-500/10 px-1 rounded transition-all duration-300">
          {ad.persuasivePhrase}
        </span>
        {parts.slice(1).join(ad.persuasivePhrase)}
      </>
    );
  };

  return (
    <div 
      className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-teal-500/50 transition-all duration-500 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-teal-500 px-2 py-1 bg-teal-500/10 rounded border border-teal-500/20">
          {ad.platform}
        </span>
        <button 
          onClick={handleCopy}
          className={`relative p-2 rounded-lg transition-all duration-300 ${copied ? 'bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.6)]' : 'bg-white/5 text-gray-400 hover:text-white'}`}
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
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[10px] px-2 py-1 rounded font-bold shadow-lg whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Headline</h3>
          <p className="text-xl font-bold text-white leading-tight group-hover:text-teal-400 transition-colors duration-300">
            {ad.headline}
          </p>
        </div>

        <div>
          <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1 text-teal-400/70">Persuasive Body</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            {renderHighlightedText()}
          </p>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-teal-500/20 cursor-default">
            {ad.callToAction}
          </div>
          <div className="text-[10px] text-gray-500 italic">
            Variation #{index + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
