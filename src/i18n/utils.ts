import { DEFAULT_LOCALE, LOCALES, type Locale } from '~/consts';
import { ui, type UIKey } from './ui';

export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  if (LOCALES.includes(first as Locale)) {
    return first as Locale;
  } else {
    return DEFAULT_LOCALE;
  }
}

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[DEFAULT_LOCALE][key];
  };
}

export function localizePath(path: string, locale: Locale): string {
  let clean: string;
  if (path.startsWith('/')) {
    clean = path;
  } else {
    clean = `/${path}`;
  }
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean}`;
}

export function switchLocalePath(url: URL, target: Locale): string {
  const segments = url.pathname.split('/').filter(Boolean);
  if (LOCALES.includes(segments[0] as Locale)) segments.shift();
  let rest: string;
  if (segments.length) {
    rest = `/${segments.join('/')}/`;
  } else {
    rest = '/';
  }
  return localizePath(rest, target) + url.hash;
}

export function alternateLinks(url: URL, site: string | URL | undefined) {
  let base: string;
  if (site) {
    base = new URL(site).origin;
  } else {
    base = url.origin;
  }
  return LOCALES.map((locale) => ({
    locale,
    href: new URL(switchLocalePath(url, locale), base).href,
  }));
}
