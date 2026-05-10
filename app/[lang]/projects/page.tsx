import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ProjectFilter } from '@/components/projects/ProjectFilter';
import { getAllProjects, type ProjectCategory } from '@/lib/content/projects';
import { getDictionary } from '@/lib/i18n/dictionary';
import { LOCALES } from '@/lib/i18n/config';
import { buildAlternates } from '@/lib/i18n/alternates';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const HEADINGS = {
  pt: { title: 'Trabalhos', desc: 'Projetos académicos e pessoais — entre arquitetura e leitura do mercado imobiliário.' },
  en: { title: 'Work', desc: 'Academic and personal projects — between architecture and real estate market reading.' },
} as const;

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
