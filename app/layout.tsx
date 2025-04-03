import type { Metadata } from 'next';
import { RainbowKitProviders } from './providers/RainbowKit';
import { ToastProvider } from './providers/ToastProvider';
import BottomNavigation from './components/BottomNavigation';
import './styles/fonts.css';
import './globals.css';

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
      <body className="min-h-screen bg-background text-foreground">
        <RainbowKitProviders>
          <ToastProvider>
            {children}
            <BottomNavigation />
          </ToastProvider>
        </RainbowKitProviders>
      </body>
    </html>
  );
} 