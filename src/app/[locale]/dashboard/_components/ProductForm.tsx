'use client';

import type { ProductFeatureItem } from './ProductFeatureList';
import type { ProductFormProps } from '@/types/AddProductTypes';
import { ChevronDown, Plus, UploadCloud } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { createProduct, updateProduct } from './actions/product-actions';
import { ProductFeatureList } from './ProductFeatureList';
import { SubmitButton } from './SubmitButton';

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold text-[#344054]">{label}</span>
      {children}
      {error ? <p className="mt-2 text-[13px] text-red-600">{error}</p> : null}
    </label>
  );
}

function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-md border border-[#dfe5ec] bg-white px-6 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="mb-6 flex items-center justify-between border-b border-[#e8ecf2] pb-4">
        <h2 className="text-[16px] font-semibold text-[#1d2a3d]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Input({ name, placeholder, type = 'text', defaultValue }: { name: string; placeholder: string; type?: string; defaultValue?: string | number }) {
  return (
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      className="h-12 w-full rounded-md border border-[#dfe4ea] bg-white px-4 text-[15px] text-[#2f3746] transition outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
      placeholder={placeholder}
    />
  );
}

function Textarea({ name, placeholder, defaultValue }: { name: string; placeholder: string; defaultValue?: string }) {
  return (
    <textarea
      name={name}
      defaultValue={defaultValue}
      className="min-h-33 w-full resize-none rounded-md border border-[#dfe4ea] px-4 py-4 text-[15px] leading-6 text-[#2f3746] transition outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
      placeholder={placeholder}
      maxLength={320}
    />
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-[13px] text-[#667085]">{children}</p>;
}

export function ProductForm({
  initialProduct,
}: ProductFormProps) {
  const [features, setFeatures] = useState<ProductFeatureItem[]>(
    initialProduct?.features?.map(feature => ({ id: crypto.randomUUID(), name: feature.name, value: feature.value }))
    ?? [{ id: crypto.randomUUID(), name: '', value: '' }],
  );
  const [fileName, setFileName] = useState(initialProduct?.imageUrl ? initialProduct.imageUrl.split('/').pop() ?? '' : '');
  const [imageUrl, setImageUrl] = useState(initialProduct?.imageUrl ?? '');
  const [imagePreview, setImagePreview] = useState(initialProduct?.imageUrl ?? '');
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const t = useTranslations('productForm');
  const locale = useLocale();

  //  use for submit, validation and error handling
  const action = initialProduct?.id
    ? updateProduct
    : createProduct;
  const [state, formAction] = useActionState(action, {
    success: false,
    errors: {},
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files?.[0];

    if (!file) {
      return;
    }

    // local preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setIsUploading(true);

    const uploadedUrl = await uploadToCloudinary(file);

    setIsUploading(false);

    setImageUrl(uploadedUrl);
    setFileName(file.name);
  };

  // show uploading toast
  useEffect(() => {
    if (isUploading) {
      toast.loading(t('uploadingImage'), {
        id: 'image-upload',
      });
    } else {
      toast.dismiss('image-upload');
    }
  }, [isUploading, t]);

  const handleRemoveImage = () => {
    setImagePreview('');
    setImageUrl('');
    setFileName('');
  };

  // navigation
  useEffect(() => {
    if (state.success) {
      toast.success(t('successMessage'));
      router.push('/dashboard/products');
    }
  }, [router, state.success, t]);

  return (
    <section className="max-w-215">
      <div className="mb-8">
        <h1 className="text-[31px] leading-10 font-semibold text-[#142237]">{t('title')}</h1>
        <p className="mt-2 max-w-165 text-[15px] leading-6 text-[#667085]">{t('subtitle')}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] font-bold tracking-wide text-[#6f7783] uppercase">
          <span>{t('dashboard')}</span>
          <span>/</span>
          <Link href={`/${locale}/dashboard/products`}>{t('products')}</Link>
          <span>/</span>
          <span className="text-primary-400 hover:text-primary-500">{t('title')}</span>
        </div>
      </div>

      <form
        action={formAction}
        method="post"
        encType="multipart/form-data"
        noValidate
        className="space-y-6"
      >
        <input type="hidden" name="status" value={initialProduct?.status ?? 'ACTIVE'} />
        {initialProduct?.id ? <input type="hidden" name="productId" value={initialProduct.id} /> : null}

        <Panel title={t('productInfo')}>
          <div className="space-y-5">
            <Field label={t('productName')} error={state.errors?.name}>
              <Input name="name" placeholder={t('productNamePlaceholder')} defaultValue={initialProduct?.name} />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t('productNameFarsi')}>
                <Input name="nameFarsi" placeholder={t('productNamePlaceholderFarsi')} defaultValue={initialProduct?.nameFarsi ?? ''} />
              </Field>

              <Field label={t('productNamePashto')}>
                <Input name="namePashto" placeholder={t('productNamePlaceholderPashto')} defaultValue={initialProduct?.namePashto ?? ''} />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t('productType')} error={state.errors?.category}>
                <div className="relative">
                  <select
                    name="category"
                    defaultValue={initialProduct?.category ?? 'SOLAR_PANEL'}
                    className="h-12 w-full cursor-pointer appearance-none rounded-md border border-[#dfe4ea] bg-white px-4 text-[15px] text-[#2f3746] transition outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400"
                  >
                    <option value="SOLAR_PANEL">{t('solarPanel')}</option>
                    <option value="BATTERY">{t('battery')}</option>
                    <option value="INVERTER">{t('inverter')}</option>
                    <option value="ACCESSORY">{t('accessory')}</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-3.5 right-2 size-5 text-gray-500" />
                </div>
              </Field>

              <Field label={t('sku')} error={state.errors?.sku}>
                <Input name="sku" placeholder={t('skuPlaceholder')} defaultValue={initialProduct?.sku} />
              </Field>
            </div>

            <Field label={t('brand')} error={state.errors?.brand}>
              <Input name="brand" placeholder={t('brandPlaceholder')} defaultValue={initialProduct?.brand} />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t('brandFarsi')}>
                <Input name="brandFarsi" placeholder={t('brandPlaceholderFarsi')} defaultValue={initialProduct?.brandFarsi ?? ''} />
              </Field>

              <Field label={t('brandPashto')}>
                <Input name="brandPashto" placeholder={t('brandPlaceholderPashto')} defaultValue={initialProduct?.brandPashto ?? ''} />
              </Field>
            </div>

            <Field label={t('productImage')} error={state.errors?.imageUrl}>
              {/* Dropzone Container */}
              <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-slate-300 bg-secondary-50">
                {imagePreview
                  ? (
                      <div className="relative flex items-center justify-center rounded-md p-8">
                        <Image
                          width={100}
                          height={100}
                          src={imagePreview}
                          alt="Product preview"
                          className=" size-40 object-cover"
                        />

                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-3 right-3 cursor-pointer rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
                        >
                          Remove
                        </button>

                        <input
                          type="hidden"
                          name="imageUrl"
                          value={imageUrl}
                        />
                      </div>
                    )
                  : (
                      <div className="relative flex flex-col items-center justify-center p-8 text-center">
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleFileChange}
                          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                        />

                        <input
                          type="hidden"
                          name="imageUrl"
                          value={imageUrl}
                        />

                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100/30">
                          <UploadCloud
                            className="h-7 w-7 text-primary-500"
                            strokeWidth={2.5}
                          />
                        </div>

                        <h3 className="mb-1 text-[15px] font-semibold text-slate-900">
                          {t('upload') || 'Upload Product Image'}
                        </h3>

                        <p className="mb-4 text-sm text-slate-500">
                          Drag & drop or
                          {' '}
                          <span className="font-medium text-primary-400 underline">
                            {t('browse') || 'browse'}
                          </span>
                        </p>

                        <span className="inline-block rounded-full bg-secondary-100 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-600">
                          PNG, JPG, WEBP • MAX 2MB
                        </span>
                      </div>
                    )}
              </div>

              {/* Dynamic Success/Hint message below the dropzone */}
              <Hint>
                {fileName ? `${t('imageFileSelected')}: ${fileName}` : t('imageHint')}
              </Hint>
            </Field>

            <Field label={t('description')} error={state.errors?.description}>
              <Textarea name="description" placeholder={t('descriptionDefault')} defaultValue={initialProduct?.description ?? ''} />
            </Field>

            <Field label={t('descriptionFarsi')}>
              <Textarea name="descriptionFarsi" placeholder={t('descriptionDefaultFarsi')} defaultValue={initialProduct?.descriptionFarsi ?? ''} />
            </Field>

            <Field label={t('descriptionPashto')}>
              <Textarea name="descriptionPashto" placeholder={t('descriptionDefaultPashto')} defaultValue={initialProduct?.descriptionPashto ?? ''} />
            </Field>
          </div>
        </Panel>

        {/* product Specifications */}
        <Panel title={t('quickInfo')}>
          <div className="grid gap-5 sm:grid-cols-4">
            <Field label={t('ratedPower')}>
              <Input name="powerW" placeholder={t('ratedPowerPlaceholder')} defaultValue={initialProduct?.powerW ?? ''} />
            </Field>
            <Field label={t('technology')}>
              <Input name="productType" placeholder={t('technologyPlaceholder')} defaultValue={initialProduct?.type ?? ''} />
            </Field>
            <Field label={t('efficiency')}>
              <Input name="efficiency" placeholder={t('efficiencyPlaceholder')} defaultValue={initialProduct?.efficiency ?? ''} />
            </Field>
            <Field label={t('warranty')}>
              <Input name="warranty" placeholder={t('warrantyPlaceholder')} defaultValue={initialProduct?.warranty ?? ''} />
            </Field>
          </div>
          <p className="mt-4 text-[12px] leading-5 text-[#667085]">{t('quickInfoHint')}</p>
        </Panel>

        {/* product features */}
        <Panel
          title={t('productFeatures')}
          action={(
            <button
              type="button"
              onClick={() => setFeatures(current => [...current, { id: crypto.randomUUID(), name: '', value: '' }])}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md border border-[#dfe4ea] bg-white px-4 text-[13px] font-semibold text-primary-400 transition hover:border-primary-400 hover:text-primary-600"
            >
              <Plus size={16} />
              {t('addFeature')}
            </button>
          )}
        >
          <ProductFeatureList features={features} setFeatures={setFeatures} />
        </Panel>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href={`/${locale}/dashboard/products`}
            className="inline-flex h-12 min-w-37 items-center justify-center rounded-md border border-[#dfe4ea] bg-white px-6 text-[14px] font-medium text-[#344054] transition hover:border-primary-400 hover:text-primary-600"
          >
            {t('cancel')}
          </Link>
          <SubmitButton
            label={initialProduct?.id ? t('update') : t('create')}
            loadingLabel={initialProduct?.id ? t('updating') : t('creating')}
            disabled={isUploading}
          />
        </div>
      </form>
    </section>
  );
}
