import 'server-only';
import * as fs from 'node:fs';
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
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export async function getProjectSlugs(): Promise<string[]> {
  return readIndex().all;
}

export async function getFeaturedSlugs(): Promise<string[]> {
  return readIndex().featured;
}

export async function getProjectMeta(slug: string): Promise<ProjectMeta> {
  const file = join(ROOT, slug, 'meta.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
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
