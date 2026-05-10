import Link from 'next/link';
import { cn } from '@/lib/cn';

type CommonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
};

type AsButton = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = CommonProps & { href: string };

const VARIANTS = {
  primary: 'bg-bg-deep text-ink-inverse hover:bg-steel',
  secondary: 'border border-line-strong bg-bg-elev hover:border-steel',
  ghost: 'text-ink hover:text-accent',
};

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button(props: AsButton | AsLink) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const cls = cn(
    'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200',
    VARIANTS[variant],
    SIZES[size],
    className,
  );
  if ('href' in props && props.href) {
    return <Link href={props.href} className={cls}>{children}</Link>;
  }
  return <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
