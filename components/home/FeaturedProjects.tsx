import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getFeaturedProjects } from '@/lib/content/projects';
import { getDictionary } from '@/lib/i18n/dictionary';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { SiteContent } from '@/lib/content/site';

export async function FeaturedProjects({ lang, content }: { lang: Locale; content: SiteContent['featured'] }) {
  const projects = await getFeaturedProjects();
  const dict = await getDictionary(lang);
  return (
    <section className="py-24 bg-bg-elev">
      <Container size="wide">
        <div className="flex items-end justify-between gap-4 mb-12">
          <ScrollReveal>
            <SectionTitle eyebrow={content.eyebrow} description={content.description}>
              {content.title}
            </SectionTitle>
          </ScrollReveal>
          <Button href={pathFor(lang, 'projects')} variant="ghost">{dict.buttons.viewAll} →</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.08}>
              <ProjectCard lang={lang} project={p} dict={dict} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
