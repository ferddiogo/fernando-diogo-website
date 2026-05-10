import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ProjectMetaPanel } from '@/components/projects/ProjectMeta';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { ProjectNav } from '@/components/projects/ProjectNav';
import { DashboardEmbed } from '@/components/projects/DashboardEmbed';
import { LOCALES, isLocale, type Locale } from '@/lib/i18n/config';
import { getProjectMeta, getProjectSlugs } from '@/lib/content/projects';
import { getDictionary } from '@/lib/i18n/dictionary';
import { buildAlternates } from '@/lib/i18n/alternates';

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return LOCALES.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export const dynamicParams = false;

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

  const isDataProject = meta.category === 'data-intelligence';

  return (
    <main>
      <ProjectHero lang={lang as Locale} project={meta} dict={dict} />

      {/* Data projects: dashboard embed before the prose body */}
      {isDataProject && (
        <DashboardEmbed
          lang={lang as Locale}
          embed={meta.dashboardEmbed}
          fallbackImage={meta.cover}
          title={meta.title[lang as Locale]}
        />
      )}

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
