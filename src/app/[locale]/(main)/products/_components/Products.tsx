/* eslint-disable react/no-array-index-key */
'use client';

import type { SortOption } from './TopBar';
import type { Product, ProductsResult } from '@/types/productType';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { getProducts } from '@/app/[locale]/dashboard/_components/actions/product-actions';
import { Pagination } from '@/app/[locale]/dashboard/_components/Pagination';
import ProductCard from '../../home/ProductCard';
import FilterSidebar from './FilterSidebar';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import TopBar from './TopBar';

const PER_PAGE = 12;
const DEBOUNCE_MS = 400;

const INITIAL_RESULT: ProductsResult = {
  products: [],
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
};

export default function Products() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [capacities, setCapacities] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>('popularity');

  const [result, setResult] = useState<ProductsResult>(INITIAL_RESULT);
  const [isPending, startTransition] = useTransition();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchProducts = useCallback((
    searchVal: string,
    cats: string[],
    caps: string[],
    sortVal: SortOption,
    pageNum: number,
  ) => {
    startTransition(async () => {
      const data = await getProducts({
        search: searchVal || undefined,
        categories: cats.length > 0 ? cats : undefined,
        capacities: caps.length > 0 ? caps : undefined,
        sort: sortVal === 'popularity' ? undefined : sortVal,
        page: pageNum,
        perPage: PER_PAGE,
      });
      setResult(data);
    });
  }, []);

  useEffect(() => {
    fetchProducts(search, categories, capacities, sort, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      fetchProducts(value, categories, capacities, sort, 1);
    }, DEBOUNCE_MS);
  };

  const handleCategoryToggle = (value: string) => {
    const next = categories.includes(value)
      ? categories.filter(c => c !== value)
      : [...categories, value];
    setCategories(next);
    fetchProducts(search, next, capacities, sort, 1);
  };

  const handleCapacityToggle = (value: string) => {
    const next = capacities.includes(value)
      ? capacities.filter(c => c !== value)
      : [...capacities, value];
    setCapacities(next);
    fetchProducts(search, categories, next, sort, 1);
  };

  const handleSortChange = (value: SortOption) => {
    setSort(value);
    fetchProducts(search, categories, capacities, value, 1);
  };

  const handlePageChange = (newPage: number) => {
    fetchProducts(search, categories, capacities, sort, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSearch('');
    setCategories([]);
    setCapacities([]);
    setSort('popularity');
    fetchProducts('', [], [], 'popularity', 1);
  };

  const showingCount = result.products.length;
  const t = useTranslations('product');

  return (
    <section className="wrapper py-16 md:py-20">
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
            aria-label={t('mobileFiltersClose')}
          />
          <div className="relative z-10 h-full w-80 overflow-y-auto bg-white p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">{t('mobileFiltersTitle')}</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="rounded px-2 py-1 text-xs text-slate-500 hover:bg-slate-100"
              >
                {t('mobileFiltersClose')}
              </button>
            </div>
            <FilterSidebar
              search={search}
              categories={categories}
              capacities={capacities}
              onSearchChangeAction={handleSearchChange}
              onCategoryToggleAction={handleCategoryToggle}
              onCapacityToggleAction={handleCapacityToggle}
              onResetAction={handleReset}
            />
          </div>
        </div>
      )}

      {/* Desktop layout: sidebar  */}
      <div
        className="mt-2 grid grid-cols-1 items-start gap-6 lg:grid-cols-3"
      >
        {/* Sidebar */}
        <div
          className="col-span-1 hidden self-start lg:sticky lg:top-20 lg:block"
        >
          <FilterSidebar
            search={search}
            categories={categories}
            capacities={capacities}
            onSearchChangeAction={handleSearchChange}
            onCategoryToggleAction={handleCategoryToggle}
            onCapacityToggleAction={handleCapacityToggle}
            onResetAction={handleReset}
            // direction={direction}
          />
        </div>

        {/* Products */}
        <div className="col-span-2 flex flex-col items-center">
          <TopBar
            totalCount={result.totalCount}
            showingCount={showingCount}
            sort={sort}
            onSortChangeAction={handleSortChange}
            onMobileFilterToggleAction={() => setMobileFilterOpen(true)}
          />

          {isPending && (
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!isPending && result.products.length === 0 && (
            <div className="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white py-20 text-center">
              <Image
                src="/no-data.png"
                alt="no-data"
                width={500}
                height={500}
                className="w-34 pb-4 md:w-48"
              />
              <h3 className="mb-1 text-[18px] font-semibold text-slate-800">
                {t('noProductsTitle')}
              </h3>
              <p className="mb-6 max-w-sm text-[14px] text-slate-500">
                {t('noProductsDescription')}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="cursor-pointer rounded-md bg-primary-500 px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-primary-600"
              >
                {t('resetAllFilters')}
              </button>
            </div>
          )}

          {!isPending && result.products.length > 0 && (
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.products.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}

          {!isPending && result.totalPages > 1 && (
            <Pagination
              currentPage={result.currentPage}
              totalPages={result.totalPages}
              totalItems={result.totalCount}
              itemsPerPage={12}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </section>
  );
}
