import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { SiteContent } from '@/lib/content/site';

export function ContactCTA({ lang, content }: { lang: Locale; content: SiteContent['contactCta'] }) {
  return (
    <section className="py-24 bg-bg-deep text-ink-inverse">
      <Container size="wide">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight max-w-2xl">
                {content.title}
              </h2>
              <p className="mt-4 text-ink-soft text-lg max-w-md">{content.subtitle}</p>
            </div>
            <Button
              href={pathFor(lang, 'contact')}
              variant="primary"
              size="lg"
              className="bg-accent hover:bg-accent-hover"
            >
              {content.cta} →
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
