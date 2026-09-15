import { getProductById } from '../../../_components/actions/product-actions';
import { AddProductPage } from '../../../_components/AddProductPage';
import { AdminShell } from '../../../_components/AdminShell';

type Props = {
  params: Promise<{ id: string }>;
};
export default async function AddProductRoute({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <AdminShell active="products">
      <AddProductPage product={product} />
    </AdminShell>
  );
}
