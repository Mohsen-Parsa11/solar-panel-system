'use client';

import { RotateCcw, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

const CAPACITIES = ['100-300', '300-600', '600-1000', '1000+'];

type FilterSidebarProps = {
  search: string;
  categories: string[];
  capacities: string[];
  onSearchChangeAction: (value: string) => void;
  onCategoryToggleAction: (value: string) => void;
  onCapacityToggleAction: (value: string) => void;
  onResetAction: () => void;
  // direction?: string;
};

export default function FilterSidebar({
  search,
  categories,
  capacities,
  onSearchChangeAction,
  onCategoryToggleAction,
  onCapacityToggleAction,
  onResetAction,
  // direction,
}: FilterSidebarProps) {
  const t = useTranslations('product');
  const CATEGORIES = [
    { label: t('catSolarPanels'), value: 'SOLAR_PANEL' },
    { label: t('catSolarInverters'), value: 'INVERTER' },
    { label: t('catSolarBatteries'), value: 'BATTERY' },
    { label: t('catAccessories'), value: 'ACCESSORY' },
  ];

  // const isRtl = direction === 'rtl';
  return (
    <div className="flex w-full flex-col rounded-lg border border-[#eaeaea] bg-white p-5 text-slate-800 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-[16px] font-semibold tracking-tight text-slate-800">
          {t('filterTitle')}
        </h2>
        <button
          type="button"
          onClick={onResetAction}
          className="flex cursor-pointer items-center gap-1 text-xs font-medium text-primary-400 hover:text-primary-500 hover:underline"
        >
          <RotateCcw size={12} strokeWidth={2.5} />
          {t('filterReset')}
        </button>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="mb-1.5 block text-left text-[11px] font-medium tracking-wider text-slate-500 uppercase">
            {t('filterSearch')}
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={search}
              onChange={e => onSearchChangeAction(e.target.value)}
              placeholder={t('filterSearchPlaceholder')}
              className="w-full rounded-md border border-slate-200 bg-white py-2 pr-10 pl-3 text-xs placeholder-slate-400 focus:border-primary-400 focus:ring-1 focus:ring-primary-500/50 focus:outline-none"
            />
            <Search className="pointer-events-none absolute top-2.5 right-3 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Category */}
        <div className="pt-2">
          <label htmlFor="category" className=" text-left text-[13px] font-bold text-slate-800">
            {t('filterCategory')}
          </label>
          <div className="mt-3 space-y-2.5 text-left">
            {CATEGORIES.map(item => (
              <label
                htmlFor={item.value}
                key={item.value}
                className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-700"
              >
                <input
                  type="checkbox"
                  id={item.value}
                  checked={categories.includes(item.value)}
                  onChange={() => onCategoryToggleAction(item.value)}
                  className="h-4 w-4 rounded border-slate-300 accent-primary-500"
                />
                <span className="text-slate-600 hover:text-slate-900">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="my-4 border-t border-slate-100" />

        {/* Capacity */}
        <div>
          <label htmlFor="capacity" className="text-left text-[13px] font-bold text-slate-800">
            {t('filterCapacity')}
          </label>
          <div className="mt-3 space-y-2.5 text-left">
            {CAPACITIES.map(item => (
              <label
                key={item}
                htmlFor={item}
                className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-700"
              >
                <input
                  type="checkbox"
                  id={item}
                  checked={capacities.includes(item)}
                  onChange={() => onCapacityToggleAction(item)}
                  className="h-4 w-4 rounded border-slate-300 accent-primary-400"
                />
                <span className="text-slate-600 hover:text-slate-900">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
