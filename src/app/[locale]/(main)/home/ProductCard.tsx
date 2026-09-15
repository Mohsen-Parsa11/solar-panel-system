'use client';
import type { Product } from '@/types/productType';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import Button from '@/app/components/common/Button';
import { useCartStore } from '@/store/useCartStore';
import { buildSpecs, getLocalizedBrand, getLocalizedName } from '@/utils/localizedProductDetails';

type ProductCardProps = Readonly<{
  product: Product;
}>;

export default function ProductCard({ product }: ProductCardProps) {
  const cart = useCartStore(state => state.cart);
  const addToCart = useCartStore(state => state.addToCart);
  const specs = buildSpecs(product);
  const image = product.imageUrl || '/assets/images/solar-panels.svg';
  const productCardText = useTranslations('home.productCard');
  const locale = useLocale();

  const displayName = getLocalizedName(product, locale);
  const displayBrand = getLocalizedBrand(product, locale);

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    const isAlreadyInCart = cart.some(item => item.id === product.id);
    if (isAlreadyInCart) {
      toast.error(productCardText('alreadyInCart'));
    } else {
      addToCart({
        id: product.id,
        name: displayName,
        image,
      });
      toast.success(productCardText('addedSuccess'));
    }
  };

  return (
    <div
      className="flex flex-col rounded-sm border border-gray-100/80 bg-white p-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
    >
      <Link
        href={`/${locale}/products/${product.id}`}
        className="relative mb-8 block aspect-4/3 w-full"
      >
        <Image
          src={image}
          alt={displayName}
          fill
          className="object-contain"
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <Link href={`/${locale}/products/${product.id}`}>
          <h3 className="text-[18px] font-semibold text-[#030303]">
            {displayName}
          </h3>
        </Link>
        <p className="text-sm text-[#6B7280]">
          {displayBrand}
        </p>
        {specs.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-4 text-[13px] text-[#6B7280]">
            {specs.map((item, index) => (
              <span className="text-[#434654]" key={`${product.id}-${item}`}>
                {item}
                {index !== specs.length - 1 && (
                  <span className="ml-2 font-bold text-[#D9D9D9]">•</span>
                )}
              </span>
            ))}
          </div>
        )}
        <Button
          variant="outlined"
          onClick={handleAddToCart}
          className="mt-auto"
        >
          {productCardText('addToCart')}
        </Button>
      </div>
    </div>
  );
}
