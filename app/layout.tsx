import type { Metadata } from 'next';
import { RainbowKitProviders } from './providers/RainbowKit';
import { ToastProvider } from './providers/ToastProvider';
import BottomNavigation from './components/BottomNavigation';
import Header from './components/Header';
import './globals.css';
import './styles/fonts.css';

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <RainbowKitProviders>
          <ToastProvider>
            <Header />
            <main className="pt-16">
              {children}
            </main>
            <BottomNavigation />
          </ToastProvider>
        </RainbowKitProviders>
      </body>
    </html>
  );
} 