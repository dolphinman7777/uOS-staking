import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { RainbowKitProviders } from './providers/RainbowKit';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'uOS LP Staking',
  description: 'Stake your uOS-WETH LP tokens and earn rewards',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowKitProviders>{children}</RainbowKitProviders>
      </body>
    </html>
  );
} 