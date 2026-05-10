'use client';

import { useState } from 'react';
import type { ProjectMeta, ProjectCategory } from '@/lib/content/projects';
import { ProjectCard } from './ProjectCard';
import type { Locale } from '@/lib/i18n/config';
import type { UIDict } from '@/lib/i18n/dictionary';
import { cn } from '@/lib/cn';

const CATEGORIES: ('all' | ProjectCategory)[] = [
  'all',
  'architecture',
  'data-intelligence',
  'urban-study',
  'interior',
];

type Props = {
  lang: Locale;
  projects: ProjectMeta[];
  dict: UIDict;
  initialCategory?: ProjectCategory | 'all';
};

export function ProjectFilter({ lang, projects, dict, initialCategory = 'all' }: Props) {
  const [active, setActive] = useState<typeof CATEGORIES[number]>(initialCategory);
  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
              active === cat
                ? 'bg-bg-deep text-ink-inverse border-bg-deep'
                : 'bg-transparent text-ink-muted border-line hover:border-ink',
            )}
          >
            {cat === 'all' ? dict.labels.filterAll : dict.categories[cat]}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} lang={lang} project={p} dict={dict} />
        ))}
      </div>
    </>
  );
}
