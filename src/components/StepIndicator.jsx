import React from 'react';

export default function StepIndicator({ step }) {
  // step = 1 (Order details), step = 2 (Payment method), step = 3 (Invoice / Struk)
  return (
    <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5 select-none gap-2 border border-white/10">
      {/* Step 1 */}
      <div 
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-350 ${
          step >= 2 
            ? 'bg-emerald-500 text-white' 
            : 'bg-white text-brand'
        }`}
      >
        {step >= 2 ? (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          '1'
        )}
      </div>

      {/* Connection Line */}
      <div className={`w-4 h-0.5 transition-all duration-350 ${step >= 2 ? 'bg-emerald-500' : 'bg-white/40'}`}></div>

      {/* Step 2 */}
      <div 
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-350 ${
          step === 3 
            ? 'bg-emerald-500 text-white' 
            : step === 2 
              ? 'bg-white text-brand' 
              : 'bg-white/20 text-white/60'
        }`}
      >
        {step === 3 ? (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          '2'
        )}
      </div>
    </div>
  );
}
