import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowUpRight } from 'lucide-react';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { SiteContent } from '@/lib/content/site';

type CardProps = {
  accent: 'steel' | 'accent';
  data: { kicker: string; title: string; body: string; cta: string };
  href: string;
};

function SpecialtyCard({ accent, data, href }: CardProps) {
  const kickerClass = accent === 'accent' ? 'text-accent' : 'text-steel';
  const borderHover = accent === 'accent' ? 'hover:border-accent' : 'hover:border-steel';

  return (
    <Link href={href} className="block group h-full">
      <div
        className={`bg-bg-elev rounded-3xl p-8 md:p-10 h-full border border-line ${borderHover} transition-colors`}
      >
        <div className={`text-xs tracking-[0.22em] uppercase font-display ${kickerClass}`}>
          {data.kicker}
        </div>
        <h3 className="font-display font-bold text-2xl md:text-3xl mt-4 leading-tight">{data.title}</h3>
        <p className="mt-4 text-ink-muted leading-relaxed">{data.body}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium group-hover:text-accent transition-colors">
          {data.cta} <ArrowUpRight size={16} />
        </div>
      </div>
    </Link>
  );
}

export function DualSpecialty({ lang, content }: { lang: Locale; content: SiteContent['dualSpecialty'] }) {
  return (
    <section className="py-24">
      <Container size="wide">
        <ScrollReveal>
          <SectionTitle eyebrow={lang === 'pt' ? 'Especialidades' : 'Specialties'}>
            {content.title}
          </SectionTitle>
        </ScrollReveal>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <ScrollReveal delay={0.1}>
            <SpecialtyCard
              accent="steel"
              data={content.left}
              href={`${pathFor(lang, 'projects')}?category=architecture`}
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <SpecialtyCard
              accent="accent"
              data={content.right}
              href={`${pathFor(lang, 'projects')}?category=data-intelligence`}
            />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
