import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { ProfileContent } from '@/lib/content/profile';

export function Languages({ content }: { content: ProfileContent['languages'] }) {
  return (
    <section className="py-24">
      <Container size="default">
        <ScrollReveal>
          <SectionTitle eyebrow={content.eyebrow}>{content.title}</SectionTitle>
        </ScrollReveal>

        <div className="mt-12 space-y-6">
          {content.items.map((lang, i) => (
            <ScrollReveal key={lang.name} delay={i * 0.06}>
              <div className="grid grid-cols-[1fr_auto] md:grid-cols-[180px_1fr_120px] items-center gap-4 md:gap-8 py-5 border-b border-line">
                <div className="font-display font-bold text-xl">{lang.name}</div>
                <div className="hidden md:block relative h-1.5 bg-bg-elev rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-accent rounded-full"
                    style={{ width: `${lang.proficiency}%` }}
                  />
                </div>
                <div className="text-sm text-ink-muted text-right md:text-left whitespace-nowrap">
                  {lang.level}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
