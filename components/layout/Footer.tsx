import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { LogoMark } from '@/components/brand/LogoMark';
import { getDictionary } from '@/lib/i18n/dictionary';
import { pathFor, type Locale, NAV_PATHS } from '@/lib/i18n/config';
import siteContentPt from '@/content/site/pt.json';
import siteContentEn from '@/content/site/en.json';

const SITE = { pt: siteContentPt, en: siteContentEn } as const;

export async function Footer({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const site = SITE[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-deep text-ink-inverse mt-32">
      <Container size="wide" className="py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <LogoMark size={36} />
              <span className="font-display font-bold tracking-[0.12em]">FERNANDO DIOGO</span>
            </div>
            <p className="mt-4 text-ink-soft max-w-md text-sm leading-relaxed">
              {dict.footer.tagline}
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-4">{dict.nav.home}</div>
            <ul className="space-y-2 text-sm">
              {(Object.keys(NAV_PATHS) as (keyof typeof NAV_PATHS)[]).map((key) => (
                <li key={key}>
                  <Link href={pathFor(lang, key)} className="hover:text-accent transition-colors">
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-ink-soft mb-4">{dict.nav.contact}</div>
            <ul className="space-y-2 text-sm">
              <li><a href={`mailto:${site.social.email}`} className="hover:text-accent transition-colors">{site.social.email}</a></li>
              <li><a href={site.social.linkedin} className="hover:text-accent transition-colors" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href={site.social.instagram} className="hover:text-accent transition-colors" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-ink-soft">
          <span>© {year} Fernando Diogo. {dict.footer.rights}.</span>
          <span className="font-display tracking-[0.2em] uppercase">v1.0</span>
        </div>
      </Container>
    </footer>
  );
}
