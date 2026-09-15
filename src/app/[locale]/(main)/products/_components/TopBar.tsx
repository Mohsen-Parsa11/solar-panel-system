'use client';

import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

export type SortOption = 'popularity' | 'name-asc';

type TopBarProps = {
  totalCount: number;
  showingCount: number;
  sort: SortOption;
  onSortChangeAction: (value: SortOption) => void;
  onMobileFilterToggleAction: () => void;
};

export default function TopBar({
  totalCount,
  showingCount,
  sort,
  onSortChangeAction,
  onMobileFilterToggleAction,
}: TopBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('product');

  const SORT_OPTIONS: { label: string; value: SortOption }[] = [
    { label: t('sortMostPopular'), value: 'popularity' },
    { label: t('sortNameAZ'), value: 'name-asc' },
  ];

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sort)?.label ?? t('sortMostPopular');

  return (
    <div className="mb-5 flex w-full items-center justify-between rounded-lg border border-[#eaeaea] bg-white p-3 px-5 shadow-xs">
      {/* Count */}
      <div className="text-xs font-medium text-slate-700 sm:text-sm">
        {t('showing')}
        {' '}
        <span className="font-semibold text-slate-900">
          {showingCount === 0 ? 0 : 1}
        </span>
        –
        {' '}
        <span className="font-semibold text-slate-900">
          {showingCount}
        </span>
        {' '}
        {t('of')}
        {' '}
        <span className="font-semibold text-slate-900">
          {totalCount}
        </span>
        {' '}
        {t('packages')}
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Mobile filter button */}
        <button
          type="button"
          onClick={onMobileFilterToggleAction}
          className="flex items-center gap-1.5 rounded border border-slate-200 p-2 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 lg:hidden"
        >
          <SlidersHorizontal size={13} />
          {t('filtersBtn')}
        </button>

        {/* Sort dropdown */}
        <div ref={sortRef} className="relative">
          <button
            type="button"
            onClick={() => setIsSortOpen(prev => !prev)}
            className="flex items-center gap-1.5 rounded border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-sky-600 hover:bg-slate-50"
          >
            {currentSortLabel}
            <ChevronDown size={13} className={`transition ${isSortOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 z-20 mt-1 min-w-34 rounded-md border border-slate-200 bg-white py-1 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-100 px-3 pb-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">{t('sortBy')}</span>
                <button
                  type="button"
                  onClick={() => setIsSortOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={13} />
                </button>
              </div>
              <div className="flex flex-col text-start">
                {SORT_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onSortChangeAction(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`cursor-pointer px-3 py-2 text-start text-xs transition hover:bg-slate-50 ${
                      sort === option.value
                        ? 'font-semibold text-primary-500'
                        : 'text-slate-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
