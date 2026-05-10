import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { ProjectMeta } from '@/lib/content/projects';
import type { UIDict } from '@/lib/i18n/dictionary';

type Props = {
  lang: Locale;
  project: ProjectMeta;
  dict: UIDict;
  size?: 'sm' | 'md' | 'lg';
};

export function ProjectCard({ lang, project, dict, size = 'md' }: Props) {
  const heights = {
    sm: 'aspect-[4/3]',
    md: 'aspect-[5/4]',
    lg: 'aspect-[16/10]',
  };
  return (
    <Link
      href={`${pathFor(lang, 'projects')}/${project.slug}`}
      className="group block"
    >
      <div className={`relative ${heights[size]} rounded-2xl overflow-hidden bg-bg-elev`}>
        <Image
          src={project.cover}
          alt={project.title[lang]}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute top-4 right-4 bg-bg-base/90 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={18} />
        </div>
        <div className="absolute top-4 left-4 bg-bg-base/90 backdrop-blur rounded-full px-3 py-1 text-[0.65rem] tracking-[0.2em] uppercase font-display">
          {dict.categories[project.category]}
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="font-display font-bold text-xl group-hover:text-accent transition-colors">
          {project.title[lang]}
        </h3>
        <span className="text-xs text-ink-soft">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-ink-muted line-clamp-2">{project.summary[lang]}</p>
    </Link>
  );
}
