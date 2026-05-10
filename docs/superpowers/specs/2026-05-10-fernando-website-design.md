# Fernando Diogo — Personal Website Design Spec

**Date:** 2026-05-10
**Status:** Draft for review

## 1. Goal

Build a bilingual (PT/EN) personal portfolio website for **Fernando Diogo**, an architect who also works with real estate market data analysis (PowerBI dashboards on demographic / regional segmentation). The site must:

1. Position him as a **hybrid professional**: architect + real-estate market analyst, with equal weight to both vertices.
2. Show **landing page**, **projects** (aggregator + per-project detail pages), **hobbies**, and **contact**.
3. Be **trivially editable** by a non-technical person — they should clone the repo, edit text/images, and redeploy without writing code.
4. Visually emulate the futuristic / editorial aesthetic of [Parametrix on Dribbble](https://dribbble.com/shots/25505982-PARAMETRIX-Futuristic-architecture-landing-page), adapted to a light background + steel-blue + orange + black palette.

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 16** (App Router, statically rendered) |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS 4** + CSS custom properties (for non-tech color tweaks) |
| Content | **@next/mdx** + **gray-matter** (frontmatter parsing) |
| i18n | App Router `[lang]` segment + per-language JSON dictionaries |
| Animation | **Framer Motion** (scroll reveals, hovers, page transitions) |
| Contact form | **Formspree** (no backend; free tier covers expected volume) |
| Images | `next/image` with files under `/public/images/` |
| Fonts | `next/font` loading **Space Grotesk** (display) + **Inter** (body) |
| Icons | **lucide-react** |
| Deploy | **Vercel** |

## 3. Brand identity

### 3.1 Logo

- **Mark**: 4×4 grid of small squares, deep blue with varying opacity (0.3 / 0.55 / 1.0); one cell highlighted in orange. Reads simultaneously as a floor plan and as a heatmap of urban zones.
- **Wordmark**: `FERNANDO DIOGO` set in **Space Grotesk Bold**, letter-spacing 1.5–2 px.
- **Tagline**: `ARQUITETURA · INTELIGÊNCIA IMOBILIÁRIA` (PT) / `ARCHITECTURE · REAL ESTATE INTELLIGENCE` (EN), Space Grotesk Medium 9 px, letter-spacing 2.2 px.
- The logo is a single React component (`<Logo />`) — never a static image. This guarantees crispness at any size and lets the tagline swap with locale.

### 3.2 Color tokens (`/styles/tokens.css`)

```css
:root {
  --bg-base:    #F5F2ED;  /* warm off-white background */
  --bg-elevated:#FAFAF7;  /* cards, secondary surfaces */
  --bg-deep:    #0A0A0A;  /* dark sections, footer */
  --ink-primary:#0A0A0A;
  --ink-muted:  #6B6B6B;
  --ink-soft:   #8B8680;
  --accent:     #FF6B35;  /* orange — CTAs, highlights */
  --steel:      #0F1E3D;  /* deep blue — data viz, mark, accents */
  --steel-soft: #1A2D52;
  --line:       #E8E2D6;  /* hairline dividers */
}
```

### 3.3 Typography scale

- **Display**: Space Grotesk 700 — used for hero headline, section titles
- **Body**: Inter 400/500 — used for paragraphs, UI
- **Mono accent**: optional `JetBrains Mono` for stat captions and data labels (small, sparingly)
- **Scale**: 12 / 14 / 16 / 18 / 22 / 32 / 48 / 72 / 96 px, modular

## 4. Information architecture

```
[lang=pt]                    [lang=en]
/pt                       ↔  /en                          (landing)
/pt/projects              ↔  /en/projects                 (project list)
/pt/projects/[slug]       ↔  /en/projects/[slug]          (project detail)
/pt/hobbies               ↔  /en/hobbies                  (hobbies grid)
/pt/contact               ↔  /en/contact                  (contact form)
```

Root `/` redirects to `/pt` (default locale).

**Uniform path segments across both locales** (`projects`, `hobbies`, `contact`). Localization happens in the **rendered labels** (nav text, headings, body copy), not in URL slugs. Rationale: avoids file-tree duplication, keeps `<LangToggle />` trivial (swap `/pt/...` ↔ `/en/...`), and Google relies on `<html lang>` + `hreflang` annotations for indexing — translated URL slugs offer marginal SEO benefit at significant maintenance cost. The `EDITING.md` guide documents how an advanced editor could later add translated slugs via Next.js rewrites if desired.

## 5. Folder structure

```
fernando-website/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx                     ← html lang, fonts, header/footer
│   │   ├── page.tsx                       ← landing
│   │   ├── projects/
│   │   │   ├── page.tsx                   ← list
│   │   │   └── [slug]/page.tsx            ← detail
│   │   ├── hobbies/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx
│   ├── layout.tsx                         ← root layout, minimal
│   ├── globals.css
│   └── opengraph-image.tsx                ← OG image generator
│
├── content/
│   ├── ui/
│   │   ├── pt.json                        ← all interface strings (nav, buttons, footer, form labels)
│   │   └── en.json
│   ├── site/
│   │   ├── pt.json                        ← landing content (hero text, stats, about, testimonials)
│   │   └── en.json
│   ├── about/
│   │   ├── pt.json
│   │   └── en.json
│   ├── hobbies/
│   │   ├── pt.json                        ← list of hobby cards
│   │   └── en.json
│   └── projects/
│       ├── _index.json                    ← ordered list of slugs to publish (controls visibility & order)
│       └── [slug]/
│           ├── meta.json                  ← shared metadata: year, location, category, cover, gallery, tags, links
│           ├── pt.mdx                     ← long-form prose, PT
│           └── en.mdx                     ← long-form prose, EN
│
├── components/
│   ├── brand/
│   │   ├── Logo.tsx
│   │   └── LogoMark.tsx                   ← just the 4×4 grid for favicon contexts
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LangToggle.tsx
│   │   └── PageTransition.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── DualSpecialty.tsx              ← architect ↔ analyst split block
│   │   ├── FeaturedProjects.tsx
│   │   ├── DataInsights.tsx               ← preview of dashboard work
│   │   ├── About.tsx
│   │   └── ContactCTA.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectFilter.tsx              ← filter by category
│   │   ├── ProjectHero.tsx
│   │   ├── ProjectGallery.tsx
│   │   └── ProjectMeta.tsx
│   ├── hobbies/
│   │   └── HobbyCard.tsx
│   ├── contact/
│   │   └── ContactForm.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Container.tsx
│       ├── SectionTitle.tsx
│       ├── ScrollReveal.tsx               ← framer-motion wrapper
│       └── Marquee.tsx
│
├── lib/
│   ├── i18n/
│   │   ├── config.ts                      ← LOCALES, DEFAULT_LOCALE, NAV_PATHS
│   │   ├── dictionary.ts                  ← getDictionary(lang) loader
│   │   └── alternates.ts                  ← compute hreflang alternates
│   └── content/
│       ├── projects.ts                    ← getProjects, getProject, getProjectSlugs
│       ├── hobbies.ts
│       └── site.ts
│
├── public/
│   └── images/
│       ├── hero/
│       ├── projects/[slug]/
│       │   ├── cover.jpg
│       │   ├── 01.jpg, 02.jpg, ...
│       ├── about/
│       └── hobbies/
│
├── docs/
│   ├── superpowers/specs/                 ← this spec
│   └── EDITING.md                         ← non-tech editing guide (PT)
│
├── styles/
│   ├── tokens.css                         ← color + spacing CSS variables
│   └── prose.css                          ← MDX prose styles
│
├── middleware.ts                          ← root → /pt redirect
├── mdx-components.tsx                     ← global MDX component overrides
├── next.config.mjs                        ← MDX setup, image domains
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 6. Content model

### 6.1 Project metadata (`content/projects/[slug]/meta.json`)

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
    "/images/projects/torre-helix/02.jpg",
    "/images/projects/torre-helix/03.jpg"
  ],
  "tags": ["residential", "high-rise", "sustainability"],
  "title": { "pt": "Torre Hélix", "en": "Helix Tower" },
  "summary": {
    "pt": "Estudo de residencial vertical com fachada paramétrica.",
    "en": "Vertical residential study with parametric façade."
  },
  "metrics": {
    "area": "12.400 m²",
    "floors": 28,
    "units": 196
  }
}
```

`category` is one of: `architecture`, `data-intelligence`, `urban-study`, `interior`. Each category gets a different visual accent on `ProjectCard`.

Special behavior: a project with `category: "data-intelligence"` may include a `dashboardEmbed` field pointing to a static screenshot or PowerBI public link — used to render a different detail-page layout (more about data, less about photography).

### 6.2 Project visibility & order (`content/projects/_index.json`)

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

A non-tech editor controls the homepage carousel and projects-page order by reordering the arrays. Removing a slug from `all` hides the project entirely.

### 6.3 Site content (`content/site/{pt,en}.json`)

Single bilingual JSON pair containing landing-page copy: hero headline, hero subline, stat block (4 numbers + labels), about paragraph, testimonials array, contact CTA. **All copy lives here**, not in components — components consume props.

### 6.4 UI strings (`content/ui/{pt,en}.json`)

Nav labels, button labels, form fields, error messages, footer text — anything the editor might want to translate or reword.

### 6.5 Hobbies (`content/hobbies/{pt,en}.json`)

```json
{
  "intro": "Off-hours interests…",
  "items": [
    { "title": "Urban photography", "description": "...", "image": "/images/hobbies/photography.jpg" }
  ]
}
```

Six placeholder hobbies, plausible for the profile (urban photography, cycling, books on cities, woodworking, travel, sketching).

### 6.6 Initial seed content

The repo ships with **6 seed projects** invented but plausible, mixing both sides of his work:
1. **Torre Hélix** — high-rise residential (architecture)
2. **Estudo de Densificação Zona Sul** — PowerBI-style demographic study (data-intelligence; uses dashboard layout)
3. **Casa Mata** — single-family modernist (architecture)
4. **Atelier Pinheiros** — interior / commercial (interior)
5. **Índice de Velocidade de Vendas** — market analytics dashboard (data-intelligence)
6. **Retrofit Vila Buarque** — historical renovation (architecture)

Categories balance roughly 4 architecture / 2 data-intelligence to reinforce the hybrid positioning while keeping architecture as visually dominant.

## 7. Pages

### 7.1 Landing (`app/[lang]/page.tsx`)

Sections, top to bottom:

1. **Header** — logo (left), nav (center), language toggle + Contact button (right)
2. **Hero** — `min-height: 88vh`, large editorial headline, subline, primary CTA, oversized hero image (architectural render) with floating chip showing a featured project
3. **Stats band** — 4 numbers (e.g., "120 projetos", "8 anos", "32 dashboards", "6 zonas mapeadas") in card grid
4. **DualSpecialty** — 2-column block: left = "Arquitetura" with a project mini-card; right = "Inteligência Imobiliária" with a small data-viz preview. Click each → navigates to filtered projects list
5. **Featured projects** — 3 large cards from `_index.featured`
6. **Data insights teaser** — desaturated screenshot of dashboard with the orange marker, links to filtered projects
7. **About strip** — short bio + portrait
8. **Contact CTA** — black band with "Vamos construir juntos" + button
9. **Footer**

### 7.2 Projects list (`app/[lang]/projects/page.tsx`)

- Filter chips at top: `Todos / Arquitetura / Inteligência Imobiliária / Estudos Urbanos / Interiores`
- Grid (2 columns desktop, 1 mobile) of `ProjectCard`
- Order driven by `_index.json`

### 7.3 Project detail (`app/[lang]/projects/[slug]/page.tsx`)

- `generateStaticParams` returns slugs from `_index.all`
- `dynamicParams = false` — slugs not in the index 404
- Layout: hero with cover image + meta sidebar (year, location, area, etc.) + MDX prose body + gallery + "next/prev project" navigation

For `category: "data-intelligence"` projects, render the `DataProjectLayout` variant: dashboard screenshot prominent, methodology / data-source / findings sections, no photo gallery.

### 7.4 Hobbies (`app/[lang]/hobbies/page.tsx`)

Editorial bento-style grid of HobbyCard components reading from `content/hobbies/{lang}.json`.

### 7.5 Contact (`app/[lang]/contact/page.tsx`)

Two-column: contact info (email, WhatsApp, LinkedIn, Instagram — all configurable in `content/site/{lang}.json`) on the left; form on the right submitting to a Formspree endpoint configured via `NEXT_PUBLIC_FORMSPREE_ID` env var.

## 8. Internationalization implementation

- `app/[lang]/layout.tsx` does `generateStaticParams` returning `[{ lang: 'pt' }, { lang: 'en' }]`.
- `lib/i18n/dictionary.ts` exposes `getDictionary(lang)` returning UI strings + site content for that locale.
- All page components accept `params` (a Promise per Next 16) and `await` it before rendering.
- `<html lang={lang}>` is set in the root layout for accessibility/SEO.
- Each page exports `generateMetadata` with `alternates.languages` populated for hreflang.
- Page files render via shared components from `components/projects/` (`ProjectListPage`, `ProjectDetailPage`) parametrized on `lang`.
- Middleware (`middleware.ts`) handles `/` → `/pt` (or `/en` if `Accept-Language` prefers English).

## 9. Animations

Keep the Parametrix-medium feel:
- **Page transitions**: 250 ms fade + 8 px y-translate via `<PageTransition>`
- **Scroll reveals**: opacity 0 → 1 + 16 px y-translate, triggered at 0.2 viewport
- **Stat counters**: animated number ramp from 0 → target on enter
- **Hover on cards**: scale 1.01, image scale 1.04, 250 ms ease
- **Hero image**: subtle parallax (max 24 px translation) — disabled on `prefers-reduced-motion`
- All motion respects `prefers-reduced-motion: reduce` (Framer Motion `MotionConfig`)

## 10. Contact form

- Stateless component posting `multipart/form-data` to `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
- Fields: name, email, project type (select), message
- Honeypot field (`_gotcha`) for spam
- Success / error states inline; redirect-free
- README documents how to swap to **Resend + Server Action** if Formspree quota is hit

## 11. SEO & metadata

- `metadata` export on every page (title, description, OG image)
- `app/[lang]/sitemap.ts` listing all routes for both locales
- `robots.txt` allowing all
- `app/opengraph-image.tsx` generating a branded OG image (logo + project name) per page
- JSON-LD `Person` schema for the homepage

## 12. Editing workflow (the "non-tech" promise)

The `docs/EDITING.md` file ships a Portuguese guide covering:

1. **Trocar texto da home** → edit `content/site/pt.json`
2. **Adicionar projeto** → create folder `content/projects/<novo-slug>/`, drop in `meta.json`, `pt.mdx`, `en.mdx`, add slug to `_index.all`
3. **Trocar imagem** → replace file in `public/images/...`
4. **Trocar cor da paleta** → edit `styles/tokens.css`
5. **Mudar ordem dos projetos** → reorder slugs in `_index.json`
6. **Esconder um projeto** → remove slug from `_index.all`
7. **Editar nome do menu** → edit `content/ui/pt.json`
8. **Publicar** → push to GitHub; Vercel auto-deploys

Each step has a screenshot and a 1–2 line code example. The guide is the contract: if a non-tech edit can't be done by following EDITING.md, the design has failed.

## 13. Error handling

- Missing translation key → fall back to other locale's value, log warning in dev
- Missing image → `next/image` fallback to a generated placeholder rectangle in brand color
- Project slug requested but not in `_index.all` → 404 (Next.js default not-found)
- Formspree submission failure → inline error message + email link as fallback
- All MDX content validated at build time (broken import = build fail, fast feedback)

## 14. Performance budget

- Largest Contentful Paint < 1.8 s on 4G
- Total JS bundle (initial route) < 120 KB gz
- All images served as WebP via `next/image`, cover images at most 2400 px wide
- Fonts subset via `next/font` to Latin
- `dynamicParams = false` on project detail → fully static pages

## 15. Out of scope (YAGNI)

- CMS / admin panel
- Authentication
- Comments / blog
- Newsletter
- Analytics beyond Vercel's built-in
- Search functionality (≤ 10 projects doesn't justify it)
- Dark mode (the editorial light palette is the brand; dark mode dilutes it)

## 16. Open questions resolved

| Question | Resolution |
|---|---|
| Logo design | Grid 4×4 mark + Space Grotesk Bold "FERNANDO DIOGO" + tagline |
| Color palette | Light cream `#F5F2ED` + steel blue `#0F1E3D` + orange `#FF6B35` + black |
| Language strategy | Bilingual PT+EN with `[lang]` route segment |
| Content format | JSON for structured + MDX for prose (both per-language) |
| Project content | Generate 6 plausible seed projects, mix of architecture and data |
| Hobbies content | Invent 6 coherent placeholders |
| Image source | Download HD from Unsplash/Pexels into `/public/images/` |
| Animation level | Medium (Parametrix-equivalent) |
| Deploy target | Vercel |
| Routing approach | Per-language URL prefix (`/pt`, `/en`) with translated path segments |
