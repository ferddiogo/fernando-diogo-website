import './globals.css';
import type { Metadata } from 'next';
import { fontBody, fontDisplay } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://fernandodiogo.com'),
  authors: [{ name: 'Fernando Diogo' }],
  creator: 'Fernando Diogo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
