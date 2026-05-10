import { cn } from '@/lib/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
  size?: 'narrow' | 'default' | 'wide';
};

export function Container({ children, className, size = 'default' }: Props) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  };
  return (
    <div className={cn('mx-auto px-6 md:px-10', widths[size], className)}>
      {children}
    </div>
  );
}
