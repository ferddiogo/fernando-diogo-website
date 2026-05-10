import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Download, ArrowDown } from 'lucide-react';
import type { ProfileContent } from '@/lib/content/profile';

export function ProfileHero({ content }: { content: ProfileContent['hero'] }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <Container size="wide">
        <ScrollReveal>
          <div className="text-xs tracking-[0.22em] uppercase font-display text-accent mb-6">
            {content.eyebrow}
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-ink leading-[1.05] max-w-5xl">
            {content.title}{' '}
            <span className="text-ink-muted">{content.titleAccent}</span>
          </h1>
          <p className="mt-8 text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">
            {content.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={content.cvFile}
              download={content.cvFilename}
              className="group inline-flex items-center gap-3 bg-bg-deep text-ink-inverse hover:bg-steel transition-all duration-200 rounded-full px-7 py-4 text-base font-medium"
            >
              <Download size={18} className="transition-transform group-hover:translate-y-0.5" />
              <span>{content.cvButton}</span>
              <span className="hidden md:inline text-xs text-ink-soft border-l border-white/20 pl-3 ml-1">PDF</span>
            </a>
            <a
              href="#skills"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-accent transition-colors"
            >
              <span>Ver capacidades</span>
              <ArrowDown size={14} />
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
