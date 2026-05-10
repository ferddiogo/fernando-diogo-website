import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Locale } from '@/lib/i18n/config';

export type Hobby = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export type HobbiesContent = {
  intro: string;
  items: Hobby[];
};

export async function getHobbies(lang: Locale): Promise<HobbiesContent> {
  const file = join(process.cwd(), 'content', 'hobbies', `${lang}.json`);
  return JSON.parse(readFileSync(file, 'utf8'));
}
