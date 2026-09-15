import { getLocale } from 'next-intl/server';
import { getAdminProducts } from '../_components/admin-data';
import { AdminShell } from '../_components/AdminShell';
import { ProductsPage } from '../_components/ProductsPage';

export default async function ProductsRoute() {
  const locale = await getLocale() as 'ps' | 'fa' | 'en';
  const products = await getAdminProducts(locale);

  return (
    <AdminShell active="products">
      <ProductsPage products={products} />
    </AdminShell>
  );
}
