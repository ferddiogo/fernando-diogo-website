import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { ProfileContent } from '@/lib/content/profile';

export function Education({ content }: { content: ProfileContent['education'] }) {
  return (
    <section className="py-24 bg-bg-elev border-y border-line">
      <Container size="default">
        <ScrollReveal>
          <SectionTitle eyebrow={content.eyebrow}>{content.title}</SectionTitle>
        </ScrollReveal>

        <ol className="mt-16 relative">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-line-strong" aria-hidden />
          {content.items.map((item, i) => (
            <ScrollReveal key={`${item.period}-${item.title}`} delay={i * 0.06}>
              <li className="relative pl-10 pb-10 last:pb-0">
                <span className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-bg-base border-2 border-accent" />
                <div className="text-xs tracking-[0.22em] uppercase font-display text-ink-soft">{item.period}</div>
                <h3 className="mt-2 font-display font-bold text-xl md:text-2xl">{item.title}</h3>
                <div className="mt-1 text-sm text-accent font-medium">{item.institution}</div>
                <p className="mt-3 text-ink-muted leading-relaxed max-w-2xl">{item.description}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
