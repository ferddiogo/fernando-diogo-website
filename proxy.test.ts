import { describe, it, expect } from 'vitest';
import { resolveRedirectLocale } from './proxy';

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
