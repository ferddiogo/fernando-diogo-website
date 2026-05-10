export const LOCALES = ['pt', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt';

export const NAV_PATHS = {
  home: '',
  projects: 'projects',
  profile: 'profile',
  hobbies: 'hobbies',
  contact: 'contact',
} as const;

export type NavKey = keyof typeof NAV_PATHS;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function pathFor(lang: Locale, key: NavKey): string {
  const segment = NAV_PATHS[key];
  return segment ? `/${lang}/${segment}` : `/${lang}`;
}
