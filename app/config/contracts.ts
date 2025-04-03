import { StakingRewards__factory } from '../../typechain-types';

if (!process.env.NEXT_PUBLIC_UOS_TOKEN_ADDRESS) {
  throw new Error('NEXT_PUBLIC_UOS_TOKEN_ADDRESS is not set');
}

if (!process.env.NEXT_PUBLIC_LP_TOKEN_ADDRESS) {
  throw new Error('NEXT_PUBLIC_LP_TOKEN_ADDRESS is not set');
}

if (!process.env.NEXT_PUBLIC_STAKING_REWARDS_ADDRESS) {
  throw new Error('NEXT_PUBLIC_STAKING_REWARDS_ADDRESS is not set');
}

export const CONTRACTS = {
  UOS_TOKEN: process.env.NEXT_PUBLIC_UOS_TOKEN_ADDRESS,
  LP_TOKEN: process.env.NEXT_PUBLIC_LP_TOKEN_ADDRESS,
  STAKING_REWARDS: process.env.NEXT_PUBLIC_STAKING_REWARDS_ADDRESS
} as const;

export const STAKING_REWARDS_ABI = StakingRewards__factory.abi;

export const CHAIN_ID = 8453; // Base network 