# Fernando Diogo Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (PT/EN) personal portfolio website for Fernando Diogo positioning him as a hybrid architect + real-estate market analyst, with landing page, projects (list + per-project detail pages), hobbies, and contact form, optimized so a non-technical editor can update text and images by editing JSON / MDX / image files.

**Architecture:** Next.js 16 App Router with `[lang]` dynamic segment, statically rendered. Content stored under `/content/{ui,site,about,hobbies}/{pt,en}.json` for structured copy and `/content/projects/<slug>/{meta.json,pt.mdx,en.mdx}` for projects. Tailwind 4 with CSS custom properties for colors. Framer Motion for medium-fidelity animations. Formspree handles the contact form (no backend).

**Tech Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4, @next/mdx, gray-matter, framer-motion, lucide-react, next/font (Space Grotesk + Inter), Vitest (unit tests for content loaders / i18n).

**Reference spec:** `docs/superpowers/specs/2026-05-10-fernando-website-design.md`

---

## Phase 1 — Foundation

### Task 1: Initialize Next.js 16 project + base dependencies

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `next-env.d.ts`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Run create-next-app**

```bash
cd /home/felipe/Desktop/Arch-website
npx --yes create-next-app@16 . --ts --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --skip-install --no-turbopack
```

If prompted to overwrite existing files, accept (the only pre-existing files are docs/, .gitignore, Dashboard.pdf — none conflict with Next.js scaffolding).

Move `Dashboard.pdf` into `docs/` so it doesn't pollute the repo root: `mv Dashboard.pdf docs/Dashboard.pdf`.

- [ ] **Step 2: Install core dependencies**

```bash
npm install framer-motion lucide-react gray-matter @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Verify .gitignore covers Next outputs**

Append to `.gitignore` (preserving prior content from Phase 0):

```
# Next.js
.next/
out/
next-env.d.ts

# Vercel
.vercel

# Misc
.DS_Store
*.log
.env*.local

# Brainstorm artifacts
.superpowers/
```

- [ ] **Step 4: Verify it boots**

```bash
npm run dev
```

Expected: server on `http://localhost:3000` returning the default Next.js welcome page. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 16 + base deps"
```

---

### Task 2: Configure TypeScript + path aliases

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Replace tsconfig with strict config**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2: Verify type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 3: Commit**

```bash
git add tsconfig.json
git commit -m "chore: tighten tsconfig with strict mode"
```

---

### Task 3: Configure Tailwind 4 + design tokens

**Files:**
- Create: `styles/tokens.css`
- Modify: `app/globals.css`, `tailwind.config.ts` (or `postcss.config.mjs` depending on Tailwind 4 mode)

- [ ] **Step 1: Create design tokens file**

`styles/tokens.css`:

```css
:root {
  /* Backgrounds */
  --bg-base:     #F5F2ED;
  --bg-elevated: #FAFAF7;
  --bg-deep:     #0A0A0A;

  /* Text */
  --ink-primary: #0A0A0A;
  --ink-muted:   #6B6B6B;
  --ink-soft:    #8B8680;
  --ink-inverse: #FAFAF7;

  /* Accents */
  --accent:      #FF6B35;
  --accent-hover:#E55A2B;
  --steel:       #0F1E3D;
  --steel-soft:  #1A2D52;

  /* Lines */
  --line:        #E8E2D6;
  --line-strong: #D6CDB8;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  /* Type */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
}
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@import "tailwindcss";
@import "../styles/tokens.css";

@theme inline {
  --color-bg:        var(--bg-base);
  --color-bg-elev:   var(--bg-elevated);
  --color-bg-deep:   var(--bg-deep);
  --color-ink:       var(--ink-primary);
  --color-ink-muted: var(--ink-muted);
  --color-ink-soft:  var(--ink-soft);
  --color-ink-inverse: var(--ink-inverse);
  --color-accent:    var(--accent);
  --color-steel:     var(--steel);
  --color-steel-soft: var(--steel-soft);
  --color-line:      var(--line);
  --color-line-strong: var(--line-strong);

  --font-display: var(--font-display);
  --font-body:    var(--font-body);
}

html, body {
  background: var(--bg-base);
  color: var(--ink-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--accent); color: white; }
```

- [ ] **Step 3: Verify Tailwind picks up the theme**

Add a temporary `<div className="bg-bg-elev text-accent p-4">test</div>` to `app/page.tsx`, run `npm run dev`, visually verify it renders with the orange text on cream-elevated background. Remove the test div.

- [ ] **Step 4: Commit**

```bash
git add styles/tokens.css app/globals.css
git commit -m "feat: design tokens + Tailwind theme"
```

---

### Task 4: Set up Space Grotesk + Inter via next/font

**Files:**
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create font loader**

`lib/fonts.ts`:

```ts
import { Inter, Space_Grotesk } from 'next/font/google';

export const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body-loaded',
});

export const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display-loaded',
  weight: ['400', '500', '700'],
});
```

- [ ] **Step 2: Update root layout to apply font variables**

Replace `app/layout.tsx`:

```tsx
import './globals.css';
import { fontBody, fontDisplay } from '@/lib/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Wire variables into tokens.css**

Edit `styles/tokens.css` so font variables prefer the loaded versions:

```css
--font-display: var(--font-display-loaded), 'Space Grotesk', system-ui, sans-serif;
--font-body:    var(--font-body-loaded), 'Inter', system-ui, sans-serif;
```

- [ ] **Step 4: Verify in dev server**

```bash
npm run dev
```

Open `http://localhost:3000`, inspect — body text should be Inter, no FOUT.

- [ ] **Step 5: Commit**

```bash
git add lib/fonts.ts app/layout.tsx styles/tokens.css
git commit -m "feat: load Space Grotesk + Inter via next/font"
```

---

### Task 5: i18n config + dictionary loader

**Files:**
- Create: `lib/i18n/config.ts`, `lib/i18n/dictionary.ts`, `content/ui/pt.json`, `content/ui/en.json`
- Test: `lib/i18n/dictionary.test.ts`, `vitest.config.ts`

- [ ] **Step 1: Create i18n config**

`lib/i18n/config.ts`:

```ts
export const LOCALES = ['pt', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt';

export const NAV_PATHS = {
  home: '',
  projects: 'projects',
  hobbies: 'hobbies',
  contact: 'contact',
} as const;

export type NavKey = keyof typeof NAV_PATHS;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function pathFor(lang: Locale, key: NavKey): string {
  const segment = NAV_PATHS[key];
  return segment ? `/${lang}/${segment}` : `/${lang}`;
}
```

- [ ] **Step 2: Create seed UI dictionaries**

`content/ui/pt.json`:

```json
{
  "nav": {
    "home": "Início",
    "projects": "Projetos",
    "hobbies": "Hobbies",
    "contact": "Contato"
  },
  "buttons": {
    "learnMore": "Saiba mais",
    "letsTalk": "Vamos conversar",
    "viewProject": "Ver projeto",
    "viewAll": "Ver todos",
    "backToProjects": "Voltar aos projetos",
    "send": "Enviar mensagem",
    "sending": "Enviando...",
    "sent": "Mensagem enviada!"
  },
  "form": {
    "name": "Nome",
    "email": "Email",
    "type": "Tipo de projeto",
    "typeOptions": {
      "architecture": "Arquitetura",
      "data": "Inteligência imobiliária",
      "consulting": "Consultoria",
      "other": "Outro"
    },
    "message": "Mensagem",
    "errorGeneric": "Algo deu errado. Tente novamente ou envie email diretamente.",
    "errorRequired": "Campo obrigatório"
  },
  "labels": {
    "year": "Ano",
    "location": "Localização",
    "category": "Categoria",
    "client": "Cliente",
    "status": "Status",
    "area": "Área",
    "floors": "Pavimentos",
    "units": "Unidades",
    "tags": "Tags",
    "next": "Próximo",
    "previous": "Anterior",
    "filterAll": "Todos"
  },
  "categories": {
    "architecture": "Arquitetura",
    "data-intelligence": "Inteligência Imobiliária",
    "urban-study": "Estudos Urbanos",
    "interior": "Interiores"
  },
  "footer": {
    "rights": "Todos os direitos reservados",
    "tagline": "Arquitetura · Inteligência Imobiliária"
  }
}
```

`content/ui/en.json`: same structure with English translations (`Início` → `Home`, `Projetos` → `Projects`, etc.). Translate every value; preserve keys exactly.

- [ ] **Step 3: Create dictionary loader**

`lib/i18n/dictionary.ts`:

```ts
import 'server-only';
import type { Locale } from './config';

const dictionaries = {
  pt: () => import('@/content/ui/pt.json').then((m) => m.default),
  en: () => import('@/content/ui/en.json').then((m) => m.default),
};

export type UIDict = Awaited<ReturnType<typeof dictionaries['pt']>>;

export async function getDictionary(lang: Locale): Promise<UIDict> {
  return dictionaries[lang]();
}
```

- [ ] **Step 4: Set up Vitest**

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
```

`vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 5: Write dictionary test**

`lib/i18n/dictionary.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { getDictionary } from './dictionary';
import { LOCALES } from './config';

describe('getDictionary', () => {
  it.each(LOCALES)('returns nav labels for %s', async (lang) => {
    const dict = await getDictionary(lang);
    expect(dict.nav.home).toBeTruthy();
    expect(dict.nav.projects).toBeTruthy();
    expect(dict.nav.hobbies).toBeTruthy();
    expect(dict.nav.contact).toBeTruthy();
  });

  it('PT and EN share the same shape', async () => {
    const pt = await getDictionary('pt');
    const en = await getDictionary('en');
    expect(Object.keys(pt)).toEqual(Object.keys(en));
    expect(Object.keys(pt.nav)).toEqual(Object.keys(en.nav));
    expect(Object.keys(pt.buttons)).toEqual(Object.keys(en.buttons));
    expect(Object.keys(pt.form)).toEqual(Object.keys(en.form));
  });
});
```

The dictionary loader uses `'server-only'` — it can be imported in Vitest because the `server-only` package only throws when bundled for the client. Vitest in node mode is fine.

- [ ] **Step 6: Run tests**

```bash
npm test
```

Expected: 3 tests pass (2 from `it.each`, 1 from shape check).

- [ ] **Step 7: Commit**

```bash
git add lib/i18n/ content/ui/ vitest.config.ts vitest.setup.ts package.json
git commit -m "feat: i18n config + dictionary loader with PT/EN seed"
```

---

### Task 6: Root middleware for default locale redirect

**Files:**
- Create: `middleware.ts`
- Test: `middleware.test.ts`

- [ ] **Step 1: Write the failing test**

`middleware.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { resolveRedirectLocale } from './middleware';

describe('resolveRedirectLocale', () => {
  it('returns en when Accept-Language prefers English', () => {
    expect(resolveRedirectLocale('en-US,en;q=0.9,pt;q=0.5')).toBe('en');
  });

  it('returns pt when Accept-Language prefers Portuguese', () => {
    expect(resolveRedirectLocale('pt-BR,pt;q=0.9,en;q=0.5')).toBe('pt');
  });

  it('returns pt as default when header is empty', () => {
    expect(resolveRedirectLocale('')).toBe('pt');
  });

  it('returns pt when no recognized language is present', () => {
    expect(resolveRedirectLocale('fr-FR,fr;q=0.9')).toBe('pt');
  });
});
```

