import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from '@/components/contact/ContactForm';
import { isLocale, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { getSiteContent } from '@/lib/content/site';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { buildAlternates } from '@/lib/i18n/alternates';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const HEADINGS = {
  pt: { title: 'Vamos falar', desc: 'Conta-me sobre a oportunidade ou projeto. Respondo em 24h.' },
  en: { title: "Let's talk", desc: 'Tell me about the opportunity or project. I reply within 24 hours.' },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const h = HEADINGS[lang];
  return {
    title: `${h.title} — Fernando Diogo`,
    description: h.desc,
    alternates: buildAlternates('/contact', lang),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const site = await getSiteContent(lang);
  const h = HEADINGS[lang];

  return (
    <main className="py-20">
      <Container size="wide">
        <SectionTitle description={h.desc}>{h.title}</SectionTitle>
        <div className="mt-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-6">
            <a href={`mailto:${site.social.email}`} className="flex items-center gap-3 hover:text-accent transition-colors">
              <Mail size={20} /><span>{site.social.email}</span>
            </a>
            <a href={`https://wa.me/${site.social.whatsapp.replace(/\D/g, '')}`} className="flex items-center gap-3 hover:text-accent transition-colors" target="_blank" rel="noreferrer">
              <Phone size={20} /><span>{site.social.whatsapp}</span>
            </a>
            <a href={site.social.linkedin} className="flex items-center gap-3 hover:text-accent transition-colors" target="_blank" rel="noreferrer">
              <ExternalLink size={20} /><span>LinkedIn</span>
            </a>
            <a href={site.social.instagram} className="flex items-center gap-3 hover:text-accent transition-colors" target="_blank" rel="noreferrer">
              <ExternalLink size={20} /><span>Instagram</span>
            </a>
          </div>
          <div className="md:col-span-7">
            <ContactForm dict={dict} recipientEmail={site.social.email} />
          </div>
        </div>
      </Container>
    </main>
  );
}
