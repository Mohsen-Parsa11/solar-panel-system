/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
'use client';

import type { AdminOrder } from './admin-data';
import { Mail, MapPin, MessageSquare, Phone, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { updateOrderStatus } from './actions/order-actions';
import { ProductThumbnail } from './ProductThumbnail';

type Props = {
  order: AdminOrder;
  onCloseAction: () => void;
  onStatusChangeAction?: (orderId: string, newStatus: string) => void;
};

const statusMap: Record<string, string> = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export default function OrderDetailsDrawer({ order, onCloseAction, onStatusChangeAction }: Props) {
  const t = useTranslations('orders.drawer');
  const locale = useLocale();
  const isRtl = locale === 'fa' || locale === 'ps';

  const drawerPosition = isRtl ? 'left-0' : 'right-0';

  const handleApprove = useCallback(async () => {
    const result = await updateOrderStatus(order.id, 'COMPLETED');
    if (result.success) {
      onStatusChangeAction?.(order.id, 'COMPLETED');
      onCloseAction();
    }
  }, [order.id, onStatusChangeAction, onCloseAction]);

  const handleCancel = useCallback(async () => {
    const result = await updateOrderStatus(order.id, 'CANCELLED');
    if (result.success) {
      onStatusChangeAction?.(order.id, 'CANCELLED');
      onCloseAction();
    }
  }, [order.id, onStatusChangeAction, onCloseAction]);

  const initials = order.customerName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const statusKey = statusMap[order.status] ?? 'pending';
  const isPending = order.status === 'PENDING';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 transition-opacity"
        onClick={onCloseAction}
      />

      {/* Drawer Container */}
      <div
        className={`fixed inset-y-0 ${drawerPosition} z-50 flex w-full max-w-md flex-col bg-white shadow-2xl duration-300 sm:max-w-lg md:max-w-xl lg:max-w-125`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-[#2d3748] sm:text-xl">{t('title')}</h2>
            <p className="mt-0.5 text-xs text-gray-400 sm:text-sm">{order.orderNumber}</p>
          </div>
          <button
            onClick={onCloseAction}
            className="cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100"
            aria-label={t('close')}
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">

          {/* User Profile Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0e7ff] text-base font-semibold text-[#4338ca] sm:h-14 sm:w-14 sm:text-lg">
                {initials}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1a202c] sm:text-lg">{order.customerName}</h3>
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase sm:text-xs ${
                  statusKey === 'pending'
                    ? 'bg-[#fef3c7] text-[#92400e]'
                    : statusKey === 'completed'
                      ? 'bg-[#d9f8e4] text-[#2e8a53]'
                      : 'bg-[#ffe0e0] text-[#c03939]'
                }`}
                >
                  {t(`status.${statusKey}`)}
                </span>
              </div>
            </div>
            <div className={`${isRtl ? 'sm:text-left' : 'sm:text-right'}`}>
              <p className="text-[10px] font-medium tracking-tighter text-gray-400 uppercase sm:text-xs">{t('requestDate')}</p>
              <p className="text-sm font-bold text-[#2d3748]">{order.date}</p>
            </div>
          </div>

          <hr className="mb-6 border-gray-100" />

          {/* Contact Information */}
          <section className="mb-8">
            <h4 className="mb-4 text-sm font-bold text-[#2d3748] sm:mb-6 sm:text-base">{t('contactInformation')}</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#3b82f6] sm:h-10 sm:w-10">
                  <Mail size={18} className="sm:size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-400 sm:text-xs">{t('email')}</p>
                  <p className="truncate text-xs font-medium text-[#2d3748] sm:text-sm">{order.customerEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#3b82f6] sm:h-10 sm:w-10">
                  <Phone size={18} className="sm:size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-400 sm:text-xs">{t('phone')}</p>
                  <p className="text-xs font-medium text-[#2d3748] sm:text-sm" dir="ltr">{order.customerPhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#3b82f6] sm:h-10 sm:w-10">
                  <MapPin size={18} className="sm:size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-400 sm:text-xs">{t('cityLocation')}</p>
                  <p className="text-xs font-medium text-[#2d3748] sm:text-sm">{order.cityLocation}</p>
                </div>
              </div>
              {order.message && (
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#3b82f6] sm:h-10 sm:w-10">
                    <MessageSquare size={18} className="sm:size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-gray-400 sm:text-xs">{t('message')}</p>
                    <p className="text-xs font-medium text-[#2d3748] sm:text-sm">{order.message || t('noMessage')}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <hr className="mb-6 border-gray-100" />

          {/* Payment */}
          <section className="mb-8">
            <h4 className="mb-3 text-sm font-bold text-[#2d3748] sm:mb-4 sm:text-base">{t('payment')}</h4>
            <span className="inline-block rounded-md bg-[#f0f4ff] px-3 py-1.5 text-xs font-semibold text-[#3b5998] sm:text-sm">
              {order.payment}
            </span>
          </section>

          <hr className="mb-6 border-gray-100" />

          {/* Order Items */}
          <section>
            <h4 className="mb-4 text-sm font-bold text-[#2d3748] sm:mb-6 sm:text-base">{t('orderItems')}</h4>
            <div className="space-y-4 sm:space-y-6">
              {order.items.map(item => (
                <div key={item.id} className="flex items-start justify-between gap-3">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="shrink-0">
                      <ProductThumbnail imageUrl={item.image} type={item.image ? 'panel' : 'panel'} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#2d3748] sm:text-sm">{item.productName}</p>
                      <p className="mt-0.5 text-[10px] text-gray-400 uppercase sm:text-xs">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div className={`${isRtl ? 'text-left' : 'text-right'} shrink-0`}>
                    <p className="text-xs font-bold text-[#1a202c] sm:text-sm">
                      {t('quantity')}
                      :
                      {' '}
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        {isPending && (
          <div className="space-y-3 border-t border-gray-200 p-4 sm:p-6">
            <button
              onClick={handleApprove}
              className="w-full cursor-pointer rounded-md bg-[#0073a5] py-3 text-sm font-bold text-white transition-colors hover:bg-[#005c84] sm:py-3.5"
            >
              {t('approveOrder')}
            </button>
            <button
              onClick={handleCancel}
              className="w-full cursor-pointer rounded-md border border-[#ef4444] py-3 text-sm font-bold text-[#ef4444] transition-colors hover:bg-red-50 sm:py-3.5"
            >
              {t('cancelOrder')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