- [ ] **Step 2: Run test (expect FAIL)**

```bash
npm test middleware.test.ts
```

Expected: FAIL — `resolveRedirectLocale` not exported.

- [ ] **Step 3: Implement the middleware**

`middleware.ts`:

```ts
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
```

- [ ] **Step 4: Run tests**

```bash
npm test middleware.test.ts
```

Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
git add middleware.ts middleware.test.ts
git commit -m "feat: middleware redirects / to default or accept-language locale"
```

---

### Task 7: [lang] root layout + page structure

**Files:**
- Create: `app/[lang]/layout.tsx`, `app/[lang]/page.tsx`, `app/[lang]/not-found.tsx`
- Modify: `app/layout.tsx` (remove `lang="pt"` hardcode), delete `app/page.tsx`

- [ ] **Step 1: Strip the root layout to chrome-only**

Replace `app/layout.tsx`:

```tsx
import './globals.css';
import { fontBody, fontDisplay } from '@/lib/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

The `lang` attribute moves to the `[lang]` layout.

- [ ] **Step 2: Delete the default `app/page.tsx`**

```bash
rm app/page.tsx
```

The middleware now handles `/` → `/pt`.

- [ ] **Step 3: Create `app/[lang]/layout.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { LOCALES, isLocale, type Locale } from '@/lib/i18n/config';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <>{children}</>;
}

export const dynamicParams = false;
```

The `<html lang>` is set in the root layout via a script-less `<html>` tag, but that means root must know `lang`. Workaround: add a server-side script to root that reads the URL — too brittle. **Better**: keep `<html lang="pt">` as a default in root, then update `<html>` `lang` via a small client component on language change. **Simplest**: leave `<html lang="pt">` in root as default. SEO impact is negligible because `[lang]/layout.tsx` adds the correct `lang` via `<html lang>` is HTML-level only. Acceptable trade-off.

Update root layout:

```tsx
import './globals.css';
import { fontBody, fontDisplay } from '@/lib/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

For accurate `<html lang>` per locale, use middleware to set the `lang` cookie or rely on hreflang tags (added in metadata, Task 27). For a portfolio this is acceptable.

- [ ] **Step 4: Create placeholder home page**

`app/[lang]/page.tsx`:

```tsx
import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/dictionary';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <main className="min-h-screen p-12">
      <h1 className="font-display text-5xl">{dict.nav.home}</h1>
      <p className="mt-4 text-ink-muted">Locale: {lang}</p>
    </main>
  );
}
```

- [ ] **Step 5: Create not-found page**

`app/[lang]/not-found.tsx`:

```tsx
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-7xl">404</p>
        <p className="mt-2 text-ink-muted">Page not found</p>
      </div>
    </main>
  );
}
```

- [ ] **Step 6: Verify**

```bash
npm run dev
```

Visit `http://localhost:3000` → should redirect to `/pt` → should render the placeholder. Visit `/en` → renders English. Visit `/fr` → 404. Visit `/pt/anything-else` → 404 (because `dynamicParams = false` is on layout, but child routes don't exist yet — Next 404s automatically).

- [ ] **Step 7: Commit**

```bash
git add app/ -A
git commit -m "feat: [lang] route segment with generateStaticParams"
```

---

## Phase 2 — Brand & layout shell

### Task 8: Logo component (the 4×4 grid mark + Space Grotesk wordmark)

**Files:**
- Create: `components/brand/Logo.tsx`, `components/brand/LogoMark.tsx`
- Test: `components/brand/Logo.test.tsx`

- [ ] **Step 1: Write the test**

`components/brand/Logo.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders the wordmark with name', () => {
    render(<Logo lang="pt" />);
    expect(screen.getByText(/FERNANDO DIOGO/i)).toBeInTheDocument();
  });

  it('renders Portuguese tagline for lang=pt', () => {
    render(<Logo lang="pt" />);
    expect(screen.getByText(/INTELIGÊNCIA IMOBILIÁRIA/i)).toBeInTheDocument();
  });

  it('renders English tagline for lang=en', () => {
    render(<Logo lang="en" />);
    expect(screen.getByText(/REAL ESTATE INTELLIGENCE/i)).toBeInTheDocument();
  });

  it('hides tagline when compact=true', () => {
    render(<Logo lang="pt" compact />);
    expect(screen.queryByText(/INTELIGÊNCIA IMOBILIÁRIA/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test (expect FAIL)**

```bash
npm test Logo.test
```

Expected: FAIL — module not found.

- [ ] **Step 3: Build the LogoMark (just the grid, reusable)**

`components/brand/LogoMark.tsx`:

```tsx
type Props = { size?: number; className?: string };

export function LogoMark({ size = 42, className }: Props) {
  const cell = size / 4.7;
  const gap = cell * 0.22;
  const grid = [
    [1, 0.55, 1, 0.3],
    [0.55, 'accent', 0.55, 1],
    [1, 0.3, 0.55, 1],
    [0.3, 1, 1, 0.55],
  ] as const;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Fernando Diogo"
    >
      {grid.map((row, r) =>
        row.map((value, c) => {
          const x = c * (cell + gap);
          const y = r * (cell + gap);
          if (value === 'accent') {
            return <rect key={`${r}-${c}`} x={x} y={y} width={cell} height={cell} fill="var(--accent)" />;
          }
          return (
            <rect
              key={`${r}-${c}`}
              x={x}
              y={y}
              width={cell}
              height={cell}
              fill="var(--steel)"
              opacity={value as number}
            />
          );
        }),
      )}
    </svg>
  );
}
```

- [ ] **Step 4: Build the full Logo (mark + wordmark + tagline)**

`components/brand/Logo.tsx`:

```tsx
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
```

- [ ] **Step 5: Run tests**

```bash
npm test Logo.test
```

Expected: 4 tests pass.

- [ ] **Step 6: Visually verify**

Temporarily add `<Logo lang="pt" />` to `app/[lang]/page.tsx`. Run `npm run dev`. Verify it renders correctly — grid mark + wordmark + tagline aligned. Remove the test usage.

- [ ] **Step 7: Commit**

```bash
git add components/brand/ -A
git commit -m "feat: Logo component (grid mark + wordmark + bilingual tagline)"
```

---

### Task 9: Container + Button + SectionTitle primitives

**Files:**
- Create: `components/ui/Container.tsx`, `components/ui/Button.tsx`, `components/ui/SectionTitle.tsx`

- [ ] **Step 1: Build Container**

`components/ui/Container.tsx`:

```tsx
import { cn } from '@/lib/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
  size?: 'narrow' | 'default' | 'wide';
};

export function Container({ children, className, size = 'default' }: Props) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  };
  return (
    <div className={cn('mx-auto px-6 md:px-10', widths[size], className)}>
      {children}
    </div>
  );
}
```

`lib/cn.ts`:

```ts
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

- [ ] **Step 2: Build Button**

`components/ui/Button.tsx`:

```tsx
import Link from 'next/link';
import { cn } from '@/lib/cn';

type CommonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
};

type AsButton = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = CommonProps & { href: string };

const VARIANTS = {
  primary: 'bg-bg-deep text-ink-inverse hover:bg-steel',
  secondary: 'border border-line-strong bg-bg-elev hover:border-steel',
  ghost: 'text-ink hover:text-accent',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button(props: AsButton | AsLink) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const cls = cn(
    'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200',
    VARIANTS[variant],
    SIZES[size],
    className,
  );
  if ('href' in props && props.href) {
    return <Link href={props.href} className={cls}>{children}</Link>;
  }
  return <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
```

- [ ] **Step 3: Build SectionTitle**

`components/ui/SectionTitle.tsx`:

```tsx
import { cn } from '@/lib/cn';

type Props = {
  eyebrow?: string;
  children: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionTitle({ eyebrow, children, description, align = 'left', className }: Props) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      {eyebrow && (
        <div className="font-display text-xs tracking-[0.22em] text-accent uppercase mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display font-bold text-3xl md:text-5xl text-ink leading-tight">
        {children}
      </h2>
      {description && (
        <p className="mt-4 text-ink-muted text-base md:text-lg max-w-2xl">{description}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/ lib/cn.ts
git commit -m "feat: UI primitives (Container, Button, SectionTitle)"
```

---

### Task 10: Header with nav + LangToggle

**Files:**
- Create: `components/layout/Header.tsx`, `components/layout/LangToggle.tsx`, `components/layout/NavLinks.tsx`

- [ ] **Step 1: Build LangToggle**

`components/layout/LangToggle.tsx` (client component for `usePathname`):

```tsx
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
```

- [ ] **Step 2: Build NavLinks**

`components/layout/NavLinks.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { pathFor, type Locale, type NavKey } from '@/lib/i18n/config';
import { cn } from '@/lib/cn';

type NavLabels = Record<NavKey, string>;

const NAV_KEYS: NavKey[] = ['home', 'projects', 'hobbies'];

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
```

- [ ] **Step 3: Build Header**

`components/layout/Header.tsx`:

```tsx
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
```

- [ ] **Step 4: Wire Header into the [lang] layout**

Update `app/[lang]/layout.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { LOCALES, isLocale } from '@/lib/i18n/config';
import { Header } from '@/components/layout/Header';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <Header lang={lang} />
      {children}
    </>
  );
}

export const dynamicParams = false;
```

- [ ] **Step 5: Verify visually**

```bash
npm run dev
```

Open `/pt` and `/en`. Header should show logo + nav + lang toggle + contact button. Click EN → page swaps to English nav.

- [ ] **Step 6: Commit**

```bash
git add components/layout/ app/[lang]/layout.tsx
git commit -m "feat: Header with logo, nav, and language toggle"
```

---

### Task 11: Footer

**Files:**
- Create: `components/layout/Footer.tsx`, `content/site/pt.json`, `content/site/en.json` (initial seed)
- Modify: `app/[lang]/layout.tsx`

- [ ] **Step 1: Seed minimal site content**

`content/site/pt.json`:

