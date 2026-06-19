import React from 'react';
import Header from './Header';

export const checkoutPrimaryBtn =
  'w-full py-4 bg-brand text-white font-bold rounded-full hover:bg-brand-dark active:scale-[0.98] transition-all duration-200 cursor-pointer text-sm';

export default function CheckoutLayout({ title, onBack, step, children, footer }) {
  return (
    <div className="flex-1 flex flex-col bg-brand min-h-0 overflow-hidden">
      <Header title={title} onBack={onBack} step={step} />

      <div className="flex-1 flex flex-col bg-white rounded-t-[40px] -mt-10 relative z-20 min-h-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto no-scrollbar min-h-0 px-6 pt-6 pb-4 overscroll-contain">
          {children}
        </div>

        {footer && (
          <div className="shrink-0 px-6 pt-2 pb-6 safe-bottom bg-white">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
