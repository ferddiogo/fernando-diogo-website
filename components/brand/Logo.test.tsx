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
