import type { Metadata } from 'next';
import { RainbowKitProviders } from './providers/RainbowKit';
import { ToastProvider } from './providers/ToastProvider';
import BottomNavigation from './components/BottomNavigation';
import Header from './components/Header';
import './globals.css';
import './styles/fonts.css';

export const metadata: Metadata = {
  title: 'uOS Aerodrome V2 LP Staking',
  description: 'Stake uOS and ETH, earn uOS rewards.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#121212] text-foreground antialiased">
        <RainbowKitProviders>
          <ToastProvider>
            <Header />
            <main className="pt-32">
              <div className="container mx-auto px-4">
                <h1 className="text-5xl font-normal text-white mb-4">uOS Aerodrome V2 LP Staking</h1>
                <p className="text-xl text-gray-400">Stake uOS and ETH, earn uOS rewards.</p>
                <p className="text-sm font-mono text-gray-500 mt-8">—a new age of decentralized finance is born.</p>
              </div>
              {children}
            </main>
            <BottomNavigation />
          </ToastProvider>
        </RainbowKitProviders>
      </body>
    </html>
  );
} 