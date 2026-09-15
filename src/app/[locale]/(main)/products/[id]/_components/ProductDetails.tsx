'use client';
import type { Product } from '@/types/productType';
import { Check, Minus, MoveLeft, Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import Button from '@/app/components/common/Button';
import { cn } from '@/libs/cn';
import { useCartStore } from '@/store/useCartStore';
import { getLocalizedBrand, getLocalizedDescription, getLocalizedName } from '@/utils/localizedProductDetails';

export default function ProductDetails({ product, id}: { product: Product; id: string }) {
  const cart = useCartStore(state => state.cart);
  const addToCart = useCartStore((state) => {
    return state.addToCart;
  });
  const { updateQuantity } = useCartStore();
  const quantity = useCartStore(
    state => state.cart.find(item => item.id === product.id)?.quantity ?? 0,
  );

  const productDetails = useTranslations('home.cartModal');
  const locale = useLocale();

  const displayName = getLocalizedName(product, locale);
  const displayBrand = getLocalizedBrand(product, locale);
  const displayDescription = getLocalizedDescription(product, locale);

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    const isAlreadyInCart = cart.some(item => item.id === product.id);
    if (isAlreadyInCart) {
      toast.error(productDetails('alreadyInCart'));
    } else {
      addToCart({
        id: product.id,
        name: displayName,
        image: product?.imageUrl?.toString() ?? '',
      });
      toast.success(productDetails('addedSuccess'));
    }
  };

  const tProductDetails = useTranslations('productDetails');
  return (
    <div>
      <Link href={`/${locale}/products`} className="mb-8 flex cursor-pointer items-center gap-2 text-sm text-gray-500 transition-colors duration-150 hover:text-primary-400">
        <MoveLeft className={cn('size-5', locale === 'fa' || locale === 'ps' ? 'rtl:rotate-180' : '')} />
        <span>{tProductDetails('backToProducts')}</span>
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Image */}
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="relative aspect-square overflow-hidden rounded-md">
            <Image
              src={product?.imageUrl ?? ''}
              alt="Solar Panel"
              width={500}
              height={500}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <h1 className="mb-4 text-2xl font-semibold text-gray-900">
            {product?.powerW}
            {' '}
            {product?.type}
            {' '}
            {displayBrand}
          </h1>

          <p className="mb-6 text-sm leading-7 text-gray-500">
            {displayDescription}
          </p>

          {/* Features */}
          <div className="space-y-3">
            {product?.features?.map(item => (
              <div
                key={item?.value}
                className="flex items-center gap-3 text-sm text-gray-700"
              >
                <Check className="h-4 w-4 text-primary-400" />
                <span>{item?.name}</span>
              </div>
            ))}
          </div>

          {/* Specs */}
          <div className="mt-6 grid grid-cols-4 overflow-hidden rounded-lg border border-gray-200">
            <div className="border-r border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-500">{tProductDetails('power')}</p>
              <p className="mt-1 font-medium">{product?.powerW ?? 0}</p>
            </div>

            <div className="border-r border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-500">{tProductDetails('type')}</p>
              <p className="mt-1 font-medium">{product?.type ?? '-'}</p>
            </div>

            <div className="border-r border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-500">{tProductDetails('efficiency')}</p>
              <p className="mt-1 font-medium">
                {product?.efficiency ?? 0}
                {' '}
                %
              </p>
            </div>

            <div className="p-4 text-center">
              <p className="text-xs text-gray-500">{tProductDetails('warranty')}</p>
              <p className="mt-1 font-medium">
                {product?.warranty ?? 0}
                {' '}
                Years
              </p>
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6 rounded-lg border border-gray-200 p-4">
            <div className="mb-5 flex  items-center justify-between gap-3">
              <span className="font-medium text-gray-500">{tProductDetails('quantity')}</span>
              <div className="flex items-center rounded-sm border border-gray-200 bg-white px-1">
                <button
                  type="button"
                  onClick={() => updateQuantity(id, 'decrease')}
                  className="cursor-pointer p-1.5 text-gray-400 hover:text-gray-600"
                >
                  <Minus className="size-5" />
                </button>
                <span className="min-w-6 text-center font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(id, 'increase')}
                  className="cursor-pointer p-1.5 text-gray-400 hover:text-gray-600"
                >
                  <Plus className="size-5" />
                </button>
              </div>
            </div>

            <Button onClick={handleAddToCart} variant="primary" className="w-full py-3 ">
              {tProductDetails('requestOrder')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
