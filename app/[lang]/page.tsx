import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content/site';
import { buildAlternates } from '@/lib/i18n/alternates';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { DualSpecialty } from '@/components/home/DualSpecialty';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { DataInsights } from '@/components/home/DataInsights';
import { About } from '@/components/home/About';
import { ContactCTA } from '@/components/home/ContactCTA';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const site = await getSiteContent(lang);
  return {
    title: `Fernando Diogo — ${lang === 'pt' ? 'Arquitetura · Inteligência Imobiliária' : 'Architecture · Real Estate Intelligence'}`,
    description: site.hero.subline,
    alternates: buildAlternates('', lang),
    openGraph: {
      title: 'Fernando Diogo',
      description: site.hero.subline,
      type: 'website',
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const site = await getSiteContent(lang);
  return (
    <main>
      <Hero lang={lang} content={site.hero} />
      <Stats stats={site.stats} />
      <DualSpecialty lang={lang} content={site.dualSpecialty} />
      <FeaturedProjects lang={lang} content={site.featured} />
      <DataInsights lang={lang} content={site.dataInsights} />
      <About content={site.about} />
      <ContactCTA lang={lang} content={site.contactCta} />
    </main>
  );
}
