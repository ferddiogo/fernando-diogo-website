import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import type { ProjectMeta } from '@/lib/content/projects';
import type { Locale } from '@/lib/i18n/config';
import type { UIDict } from '@/lib/i18n/dictionary';

export function ProjectHero({ lang, project, dict }: { lang: Locale; project: ProjectMeta; dict: UIDict }) {
  return (
    <section className="pt-12">
      <Container size="wide">
        <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase font-display text-accent mb-6">
          <span>{dict.categories[project.category]}</span>
          <span className="text-line-strong">·</span>
          <span className="text-ink-muted">{project.year}</span>
        </div>
        <h1 className="font-display font-bold text-5xl md:text-7xl leading-[1.05] max-w-4xl">{project.title[lang]}</h1>
        <p className="mt-6 text-xl text-ink-muted max-w-2xl">{project.summary[lang]}</p>
      </Container>

      <div className="mt-12 relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        <Image src={project.cover} alt={project.title[lang]} fill priority sizes="100vw" className="object-cover" />
      </div>
    </section>
  );
}
