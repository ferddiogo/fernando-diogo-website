import 'server-only';
import type { Locale } from './config';

const dictionaries = {
  pt: () => import('@/content/ui/pt.json').then((m) => m.default),
  en: () => import('@/content/ui/en.json').then((m) => m.default),
};

export type UIDict = Awaited<ReturnType<typeof dictionaries['pt']>>;

export async function getDictionary(lang: Locale): Promise<UIDict> {
  return dictionaries[lang]();
}
