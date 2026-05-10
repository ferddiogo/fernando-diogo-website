import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { SiteContent } from '@/lib/content/site';

export function DataInsights({ lang, content }: { lang: Locale; content: SiteContent['dataInsights'] }) {
  return (
    <section className="py-24">
      <Container size="wide">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <ScrollReveal>
              <SectionTitle eyebrow={content.eyebrow} description={content.body}>
                {content.title}
              </SectionTitle>
              <Button
                href={`${pathFor(lang, 'projects')}?category=data-intelligence`}
                variant="secondary"
                className="mt-6"
              >
                {content.cta} →
              </Button>
            </ScrollReveal>
          </div>
          <div className="md:col-span-7">
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-line">
                <Image
                  src={content.image}
                  alt="Dashboard preview"
                  fill
                  sizes="60vw"
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-accent text-white text-[0.65rem] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-display">
                  PowerBI
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
