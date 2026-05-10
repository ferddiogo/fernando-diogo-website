import { notFound } from 'next/navigation';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';

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
    <>
      <Header lang={lang} />
      {children}
    </>
  );
}

export const dynamicParams = false;
