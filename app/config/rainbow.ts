import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'viem/chains';

export const config = getDefaultConfig({
  appName: 'uOS Finance',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [base],
  ssr: true,
}); 