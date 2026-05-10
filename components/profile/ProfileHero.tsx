import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Download, ArrowDown } from 'lucide-react';
import type { ProfileContent } from '@/lib/content/profile';

export function ProfileHero({ content }: { content: ProfileContent['hero'] }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden">
      <Container size="wide">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="md:col-span-7">
            <ScrollReveal>
              <div className="text-xs tracking-[0.22em] uppercase font-display text-accent mb-6">
                {content.eyebrow}
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05]">
                {content.title}{' '}
                <span className="text-ink-muted">{content.titleAccent}</span>
              </h1>
              <p className="mt-8 text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
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
          </div>

          <div className="md:col-span-5">
            <ScrollReveal delay={0.1}>
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-bg-elev">
                  <Image
                    src="/images/about/portrait.jpg"
                    alt="Fernando Diogo"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-bg-base border border-line rounded-xl px-5 py-3 shadow-xl">
                  <div className="text-[0.65rem] tracking-[0.2em] uppercase font-display text-ink-soft">Disponível</div>
                  <div className="mt-1 flex items-center gap-2 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    Portugal · Europa
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
