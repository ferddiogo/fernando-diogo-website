import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n/config';
import { getProjectSlugs } from '@/lib/content/projects';

const BASE = 'https://fernandodiogo.com';
const STATIC_PATHS = ['', '/projects', '/profile', '/hobbies', '/contact'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({ url: `${BASE}/${lang}${path}`, lastModified: new Date() });
    }
    for (const slug of slugs) {
      entries.push({ url: `${BASE}/${lang}/projects/${slug}`, lastModified: new Date() });
    }
  }
  return entries;
}
