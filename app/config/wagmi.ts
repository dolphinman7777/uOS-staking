import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'viem/chains';
import { createPublicClient, http } from 'viem';

const baseChain = {
  ...base,
  rpcUrls: {
    ...base.rpcUrls,
    default: {
      http: [`https://base-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`],
    },
    public: {
      http: [`https://base-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`],
    },
  },
};

export const wagmiConfig = getDefaultConfig({
  appName: 'uOS Finance',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [baseChain],
  ssr: true,
});