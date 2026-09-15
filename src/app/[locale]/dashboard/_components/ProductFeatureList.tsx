'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type ProductFeatureItem = {
  id: string;
  name: string;
  value: string;
};

type ProductFeatureListProps = {
  features: ProductFeatureItem[];
  setFeatures: Dispatch<SetStateAction<ProductFeatureItem[]>>;
};

export function ProductFeatureList({ features, setFeatures }: ProductFeatureListProps) {
  const updateFeature = (id: string, field: 'name' | 'value', value: string) => {
    setFeatures(current => current.map(feature => feature.id === id ? { ...feature, [field]: value } : feature));
  };

  const removeFeature = (id: string) => {
    setFeatures(current => current.filter(feature => feature.id !== id));
  };
  const t = useTranslations('productForm');

  return (
    <div className="space-y-4">
      {features.length === 0
        ? (
            <p className="text-[14px] text-[#5e5e5e]">{t('noFeatures')}</p>
          )
        : null}

      {features.map((feature, index) => (
        <div key={feature.id} className="grid items-center gap-3 sm:grid-cols-[1.8fr_1.8fr_56px]">
          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-[#344054]">
              {index === 0 ? t('parameter') : t('parameter')}
            </span>
            <input
              name="featureName"
              value={feature.name}
              onChange={event => updateFeature(feature.id, 'name', event.target.value)}
              placeholder="e.g. Maximum Power (Pmax)"
              className="h-12 w-full rounded-md border border-[#dfe4ea] bg-white px-4 text-[15px] text-[#2f3746] transition outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[13px] font-semibold text-[#344054]">{t('value')}</span>
            <input
              name="featureValue"
              value={feature.value}
              onChange={event => updateFeature(feature.id, 'value', event.target.value)}
              placeholder="e.g. 550W"
              className="h-12 w-full rounded-md border border-[#dfe4ea] bg-white px-4 text-[15px] text-[#2f3746] transition outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
            />
          </label>

          <button
            type="button"
            onClick={() => removeFeature(feature.id)}
            className="mt-7 grid h-12 w-12 cursor-pointer place-items-center rounded-md border border-[#dfe4ea] text-[#6e7785] transition hover:border-primary-400 hover:text-primary-400"
            aria-label={t('removeFeature')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
