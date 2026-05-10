import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { BarChart3 } from 'lucide-react';
import type { Locale } from '@/lib/i18n/config';

type Props = {
  lang: Locale;
  embed: string | undefined;
  fallbackImage: string;
  title: string;
};

const STRINGS = {
  pt: {
    eyebrow: 'Dashboard Interativo',
    placeholderTitle: 'Dashboard interativo em breve',
    placeholderBody: 'Painel Power BI a ser publicado em breve. Assim que o link estiver disponível, vai substituir esta imagem com filtros, slicers e drill-down totalmente funcionais.',
    iframeLabel: 'Power BI dashboard',
  },
  en: {
    eyebrow: 'Interactive Dashboard',
    placeholderTitle: 'Interactive dashboard coming soon',
    placeholderBody: 'Power BI panel published below. Once the link is available, it replaces the image with fully functional filters, slicers, and drill-down.',
    iframeLabel: 'Power BI dashboard',
  },
} as const;

function isHttpUrl(s: string | undefined): s is string {
  return typeof s === 'string' && /^https?:\/\//i.test(s);
}

export function DashboardEmbed({ lang, embed, fallbackImage, title }: Props) {
  const t = STRINGS[lang];

  return (
    <section className="py-16 bg-bg-elev">
      <Container size="wide">
        <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase font-display text-accent mb-4">
          <BarChart3 size={14} />
          <span>{t.eyebrow}</span>
        </div>

        {isHttpUrl(embed) ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-line bg-bg-base">
            <iframe
              src={embed}
              title={`${t.iframeLabel} — ${title}`}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              frameBorder={0}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-line">
            <Image src={fallbackImage} alt={title} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-bg-deep/20 to-transparent flex items-end">
              <div className="p-8 md:p-12 text-ink-inverse max-w-xl">
                <h3 className="font-display font-bold text-2xl md:text-3xl">{t.placeholderTitle}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{t.placeholderBody}</p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
