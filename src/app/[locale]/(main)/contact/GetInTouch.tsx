'use client';

import { countries } from 'countries-list';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import PhoneChatIcon from '../_components/icons/PhoneChatIcon';

const countryData = Object.entries(countries)
  .map(([code, country]) => {
    const rawPhone = Array.isArray(country.phone) ? country.phone[0] : country.phone;
    return {
      code,
      name: country.name,
      dialCode: `+${rawPhone}`,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  company: string;
  message: string;
  privacy: boolean;
};

export default function GetInTouch() {
  const t = useTranslations('contact.getInTouch');
  const locale = useLocale();
  const isRTL = locale === 'fa' || locale === 'ps';
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const countryInfo = countryData.find(country => country.code === data.country);
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        country: countryInfo?.name ?? data.country,
      }),
    });

    if (response.status === 429) {
      toast.error(t('status.rateLimited'));
      return;
    }

    if (!response.ok) {
      toast.error(t('status.error'));
      return;
    }

    toast.success(t('status.success'));
    reset();
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryCode = e.target.value;
    const countryInfo = countryData.find(c => c.code === selectedCountryCode);
    if (countryInfo) {
      setValue('phone', countryInfo.dialCode, { shouldValidate: true });
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-360 px-4 md:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-6">
          <div className="order-2 rounded-sm border border-[#E4E4E4] bg-[#F9FAFB] px-4 py-6 shadow-[0px_8px_24px_rgba(8,15,52,0.03)] lg:order-1">
            <div className="flex flex-col">
              <h2 className="mb-10 text-[24px] font-semibold text-[#131313]">
                {t('title')}
              </h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#F1F9FF] text-[#00496E]">
                    <MapPin className="h-4.5 w-4.5" strokeWidth={2} />
                  </div>
                  <p className="text-[16px] leading-loose text-[#000000]">
                    {t('address')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#EEF3F6] text-[#005B89]">
                    <Phone className="h-4.5 w-4.5" strokeWidth={2} />
                  </div>

                  <a
                    href="tel:+93799377070"
                    dir="ltr"
                    className="inline-block text-[16px] text-[#000000]"
                  >
                    +93799377070 - +93747702507
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#EEF3F6] text-[#005B89]">
                    <PhoneChatIcon size={18} />
                  </div>

                  <a
                    href="https://wa.me/93799377070"
                    dir="ltr"
                    className="inline-block text-[16px] text-[#000000]"
                  >
                    +93799377070 - +93747702507
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#EEF3F6] text-[#005B89]">
                    <Mail className="h-4.5 w-4.5" strokeWidth={2} />
                  </div>
                  <a
                    href="mailto:info@hewadwalsolarltd.com"
                    className="text-[16px] text-[#000000]"
                  >
                    info@hewadwalsolarltd.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 w-full rounded-sm border border-[hsl(0,0%,89%)] bg-[#F9FAFB] px-4 py-6 shadow-[0px_8px_24px_rgba(8,15,52,0.03)] lg:order-2">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-2xl font-medium text-[#131313]">{t('formTitle')}</p>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className="text-sm font-semibold text-[#344054]">{t('firstName')}</label>
                  <input
                    id="firstName"
                    type="text"
                    {...register('firstName', { required: t('errors.firstName') })}
                    placeholder={t('placeholders.firstName')}
                    className={`rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:ring-2 focus:outline-none ${
                      errors.firstName ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
                    }`}
                  />
                  {errors.firstName && <span className="text-[12px] font-medium text-red-500">{errors.firstName.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className="text-sm font-semibold text-[#344054]">{t('lastName')}</label>
                  <input
                    id="lastName"
                    type="text"
                    {...register('lastName', { required: t('errors.lastName') })}
                    placeholder={t('placeholders.lastName')}
                    className={`rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:ring-2 focus:outline-none ${
                      errors.lastName ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
                    }`}
                  />
                  {errors.lastName && <span className="text-[12px] font-medium text-red-500">{errors.lastName.message}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-[#344054]">{t('email')}</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: t('errors.emailRequired'),
                      pattern: { value: /^\S[^\s@]*@\S+$/, message: t('errors.emailInvalid') },
                    })}
                    placeholder={t('placeholders.email')}
                    className={`rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:ring-2 focus:outline-none ${
                      errors.email ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
                    }`}
                  />
                  {errors.email && <span className="text-[12px] font-medium text-red-500">{errors.email.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="country" className="text-sm font-semibold text-[#344054]">{t('country')}</label>
                  <select
                    id="country"
                    dir={isRTL ? 'rtl' : 'ltr'}
                    {...register('country', {
                      required: t('errors.country'),
                      onChange: handleCountryChange,
                    })}
                    defaultValue=""
                    className={`appearance-none rounded-sm border bg-[#F9FAFB]
    bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')]
    bg-size-[0.7em_auto]
    bg-no-repeat
    ${isRTL ? 'bg-position-[left_1rem_center] pr-4 pl-10 text-right' : 'bg-position-[right_1rem_center] pr-10 pl-4 text-left'}
    py-3 text-sm transition-all focus:ring-2 focus:outline-none
    ${
    errors.country
      ? 'border-red-500 focus:ring-red-100'
      : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
    }`}
                  >
                    <option value="" disabled hidden>
                      {t('placeholders.country')}
                    </option>

                    {countryData.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && <span className="text-[12px] font-medium text-red-500">{errors.country.message}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-sm font-semibold text-[#344054]">{t('company')}</label>
                  <input
                    id="company"
                    type="text"
                    {...register('company', { required: t('errors.company') })}
                    placeholder={t('placeholders.company')}
                    className={`rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:ring-2 focus:outline-none ${
                      errors.company ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
                    }`}
                  />
                  {errors.company && <span className="text-[12px] font-medium text-red-500">{errors.company.message}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-[#344054]">{t('phone')}</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', { required: t('errors.phone') })}
                    placeholder={t('placeholders.phone')}
                    className={`rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:ring-2 focus:outline-none ${
                      errors.phone ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
                    }`}
                  />
                  {errors.phone && <span className="text-[12px] font-medium text-red-500">{errors.phone.message}</span>}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-semibold text-[#344054]">{t('message')}</label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message', { required: t('errors.message') })}
                  placeholder={t('placeholders.message')}
                  className={`resize-none rounded-sm border bg-[#F9FAFB] px-4 py-3 text-sm transition-all focus:ring-2 focus:outline-none ${
                    errors.message ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#006699] focus:ring-blue-50'
                  }`}
                />
                {errors.message && <span className="text-[12px] font-medium text-red-500">{errors.message.message}</span>}
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    {...register('privacy', { required: t('errors.privacy') })}
                    className="h-5 w-5 rounded border-gray-300 text-[#006699] focus:ring-[#006699]"
                  />
                  <label htmlFor="privacy" className="cursor-pointer text-[14px] text-gray-600">
                    {t('privacy')}
                    <Link href={`/${locale}/privacy-policy`} className="mr-1 ml-1 border-b border-primary-400 hover:text-primary-400">{t('privacyPolicy')}</Link>
                  </label>
                </div>
                {errors.privacy && <span className="text-[12px] font-medium text-red-500">{t('errors.privacy')}</span>}
              </div>
              <div className="mt-2 text-left">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer rounded-sm bg-[#006699] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#005580] active:scale-[0.98]"
                >
                  {isSubmitting ? t('status.sending') : t('submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
