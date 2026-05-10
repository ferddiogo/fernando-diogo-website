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
