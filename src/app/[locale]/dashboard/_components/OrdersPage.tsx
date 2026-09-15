/* eslint-disable react/no-array-index-key */
'use client';

import type { AdminOrder } from './admin-data';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';
import { getOrderById } from './actions/order-actions';
import { SearchInput, SelectControl, StatusBadge } from './AdminControls';
import OrderDetailsDrawer from './OrderDetailsDrawer';
import { Pagination } from './Pagination';
import { OrderTableSkeleton } from './skeleton/OrderTableSkeleton';

const ORDERS_PER_PAGE = 10;

export function OrdersPage({ orders: initialOrders }: { orders: AdminOrder[] }) {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerLoading = () => {
    setIsLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleViewDetails = useCallback(async (orderId: string) => {
    setIsLoadingDetails(true);
    const order = await getOrderById(orderId);

    if (order) {
      setSelectedOrder({
        id: order.id,
        orderNumber: order.orderNumber,
        customerInitials: order.customerName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        cityLocation: order.cityLocation,
        message: order.message,
        date: new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(order.createdAt)),
        payment: order.payment,
        status: order.status,
        privacyAgreed: order.privacyAgreed,
        items: order.items.map(item => ({
          id: item.id,
          productName: item.productName,
          category: item.category,
          quantity: item.quantity,
          image: item.image,
        })),
      });
    }

    setIsLoadingDetails(false);
  }, []);

  const handleStatusChange = useCallback((orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  }, []);

  const t = useTranslations('orders');
  // filters
  const [status, setStatus] = useState('');
  const [payment, setPayment] = useState('');
  const [date, setDate] = useState('');

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesQuery = normalizedQuery === '' || [order.payment, order.status, order.customerEmail].some(field => field.toLowerCase().includes(normalizedQuery));
      const matchesStatus = status === '' || order.status === status;
      const matchesPayment = payment === '' || order.payment === payment;
      const matchesDate = date === '' || new Date(order.date).toDateString() === new Date(date).toDateString();

      return matchesQuery && matchesStatus && matchesPayment && matchesDate;
    });
  }, [query, orders, status, payment, date]);

  const totalItems = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ORDERS_PER_PAGE));
  const currentPageSafe = Math.min(currentPage, totalPages);

  const visibleOrders = filteredOrders.slice((currentPageSafe - 1) * ORDERS_PER_PAGE, currentPageSafe * ORDERS_PER_PAGE);

  const locale = useLocale();
  const isRtl = locale === 'fa' || locale === 'ps';

  // all categories filter options
  const allStatusOptions = useMemo(
    () => [
      { value: '', label: t('allStatus') },
      ...Array.from(new Set(orders.map(order => order.status))).map(statusValue => ({
        value: statusValue,
        label: statusValue,
      })),
    ],
    [orders, t],
  );

  // all payments filter options
  const allPaymentOptions = useMemo(
    () => [
      { value: '', label: t('allPayment') },
      ...Array.from(new Set(orders.map(order => order.payment))).map(paymentValue => ({
        value: paymentValue,
        label: paymentValue,
      })),
    ],
    [orders, t],
  );

  return (
    <section>
      <div className="mb-7 rounded-md border border-[#e0e5ec] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Filters group */}
          <div className="flex w-full flex-col gap-4 md:flex-row md:flex-wrap xl:flex-nowrap xl:items-center xl:gap-3">

            <div className="w-full min-w-55 flex-1 md:w-auto">
              <SearchInput
                placeholder={t('search')}
                value={query}
                onChange={(event) => {
                  triggerLoading();
                  setQuery(event.target.value);
                }}
              />
            </div>

            <div className="w-full min-w-40 md:w-auto">
              <SelectControl
                label={t('allStatus')}
                options={allStatusOptions}
                value={status}
                onChange={(value) => {
                  triggerLoading();
                  setStatus(value);
                }}
              />
            </div>

            <div className="w-full min-w-40 md:w-auto">
              <SelectControl
                label={t('allPayment')}
                options={allPaymentOptions}
                value={payment}
                onChange={(value) => {
                  triggerLoading();
                  setPayment(value);
                }}
              />
            </div>

            <div className="w-full min-w-45 md:w-auto">
              <input
                type="date"
                onChange={(value) => {
                  triggerLoading();
                  setDate(value.target.value);
                }}
                value={date}
                className="h-12 w-full rounded-md border border-[#dfe4ea] px-5 text-[15px] text-[#2f3746] outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
              />
            </div>
          </div>

          {/* Reset button */}
          <div className="w-full xl:w-auto">
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setStatus('');
                setDate('');
                setPayment('');
                setCurrentPage(1);
                triggerLoading();
              }}
              className="h-12 w-full cursor-pointer rounded-md border border-[#dfe4ea] bg-white px-6 text-[15px] text-[#2f3746] hover:bg-gray-50 xl:w-auto"
            >
              {t('reset')}
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-[#dfe4ec] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
        <div className="overflow-x-auto">
          <div className="min-w-212.5">
            <div className="grid grid-cols-[minmax(220px,2fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(140px,1fr)] gap-4 bg-[#eef3ff] px-8 py-5 text-[14px] font-semibold text-[#595959] uppercase">
              <span>{t('customer')}</span>
              <span>{t('date')}</span>
              <span>{t('payment')}</span>
              <span>{t('status')}</span>
              <span>{t('actions')}</span>
            </div>

            <div className="divide-y divide-[#e7e9ee]">
              {
                isLoading
                  ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <OrderTableSkeleton key={index} />
                      ))
                    )
                  : (

                      visibleOrders.length === 0
                        ? (
                            <p className="p-10 text-center text-[15px] text-[#5e5e5e]">
                              {t('noResults')}
                            </p>
                          )

                        : (visibleOrders.map(order => (
                            <article
                              key={order.id}
                              className="grid grid-cols-[minmax(220px,2fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(140px,1fr)] items-center gap-4 px-8 py-4 text-[15px] text-[#555]"
                            >
                              <div className="flex min-w-0 items-center gap-4">
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#dce8ff] text-[13px] font-bold text-[#1764c8]">
                                  {order.customerInitials}
                                </span>

                                <span className="truncate font-medium text-[#303030]">
                                  {order.customerName}
                                </span>
                              </div>

                              <div>{order.date}</div>

                              <div>{order.payment}</div>

                              <div className="capitalize">
                                <StatusBadge status={order.status} />
                              </div>

                              <div>
                                <button
                                  type="button"
                                  className="inline-flex cursor-pointer items-center gap-2 font-semibold text-primary-400 hover:text-primary-500"
                                  onClick={() => handleViewDetails(order.id)}
                                  disabled={isLoadingDetails}
                                >
                                  {t('viewDetails')}
                                  <ArrowRight className={isRtl ? 'rotate-180' : ''} size={16} />
                                </button>
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
      {selectedOrder && (
        <OrderDetailsDrawer
          order={selectedOrder}
          onCloseAction={() => setSelectedOrder(null)}
          onStatusChangeAction={handleStatusChange}
        />
      )}
    </section>
  );
}
