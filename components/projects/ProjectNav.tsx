import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { ProjectMeta } from '@/lib/content/projects';
import type { UIDict } from '@/lib/i18n/dictionary';

export function ProjectNav({
  lang, prev, next, dict,
}: { lang: Locale; prev?: ProjectMeta; next?: ProjectMeta; dict: UIDict }) {
  return (
    <nav className="py-12 border-t border-line">
      <Container size="wide">
        <div className="grid grid-cols-2 gap-6">
          <div>
            {prev ? (
              <Link href={`${pathFor(lang, 'projects')}/${prev.slug}`} className="group block">
                <div className="text-xs tracking-[0.2em] uppercase font-display text-ink-soft flex items-center gap-2">
                  <ArrowLeft size={14} /> {dict.labels.previous}
                </div>
                <div className="mt-1 font-display font-bold text-xl group-hover:text-accent transition-colors">
                  {prev.title[lang]}
                </div>
              </Link>
            ) : <span />}
          </div>
          <div className="text-right">
            {next ? (
              <Link href={`${pathFor(lang, 'projects')}/${next.slug}`} className="group block">
                <div className="text-xs tracking-[0.2em] uppercase font-display text-ink-soft flex items-center gap-2 justify-end">
                  {dict.labels.next} <ArrowRight size={14} />
                </div>
                <div className="mt-1 font-display font-bold text-xl group-hover:text-accent transition-colors">
                  {next.title[lang]}
                </div>
              </Link>
            ) : <span />}
          </div>
        </div>
      </Container>
    </nav>
  );
}
