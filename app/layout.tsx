import type { Metadata } from 'next';
import { RainbowKitProviders } from './providers/RainbowKit';
import { ToastProvider } from './providers/ToastProvider';
import BottomNavigation from './components/BottomNavigation';
import Header from './components/Header';
import './globals.css';
import './styles/fonts.css';

export const metadata: Metadata = {
  title: 'uOS Aerodrome V2 LP Staking',
  description: 'Stake uOS/ETH liquidity tokens, earn $uOS rewards',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/favicon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.png',
      }
    ]
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#121212" />
      </head>
      <body className="min-h-screen bg-[#121212] text-foreground antialiased">
        <RainbowKitProviders>
          <ToastProvider>
            <Header />
            {children}
            <BottomNavigation />
          </ToastProvider>
        </RainbowKitProviders>
      </body>
    </html>
  );
} 