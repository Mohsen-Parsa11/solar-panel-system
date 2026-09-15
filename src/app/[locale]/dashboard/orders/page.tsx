import { getLocale } from 'next-intl/server';
import { getAdminOrders } from '../_components/admin-data';
import { AdminShell } from '../_components/AdminShell';
import { OrdersPage } from '../_components/OrdersPage';

export default async function OrdersRoute() {
  const locale = await getLocale() as 'fa' | 'en' | 'ps';
  const orders = await getAdminOrders(locale);

  return (
    <AdminShell active="orders">
      <OrdersPage orders={orders} />
    </AdminShell>
  );
}
