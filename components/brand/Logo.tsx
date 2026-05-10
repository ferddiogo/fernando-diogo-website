import { LogoMark } from './LogoMark';
import type { Locale } from '@/lib/i18n/config';

const TAGLINES = {
  pt: 'ARQUITETURA · INTELIGÊNCIA IMOBILIÁRIA',
  en: 'ARCHITECTURE · REAL ESTATE INTELLIGENCE',
} as const;

type Props = {
  lang: Locale;
  compact?: boolean;
  className?: string;
};

export function Logo({ lang, compact = false, className }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`}>
      <LogoMark size={42} />
      <div className="leading-tight">
        <div className="font-display font-bold text-[1.05rem] tracking-[0.12em] text-ink">
          FERNANDO DIOGO
        </div>
        {!compact && (
          <div className="font-display font-medium text-[0.55rem] tracking-[0.22em] text-ink-muted mt-0.5">
            {TAGLINES[lang]}
          </div>
        )}
      </div>
    </div>
  );
}
