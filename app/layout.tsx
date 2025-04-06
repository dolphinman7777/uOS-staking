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
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
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