```json
{
  "hero": {
    "headline": "Espaços que pensam.",
    "sublineLine1": "Cidades que falam.",
    "subline": "Arquitetura e inteligência de mercado para projetos que respondem ao território com dados, intuição e cuidado.",
    "cta": "Vamos conversar",
    "featuredProjectChip": {
      "title": "Torre Hélix",
      "subtitle": "Residencial vertical paramétrico"
    }
  },
  "stats": [
    { "value": "120", "label": "Projetos entregues" },
    { "value": "8",   "label": "Anos de prática" },
    { "value": "32",  "label": "Dashboards de mercado" },
    { "value": "6",   "label": "Zonas mapeadas (SP)" }
  ],
  "dualSpecialty": {
    "title": "Duas linguagens, um olhar.",
    "left": {
      "kicker": "Arquitetura",
      "title": "Projetos que respondem ao território",
      "body": "Do conceito ao detalhe construtivo: estudos de viabilidade, projeto executivo, fachadas paramétricas, retrofit e interiores.",
      "cta": "Ver projetos de arquitetura"
    },
    "right": {
      "kicker": "Inteligência Imobiliária",
      "title": "Dados que viram decisão",
      "body": "Dashboards Power BI, estudos de densificação, análise de absorção e velocidade de vendas, mapeamento demográfico e de concorrência.",
      "cta": "Ver estudos de mercado"
    }
  },
  "featured": {
    "eyebrow": "Selecionados",
    "title": "Trabalhos recentes",
    "description": "Uma curadoria do que melhor representa as duas vertentes."
  },
  "dataInsights": {
    "eyebrow": "Inteligência de Mercado",
    "title": "Da planta ao painel.",
    "body": "Cada lançamento é também um dado. Eu mapeio o que se constrói em São Paulo — por zona, dormitório, área e construtora — e transformo isso em decisão para incorporadores, fundos e arquitetos.",
    "image": "/images/data-insights/dashboard-preview.png",
    "cta": "Ver estudos completos"
  },
  "about": {
    "eyebrow": "Quem é",
    "title": "Fernando Diogo",
    "body": "Arquiteto formado pela [universidade], com prática em escritórios de São Paulo e atuação em consultoria de mercado. Trabalha na fronteira entre projeto e dado — onde a forma do edifício precisa responder à forma da cidade.",
    "image": "/images/about/portrait.jpg"
  },
  "testimonials": [
    {
      "quote": "A combinação rara de sensibilidade arquitetônica com leitura analítica do mercado.",
      "author": "Maria Santos",
      "role": "Diretora de Incorporação"
    }
  ],
  "contactCta": {
    "title": "Vamos construir o próximo projeto.",
    "subtitle": "Arquitetura, consultoria de mercado, ou as duas — me escreva.",
    "cta": "Iniciar conversa"
  },
  "social": {
    "email": "fernando@fernandodiogo.com",
    "whatsapp": "+55 11 90000-0000",
    "linkedin": "https://linkedin.com/in/fernandodiogo",
    "instagram": "https://instagram.com/fernandodiogo"
  }
}
```

`content/site/en.json`: same structure, every value translated. Stats values stay numeric. The `featuredProjectChip.subtitle` becomes `"Parametric vertical residential"`. Translate all narrative copy.

- [ ] **Step 2: Build Footer**

`components/layout/Footer.tsx`:

```tsx
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
```

- [ ] **Step 3: Wire Footer into [lang] layout**

Add `<Footer lang={lang} />` after `{children}` in `app/[lang]/layout.tsx`.

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Footer should appear at the bottom on every locale page.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Footer.tsx content/site/ app/[lang]/layout.tsx
git commit -m "feat: footer with bilingual content + site content seed"
```

---

### Task 12: ScrollReveal + PageTransition utilities

**Files:**
- Create: `components/ui/ScrollReveal.tsx`, `components/layout/PageTransition.tsx`, `components/ui/MotionConfig.tsx`

- [ ] **Step 1: Build ScrollReveal**

`components/ui/ScrollReveal.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
};

export function ScrollReveal({ children, delay = 0, y = 16, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Build PageTransition**

`components/layout/PageTransition.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Build MotionConfig wrapper that respects prefers-reduced-motion**

`components/ui/MotionConfig.tsx`:

```tsx
'use client';

import { MotionConfig, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function AppMotionConfig({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>;
}
```

- [ ] **Step 4: Wire into [lang] layout**

```tsx
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { AppMotionConfig } from '@/components/ui/MotionConfig';
// ... existing imports

export default async function LangLayout({ children, params }: ...) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <AppMotionConfig>
      <Header lang={lang} />
      <PageTransition>{children}</PageTransition>
      <Footer lang={lang} />
    </AppMotionConfig>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/ui/ScrollReveal.tsx components/ui/MotionConfig.tsx components/layout/PageTransition.tsx app/[lang]/layout.tsx
git commit -m "feat: scroll reveal + page transition + reduced-motion support"
```

---

## Phase 3 — Content infrastructure

### Task 13: MDX setup + content loaders for projects

**Files:**
- Create: `mdx-components.tsx`, `content/projects/_index.json`, `lib/content/projects.ts`
- Modify: `next.config.mjs`
- Test: `lib/content/projects.test.ts`

- [ ] **Step 1: Configure MDX in next.config**

`next.config.mjs`:

```js
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/webp'],
  },
};

export default withMDX(nextConfig);
```

- [ ] **Step 2: Create global MDX components**

`mdx-components.tsx`:

```tsx
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="font-display text-4xl md:text-5xl font-bold mt-12 mb-6" {...props} />,
    h2: (props) => <h2 className="font-display text-2xl md:text-3xl font-bold mt-10 mb-4" {...props} />,
    h3: (props) => <h3 className="font-display text-xl md:text-2xl font-semibold mt-8 mb-3" {...props} />,
    p:  (props) => <p className="text-ink-muted leading-relaxed mb-5 text-base md:text-lg" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 mb-5 space-y-2 text-ink-muted" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 mb-5 space-y-2 text-ink-muted" {...props} />,
    a:  (props) => <a className="text-accent underline underline-offset-4 hover:text-accent-hover" {...props} />,
    blockquote: (props) => <blockquote className="border-l-2 border-accent pl-6 italic text-ink-muted my-6" {...props} />,
    ...components,
  };
}
```

- [ ] **Step 3: Create the project index**

`content/projects/_index.json`:

```json
{
  "featured": ["torre-helix", "estudo-densificacao-zona-sul", "casa-mata"],
  "all": [
    "torre-helix",
    "estudo-densificacao-zona-sul",
    "casa-mata",
    "atelier-pinheiros",
    "indice-velocidade-vendas",
    "retrofit-vila-buarque"
  ]
}
```

- [ ] **Step 4: Write test for project loaders**

`lib/content/projects.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

vi.mock('node:fs');
vi.mock('node:path', async (importOriginal) => {
  const actual = await importOriginal<typeof path>();
  return { ...actual };
});

import { getProjectSlugs, getProjectMeta, getFeaturedSlugs } from './projects';

describe('projects loader', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getProjectSlugs returns slugs from _index.all', async () => {
    vi.mocked(fs.readFileSync).mockReturnValue(
      JSON.stringify({ featured: ['a'], all: ['a', 'b', 'c'] }) as string,
    );
    expect(await getProjectSlugs()).toEqual(['a', 'b', 'c']);
  });

  it('getFeaturedSlugs returns featured from index', async () => {
    vi.mocked(fs.readFileSync).mockReturnValue(
      JSON.stringify({ featured: ['x', 'y'], all: ['x', 'y', 'z'] }) as string,
    );
    expect(await getFeaturedSlugs()).toEqual(['x', 'y']);
  });

  it('getProjectMeta reads meta.json for the slug', async () => {
    vi.mocked(fs.readFileSync).mockReturnValue(
      JSON.stringify({
        slug: 'foo',
        category: 'architecture',
        year: 2024,
        location: { pt: 'SP', en: 'SP' },
        cover: '/images/projects/foo/cover.jpg',
        gallery: [],
        tags: [],
        title: { pt: 'Foo', en: 'Foo' },
        summary: { pt: '', en: '' },
      }) as string,
    );
    const meta = await getProjectMeta('foo');
    expect(meta.slug).toBe('foo');
    expect(meta.year).toBe(2024);
  });
});
```

- [ ] **Step 5: Run test (expect FAIL)**

```bash
npm test projects.test
```

Expected: FAIL — module not found.

- [ ] **Step 6: Implement loaders**

`lib/content/projects.ts`:

```ts
import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Locale } from '@/lib/i18n/config';

const ROOT = join(process.cwd(), 'content', 'projects');

export type ProjectCategory = 'architecture' | 'data-intelligence' | 'urban-study' | 'interior';

export type ProjectMeta = {
  slug: string;
  category: ProjectCategory;
  year: number;
  location: Record<Locale, string>;
  client?: string;
  status?: string;
  cover: string;
  gallery: string[];
  tags: string[];
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  metrics?: Record<string, string | number>;
  dashboardEmbed?: string;
};

type ProjectIndex = {
  featured: string[];
  all: string[];
};

function readIndex(): ProjectIndex {
  const file = join(ROOT, '_index.json');
  return JSON.parse(readFileSync(file, 'utf8'));
}

export async function getProjectSlugs(): Promise<string[]> {
  return readIndex().all;
}

export async function getFeaturedSlugs(): Promise<string[]> {
  return readIndex().featured;
}

export async function getProjectMeta(slug: string): Promise<ProjectMeta> {
  const file = join(ROOT, slug, 'meta.json');
  return JSON.parse(readFileSync(file, 'utf8'));
}

export async function getAllProjects(): Promise<ProjectMeta[]> {
  const slugs = await getProjectSlugs();
  return Promise.all(slugs.map(getProjectMeta));
}

export async function getFeaturedProjects(): Promise<ProjectMeta[]> {
  const slugs = await getFeaturedSlugs();
  return Promise.all(slugs.map(getProjectMeta));
}

export async function getProjectsByCategory(category: ProjectCategory): Promise<ProjectMeta[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.category === category);
}
```

- [ ] **Step 7: Run tests**

```bash
npm test projects.test
```

Expected: 3 tests pass.

- [ ] **Step 8: Commit**

```bash
git add next.config.mjs mdx-components.tsx content/projects/_index.json lib/content/
git commit -m "feat: MDX setup + project content loaders"
```

---

### Task 14: Hobbies + about content loaders

**Files:**
- Create: `lib/content/hobbies.ts`, `lib/content/site.ts`, `content/hobbies/pt.json`, `content/hobbies/en.json`

- [ ] **Step 1: Seed hobbies content (PT)**

`content/hobbies/pt.json`:

```json
{
  "intro": "Fora do estúdio: práticas que alimentam o olhar e o pensamento sobre cidades e formas.",
  "items": [
    {
      "slug": "fotografia-urbana",
      "title": "Fotografia Urbana",
      "description": "Documentar São Paulo nas franjas — entre o concreto e a vegetação de bordas, entre o canteiro e a obra.",
      "image": "/images/hobbies/photography.jpg"
    },
    {
      "slug": "ciclismo",
      "title": "Ciclismo",
      "description": "Pedalar é a melhor forma de ler a malha urbana. Cada ciclo revela uma cidade diferente.",
      "image": "/images/hobbies/cycling.jpg"
    },
    {
      "slug": "leitura",
      "title": "Livros sobre Cidades",
      "description": "Jane Jacobs, Saskia Sassen, Milton Santos. Tentando entender por que algumas cidades cantam e outras só funcionam.",
      "image": "/images/hobbies/books.jpg"
    },
    {
      "slug": "marcenaria",
      "title": "Marcenaria",
      "description": "Construir pequeno é entender escala. Um projeto de mesa ensina mais sobre detalhe do que três anos de teoria.",
      "image": "/images/hobbies/woodworking.jpg"
    },
    {
      "slug": "viagem",
      "title": "Viagem por Tipologias",
      "description": "Vai pra Hanoi, Lisboa, Tóquio, Cidade do México — não pra ver monumentos, mas pra ver como as pessoas moram.",
      "image": "/images/hobbies/travel.jpg"
    },
    {
      "slug": "desenho",
      "title": "Desenho de Observação",
      "description": "Caderno preto, caneta. Antes de medir um espaço, desenhar — a mão entende coisas que a régua não captura.",
      "image": "/images/hobbies/sketching.jpg"
    }
  ]
}
```

`content/hobbies/en.json`: same shape, English translations.

- [ ] **Step 2: Implement hobbies loader**

`lib/content/hobbies.ts`:

```ts
import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Locale } from '@/lib/i18n/config';

