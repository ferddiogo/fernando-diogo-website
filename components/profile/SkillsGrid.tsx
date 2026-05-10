import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { ProfileContent } from '@/lib/content/profile';

const ICONS = ['◣', '◤', '◢', '◥'];

export function SkillsGrid({ content }: { content: ProfileContent['skills'] }) {
  return (
    <section id="skills" className="py-24 bg-bg-elev border-y border-line">
      <Container size="wide">
        <ScrollReveal>
          <SectionTitle eyebrow={content.eyebrow} description={content.description}>
            {content.title}
          </SectionTitle>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {content.categories.map((category, i) => (
            <ScrollReveal key={category.title} delay={(i % 2) * 0.08}>
              <article className="bg-bg-base rounded-2xl p-8 border border-line h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-display text-2xl text-accent leading-none">{ICONS[i % ICONS.length]}</span>
                  <h3 className="font-display font-bold text-xl">{category.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="px-3 py-1.5 rounded-full border border-line bg-bg-elev text-sm text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
