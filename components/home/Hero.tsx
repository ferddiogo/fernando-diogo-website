import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { SiteContent } from '@/lib/content/site';

export function Hero({ lang, content }: { lang: Locale; content: SiteContent['hero'] }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      <Container size="wide">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-6 lg:col-span-5">
            <ScrollReveal>
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05]">
                {content.headline}
                {content.sublineLine1 && (
                  <span className="block text-ink-muted">{content.sublineLine1}</span>
                )}
              </h1>
              <p className="mt-6 text-base md:text-lg text-ink-muted max-w-md leading-relaxed">
                {content.subline}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Button href={pathFor(lang, 'contact')} variant="primary" size="lg">
                  {content.cta}
                </Button>
                <Button href={pathFor(lang, 'projects')} variant="ghost">
                  {lang === 'pt' ? 'Ver trabalhos' : 'See work'} →
                </Button>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-6 lg:col-span-7 relative">
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-bg-elev">
                <Image
                  src="/images/hero/hero-architecture.jpg"
                  alt="Featured architecture"
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-bg-base/90 backdrop-blur rounded-md px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-display text-[0.65rem] tracking-[0.2em] uppercase text-ink-muted">
                    {lang === 'pt' ? 'Em destaque' : 'Featured'}
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 bg-bg-base rounded-xl p-4 max-w-[200px] shadow-xl">
                  <div className="font-display font-bold text-ink">
                    {content.featuredProjectChip.title}
                  </div>
                  <div className="text-xs text-ink-muted mt-1">
                    {content.featuredProjectChip.subtitle}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
