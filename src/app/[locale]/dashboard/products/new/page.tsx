import { AddProductPage } from '../../_components/AddProductPage';
import { AdminShell } from '../../_components/AdminShell';

export default async function AddProductRoute() {
  return (
    <AdminShell active="products">
      <AddProductPage />
    </AdminShell>
  );
}
