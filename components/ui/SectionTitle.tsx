import { cn } from '@/lib/cn';

type Props = {
  eyebrow?: string;
  children: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionTitle({ eyebrow, children, description, align = 'left', className }: Props) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      {eyebrow && (
        <div className="font-display text-xs tracking-[0.22em] text-accent uppercase mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display font-bold text-3xl md:text-5xl text-ink leading-tight">
        {children}
      </h2>
      {description && (
        <p className="mt-4 text-ink-muted text-base md:text-lg max-w-2xl">{description}</p>
      )}
    </div>
  );
}
