import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content/site';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const site = await getSiteContent(lang);
  return (
    <main>
      <Hero lang={lang} content={site.hero} />
      <Stats stats={site.stats} />
    </main>
  );
}
