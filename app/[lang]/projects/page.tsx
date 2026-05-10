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
