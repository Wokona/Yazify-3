import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Bebas_Neue } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Providers } from '@/components/providers';

// GeistSans is an object providing .variable and .className directly.
// No need to call it as a function. Its .variable property gives the CSS variable name.

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // Bebas Neue typically has a 'Regular 400' weight
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  title: 'Yazify - Your Study Life, Simplified',
  description: 'Seamlessly sync your class timetables, create smart study schedules, and track your wellness journey.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${bebasNeue.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
