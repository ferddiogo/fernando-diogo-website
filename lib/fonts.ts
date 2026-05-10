import { Inter, Space_Grotesk } from 'next/font/google';

export const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body-loaded',
});

export const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display-loaded',
  weight: ['400', '500', '700'],
});
