import type { Metadata } from 'next';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Main from '@/components/main';

import { geistSans, geistMono } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Healthy Fox',
  description: 'Just be healthy!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className}`}>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
