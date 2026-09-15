import { getProductById } from '@/app/[locale]/dashboard/_components/actions/product-actions';
import ProductDetails from './_components/ProductDetails';
import RelatedProducts from './_components/RelatedProducts';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <div className="wrapper py-10">
      <div className="flex flex-col space-y-10 md:space-y-16">
        {/* product details */}
        <ProductDetails product={product} id={id} />

        {/* related products */}
        <RelatedProducts excludeId={id} />
      </div>
    </div>
  );
}
