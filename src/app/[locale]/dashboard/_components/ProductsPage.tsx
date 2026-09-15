/* eslint-disable react/no-array-index-key */
'use client';

import type { AdminProduct } from './admin-data';
import { Edit3, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState, useTransition } from 'react';
import { SearchInput, SelectControl } from './AdminControls';
import { DeleteModal } from './DeleteModal';
import { Pagination } from './Pagination';
import { ProductThumbnail } from './ProductThumbnail';
import { ProductTableSkeleton } from './skeleton/ProductTableSkeleton';

const PRODUCTS_PER_PAGE = 10;

export function ProductsPage({ products }: { products: AdminProduct[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const t = useTranslations('products');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    productId: string;
    productName: string;
  }>({
    open: false,
    productId: '',
    productName: '',
  });

  const handleDeleteSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const triggerLoading = () => {
    setIsLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // all categories filter options
  const categoryOptions = useMemo(
    () => [
      { value: '', label: t('allCategories') },
      ...Array.from(new Set(products.map(product => product.category))).map(categoryValue => ({
        value: categoryValue,
        label: categoryValue,
      })),
    ],
    [products, t],
  );

  // all brands filter options
  const brandOptions = useMemo(
    () => [
      { value: '', label: t('allBrands') },
      ...Array.from(new Set(products.map(product => product.brand))).map(brandValue => ({
        value: brandValue,
        label: brandValue,
      })),
    ],
    [products, t],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery = normalizedQuery === '' || [product.name, product.sku, product.category, product.brand].some(field => field.toLowerCase().includes(normalizedQuery));
      const matchesCategory = category === '' || product.category === category;
      const matchesBrand = brand === '' || product.brand === brand;

      return matchesQuery && matchesCategory && matchesBrand;
    });
  }, [products, query, category, brand]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PRODUCTS_PER_PAGE));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const visibleProducts = filteredProducts.slice((currentPageSafe - 1) * PRODUCTS_PER_PAGE, currentPageSafe * PRODUCTS_PER_PAGE);

  return (
    <section>
      <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[28px] leading-9 font-semibold text-black">{t('title')}</h1>
          <p className="mt-1 text-[15px] text-[#5e5e5e]">{t('subtitle')}</p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary-400 px-6 text-[16px] font-semibold text-white shadow-sm hover:bg-primary-500/80"
        >
          <Plus size={20} />
          {t('add')}
        </Link>
      </div>

      <div className="mb-7 rounded-md border border-[#e0e5ec] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <SearchInput
            placeholder={t('search')}
            value={query}
            onChange={(event) => {
              setIsLoading(true);
              setQuery(event.target.value);
              triggerLoading();
            }}
            className="w-full xl:max-w-75"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <SelectControl
              label={t('allCategories')}
              options={categoryOptions}
              value={category}
              onChange={(value) => {
                setIsLoading(true);
                setCategory(value);
                triggerLoading();
              }}
            />
            <SelectControl
              label={t('allBrands')}
              options={brandOptions}
              value={brand}
              onChange={(value) => {
                setIsLoading(true);
                setBrand(value);
                triggerLoading();
              }}
            />
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('');
                  setBrand('');
                  setCurrentPage(1);
                  setIsLoading(true);
                  triggerLoading();
                }}
                className="h-12 w-full cursor-pointer rounded-md border border-[#dfe4ea] bg-white px-4 text-[15px] text-[#2f3746] hover:bg-gray-50"
              >
                {t('reset')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-[#dfe4ec] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
        <div className="overflow-x-auto">
          <div className="min-w-225 lg:min-w-full">
            <div
              className="
    gap-4
    bg-[#eef3ff] px-8
    py-5 text-[14px]
    font-semibold text-[#595959]
    uppercase lg:grid
    lg:grid-cols-[minmax(320px,2fr)_minmax(160px,1fr)_minmax(160px,1fr)_minmax(160px,.8fr)]
  "
            >
              <span>{t('product')}</span>
              <span>{t('category')}</span>
              <span>{t('brand')}</span>
              <span>{t('actions')}</span>
            </div>

            <div className="divide-y divide-[#e7e9ee]">
              {
                isLoading || isPending
                  ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <ProductTableSkeleton key={index} />
                      ))
                    )
                  : (

                      visibleProducts.length === 0
                        ? (
                            <p className="p-10 text-center text-[15px] text-[#5e5e5e]">
                              {t('noResults')}
                            </p>
                          )
                        : (
                            visibleProducts.map(product => (
                              <article
                                key={product?.id}
                                className="
    group
    grid
    grid-cols-[minmax(220px,2fr)_140px_140px_120px_140px]
    gap-4 px-4
    py-5 text-[15px]

    text-[#555]

    lg:grid-cols-[minmax(320px,2fr)_minmax(160px,1fr)_minmax(160px,1fr)_minmax(160px,.8fr)]
    lg:items-center
    lg:px-6
  "
                              >
                                <div className="flex min-w-0 items-center gap-4">
                                  <ProductThumbnail imageUrl={product.image} type={product.image} />
                                  <div className="min-w-0">
                                    <p className="truncate font-semibold text-[#1d2736]">{product.name}</p>
                                    <p className="mt-1 text-[14px] text-[#5e5e5e]">
                                      {t('sku')}
                                      :
                                      {' '}
                                      {product.sku}
                                    </p>
                                  </div>
                                </div>
                                <DataCell label={t('category')} value={product.category} />
                                <DataCell label={t('brand')} value={product.brand} />
                                <div>
                                  <MobileLabel>{t('actions')}</MobileLabel>
                                  <div className="flex items-center gap-3 text-[#444]">
                                    {/* actions */}
                                    <button type="button" onClick={() => router.push(`/dashboard/products/new/${product.id}`)} aria-label={`Edit ${product.name}`} className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#344054] transition hover:border hover:border-primary-400 hover:transition hover:duration-150"><Edit3 size={20} /></button>
                                    <button
                                      type="button"
                                      aria-label={`Delete ${product.name}`}
                                      onClick={() =>
                                        setDeleteModal({
                                          open: true,
                                          productId: product.id,
                                          productName: product.name,
                                        })}
                                      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-[#344054] transition hover:border hover:border-primary-400 hover:transition hover:duration-150"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                </div>
                              </article>
                            ))))
              }
            </div>
          </div>
        </div>
      </div>

      {/* pagination */}
      {
        totalPages > 1 && (
          <Pagination
            currentPage={currentPageSafe}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
          />
        )
      }

      <DeleteModal
        open={deleteModal.open}
        productId={deleteModal.productId}
        productName={deleteModal.productName}
        onDeleteSuccessAction={handleDeleteSuccess}
        onCloseAction={() =>
          setDeleteModal({ open: false, productId: '', productName: '' })}
        t={{
          title: t('deleteTitle'),
          description: t('deleteDescription'),
          cancel: t('cancel'),
          confirm: t('confirm'),
          deleting: t('deleting'),
          successMessage: t('successMessage'),
        }}
      />
    </section>
  );
}

function DataCell({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? 'font-medium text-[#1d2736]' : undefined}>
      <MobileLabel>{label}</MobileLabel>
      {value}
    </div>
  );
}

function MobileLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-1 block text-[11px] font-semibold text-[#8a94a6] uppercase lg:hidden">{children}</span>;
}
