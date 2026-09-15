'use server';
import type { ProductFilters, ProductsResult } from '@/types/productType';
import { Prisma } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/libs/Prisma';
import { productSchema } from '@/schema/AddProductsSchema';

type ProductCategory = 'SOLAR_PANEL' | 'BATTERY' | 'INVERTER' | 'ACCESSORY';
type ProductStatus = 'ACTIVE' | 'DRAFT' | 'ARCHIVED';

type ActionState = {
  success: boolean;
  errors: Record<string, string>;
};

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseNumber(value: FormDataEntryValue | null, fallback = 0) {
  const str = typeof value === 'string' ? value.trim() : '';
  const parsed = Number.parseFloat(str);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function createProduct(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const getField = (name: string) =>
      (formData.get(name)?.toString() ?? '').trim();

    const name = getField('name');
    const nameFarsi = getField('nameFarsi');
    const namePashto = getField('namePashto');
    const sku = getField('sku');
    const category = getField('category') as ProductCategory;
    const productType = getField('productType');
    const brand = getField('brand');
    const brandFarsi = getField('brandFarsi');
    const brandPashto = getField('brandPashto');
    const status = (getField('status') || 'ACTIVE') as ProductStatus;
    const imageUrl = getField('imageUrl');
    const description = getField('description');
    const descriptionFarsi = getField('descriptionFarsi');
    const descriptionPashto = getField('descriptionPashto');

    const powerW = Math.round(parseNumber(formData.get('powerW')));
    const efficiency = getField('efficiency');
    const warranty = getField('warranty');

    const featureNames = formData.getAll('featureName');
    const featureValues = formData.getAll('featureValue');

    const features = featureNames
      .map((item, index) => {
        const nameValue = item.toString().trim();
        const value = featureValues[index]?.toString().trim() ?? '';
        if (!nameValue || !value) {
          return null;
        }
        return { name: nameValue, value };
      })
      .filter(Boolean) as Array<{ name: string; value: string }>;

    const t = await getTranslations('schema');
    const messages = {
      nameRequired: t('nameRequired'),
      skuRequired: t('skuRequired'),
      categoryRequired: t('categoryRequired'),
      invalidCategory: t('invalidCategory'),
      brandRequired: t('brandRequired'),
      descriptionRequired: t('descriptionRequired'),
      invalidImageUrl: t('invalidImageUrl'),
    };

    const schema = productSchema(messages);

    await schema.validate(
      {
        name,
        sku,
        category,
        productType,
        brand,
        status,
        imageUrl: imageUrl || undefined,
        description,
      },
      { abortEarly: false },
    );

    await prisma.product.create({
      data: {
        name,
        nameFarsi: nameFarsi || undefined,
        namePashto: namePashto || undefined,
        slug: `${slugify(name)}-${Date.now()}`,
        sku,
        category,
        type: productType || category,
        brand,
        brandFarsi: brandFarsi || undefined,
        brandPashto: brandPashto || undefined,
        status,
        imageUrl: imageUrl || undefined,
        description: description || undefined,
        descriptionFarsi: descriptionFarsi || undefined,
        descriptionPashto: descriptionPashto || undefined,
        powerW: powerW > 0 ? powerW : undefined,
        efficiency: efficiency || undefined,
        warranty: warranty || undefined,
        features: features.length > 0 ? features : undefined,
      } as any,
    });

    return {
      success: true,
      errors: {},
    };
  } catch (error: any) {
    const errors: Record<string, string> = {};

    if (error.inner) {
      error.inner.forEach((e: any) => {
        if (e.path) {
          errors[e.path] = e.message;
        }
      });
    }

    return {
      success: false,
      errors,
    };
  }
}

