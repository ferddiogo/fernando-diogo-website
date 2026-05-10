import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { LangToggle } from './LangToggle';
import { NavLinks } from './NavLinks';
import { getDictionary } from '@/lib/i18n/dictionary';
import { pathFor, type Locale } from '@/lib/i18n/config';

export async function Header({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  return (
    <header className="sticky top-0 z-40 bg-bg-base/80 backdrop-blur-md border-b border-line">
      <Container size="wide" className="flex items-center justify-between py-4">
        <Link href={`/${lang}`} className="shrink-0">
          <Logo lang={lang} />
        </Link>
        <NavLinks
          lang={lang}
          labels={{
            home: dict.nav.home,
            projects: dict.nav.projects,
            hobbies: dict.nav.hobbies,
            contact: dict.nav.contact,
          }}
        />
        <div className="flex items-center gap-5">
          <LangToggle current={lang} />
          <Button href={pathFor(lang, 'contact')} variant="secondary" size="sm">
            {dict.nav.contact}
          </Button>
        </div>
      </Container>
    </header>
  );
}
