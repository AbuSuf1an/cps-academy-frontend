import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CPS Academy - Learn Programming Online',
  description:
    'Master programming skills with our comprehensive courses. Learn from industry experts and build real-world projects.',
  keywords: [
    'programming',
    'coding',
    'courses',
    'education',
    'computer science',
  ],
  authors: [{ name: 'CPS Academy Team' }],
  openGraph: {
    title: 'CPS Academy - Learn Programming Online',
    description: 'Master programming skills with our comprehensive courses.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CPS Academy - Learn Programming Online',
    description: 'Master programming skills with our comprehensive courses.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <div className='relative flex min-h-screen flex-col'>
          <div className='flex-1'>{children}</div>
        </div>
      </body>
    </html>
  );
}