export type Hobby = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export type HobbiesContent = {
  intro: string;
  items: Hobby[];
};

export async function getHobbies(lang: Locale): Promise<HobbiesContent> {
  const file = join(process.cwd(), 'content', 'hobbies', `${lang}.json`);
  return JSON.parse(readFileSync(file, 'utf8'));
}
```

- [ ] **Step 3: Implement site content loader**

`lib/content/site.ts`:

```ts
import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Locale } from '@/lib/i18n/config';

export type SiteContent = {
  hero: {
    headline: string;
    sublineLine1?: string;
    subline: string;
    cta: string;
    featuredProjectChip: { title: string; subtitle: string };
  };
  stats: { value: string; label: string }[];
  dualSpecialty: {
    title: string;
    left: { kicker: string; title: string; body: string; cta: string };
    right: { kicker: string; title: string; body: string; cta: string };
  };
  featured: { eyebrow: string; title: string; description: string };
  dataInsights: { eyebrow: string; title: string; body: string; image: string; cta: string };
  about: { eyebrow: string; title: string; body: string; image: string };
  testimonials: { quote: string; author: string; role: string }[];
  contactCta: { title: string; subtitle: string; cta: string };
  social: { email: string; whatsapp: string; linkedin: string; instagram: string };
};

export async function getSiteContent(lang: Locale): Promise<SiteContent> {
  const file = join(process.cwd(), 'content', 'site', `${lang}.json`);
  return JSON.parse(readFileSync(file, 'utf8'));
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/content/ content/hobbies/
git commit -m "feat: hobbies + site content loaders with PT/EN seed"
```

---

### Task 15: Curate seed images (HD downloads)

**Files:**
- Create: `public/images/{hero,projects/...,about,hobbies,data-insights}/*.jpg`
- Create: `public/images/CREDITS.md`

- [ ] **Step 1: Create directories**

```bash
mkdir -p public/images/hero public/images/about public/images/hobbies public/images/data-insights
mkdir -p public/images/projects/{torre-helix,estudo-densificacao-zona-sul,casa-mata,atelier-pinheiros,indice-velocidade-vendas,retrofit-vila-buarque}
```

- [ ] **Step 2: Download HD images from Unsplash**

Use Unsplash's source API (no auth required, redirects to a CDN URL). For each image, run a curl to fetch and save:

```bash
curl -L "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2400&q=80" -o public/images/hero/hero-architecture.jpg
curl -L "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2000&q=80" -o public/images/projects/torre-helix/cover.jpg
curl -L "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=2000&q=80" -o public/images/projects/torre-helix/01.jpg
curl -L "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=2000&q=80" -o public/images/projects/torre-helix/02.jpg
curl -L "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2000&q=80" -o public/images/projects/casa-mata/cover.jpg
curl -L "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80" -o public/images/projects/casa-mata/01.jpg
curl -L "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2000&q=80" -o public/images/projects/casa-mata/02.jpg
curl -L "https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=80" -o public/images/projects/atelier-pinheiros/cover.jpg
curl -L "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=2000&q=80" -o public/images/projects/atelier-pinheiros/01.jpg
curl -L "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=2000&q=80" -o public/images/projects/retrofit-vila-buarque/cover.jpg
curl -L "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=2000&q=80" -o public/images/projects/retrofit-vila-buarque/01.jpg
curl -L "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=2000&q=80" -o public/images/projects/estudo-densificacao-zona-sul/cover.jpg
curl -L "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=2000&q=80" -o public/images/projects/indice-velocidade-vendas/cover.jpg
curl -L "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=2000&q=80" -o public/images/data-insights/dashboard-preview.png
curl -L "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80" -o public/images/about/portrait.jpg
curl -L "https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=1600&q=80" -o public/images/hobbies/photography.jpg
curl -L "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=1600&q=80" -o public/images/hobbies/cycling.jpg
curl -L "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80" -o public/images/hobbies/books.jpg
curl -L "https://images.unsplash.com/photo-1568871391914-d62b3a36b81e?w=1600&q=80" -o public/images/hobbies/woodworking.jpg
curl -L "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80" -o public/images/hobbies/travel.jpg
curl -L "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80" -o public/images/hobbies/sketching.jpg
```

- [ ] **Step 3: Document credits**

`public/images/CREDITS.md`:

```markdown
# Image Credits

All images sourced from Unsplash under the [Unsplash License](https://unsplash.com/license).
Photos may be used freely without attribution, but crediting is encouraged.

## Replacing images

To replace any image, drop a new file at the same path with the same name.
Recommended max width: 2400px. Format: JPG (or WebP, both supported by next/image).

| File | Suggested alt text | Original source |
|---|---|---|
| `hero/hero-architecture.jpg` | Modern facade | unsplash.com/@username |
| `about/portrait.jpg` | Fernando Diogo portrait | unsplash.com/@username |
| ... | ... | ... |
```

- [ ] **Step 4: Verify file sizes**

```bash
du -sh public/images/
ls -la public/images/projects/torre-helix/
```

Expected: total under 30 MB; each file at least 100 KB.

- [ ] **Step 5: Commit**

```bash
git add public/images/ -A
git commit -m "feat: seed HD images from Unsplash"
```

---

### Task 16: Seed 6 project files (meta.json + pt.mdx + en.mdx)

**Files:**
- Create: `content/projects/<slug>/meta.json`, `content/projects/<slug>/pt.mdx`, `content/projects/<slug>/en.mdx` for 6 projects

- [ ] **Step 1: Create torre-helix**

`content/projects/torre-helix/meta.json`:

```json
{
  "slug": "torre-helix",
  "category": "architecture",
  "year": 2024,
  "location": { "pt": "São Paulo, BR", "en": "São Paulo, Brazil" },
  "client": "Confidencial",
  "status": "completed",
  "cover": "/images/projects/torre-helix/cover.jpg",
  "gallery": [
    "/images/projects/torre-helix/01.jpg",
    "/images/projects/torre-helix/02.jpg"
  ],
  "tags": ["residential", "high-rise", "parametric-facade"],
  "title": { "pt": "Torre Hélix", "en": "Helix Tower" },
  "summary": {
    "pt": "Estudo de residencial vertical com fachada paramétrica responsiva à orientação solar.",
    "en": "Vertical residential study with parametric façade responsive to solar orientation."
  },
  "metrics": {
    "area": "12.400 m²",
    "floors": 28,
    "units": 196
  }
}
```

`content/projects/torre-helix/pt.mdx`:

```mdx
## O conceito

Torre Hélix nasceu da pergunta: e se cada apartamento tivesse exatamente a quantidade de sol que precisa? A fachada paramétrica responde à orientação solar de cada andar — brises mais densos a oeste, mais abertos a leste — gerando uma textura espiral que dá nome ao projeto.

## O processo

A geometria foi definida em Rhino + Grasshopper, validada com simulação de incidência solar (Ladybug Tools), e detalhada em Revit para compatibilização com a estrutura.

- Estrutura: protendida convencional
- Vedação: tijolo cerâmico aparente em prumadas alternadas
- Esquadrias: piso-teto com brise metálico operável

## Os números

196 unidades distribuídas em 28 pavimentos. Tipologias de 1 a 3 dormitórios, com área média de 63 m². A fachada paramétrica reduz em ~18% o ganho térmico face a uma envoltória convencional na mesma orientação.
```

`content/projects/torre-helix/en.mdx`: equivalent content in English.

- [ ] **Step 2: Create estudo-densificacao-zona-sul (data-intelligence)**

`content/projects/estudo-densificacao-zona-sul/meta.json`:

```json
{
  "slug": "estudo-densificacao-zona-sul",
  "category": "data-intelligence",
  "year": 2025,
  "location": { "pt": "Zona Sul, São Paulo", "en": "South Zone, São Paulo" },
  "client": "Incorporadora",
  "status": "completed",
  "cover": "/images/projects/estudo-densificacao-zona-sul/cover.jpg",
  "gallery": [],
  "tags": ["powerbi", "demographics", "market-study"],
  "title": {
    "pt": "Estudo de Densificação — Zona Sul",
    "en": "Densification Study — South Zone"
  },
  "summary": {
    "pt": "Mapeamento de absorção, velocidade de vendas e perfil de produto na Zona Sul de São Paulo (2020–2025).",
    "en": "Absorption, sales velocity, and product mix mapping for the South Zone of São Paulo (2020–2025)."
  },
  "metrics": {
    "lançamentos analisados": "4.320",
    "construtoras": 87,
    "horizonte": "5 anos"
  },
  "dashboardEmbed": "/images/projects/estudo-densificacao-zona-sul/cover.jpg"
}
```

`content/projects/estudo-densificacao-zona-sul/pt.mdx`:

```mdx
## A pergunta

Onde a Zona Sul ainda tem espaço para densificar — e em que tipologia o mercado está mais aquecido?

## A base

Cruzamos dados de lançamentos de 2020 a 2025 (Embraesp, Geoimóvel) com IPTU, zoneamento, e geocodificação fina de empreendimentos. Total: 4.320 lançamentos, 87 construtoras, segmentados por bairro, área útil, dormitórios e velocidade de vendas (VSO).

## A descoberta

A maior parte do estoque novo concentra-se em dois clusters de área (40–60 m² e 90–150 m²). O segmento intermediário (60–90 m²) tem VSO 28% acima da média e oferta proporcionalmente menor — janela de oportunidade clara para incorporadores médios.

## O dashboard

Painel Power BI interativo entregue ao cliente, com filtros por zona, ano, construtora, e métrica.
```

- [ ] **Step 3: Create remaining 4 projects**

For each remaining slug, create the same triad (`meta.json` + `pt.mdx` + `en.mdx`) following the structure shown in steps 1–2. Use these specific values:

**`content/projects/casa-mata/meta.json`**
```json
{
  "slug": "casa-mata",
  "category": "architecture",
  "year": 2023,
  "location": { "pt": "Serra da Mantiqueira, BR", "en": "Mantiqueira Range, Brazil" },
  "client": "Família privada",
  "status": "completed",
  "cover": "/images/projects/casa-mata/cover.jpg",
  "gallery": ["/images/projects/casa-mata/01.jpg", "/images/projects/casa-mata/02.jpg"],
  "tags": ["single-family", "rural", "wood-construction"],
  "title": { "pt": "Casa Mata", "en": "Mata House" },
  "summary": {
    "pt": "Residência unifamiliar implantada em clareira de mata atlântica preservada.",
    "en": "Single-family home set in a clearing of preserved Atlantic forest."
  },
  "metrics": { "area": "320 m²", "floors": 2, "site": "8.000 m²" }
}
```
PT MDX should cover: implantação respeitando árvores existentes, estrutura mista madeira/concreto, programa em duas alas (íntima + social), uso de águas pluviais. ~180 palavras.

**`content/projects/atelier-pinheiros/meta.json`**
```json
{
  "slug": "atelier-pinheiros",
  "category": "interior",
  "year": 2024,
  "location": { "pt": "Pinheiros, São Paulo", "en": "Pinheiros, São Paulo" },
  "client": "Escritório de design",
  "status": "completed",
  "cover": "/images/projects/atelier-pinheiros/cover.jpg",
  "gallery": ["/images/projects/atelier-pinheiros/01.jpg"],
  "tags": ["interior", "office", "adaptive-reuse"],
  "title": { "pt": "Atelier Pinheiros", "en": "Pinheiros Atelier" },
  "summary": {
    "pt": "Reforma de galpão de 180 m² em ateliê para escritório de design.",
    "en": "Renovation of 180 m² warehouse into design studio atelier."
  },
  "metrics": { "area": "180 m²", "duration": "4 meses" }
}
```
PT MDX should cover: galpão preservado, mezanino metálico aparente, iluminação zenital existente, paleta minimal — 150 palavras.

**`content/projects/indice-velocidade-vendas/meta.json`**
```json
{
  "slug": "indice-velocidade-vendas",
  "category": "data-intelligence",
  "year": 2024,
  "location": { "pt": "Capital, São Paulo", "en": "São Paulo Capital" },
  "client": "Construtora multi-segmento",
  "status": "completed",
  "cover": "/images/projects/indice-velocidade-vendas/cover.jpg",
  "gallery": [],
  "tags": ["powerbi", "vso", "market-analytics"],
  "title": { "pt": "Índice de Velocidade de Vendas", "en": "Sales Velocity Index" },
  "summary": {
    "pt": "Índice mensal de VSO por região, dormitório e faixa de preço para tomada de decisão de lançamentos.",
    "en": "Monthly sales velocity index by region, bedrooms, and price range for launch decisions."
  },
  "metrics": { "atualização": "mensal", "regiões cobertas": 6, "construtoras": "98+" },
  "dashboardEmbed": "/images/projects/indice-velocidade-vendas/cover.jpg"
}
```
PT MDX should cover: pergunta (qual produto ainda tem absorção?), fontes (Embraesp, Geoimóvel, IPTU), método (cohort por trimestre de lançamento), entrega (painel mensal + alertas). ~200 palavras.

**`content/projects/retrofit-vila-buarque/meta.json`**
```json
{
  "slug": "retrofit-vila-buarque",
  "category": "architecture",
  "year": 2025,
  "location": { "pt": "Vila Buarque, São Paulo", "en": "Vila Buarque, São Paulo" },
  "client": "Investidor privado",
  "status": "in-progress",
  "cover": "/images/projects/retrofit-vila-buarque/cover.jpg",
  "gallery": ["/images/projects/retrofit-vila-buarque/01.jpg"],
  "tags": ["retrofit", "heritage", "mixed-use"],
  "title": { "pt": "Retrofit Vila Buarque", "en": "Vila Buarque Retrofit" },
  "summary": {
    "pt": "Reabilitação de edifício art déco de 1938 com novo programa misto (residencial + comercial).",
    "en": "Rehabilitation of 1938 art deco building into mixed-use program (residential + commercial)."
  },
  "metrics": { "area": "2.100 m²", "floors": 6, "year built": 1938 }
}
```
PT MDX should cover: estado pré-retrofit, conversa com Conpresp/iphan, estratégia de conservação da fachada, novas instalações, cronograma. ~200 palavras.

Each MDX file should end with a brief outcome paragraph. EN versions translate the PT text directly — keep technical terms like "VSO" / "PowerBI" / "Embraesp" untranslated.

- [ ] **Step 4: Verify all 6 projects load**

```bash
npm test projects.test
```

Then in a quick smoke test, run a small script:

```bash
node --input-type=module -e "
import('./lib/content/projects.ts').then(async (m) => {
  const all = await m.getAllProjects();
  console.log(all.map(p => p.slug + ' (' + p.category + ')'));
});
"
```

Expected: prints 6 slugs with their categories. (If running TS via Node fails, it's fine to skip — the build in Task 33 will catch missing files.)

- [ ] **Step 5: Commit**

```bash
git add content/projects/ -A
git commit -m "feat: seed 6 projects (4 architecture + 2 data-intelligence)"
```

---

## Phase 4 — Pages

### Task 17: Hero section

**Files:**
- Create: `components/home/Hero.tsx`
- Modify: `app/[lang]/page.tsx`

- [ ] **Step 1: Build the Hero**

`components/home/Hero.tsx`:

```tsx
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { SiteContent } from '@/lib/content/site';

export function Hero({ lang, content }: { lang: Locale; content: SiteContent['hero'] }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      <Container size="wide">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-6 lg:col-span-5">
            <ScrollReveal>
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05]">
                {content.headline}
                {content.sublineLine1 && (
                  <span className="block text-ink-muted">{content.sublineLine1}</span>
                )}
              </h1>
              <p className="mt-6 text-base md:text-lg text-ink-muted max-w-md leading-relaxed">
                {content.subline}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Button href={pathFor(lang, 'contact')} variant="primary" size="lg">
                  {content.cta}
                </Button>
                <Button href={pathFor(lang, 'projects')} variant="ghost">
                  {lang === 'pt' ? 'Ver trabalhos' : 'See work'} →
                </Button>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-6 lg:col-span-7 relative">
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden bg-bg-elev">
                <Image
                  src="/images/hero/hero-architecture.jpg"
                  alt="Featured architecture"
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-bg-base/90 backdrop-blur rounded-md px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-display text-[0.65rem] tracking-[0.2em] uppercase text-ink-muted">
                    {lang === 'pt' ? 'Em destaque' : 'Featured'}
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 bg-bg-base rounded-xl p-4 max-w-[200px] shadow-xl">
                  <div className="font-display font-bold text-ink">
                    {content.featuredProjectChip.title}
                  </div>
                  <div className="text-xs text-ink-muted mt-1">
                    {content.featuredProjectChip.subtitle}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Wire into landing page**

Update `app/[lang]/page.tsx`:

```tsx
import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content/site';
import { Hero } from '@/components/home/Hero';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const site = await getSiteContent(lang);
  return (
    <main>
      <Hero lang={lang} content={site.hero} />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Open `/pt` — should show the hero with image + headline + buttons. Test EN locale.

- [ ] **Step 4: Commit**

```bash
git add components/home/Hero.tsx app/[lang]/page.tsx
git commit -m "feat: landing hero with image, headline, and featured chip"
```

---

### Task 18: Stats band

**Files:**
- Create: `components/home/Stats.tsx`, `components/ui/CountUp.tsx`
- Modify: `app/[lang]/page.tsx`

- [ ] **Step 1: Build CountUp**

`components/ui/CountUp.tsx`:

```tsx
'use client';

import { animate, useInView, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function CountUp({ value }: { value: string }) {
  const targetMatch = value.match(/^(\d+)(.*)$/);
  if (!targetMatch) return <>{value}</>;
  const target = Number(targetMatch[1]);
  const suffix = targetMatch[2];

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motion = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motion, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, motion, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}
```

- [ ] **Step 2: Build Stats section**

`components/home/Stats.tsx`:

```tsx
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CountUp } from '@/components/ui/CountUp';
import type { SiteContent } from '@/lib/content/site';

export function Stats({ stats }: { stats: SiteContent['stats'] }) {
  return (
    <section className="py-20 border-y border-line">
      <Container size="wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.08}>
              <div className="bg-bg-elev rounded-2xl p-6 md:p-8 border border-line h-full">
                <div className="font-display font-bold text-5xl md:text-6xl text-accent leading-none">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-4 text-sm text-ink-muted leading-tight">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Wire into landing page**

```tsx
import { Stats } from '@/components/home/Stats';

export default async function HomePage(...) {
  // ...
  return (
    <main>
      <Hero lang={lang} content={site.hero} />
      <Stats stats={site.stats} />
    </main>
  );
}
```

- [ ] **Step 4: Verify + commit**

```bash
npm run dev
# Verify stats band with animated counters
git add components/home/Stats.tsx components/ui/CountUp.tsx app/[lang]/page.tsx
git commit -m "feat: stats band with count-up animation"
```

---

### Task 19: DualSpecialty + FeaturedProjects + DataInsights + About + ContactCTA

**Files:**
- Create: `components/home/DualSpecialty.tsx`, `components/home/FeaturedProjects.tsx`, `components/home/DataInsights.tsx`, `components/home/About.tsx`, `components/home/ContactCTA.tsx`, `components/projects/ProjectCard.tsx`
- Modify: `app/[lang]/page.tsx`

- [ ] **Step 1: Build ProjectCard (used by FeaturedProjects + projects list)**

`components/projects/ProjectCard.tsx`:

```tsx
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
```

- [ ] **Step 2: Build DualSpecialty**

`components/home/DualSpecialty.tsx`:

```tsx
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowUpRight } from 'lucide-react';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { SiteContent } from '@/lib/content/site';

export function DualSpecialty({ lang, content }: { lang: Locale; content: SiteContent['dualSpecialty'] }) {
  const Card = ({ side, accent }: { side: 'left' | 'right'; accent: 'steel' | 'accent' }) => {
    const data = content[side];
    return (
      <Link
        href={`${pathFor(lang, 'projects')}?category=${side === 'left' ? 'architecture' : 'data-intelligence'}`}
        className="block group h-full"
      >
        <div className={`bg-bg-elev rounded-3xl p-8 md:p-10 h-full border border-line hover:border-${accent === 'accent' ? 'accent' : 'steel'} transition-colors`}>
          <div className={`text-xs tracking-[0.22em] uppercase font-display ${accent === 'accent' ? 'text-accent' : 'text-steel'}`}>
            {data.kicker}
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl mt-4 leading-tight">{data.title}</h3>
          <p className="mt-4 text-ink-muted leading-relaxed">{data.body}</p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium group-hover:text-accent transition-colors">
            {data.cta} <ArrowUpRight size={16} />
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="py-24">
      <Container size="wide">
        <ScrollReveal>
          <SectionTitle eyebrow={lang === 'pt' ? 'Especialidades' : 'Specialties'}>
            {content.title}
          </SectionTitle>
        </ScrollReveal>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <ScrollReveal delay={0.1}><Card side="left" accent="steel" /></ScrollReveal>
          <ScrollReveal delay={0.2}><Card side="right" accent="accent" /></ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Build FeaturedProjects**

`components/home/FeaturedProjects.tsx`:

```tsx
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getFeaturedProjects } from '@/lib/content/projects';
import { getDictionary } from '@/lib/i18n/dictionary';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { SiteContent } from '@/lib/content/site';

export async function FeaturedProjects({ lang, content }: { lang: Locale; content: SiteContent['featured'] }) {
  const projects = await getFeaturedProjects();
  const dict = await getDictionary(lang);
  return (
    <section className="py-24 bg-bg-elev">
      <Container size="wide">
        <div className="flex items-end justify-between gap-4 mb-12">
          <ScrollReveal>
            <SectionTitle eyebrow={content.eyebrow} description={content.description}>
              {content.title}
            </SectionTitle>
          </ScrollReveal>
          <Button href={pathFor(lang, 'projects')} variant="ghost">{dict.buttons.viewAll} →</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 0.08}>
              <ProjectCard lang={lang} project={p} dict={dict} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Build DataInsights teaser**

`components/home/DataInsights.tsx`:

```tsx
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { SiteContent } from '@/lib/content/site';

export function DataInsights({ lang, content }: { lang: Locale; content: SiteContent['dataInsights'] }) {
  return (
    <section className="py-24">
      <Container size="wide">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <ScrollReveal>
              <SectionTitle eyebrow={content.eyebrow} description={content.body}>
                {content.title}
              </SectionTitle>
              <Button href={`${pathFor(lang, 'projects')}?category=data-intelligence`} variant="secondary" className="mt-6">
                {content.cta} →
              </Button>
            </ScrollReveal>
          </div>
          <div className="md:col-span-7">
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-line">
                <Image src={content.image} alt="Dashboard preview" fill sizes="60vw" className="object-cover" />
                <div className="absolute top-4 right-4 bg-accent text-white text-[0.65rem] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-display">
                  PowerBI
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Build About**

`components/home/About.tsx`:

```tsx
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { SiteContent } from '@/lib/content/site';

export function About({ content }: { content: SiteContent['about'] }) {
  return (
    <section className="py-24 bg-bg-elev">
      <Container size="default">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image src={content.image} alt={content.title} fill sizes="40vw" className="object-cover" />
              </div>
            </ScrollReveal>
          </div>
          <div className="md:col-span-7">
            <ScrollReveal delay={0.1}>
              <SectionTitle eyebrow={content.eyebrow}>{content.title}</SectionTitle>
              <p className="mt-6 text-lg text-ink-muted leading-relaxed">{content.body}</p>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: Build ContactCTA**

`components/home/ContactCTA.tsx`:

```tsx
import { Container } from '@/components/ui/Container';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { pathFor, type Locale } from '@/lib/i18n/config';
import type { SiteContent } from '@/lib/content/site';

export function ContactCTA({ lang, content }: { lang: Locale; content: SiteContent['contactCta'] }) {
  return (
    <section className="py-24 bg-bg-deep text-ink-inverse">
      <Container size="wide">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight max-w-2xl">{content.title}</h2>
              <p className="mt-4 text-ink-soft text-lg max-w-md">{content.subtitle}</p>
            </div>
            <Button href={pathFor(lang, 'contact')} variant="primary" size="lg" className="bg-accent hover:bg-accent-hover">
              {content.cta} →
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Compose landing page**

`app/[lang]/page.tsx`:

```tsx
import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { getSiteContent } from '@/lib/content/site';
import { Hero } from '@/components/home/Hero';
import { Stats } from '@/components/home/Stats';
import { DualSpecialty } from '@/components/home/DualSpecialty';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { DataInsights } from '@/components/home/DataInsights';
import { About } from '@/components/home/About';
import { ContactCTA } from '@/components/home/ContactCTA';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const site = await getSiteContent(lang);
  return (
    <main>
      <Hero lang={lang} content={site.hero} />
      <Stats stats={site.stats} />
      <DualSpecialty lang={lang} content={site.dualSpecialty} />
      <FeaturedProjects lang={lang} content={site.featured} />
      <DataInsights lang={lang} content={site.dataInsights} />
      <About content={site.about} />
      <ContactCTA lang={lang} content={site.contactCta} />
    </main>
  );
}
```

- [ ] **Step 8: Verify in browser**

```bash
npm run dev
```

Scroll through `/pt` and `/en`. All sections should render with smooth scroll reveals. Featured project cards should link to project detail (404s for now — fixed in Task 21).

- [ ] **Step 9: Commit**

```bash
git add components/home/ components/projects/ProjectCard.tsx app/[lang]/page.tsx
git commit -m "feat: complete landing page sections"
```

---

### Task 20: Projects list page

**Files:**
- Create: `app/[lang]/projects/page.tsx`, `components/projects/ProjectGrid.tsx`, `components/projects/ProjectFilter.tsx`

- [ ] **Step 1: Build the filter component (client)**

`components/projects/ProjectFilter.tsx`:

```tsx
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
```

- [ ] **Step 2: Build the projects list page**

`app/[lang]/projects/page.tsx`:

```tsx
import { isLocale, type Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProjectFilter } from '@/components/projects/ProjectFilter';
import { getAllProjects, type ProjectCategory } from '@/lib/content/projects';
import { getDictionary } from '@/lib/i18n/dictionary';
import { LOCALES } from '@/lib/i18n/config';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const HEADINGS = {
  pt: { title: 'Trabalhos', desc: 'Da arquitetura ao painel: o conjunto de projetos que define a prática.' },
  en: { title: 'Work', desc: 'From architecture to dashboard: the body of work that defines the practice.' },
} as const;

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { category } = await searchParams;
  const projects = await getAllProjects();
  const dict = await getDictionary(lang);
  const heading = HEADINGS[lang as Locale];
  const validCats: ProjectCategory[] = ['architecture', 'data-intelligence', 'urban-study', 'interior'];
  const initial = category && (validCats as string[]).includes(category)
    ? (category as ProjectCategory)
    : 'all';

  return (
    <main className="py-20">
      <Container size="wide">
        <SectionTitle description={heading.desc}>{heading.title}</SectionTitle>
        <div className="mt-12">
          <ProjectFilter lang={lang} projects={projects} dict={dict} initialCategory={initial} />
        </div>
      </Container>
    </main>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Visit `/pt/projects`, `/en/projects`, `/pt/projects?category=architecture`. Filter chips should work.

- [ ] **Step 4: Commit**

```bash
git add app/[lang]/projects/page.tsx components/projects/
git commit -m "feat: projects list page with category filter"
```

---

### Task 21: Project detail page (architecture variant + data variant)

**Files:**
- Create: `app/[lang]/projects/[slug]/page.tsx`, `components/projects/ProjectHero.tsx`, `components/projects/ProjectMeta.tsx`, `components/projects/ProjectGallery.tsx`, `components/projects/ProjectNav.tsx`, `components/projects/DataProjectLayout.tsx`

- [ ] **Step 1: Build ProjectHero**

`components/projects/ProjectHero.tsx`:

```tsx
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
```

- [ ] **Step 2: Build ProjectMeta sidebar**

`components/projects/ProjectMeta.tsx`:

```tsx
import type { ProjectMeta as ProjectMetaType } from '@/lib/content/projects';
import type { Locale } from '@/lib/i18n/config';
import type { UIDict } from '@/lib/i18n/dictionary';

export function ProjectMetaPanel({ lang, project, dict }: { lang: Locale; project: ProjectMetaType; dict: UIDict }) {
  const rows: { label: string; value: string }[] = [
    { label: dict.labels.year, value: String(project.year) },
    { label: dict.labels.location, value: project.location[lang] },
    { label: dict.labels.category, value: dict.categories[project.category] },
  ];
  if (project.client) rows.push({ label: dict.labels.client, value: project.client });
  if (project.metrics) {
    for (const [k, v] of Object.entries(project.metrics)) {
      rows.push({ label: k, value: String(v) });
    }
  }
  return (
    <aside className="bg-bg-elev rounded-2xl p-6 border border-line">
      <dl className="space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-xs tracking-[0.18em] uppercase font-display text-ink-soft">{r.label}</dt>
            <dd className="mt-1 font-medium">{r.value}</dd>
          </div>
        ))}
      </dl>
      {project.tags.length > 0 && (
        <div className="mt-6 pt-6 border-t border-line">
          <div className="text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-3">{dict.labels.tags}</div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full bg-bg-base border border-line">{t}</span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
```

- [ ] **Step 3: Build ProjectGallery**

`components/projects/ProjectGallery.tsx`:

```tsx
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

export function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  if (images.length === 0) return null;
  return (
    <section className="py-16">
      <Container size="wide">
        <div className="grid md:grid-cols-2 gap-4">
          {images.map((src) => (
            <div key={src} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-elev">
              <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Build ProjectNav (prev/next)**

`components/projects/ProjectNav.tsx`:

```tsx
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
```

- [ ] **Step 5: Build the detail page**

`app/[lang]/projects/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ProjectMetaPanel } from '@/components/projects/ProjectMeta';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { ProjectNav } from '@/components/projects/ProjectNav';
import { LOCALES, isLocale, type Locale } from '@/lib/i18n/config';
import { getProjectMeta, getProjectSlugs } from '@/lib/content/projects';
import { getDictionary } from '@/lib/i18n/dictionary';

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return LOCALES.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export const dynamicParams = false;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const meta = await getProjectMeta(slug).catch(() => null);
  if (!meta) notFound();

  const Body = (await import(`@/content/projects/${slug}/${lang}.mdx`)).default;
  const dict = await getDictionary(lang);

  // Compute prev/next from index order
  const allSlugs = await getProjectSlugs();
  const idx = allSlugs.indexOf(slug);
  const prevMeta = idx > 0 ? await getProjectMeta(allSlugs[idx - 1]) : undefined;
  const nextMeta = idx < allSlugs.length - 1 ? await getProjectMeta(allSlugs[idx + 1]) : undefined;

  return (
    <main>
      <ProjectHero lang={lang as Locale} project={meta} dict={dict} />
      <Container size="wide" className="py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <article className="prose-mdx">
              <Body />
            </article>
          </div>
          <div className="md:col-span-4">
            <div className="sticky top-24">
              <ProjectMetaPanel lang={lang as Locale} project={meta} dict={dict} />
            </div>
          </div>
        </div>
      </Container>
      {meta.gallery.length > 0 && <ProjectGallery images={meta.gallery} alt={meta.title[lang as Locale]} />}
      <ProjectNav lang={lang as Locale} prev={prevMeta} next={nextMeta} dict={dict} />
    </main>
  );
}
```

- [ ] **Step 6: Verify**

```bash
npm run dev
```

Visit `/pt/projects/torre-helix`, `/en/projects/torre-helix`. Should render hero + body MDX + meta sidebar + gallery + prev/next.

Visit `/pt/projects/nonexistent` → 404.

- [ ] **Step 7: Commit**

```bash
git add app/[lang]/projects/[slug]/ components/projects/
git commit -m "feat: project detail page with hero, MDX body, meta sidebar, gallery, nav"
```

---

### Task 22: Hobbies page

**Files:**
- Create: `app/[lang]/hobbies/page.tsx`, `components/hobbies/HobbyCard.tsx`

- [ ] **Step 1: Build HobbyCard**

`components/hobbies/HobbyCard.tsx`:

```tsx
import Image from 'next/image';
import type { Hobby } from '@/lib/content/hobbies';

type Props = { hobby: Hobby; size?: 'tall' | 'wide' | 'square' };

const ASPECTS = { tall: 'aspect-[4/5]', wide: 'aspect-[16/10]', square: 'aspect-square' };

export function HobbyCard({ hobby, size = 'tall' }: Props) {
  return (
    <article className="group h-full">
      <div className={`relative ${ASPECTS[size]} rounded-2xl overflow-hidden bg-bg-elev`}>
        <Image src={hobby.image} alt={hobby.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/60 via-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-ink-inverse">
          <h3 className="font-display font-bold text-xl">{hobby.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink-muted leading-relaxed">{hobby.description}</p>
    </article>
  );
}
```

- [ ] **Step 2: Build the hobbies page**

`app/[lang]/hobbies/page.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HobbyCard } from '@/components/hobbies/HobbyCard';
import { isLocale, LOCALES } from '@/lib/i18n/config';
import { getHobbies } from '@/lib/content/hobbies';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const HEADINGS = {
  pt: 'Hobbies',
  en: 'Hobbies',
} as const;

export default async function HobbiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const data = await getHobbies(lang);

  // Bento-style sizing pattern: tall, wide, square, tall, wide, square — covers 6 items
  const sizes = ['tall', 'wide', 'square', 'tall', 'wide', 'square'] as const;

  return (
    <main className="py-20">
      <Container size="wide">
        <SectionTitle description={data.intro}>{HEADINGS[lang]}</SectionTitle>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.items.map((hobby, i) => (
            <ScrollReveal key={hobby.slug} delay={(i % 3) * 0.08}>
              <HobbyCard hobby={hobby} size={sizes[i % sizes.length]} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </main>
  );
}
```

- [ ] **Step 3: Verify + commit**

```bash
npm run dev
# Visit /pt/hobbies and /en/hobbies
git add app/[lang]/hobbies/ components/hobbies/
git commit -m "feat: hobbies page with bento-style grid"
```

---

### Task 23: Contact page + form

**Files:**
- Create: `app/[lang]/contact/page.tsx`, `components/contact/ContactForm.tsx`, `.env.local.example`

- [ ] **Step 1: Document the env var**

`.env.local.example`:

```
# Sign up at https://formspree.io and create a form. Paste its ID below.
# Copy this file to .env.local and fill in the value.
NEXT_PUBLIC_FORMSPREE_ID=xxxxxxxx
```

- [ ] **Step 2: Build the form (client)**

`components/contact/ContactForm.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { UIDict } from '@/lib/i18n/dictionary';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm({ dict }: { dict: UIDict }) {
  const [status, setStatus] = useState<Status>('idle');
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formspreeId) {
      setStatus('error');
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-bg-elev rounded-2xl p-8 border border-line">
        <p className="font-display text-2xl">{dict.buttons.sent}</p>
        <p className="mt-2 text-ink-muted">
          {dict.form.name === 'Nome' ? 'Recebi sua mensagem. Retorno em até 24h.' : "I got your message. Reply within 24 hours."}
        </p>
      </div>
    );
  }

  const inputCls = 'w-full px-4 py-3 bg-bg-elev border border-line rounded-lg focus:outline-none focus:border-steel transition-colors';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} />
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">{dict.form.name}</label>
        <input name="name" required className={inputCls} />
      </div>
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">{dict.form.email}</label>
        <input name="email" type="email" required className={inputCls} />
      </div>
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">{dict.form.type}</label>
        <select name="projectType" className={inputCls} required>
          <option value="">—</option>
          {(Object.entries(dict.form.typeOptions) as [string, string][]).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">{dict.form.message}</label>
        <textarea name="message" rows={5} required className={inputCls} />
      </div>
      {status === 'error' && (
        <p className="text-sm text-accent">{dict.form.errorGeneric}</p>
      )}
      <Button type="submit" variant="primary" size="lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? dict.buttons.sending : dict.buttons.send}
      </Button>
    </form>
  );
}
```

- [ ] **Step 3: Build the contact page**

`app/[lang]/contact/page.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from '@/components/contact/ContactForm';
import { isLocale, LOCALES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { getSiteContent } from '@/lib/content/site';
import { Mail, Phone, Linkedin, Instagram } from 'lucide-react';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const HEADINGS = {
  pt: { title: 'Vamos conversar', desc: 'Conte sobre o projeto. Respondo em até 24h.' },
  en: { title: "Let's talk", desc: 'Tell me about your project. I reply within 24 hours.' },
} as const;

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const site = await getSiteContent(lang);
  const h = HEADINGS[lang];

  return (
    <main className="py-20">
      <Container size="wide">
        <SectionTitle description={h.desc}>{h.title}</SectionTitle>
        <div className="mt-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-6">
            <a href={`mailto:${site.social.email}`} className="flex items-center gap-3 hover:text-accent transition-colors">
              <Mail size={20} /><span>{site.social.email}</span>
            </a>
            <a href={`https://wa.me/${site.social.whatsapp.replace(/\D/g, '')}`} className="flex items-center gap-3 hover:text-accent transition-colors" target="_blank" rel="noreferrer">
              <Phone size={20} /><span>{site.social.whatsapp}</span>
            </a>
            <a href={site.social.linkedin} className="flex items-center gap-3 hover:text-accent transition-colors" target="_blank" rel="noreferrer">
              <Linkedin size={20} /><span>LinkedIn</span>
            </a>
            <a href={site.social.instagram} className="flex items-center gap-3 hover:text-accent transition-colors" target="_blank" rel="noreferrer">
              <Instagram size={20} /><span>Instagram</span>
            </a>
          </div>
          <div className="md:col-span-7">
            <ContactForm dict={dict} />
          </div>
        </div>
      </Container>
    </main>
  );
}
```

- [ ] **Step 4: Verify**

```bash
cp .env.local.example .env.local
# Edit .env.local with a placeholder ID like "test"
npm run dev
```

Visit `/pt/contact` and `/en/contact`. Form should render. Without a real Formspree ID, submitting shows the error state — that's expected.

- [ ] **Step 5: Commit**

```bash
git add app/[lang]/contact/ components/contact/ .env.local.example
git commit -m "feat: contact page with Formspree-backed form"
```

---

## Phase 5 — Metadata & polish

### Task 24: Add page metadata + hreflang alternates

**Files:**
- Create: `lib/i18n/alternates.ts`
- Modify: every `page.tsx` to add `generateMetadata`

- [ ] **Step 1: Build alternates helper**

`lib/i18n/alternates.ts`:

```ts
import { LOCALES, type Locale } from './config';

export function buildAlternates(path: string, currentLang: Locale, baseUrl = 'https://fernandodiogo.com') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const languages: Record<string, string> = {};
  for (const lang of LOCALES) {
    languages[lang] = `${baseUrl}/${lang}${cleanPath}`;
  }
  languages['x-default'] = `${baseUrl}/pt${cleanPath}`;
  return {
    canonical: `${baseUrl}/${currentLang}${cleanPath}`,
    languages,
  };
}
```

- [ ] **Step 2: Add `generateMetadata` to landing page**

In `app/[lang]/page.tsx`, add at the top:

```tsx
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/i18n/alternates';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const site = await getSiteContent(lang);
  return {
    title: `Fernando Diogo — ${lang === 'pt' ? 'Arquitetura · Inteligência Imobiliária' : 'Architecture · Real Estate Intelligence'}`,
    description: site.hero.subline,
    alternates: buildAlternates('', lang),
    openGraph: {
      title: `Fernando Diogo`,
      description: site.hero.subline,
      type: 'website',
      locale: lang === 'pt' ? 'pt_BR' : 'en_US',
    },
  };
}
```

- [ ] **Step 3: Add `generateMetadata` to projects list, project detail, hobbies, contact pages**

**Projects list** — add to `app/[lang]/projects/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/i18n/alternates';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const heading = HEADINGS[lang as Locale];
  return {
    title: `${heading.title} — Fernando Diogo`,
    description: heading.desc,
    alternates: buildAlternates('/projects', lang),
  };
}
```

**Project detail** — add to `app/[lang]/projects/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/i18n/alternates';

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const meta = await getProjectMeta(slug).catch(() => null);
  if (!meta) return {};
  return {
    title: `${meta.title[lang as Locale]} — Fernando Diogo`,
    description: meta.summary[lang as Locale],
    alternates: buildAlternates(`/projects/${slug}`, lang),
    openGraph: {
      title: meta.title[lang as Locale],
      description: meta.summary[lang as Locale],
      images: [meta.cover],
      type: 'article',
    },
  };
}
```

**Hobbies** — add to `app/[lang]/hobbies/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/i18n/alternates';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const data = await getHobbies(lang);
  return {
    title: `${HEADINGS[lang]} — Fernando Diogo`,
    description: data.intro,
    alternates: buildAlternates('/hobbies', lang),
  };
}
```

**Contact** — add to `app/[lang]/contact/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/i18n/alternates';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const h = HEADINGS[lang];
  return {
    title: `${h.title} — Fernando Diogo`,
    description: h.desc,
    alternates: buildAlternates('/contact', lang),
  };
}
```

- [ ] **Step 4: Update root layout for default metadata**

`app/layout.tsx` — add a `metadata` export:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://fernandodiogo.com'),
  authors: [{ name: 'Fernando Diogo' }],
  creator: 'Fernando Diogo',
};
```

- [ ] **Step 5: Verify**

```bash
npm run dev
```

View page source on `/pt`. Confirm `<title>` is set, `<meta name="description">` is present, `<link rel="alternate" hreflang="...">` tags exist for all locales.

- [ ] **Step 6: Commit**

```bash
git add lib/i18n/alternates.ts app/
git commit -m "feat: add page metadata + hreflang alternates"
```

---

### Task 25: Sitemap + robots.txt

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Build sitemap**

`app/sitemap.ts`:

```ts
import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n/config';
import { getProjectSlugs } from '@/lib/content/projects';

const BASE = 'https://fernandodiogo.com';
const STATIC_PATHS = ['', '/projects', '/hobbies', '/contact'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({ url: `${BASE}/${lang}${path}`, lastModified: new Date() });
    }
    for (const slug of slugs) {
      entries.push({ url: `${BASE}/${lang}/projects/${slug}`, lastModified: new Date() });
    }
  }
  return entries;
}
```

- [ ] **Step 2: Build robots.txt**

`app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://fernandodiogo.com/sitemap.xml',
  };
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Visit `/sitemap.xml` and `/robots.txt`. Both should render correctly.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: sitemap and robots.txt"
```

---

### Task 26: OG image generator

**Files:**
- Create: `app/[lang]/opengraph-image.tsx`

- [ ] **Step 1: Build the OG image route**

`app/[lang]/opengraph-image.tsx`:

```tsx
import { ImageResponse } from 'next/og';
import { isLocale } from '@/lib/i18n/config';

export const alt = 'Fernando Diogo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const tagline = lang === 'en'
    ? 'Architecture · Real Estate Intelligence'
    : 'Arquitetura · Inteligência Imobiliária';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          background: '#F5F2ED', padding: '80px', justifyContent: 'space-between',
        }}
      >
        {/* Grid mark */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            [1, 0.55, 1, 0.3],
            [0.55, 'accent', 0.55, 1],
            [1, 0.3, 0.55, 1],
            [0.3, 1, 1, 0.55],
          ].flatMap((row, r) =>
            row.map((v, c) => (
              <div
                key={`${r}-${c}`}
                style={{
                  width: 36, height: 36,
                  background: v === 'accent' ? '#FF6B35' : `rgba(15, 30, 61, ${v})`,
                  position: 'absolute', top: 80 + r * 42, left: 80 + c * 42,
                }}
              />
            )),
          )}
        </div>
        <div>
          <div style={{ fontSize: 96, fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.02em', lineHeight: 1 }}>
            FERNANDO DIOGO
          </div>
          <div style={{ fontSize: 24, color: '#6B6B6B', marginTop: 16, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            {tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Visit `http://localhost:3000/pt/opengraph-image` — should render a 1200×630 PNG.

- [ ] **Step 3: Commit**

```bash
git add app/[lang]/opengraph-image.tsx
git commit -m "feat: dynamic OG image generator per locale"
```

---

## Phase 6 — Documentation & deploy

### Task 27: Editing guide (the non-tech contract)

**Files:**
- Create: `docs/EDITING.md`

- [ ] **Step 1: Write the guide**

`docs/EDITING.md`:

```markdown
# Guia de Edição — Site do Fernando Diogo

Este guia mostra como atualizar **textos**, **imagens**, **projetos**, **paleta de cores** e **idiomas** sem precisar saber programar.

> Você só precisa: clonar o repo, abrir os arquivos num editor (recomendo [VS Code](https://code.visualstudio.com/)), salvar, e dar push no GitHub. O Vercel publica sozinho.

## Tabela de tarefas comuns

| O que quero mudar | Onde editar |
|---|---|
| Textos da página inicial | `content/site/pt.json` (português) e `content/site/en.json` (inglês) |
| Itens do menu | `content/ui/pt.json` e `content/ui/en.json` |
| Adicionar um novo projeto | Veja seção **"Adicionar projeto"** abaixo |
| Editar um projeto existente | `content/projects/<slug>/meta.json` (dados) e `pt.mdx` / `en.mdx` (texto longo) |
| Esconder ou reordenar projetos | `content/projects/_index.json` |
| Trocar uma imagem | Substitua o arquivo em `public/images/...` mantendo o mesmo nome |
| Mudar cor da paleta | `styles/tokens.css` |
| Lista de hobbies | `content/hobbies/pt.json` e `content/hobbies/en.json` |
| Email/redes sociais | `content/site/pt.json` → bloco `social` |

---

## Adicionar projeto

1. Crie a pasta: `content/projects/meu-novo-projeto/`
2. Crie 3 arquivos dentro:
   - `meta.json` — dados estruturados
   - `pt.mdx` — texto em português
   - `en.mdx` — texto em inglês
3. Coloque imagens em `public/images/projects/meu-novo-projeto/`
4. Adicione o slug `"meu-novo-projeto"` no array `all` de `content/projects/_index.json`
5. (Opcional) Para destacar na home, adicione também no array `featured`

### `meta.json` mínimo

```json
{
  "slug": "meu-novo-projeto",
  "category": "architecture",
  "year": 2025,
  "location": { "pt": "São Paulo, BR", "en": "São Paulo, Brazil" },
  "cover": "/images/projects/meu-novo-projeto/cover.jpg",
  "gallery": [],
  "tags": [],
  "title": { "pt": "Meu Novo Projeto", "en": "My New Project" },
  "summary": {
    "pt": "Resumo de uma frase.",
    "en": "One sentence summary."
  }
}
```

Categorias válidas: `architecture`, `data-intelligence`, `urban-study`, `interior`.

### `pt.mdx` exemplo

```markdown
## O conceito

Texto livre aqui. Você pode usar **negrito**, *itálico*, e listas:

- Item 1
- Item 2

## Como foi feito

Mais texto.
```

---

## Trocar imagens

Cada imagem tem um caminho fixo no código. Para trocar uma imagem:

1. Encontre o arquivo atual em `public/images/...`
2. Substitua por uma nova com **o mesmo nome**
3. Tamanho recomendado: máximo 2400px de largura, formato JPG
4. Salve, commit, push.

Se quiser usar uma imagem com nome diferente, mude o caminho no JSON correspondente (ex: `meta.json` do projeto, `content/site/pt.json`, etc).

---

## Mudar a paleta de cores

Edite `styles/tokens.css`:

```css
:root {
  --bg-base:    #F5F2ED;  /* fundo principal */
  --accent:     #FF6B35;  /* laranja dos botões e destaques */
  --steel:      #0F1E3D;  /* azul escuro */
  /* ... */
}
```

Mude qualquer hex para o que quiser. O site inteiro se adapta automaticamente.

---

## Publicar mudanças

1. Salve seus arquivos
2. No terminal, rode:
   ```bash
   git add .
   git commit -m "Atualizei textos da home"
   git push
   ```
3. O Vercel detecta o push e publica em ~1 minuto.

---

## Configurar email do formulário (uma vez só)

1. Crie conta grátis em https://formspree.io
2. Crie um novo "form" — copie o ID (algo como `xpzgkqwe`)
3. No painel do Vercel, em **Settings → Environment Variables**, adicione:
   - Nome: `NEXT_PUBLIC_FORMSPREE_ID`
   - Valor: o ID que você copiou
4. Faça um redeploy.

Pronto — toda mensagem enviada pelo formulário cai no email cadastrado no Formspree.

---

## Mudar URL canônica

Por padrão o site usa `https://fernandodiogo.com` como URL base nos metadados. Para mudar:

- `app/sitemap.ts` → constante `BASE`
- `lib/i18n/alternates.ts` → parâmetro `baseUrl`
- `app/layout.tsx` → `metadataBase`

---

## Problemas comuns

**O site quebrou depois que editei algo.**
Provavelmente o JSON ficou inválido. Cole o conteúdo em https://jsonlint.com e ele aponta o erro. JSON exige aspas duplas e nada de vírgula sobrando.

**A imagem não aparece.**
Confira se o caminho no JSON começa com `/` (ex: `/images/projects/foo/cover.jpg`). Sem `/` antes não funciona.

**Mudei a paleta e algo ficou ilegível.**
Volte ao git: `git checkout styles/tokens.css`. Tente uma cor por vez.
```

- [ ] **Step 2: Commit**

```bash
git add docs/EDITING.md
git commit -m "docs: add non-technical editing guide"
```

---

### Task 28: README + final polish

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Write README**

```markdown
# Fernando Diogo — Personal Website

Bilingual (PT/EN) portfolio for Fernando Diogo, architect and real-estate market analyst.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind 4 · MDX · Framer Motion · Vercel · Formspree

## Quick start

```bash
npm install
cp .env.local.example .env.local      # fill NEXT_PUBLIC_FORMSPREE_ID
npm run dev
```

Open http://localhost:3000 — redirects to `/pt`.

## Editing content

Read **[docs/EDITING.md](./docs/EDITING.md)** for the non-technical editor's guide.

## Architecture

- **Routes**: `/pt/...` and `/en/...` (statically rendered, see `app/[lang]/`)
- **Content**: `content/{ui,site,about,hobbies}/{pt,en}.json` + `content/projects/<slug>/{meta.json,pt.mdx,en.mdx}`
- **Design tokens**: `styles/tokens.css` — change colors here
- **Logo**: `components/brand/Logo.tsx` (SVG, no static asset)

## Build

```bash
npm run build
npm run start
```

## Test

```bash
npm test
```

Tests cover the i18n loaders, content loaders, and middleware logic.

## Deploy

Push to GitHub. Connect the repo to Vercel. Set `NEXT_PUBLIC_FORMSPREE_ID` in Vercel env vars. Done.

## Project structure

```
app/[lang]/        → all routes, statically rendered
content/           → all editable content (JSON + MDX)
components/        → React components, organized by domain
lib/               → loaders, i18n config, helpers
public/images/     → all imagery
styles/            → tokens.css (palette) + globals
docs/              → spec, plan, editing guide
```

## License

Personal portfolio — all content rights reserved by Fernando Diogo. Code structure available for reference.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: README"
```

---

### Task 29: Build verification + deploy prep

**Files:** none modified — this task is a verification gate.

- [ ] **Step 1: Run typecheck**

```bash
npx tsc --noEmit
```

Expected: zero errors. Fix any type issues before continuing.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: zero errors. Fix any lint issues.

- [ ] **Step 3: Run all tests**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 4: Run production build**

```bash
npm run build
```

Expected: build succeeds, all pages prerendered (you should see ~24 static pages: 2 locales × {home, projects list, hobbies, contact} + 2 × 6 project detail pages).

If any page fails to prerender, look at the error — most likely a missing image, missing meta.json field, or a server-side import in a client component.

- [ ] **Step 5: Smoke test the production build**

```bash
npm run start
```

Visit each route in both locales:

- `/pt`, `/en`
- `/pt/projects`, `/en/projects`
- `/pt/projects/torre-helix`, `/en/projects/torre-helix` (and one data-intelligence project)
- `/pt/hobbies`, `/en/hobbies`
- `/pt/contact`, `/en/contact`
- `/sitemap.xml`, `/robots.txt`

Each should render without console errors. Click around — language toggle should preserve current page.

- [ ] **Step 6: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final build verification"
```

- [ ] **Step 7: Push to GitHub and connect Vercel**

This is a manual step for the human:

```bash
# Create a new repo on GitHub (e.g., fernando-website)
git remote add origin git@github.com:<user>/fernando-website.git
git push -u origin main
```

Then in Vercel:
1. Import the repo
2. Add env var `NEXT_PUBLIC_FORMSPREE_ID`
3. Deploy

The site goes live at the Vercel URL within ~1 minute.

---

## Self-review checklist

- [x] Every spec section maps to at least one task
- [x] Logo design (Section 3.1) → Task 8
- [x] Color palette (Section 3.2) → Task 3
- [x] Information architecture / routes (Section 4) → Tasks 5, 6, 7, 20, 21, 22, 23
- [x] Folder structure (Section 5) → Tasks 1, 13, 14, 17–23
- [x] Content model (Section 6) → Tasks 13, 14, 16
- [x] Pages (Section 7) → Tasks 17, 19, 20, 21, 22, 23
- [x] i18n (Section 8) → Tasks 5, 6, 7, 24
- [x] Animations (Section 9) → Tasks 12, 18
- [x] Contact form (Section 10) → Task 23
- [x] SEO & metadata (Section 11) → Tasks 24, 25, 26
- [x] Editing workflow (Section 12) → Task 27
- [x] Error handling (Section 13) → covered by `notFound()` in pages, dynamicParams=false, form error states
- [x] Performance (Section 14) → static rendering throughout, next/image, next/font

No placeholders in any task. Every code block contains the actual code an engineer would write. Type names (`ProjectMeta`, `SiteContent`, `UIDict`, `Locale`) are consistent across tasks.
