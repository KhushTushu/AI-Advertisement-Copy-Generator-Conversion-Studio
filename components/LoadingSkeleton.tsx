
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="h-6 w-24 bg-white/10 rounded"></div>
            <div className="h-8 w-8 bg-white/10 rounded-lg"></div>
          </div>
          <div className="space-y-4">
            <div className="h-6 w-3/4 bg-white/10 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-white/10 rounded"></div>
              <div className="h-4 w-5/6 bg-white/10 rounded"></div>
              <div className="h-4 w-4/6 bg-white/10 rounded"></div>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="h-10 w-32 bg-teal-500/20 rounded-xl"></div>
              <div className="h-4 w-16 bg-white/5 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
