import type React from 'react';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Logan Luque — Software Engineer',
  description:
    'Logan Luque — Senior Software Engineer at Twilio. Fullstack developer working in React, Go, TypeScript, and more.',
  authors: [{ name: 'Logan Luque' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning className={jetbrainsMono.variable}>
      <body className='font-mono antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
