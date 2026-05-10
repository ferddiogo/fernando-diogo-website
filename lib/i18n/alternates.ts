import { LOCALES, type Locale } from './config';

export function buildAlternates(path: string, currentLang: Locale, baseUrl = 'https://fernandodiogo.com') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const languages: Record<string, string> = {};
  for (const lang of LOCALES) {
    languages[lang] = `${baseUrl}/${lang}${cleanPath}`;
  }
  languages['x-default'] = `${baseUrl}/pt${cleanPath}`;
  return {
    canonical: `${baseUrl}/${currentLang}${cleanPath}`,
    languages,
  };
}
