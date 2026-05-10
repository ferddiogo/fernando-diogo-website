import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CountUp } from '@/components/ui/CountUp';
import type { SiteContent } from '@/lib/content/site';

export function Stats({ stats }: { stats: SiteContent['stats'] }) {
  return (
    <section className="py-20 border-y border-line">
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.08}>
              <div className="bg-bg-elev rounded-2xl p-6 md:p-8 border border-line h-full">
                <div className="font-display font-bold text-5xl md:text-6xl text-accent leading-none">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-4 text-sm text-ink-muted leading-tight">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
