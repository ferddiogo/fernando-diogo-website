import { notFound } from 'next/navigation';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { AppMotionConfig } from '@/components/ui/MotionConfig';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <AppMotionConfig>
      <Header lang={lang} />
      <PageTransition>{children}</PageTransition>
      <Footer lang={lang} />
    </AppMotionConfig>
  );
}

export const dynamicParams = false;
