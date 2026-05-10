import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/dictionary';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <main className="min-h-screen p-12">
      <h1 className="font-display text-5xl">{dict.nav.home}</h1>
      <p className="mt-4 text-ink-muted">Locale: {lang}</p>
    </main>
  );
}
