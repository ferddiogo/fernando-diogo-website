'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, isLocale, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/cn';

export function LangToggle({ current }: { current: Locale }) {
  const pathname = usePathname() ?? `/${current}`;
  const swap = (target: Locale) => {
    const segments = pathname.split('/');
    if (segments.length > 1 && isLocale(segments[1])) {
      segments[1] = target;
      return segments.join('/') || `/${target}`;
    }
    return `/${target}`;
  };

  return (
    <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider">
      {LOCALES.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          <Link
            href={swap(locale)}
            className={cn(
              'transition-colors',
              locale === current ? 'text-ink' : 'text-ink-muted hover:text-accent',
            )}
            aria-current={locale === current ? 'true' : undefined}
          >
            {locale}
          </Link>
          {i < LOCALES.length - 1 && <span className="text-line-strong">/</span>}
        </span>
      ))}
    </div>
  );
}
