
import React from 'react';
import { AdPlatform, AdTone, GenerationConfig } from '../types';

interface InputFormProps {
  onGenerate: (config: GenerationConfig) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [form, setForm] = React.useState<GenerationConfig>({
    productName: '',
    targetAudience: '',
    tone: AdTone.PROFESSIONAL,
    platform: AdPlatform.FACEBOOK,
    benefits: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.productName && form.targetAudience) {
      onGenerate(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl sticky top-28">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Product / Service Name</label>
          <input
            required
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
            placeholder="e.g. Conversio SaaS"
            value={form.productName}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Target Audience</label>
          <input
            required
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
            placeholder="e.g. Early-stage Founders"
            value={form.targetAudience}
            onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Platform</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all appearance-none cursor-pointer"
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value as AdPlatform })}
            >
              {Object.values(AdPlatform).map((p) => (
                <option key={p} value={p} className="bg-[#1a1c2c]">{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tone</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all appearance-none cursor-pointer"
              value={form.tone}
              onChange={(e) => setForm({ ...form, tone: e.target.value as AdTone })}
            >
              {Object.values(AdTone).map((t) => (
                <option key={t} value={t} className="bg-[#1a1c2c]">{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Key Benefits / Features</label>
          <textarea
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none"
            placeholder="e.g. 10x faster deployment, zero-config, team collaboration"
            value={form.benefits}
            onChange={(e) => setForm({ ...form, benefits: e.target.value })}
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full group relative overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Optimizing Copy...
            </>
          ) : (
            <>
              Generate Conversion Ads
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </span>
      </button>
    </form>
  );
};

export default InputForm;
