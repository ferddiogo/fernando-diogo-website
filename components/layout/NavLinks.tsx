'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { pathFor, type Locale, type NavKey } from '@/lib/i18n/config';
import { cn } from '@/lib/cn';

type NavLabels = Record<NavKey, string>;

const NAV_KEYS: NavKey[] = ['home', 'projects', 'profile', 'hobbies'];

export function NavLinks({ lang, labels }: { lang: Locale; labels: NavLabels }) {
  const pathname = usePathname() ?? '';
  return (
    <nav className="flex items-center gap-8 text-sm">
      {NAV_KEYS.map((key) => {
        const href = pathFor(lang, key);
        const isActive =
          key === 'home' ? pathname === `/${lang}` : pathname.startsWith(href);
        return (
          <Link
            key={key}
            href={href}
            className={cn(
              'transition-colors',
              isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
            )}
          >
            {labels[key]}
          </Link>
        );
      })}
    </nav>
  );
}
