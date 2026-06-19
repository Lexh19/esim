import React from 'react';
import StepIndicator from './StepIndicator';

export default function Header({ title, onBack, step }) {
  return (
    <header className="w-full bg-brand text-white pt-6 px-4 ppt-3 pb-12 ">
      <div className="pb-4 flex items-center justify-between z-10 select-none shrink-0">
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Go back"
              >
                {/* Back Arrow Icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}
            <h1 className="text-lg font-bold tracking-tight">{title}</h1>
          </div>
          
          {step !== undefined && (
            <StepIndicator step={step} />
          )}
        </div>
    </header>
  );
}