// get all products with sort and filter + pagination
export async function getProducts(filters?: ProductFilters): Promise<ProductsResult> {
  'use server';
  try {
    const page = filters?.page && filters.page > 0 ? filters.page : 1;
    const perPage = filters?.perPage && filters.perPage > 0 ? filters.perPage : 12;
    const skip = (page - 1) * perPage;

    const where: any = {};

    // Search
    if (filters?.search) {
      where.OR = [
        {
          name: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: filters.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Categories
    if (filters?.categories?.length) {
      where.category = {
        in: filters.categories,
      };
    }

    // Capacity (powerW)
    if (filters?.capacities?.length) {
      const capacityConditions = filters.capacities.map((range) => {
        if (range === '100-300') {
          return { powerW: { gte: 100, lte: 300 } };
        }
        if (range === '300-600') {
          return { powerW: { gte: 300, lte: 600 } };
        }
        if (range === '600-1000') {
          return { powerW: { gte: 600, lte: 1000 } };
        }
        if (range === '1000+') {
          return { powerW: { gte: 1000 } };
        }
        return {};
      });
      where.AND = capacityConditions.length > 0 ? capacityConditions : undefined;
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: perPage,
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / perPage);

    return {
      products: products as any,
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error('❌ getProducts failed:', error);

    // fallback safe response (IMPORTANT)
    return {
      products: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: filters?.page ?? 1,
    };
  }
}

export async function getProductById(productId: string) {
  return prisma.product.findUnique({
    where: { id: productId },
  }) as any;
}

export async function updateProduct(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  'use server';

  const getField = (name: string) => (formData.get(name)?.toString() ?? '').trim();
  const productId = getField('productId');
  if (!productId) {
    throw new Error('Product ID is required');
  }

  const name = getField('name');
  const nameFarsi = getField('nameFarsi');
  const namePashto = getField('namePashto');
  const sku = getField('sku');
  const category = getField('category') as ProductCategory;
  const productType = getField('productType');
  const brand = getField('brand');
  const brandFarsi = getField('brandFarsi');
  const brandPashto = getField('brandPashto');
  const status = (getField('status') || 'ACTIVE') as ProductStatus;
  const imageUrl = getField('imageUrl');
  const description = getField('description');
  const descriptionFarsi = getField('descriptionFarsi');
  const descriptionPashto = getField('descriptionPashto');
  const powerW = Math.round(parseNumber(formData.get('powerW')));
  const efficiency = getField('efficiency');
  const warranty = getField('warranty');

  const featureNames = formData.getAll('featureName');
  const featureValues = formData.getAll('featureValue');
  const features = featureNames
    .map((item, index) => {
      const nameValue = item.toString().trim();
      const value = featureValues[index]?.toString().trim() ?? '';

      if (!nameValue || !value) {
        return null;
      }

      return { name: nameValue, value };
    })
    .filter(Boolean) as Array<{ name: string; value: string }>;

  const t = await getTranslations('schema');
  const messages = {
    nameRequired: t('nameRequired'),
    skuRequired: t('skuRequired'),
    categoryRequired: t('categoryRequired'),
    invalidCategory: t('invalidCategory'),
    brandRequired: t('brandRequired'),
    descriptionRequired: t('descriptionRequired'),
    invalidImageUrl: t('invalidImageUrl'),
  };

  const schema = productSchema(messages);

  await schema.validate({
    name,
    sku,
    category,
    productType,
    brand,
    status,
    imageUrl: imageUrl || undefined,
    description,
  }, { abortEarly: false });

  await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      nameFarsi: nameFarsi || undefined,
      namePashto: namePashto || undefined,
      sku,
      category,
      type: productType || category,
      brand,
      brandFarsi: brandFarsi || undefined,
      brandPashto: brandPashto || undefined,
      status,
      imageUrl: imageUrl || undefined,
      description: description || undefined,
      descriptionFarsi: descriptionFarsi || undefined,
      descriptionPashto: descriptionPashto || undefined,
      powerW: powerW > 0 ? powerW : undefined,
      efficiency: efficiency || undefined,
      warranty: warranty || undefined,
      features: features.length > 0 ? features : undefined,
    } as any,
  });

  return {
    success: true,
    errors: {},
  };
}

export async function deleteProduct(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  'use server';

  const productId = formData.get('productId')?.toString();

  if (!productId) {
    throw new Error('Product ID is required');
  }

  const orderItemsCount = await prisma.orderItem.count({
    where: {
      productId,
    },
  });

  if (orderItemsCount > 0) {
    return {
      success: false,
      errors: {
        productId: 'This product is used in orders and cannot be deleted.',
      },
    };
  }

  try {
    await prisma.product.delete({ where: { id: productId } });
  } catch (error: any) {
    // If the product was already deleted, Prisma throws P2025 — treat as success
    if (
      (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
      || error?.code === 'P2025'
    ) {
      return {
        success: true,
        errors: {},
      };
    }

    console.error('deleteProduct failed:', error);
    return {
      success: false,
      errors: { productId: 'Failed to delete product.' },
    };
  }

  return {
    success: true,
    errors: {},
  };
}

export async function getLatestProducts(limit = 6, excludeId?: string) {
  'use server';
  try {
    const where: any = {
      status: 'ACTIVE',
    };

    if (excludeId) {
      where.id = { not: excludeId };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return products as any;
  } catch (error) {
    console.error('Failed to fetch latest products:', error);
    return [];
  }
}
