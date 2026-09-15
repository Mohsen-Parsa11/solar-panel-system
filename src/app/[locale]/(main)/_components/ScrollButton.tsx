import { ArrowDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { isRTL } from '@/utils/Helpers';

export default function ScrollButton() {
  const locale = useLocale();
  const isRtl = isRTL(locale);

  return (
    <button
      className={`group absolute bottom-8 z-20 hidden h-14 w-7 flex-col items-center justify-center rounded-full border-[1.5px] border-white/50 text-white transition-all duration-300 hover:border-white hover:bg-white/10 md:bottom-12 md:flex ${
        isRtl
          ? 'left-6 md:left-12'
          : 'right-6 md:right-12'
      }`}
      aria-label="Scroll to bottom"
    >
      <div className="flex h-full flex-col items-center justify-start pt-2">
        <div className="mb-1 h-1 w-1 rounded-full bg-white" />
        <ArrowDown
          className="animate-bounce-down h-3.5 w-3.5 text-white"
          strokeWidth={2.5}
        />
      </div>
    </button>
  );
}
