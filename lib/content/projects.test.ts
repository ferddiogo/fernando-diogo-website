import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('node:fs', async (importOriginal) => {
  const actual = await importOriginal<typeof import('node:fs')>();
  return {
    ...actual,
    readFileSync: vi.fn(),
  };
});

import * as fs from 'node:fs';

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
