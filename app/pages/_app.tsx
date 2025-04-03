import type { AppProps } from 'next/app';
import { RainbowKitProviders } from '../providers/RainbowKit';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitProviders>
      <Component {...pageProps} />
    </RainbowKitProviders>
  );
} 