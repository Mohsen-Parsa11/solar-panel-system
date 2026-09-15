'use client';

import { useTranslations } from 'next-intl';

const sections = [
  'introduction',
  'informationCollection',
  'informationUsage',
  'informationSharing',
  'security',
  'retention',
  'rights',
  'contact',
];

export default function PrivacyPolicy() {
  const t = useTranslations('privacyPolicy');

  return (
    <div className="wrapper py-10">
      <h1 className="mb-5 text-2xl font-bold lg:text-3xl">
        {t('title')}
      </h1>

      <div className="space-y-6">
        {sections.map((section) => {
          const base = `sections.${section}`;

          const title = t(`${base}.title`);

          let description = '';

          if (t.has(`${base}.description`)) {
            description = t(`${base}.description`);
          }

          const rawItems = (() => {
            try {
              return t.raw(`${base}.items`);
            } catch {
              return [];
            }
          })();

          const items = Array.isArray(rawItems) ? rawItems : [];
          return (
            <section
              key={section}
              className="py-3 sm:px-6"
            >
              <h2 className="mb-4 text-2xl font-semibold">
                {title}
              </h2>

              {description && (
                <p className="mb-4 leading-7 text-gray-600">
                  {description}
                </p>
              )}

              {items.length > 0 && (
                <ul className="space-y-2">
                  {items.map(item => (
                    <li
                      key={item}
                      className="flex gap-3 text-gray-700"
                    >
                      <span className="mt-2 size-2 shrink-0 rounded-full bg-primary-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
