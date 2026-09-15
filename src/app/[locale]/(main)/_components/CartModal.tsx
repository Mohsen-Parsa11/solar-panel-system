'use client';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Button from '@/app/components/common/Button';
import { useCartStore } from '@/store/useCartStore';
import { createOrder } from '../../dashboard/_components/actions/order-actions';

type CartModalProps = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  message: string;
  privacy: boolean;
};

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [orderResult, setOrderResult] = useState<{ success: boolean; message: string } | null>(null);
  const cartModal = useTranslations('home.cartModal');
  const locale = useLocale();

  const handleBrowseProducts = () => {
    router.push(`/${locale}/products`);
    onClose();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  if (!isOpen) {
    return null;
  }

  const onSubmit = (data: FormData) => {
    if (cart.length === 0) {
      return;
    }

    try {
      startTransition(async () => {
        const result = await createOrder({
          customerName: data.fullName,
          customerPhone: data.phone,
          customerEmail: data.email,
          cityLocation: data.city,
          message: data.message || undefined,
          payment: 'COD',
          privacyAgreed: data.privacy,
          items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        });

        setOrderResult({ success: result.success, message: result.message });

        if (result.success) {
          reset();
          toast.success(cartModal('successMessage'));
          setTimeout(() => {
            setOrderResult(null);
            onClose();
          }, 3000);
        }
      });
    } catch {
      toast.error(cartModal('errorMessage'));
    }
  };
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all">
      <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-sm bg-white shadow-2xl md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-5 right-8 z-20 cursor-pointer text-[#000000]"
        >
          <X className="h-6 w-6" strokeWidth={2} />
        </button>
        <div className="flex w-full flex-col overflow-y-auto border-b border-gray-100 bg-[#F9FAFB] p-6 md:w-[45%] md:border-r md:border-b-0 md:p-10">
          <div className="flex flex-col gap-8">
            {cart.length === 0
              ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-4">
                      <ShoppingCart className="h-8 w-8 text-gray-500" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900">
                      {cartModal('emptyCart')}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-gray-500">
                      {cartModal('emptyDescription')}
                    </p>

                    <Button
                      variant="primary"
                      onClick={handleBrowseProducts}
                      className="mt-4"
                    >
                      {cartModal('emptyCTA')}
                    </Button>
                  </div>
                )
              : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 shrink-0 rounded-sm border border-gray-100 bg-white p-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="absolute -top-2 -left-2 z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#EF4444] text-white shadow-sm transition-colors hover:bg-red-600"
                          >
                            <X className="h-3 w-3" strokeWidth={3} />
                          </button>
                          <div className="relative h-full w-full">
                            <Image src={item.image} alt={item.name} fill className="object-contain" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-[15px] font-bold text-[#111827]">{item.name}</h4>
                          <span className="text-sm text-gray-400">{cartModal('panel')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-500">{cartModal('quantity')}</span>
                        <div className="flex items-center rounded-sm border border-gray-200 bg-white px-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 'decrease')}
                            className="cursor-pointer p-1.5 text-gray-400 hover:text-gray-600"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-6 text-center text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 'increase')}
                            className="cursor-pointer p-1.5 text-gray-400 hover:text-gray-600"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
          </div>
        </div>
        <div className="flex w-full flex-col overflow-y-auto bg-white p-6 md:w-[55%] md:p-10">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-sm font-semibold text-[#344054]">{cartModal('fullName')}</label>
              <input
                id="fullName"
                {...register('fullName', { required: cartModal('fullNameError') })}
                placeholder={cartModal('fullNamePlaceholder')}
                className={`rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:ring-2 focus:outline-none ${
                  errors.fullName ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
                }`}
              />
              {errors.fullName && <span className="text-[12px] font-medium text-red-500">{errors.fullName.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm font-semibold text-[#344054]">{cartModal('phone')}</label>
              <input
                id="phone"
                {...register('phone', { required: cartModal('phoneError') })}
                placeholder={cartModal('phonePlaceholder')}
                className={`rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:ring-2 focus:outline-none ${
                  errors.phone ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
                }`}
              />
              {errors.phone && <span className="text-[12px] font-medium text-red-500">{errors.phone.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-[#344054]">{cartModal('email')}</label>
              <input
                id="email"
                {...register('email', {
                  required: cartModal('emailError'),
                  pattern: { value: /^\S[^\s@]*@\S+$/, message: cartModal('emailInvalid') || 'Invalid email address' },
                })}
                placeholder={cartModal('emailPlaceholder')}
                className={`rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:ring-2 focus:outline-none ${
                  errors.email ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
                }`}
              />
              {errors.email && <span className="text-[12px] font-medium text-red-500">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="city" className="text-sm font-semibold text-[#344054]">{cartModal('cityLocation')}</label>
              <input
                id="city"
                {...register('city', { required: cartModal('cityError') })}
                placeholder={cartModal('cityPlaceholder')}
                className={`rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:ring-2 focus:outline-none ${
                  errors.city ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
                }`}
              />
              {errors.city && <span className="text-[12px] font-medium text-red-500">{errors.city.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-semibold text-[#344054]">{cartModal('message')}</label>
              <textarea
                id="message"
                {...register('message')}
                placeholder={cartModal('messagePlaceholder')}
                rows={4}
                className="resize-none rounded-sm border border-gray-200 bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:border-[#006699] focus:ring-2 focus:ring-blue-50 focus:outline-none"
              />
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  {...register('privacy', { required: true })}
                  className="h-5 w-5 rounded border-gray-300 text-[#006699] focus:ring-[#006699]"
                />
                <label htmlFor="privacy" className="cursor-pointer text-[14px] text-gray-600">
                  {cartModal('privacy')}
                  <Link onClick={onClose} href={`/${locale}/privacy-policy`} className="mr-1 ml-1 border-b border-primary-400 hover:text-primary-400">{cartModal('privacyPolicy')}</Link>
                </label>
              </div>
              {errors.privacy && <span className="text-[12px] font-medium text-red-500">{cartModal('privacyError')}</span>}
            </div>
            <button
              type="submit"
              disabled={isPending || cart.length === 0}
              className="mt-4 w-full cursor-pointer rounded-sm bg-[#006699] py-2 text-[15px] font-semibold text-white transition-all hover:bg-[#005580] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? cartModal('submitting') : cartModal('submitButton')}
            </button>

            {orderResult && (
              <div className={`mt-3 rounded-sm px-4 py-3 text-sm font-medium ${orderResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {orderResult.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
