'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type SwiperNavButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
  variant?: 'light' | 'dark';
  className?: string;
};

export function SwiperNavButtons({
  onPrev,
  onNext,
  variant = 'light',
  className = '',
}: SwiperNavButtonsProps) {
  const buttonClass
    = variant === 'light'
      ? 'border border-[#EAEBEC] bg-white text-[#19191B] shadow-[0px_2px_8px_rgba(8,15,52,0.04)] hover:border-[#0071A5] hover:text-[#0071A5]'
      : 'border border-[#2A3544] bg-[#141B24] text-[#FAFAFA] hover:border-[#00AEF9] hover:text-[#00AEF9]';

  return (
    <div dir="ltr" className={`flex shrink-0 items-center  gap-2 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous slide"
        className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ${buttonClass}`}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ${buttonClass}`}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2} />
      </button>
    </div>
  );
}
