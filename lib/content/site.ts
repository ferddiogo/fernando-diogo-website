import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Locale } from '@/lib/i18n/config';

export type SiteContent = {
  hero: {
    headline: string;
    sublineLine1?: string;
    subline: string;
    cta: string;
    featuredProjectChip: { title: string; subtitle: string };
  };
  stats: { value: string; label: string }[];
  dualSpecialty: {
    title: string;
    left: { kicker: string; title: string; body: string; cta: string };
    right: { kicker: string; title: string; body: string; cta: string };
  };
  featured: { eyebrow: string; title: string; description: string };
  dataInsights: { eyebrow: string; title: string; body: string; image: string; cta: string };
  about: { eyebrow: string; title: string; body: string; image: string };
  testimonials: { quote: string; author: string; role: string }[];
  contactCta: { title: string; subtitle: string; cta: string };
  social: { email: string; whatsapp: string; linkedin: string; instagram: string };
};

export async function getSiteContent(lang: Locale): Promise<SiteContent> {
  const file = join(process.cwd(), 'content', 'site', `${lang}.json`);
  return JSON.parse(readFileSync(file, 'utf8'));
}
