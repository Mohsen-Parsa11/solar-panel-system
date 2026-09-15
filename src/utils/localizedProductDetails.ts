import type { Product } from '@/types/productType';

export function getLocalizedName(product: Product, locale: string): string {
  if (locale === 'fa' && product.nameFarsi) {
    return product.nameFarsi;
  }
  if (locale === 'ps' && product.namePashto) {
    return product.namePashto;
  }
  return product.name;
}

export function getLocalizedBrand(product: Product, locale: string): string {
  if (locale === 'fa' && product.brandFarsi) {
    return product.brandFarsi;
  }
  if (locale === 'ps' && product.brandPashto) {
    return product.brandPashto;
  }
  return product.brand;
}

export function getLocalizedDescription(product: Product, locale: string): string {
  if (locale === 'fa' && product.descriptionFarsi) {
    return product.descriptionFarsi;
  }
  if (locale === 'ps' && product.descriptionPashto) {
    return product.descriptionPashto;
  }
  return product.description || '';
}

export function buildSpecs(product: Product): string[] {
  const specs: string[] = [];
  if (product.powerW) {
    specs.push(`${product.powerW}W`);
  }
  if (product.efficiency) {
    specs.push(product.efficiency);
  }
  if (product.warranty) {
    specs.push(product.warranty);
  }
  if (product.type) {
    specs.push(product.type);
  }
  return specs;
}
