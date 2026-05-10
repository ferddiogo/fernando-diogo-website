import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Download } from 'lucide-react';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { ProfileContent } from '@/lib/content/profile';

type Props = {
  lang: Locale;
  content: ProfileContent['closingCta'];
  cvFile: string;
  cvFilename: string;
};

export function ProfileClosingCta({ lang, content, cvFile, cvFilename }: Props) {
  return (
    <section className="py-24 bg-bg-deep text-ink-inverse">
      <Container size="wide">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight">{content.title}</h2>
              <p className="mt-4 text-ink-soft text-lg max-w-md">{content.subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={cvFile}
                download={cvFilename}
                className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover transition-colors rounded-full px-7 py-4 text-base font-medium text-white"
              >
                <Download size={18} />
                <span>{content.secondaryCta}</span>
              </a>
              <a
                href={pathFor(lang, 'contact')}
                className="inline-flex items-center gap-2 border border-white/30 hover:border-accent hover:text-accent transition-colors rounded-full px-7 py-4 text-base font-medium"
              >
                {content.primaryCta} →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
