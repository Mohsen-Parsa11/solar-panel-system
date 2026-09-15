/* eslint-disable react/no-array-index-key */
'use client';

import type { Product } from '@/types/productType';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useTransition } from 'react';
import { getLatestProducts } from '@/app/[locale]/dashboard/_components/actions/product-actions';
import ProductCard from '../../../home/ProductCard';
import { ProductCardSkeleton } from '../../_components/ProductCardSkeleton';

type Props = {
  excludeId?: string;
};

export default function RelatedProducts({ excludeId }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('home.premiumProducts');

  useEffect(() => {
    startTransition(async () => {
      const data = await getLatestProducts(4, excludeId);
      setProducts(data);
    });
  }, [excludeId]);

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-semibold text-gray-900">
        {t('relatedTitle')}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isPending
          && Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}

        {!isPending
          && products.length > 0
          && products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}

        {!isPending && products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}
