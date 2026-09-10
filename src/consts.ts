export const SITE = {
  url: 'https://shpvk.pages.dev',

  author: 'Yehor Holotov',
  themeColor: '#f6f8fc',
} as const;

export const LOCALES = ['en', 'uk'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, { short: string; full: string; htmlLang: string }> = {
  en: { short: 'EN', full: 'English', htmlLang: 'en' },
  uk: { short: 'UA', full: 'Українська', htmlLang: 'uk' },
};

export const LINKS = {
  email: 'shpvkcontact@gmail.com',
  github: 'https://github.com/shpvk',
  linkedin: null as string | null,
  telegram: null as string | null,
} as const;

export const SECTIONS = ['about', 'skills', 'experience', 'projects', 'contact'] as const;
export type SectionId = (typeof SECTIONS)[number];
