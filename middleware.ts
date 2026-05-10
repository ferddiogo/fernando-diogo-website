import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';

export function resolveRedirectLocale(acceptLanguage: string): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ranked) {
    if ((LOCALES as readonly string[]).includes(tag)) return tag as Locale;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/' || pathname === '') {
    const locale = resolveRedirectLocale(request.headers.get('accept-language') ?? '');
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
