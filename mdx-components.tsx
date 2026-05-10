import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="font-display text-4xl md:text-5xl font-bold mt-12 mb-6" {...props} />,
    h2: (props) => <h2 className="font-display text-2xl md:text-3xl font-bold mt-10 mb-4" {...props} />,
    h3: (props) => <h3 className="font-display text-xl md:text-2xl font-semibold mt-8 mb-3" {...props} />,
    p:  (props) => <p className="text-ink-muted leading-relaxed mb-5 text-base md:text-lg" {...props} />,
    ul: (props) => <ul className="list-disc pl-6 mb-5 space-y-2 text-ink-muted" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 mb-5 space-y-2 text-ink-muted" {...props} />,
    a:  (props) => <a className="text-accent underline underline-offset-4 hover:text-accent-hover" {...props} />,
    blockquote: (props) => <blockquote className="border-l-2 border-accent pl-6 italic text-ink-muted my-6" {...props} />,
    ...components,
  };
}
