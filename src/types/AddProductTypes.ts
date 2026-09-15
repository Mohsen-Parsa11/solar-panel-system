export type ProductFormValues = {
  name: string;
  sku: string;
  category: string;
  brand: string;
  productType: string;
  warranty: string;
  efficiency: string;
  description: string;
  imageUrl: string;
};

export type InitialProduct = {
  id: string;
  name: string;
  nameFarsi?: string | null;
  namePashto?: string | null;
  sku: string;
  category: string;
  brand: string;
  brandFarsi?: string | null;
  brandPashto?: string | null;
  stock: number;
  status: string;
  imageUrl?: string | null;
  description?: string | null;
  descriptionFarsi?: string | null;
  descriptionPashto?: string | null;
  powerW?: number | null;
  type?: string | null;
  efficiency?: string | null;
  warranty?: string | null;
  features?: { name: string; value: string }[] | null;
};
export type ProductFormProps = {
  initialProduct?: InitialProduct;
};
