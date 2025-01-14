import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { fira } from '@/components/ui/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Movie Catalog',
  description: 'Movie catalog with Next.js, Tailwind CSS and TMDB API'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fira.className, 'antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
