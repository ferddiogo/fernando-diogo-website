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
