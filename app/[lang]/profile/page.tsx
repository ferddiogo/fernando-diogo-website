import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, LOCALES, type Locale } from '@/lib/i18n/config';
import { getProfile } from '@/lib/content/profile';
import { buildAlternates } from '@/lib/i18n/alternates';
import { ProfileHero } from '@/components/profile/ProfileHero';
import { SkillsGrid } from '@/components/profile/SkillsGrid';
import { Languages } from '@/components/profile/Languages';
import { Education } from '@/components/profile/Education';
import { ProfileClosingCta } from '@/components/profile/ProfileClosingCta';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const TITLES = {
  pt: 'Perfil',
  en: 'Profile',
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const data = await getProfile(lang);
  return {
    title: `${TITLES[lang]} — Fernando Diogo`,
    description: data.hero.subtitle,
    alternates: buildAlternates('/profile', lang),
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const data = await getProfile(lang as Locale);

  return (
    <main>
      <ProfileHero content={data.hero} />
      <SkillsGrid content={data.skills} />
      <Languages content={data.languages} />
      <Education content={data.education} />
      <ProfileClosingCta
        lang={lang as Locale}
        content={data.closingCta}
        cvFile={data.hero.cvFile}
        cvFilename={data.hero.cvFilename}
      />
    </main>
  );
}
