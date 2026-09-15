export type Product = {
  id: string;
  slug: string;
  name: string;
  nameFarsi?: string | null;
  namePashto?: string | null;
  sku: string;
  category: string;
  brand: string;
  brandFarsi?: string | null;
  brandPashto?: string | null;
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
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductFilters = {
  search?: string;
  categories?: string[];
  capacities?: string[];
  sort?: string;
  page?: number;
  perPage?: number;
};

export type ProductsResult = {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
