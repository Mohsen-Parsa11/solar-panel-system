/* eslint-disable react/no-array-index-key */
'use client';

import type { Product } from '@/types/productType';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';
import { getLatestProducts } from '@/app/[locale]/dashboard/_components/actions/product-actions';
import { isRTL } from '@/utils/Helpers';
import { ProductCardSkeleton } from '../products/_components/ProductCardSkeleton';
import ProductCard from './ProductCard';

export default function PremiumProducts() {
  const t = useTranslations('home.premiumProducts');
  const locale = useLocale();
  const isRtl = isRTL(locale);

  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getLatestProducts(4);
      setProducts(data);
    });
  }, []);

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 md:mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00496E]" />
              <span className="text-[16px] font-medium tracking-wide text-[#00496E] uppercase">
                {t('sectionLabel')}
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-[#030303] md:text-[32px]">
              {t('title')}
            </h2>
            <p className="text-[14px] leading-relaxed text-[#363434] md:text-[16px]">
              {t('description')}
            </p>
          </div>
          <Link
            href={`${locale}/products`}
            className="hidden items-center gap-2 text-[14px] text-[#000000] transition-colors hover:text-[#00496E] md:flex"
          >
            {t('viewAll')}
            {isRtl ? <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> : <ArrowRight className="h-4 w-4" strokeWidth={1.5} /> }
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isPending
            && Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}

          {
            (products.length === 0 && !isPending) && (
              <div className="col-span-4 mx-auto flex flex-col items-center justify-center gap-2 text-center">
                <Image
                  src="/no-data.png"
                  alt="no-data"
                  width={500}
                  height={500}
                  className="w-34 pb-4 md:w-48"
                />
                <p className="text-[16px] font-medium text-[#00496E]">{t('noProductsTitle')}</p>
                <p className="text-[14px] text-[#363434]">{t('noProductsDescription')}</p>
              </div>
            )
          }

          {!isPending
            && products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
        </div>
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href={`${locale}/products`}
            className="flex items-center gap-2 text-[14px] text-[#000000] transition-colors hover:text-[#00496E] md:flex"
          >
            {t('viewAll')}
            {isRtl ? <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> : <ArrowRight className="h-4 w-4" strokeWidth={1.5} /> }
          </Link>
        </div>

      </div>
    </section>
  );
}
