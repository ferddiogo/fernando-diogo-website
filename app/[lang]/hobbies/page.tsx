import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HobbyCard } from '@/components/hobbies/HobbyCard';
import { isLocale, LOCALES } from '@/lib/i18n/config';
import { getHobbies } from '@/lib/content/hobbies';
import { buildAlternates } from '@/lib/i18n/alternates';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const HEADINGS = {
  pt: 'Hobbies',
  en: 'Hobbies',
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const data = await getHobbies(lang);
  return {
    title: `${HEADINGS[lang]} — Fernando Diogo`,
    description: data.intro,
    alternates: buildAlternates('/hobbies', lang),
  };
}

export default async function HobbiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const data = await getHobbies(lang);

  return (
    <main className="py-20">
      <Container size="wide">
        <SectionTitle description={data.intro}>{HEADINGS[lang]}</SectionTitle>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.items.map((hobby, i) => (
            <ScrollReveal key={hobby.slug} delay={(i % 3) * 0.08}>
              <HobbyCard hobby={hobby} size="tall" />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </main>
  );
}
