import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Locale } from '@/lib/i18n/config';

export type SkillCategory = {
  title: string;
  items: string[];
};

export type LanguageItem = {
  name: string;
  level: string;
  proficiency: number;
};

export type EducationItem = {
  period: string;
  title: string;
  institution: string;
  description: string;
};

export type ProfileContent = {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    cvButton: string;
    cvFile: string;
    cvFilename: string;
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    categories: SkillCategory[];
  };
  languages: {
    eyebrow: string;
    title: string;
    items: LanguageItem[];
  };
  education: {
    eyebrow: string;
    title: string;
    items: EducationItem[];
  };
  closingCta: {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export async function getProfile(lang: Locale): Promise<ProfileContent> {
  const file = join(process.cwd(), 'content', 'profile', `${lang}.json`);
  return JSON.parse(readFileSync(file, 'utf8'));
}
