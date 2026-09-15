import type { InitialProduct } from '@/types/AddProductTypes';
import { ProductForm } from './ProductForm';

export function AddProductPage({ product }: { product?: InitialProduct }) {
  return (
    <ProductForm
      initialProduct={product}
    />
  );
}
