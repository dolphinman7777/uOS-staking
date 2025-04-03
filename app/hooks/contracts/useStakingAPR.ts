import { useReadContract } from 'wagmi';
import { CONTRACTS, STAKING_REWARDS_ABI } from '../../config/contracts';
import { formatEther } from 'viem';

export const useStakingAPR = () => {
  // Read reward rate
  const { data: rewardRateData } = useReadContract({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'rewardRate',
  });

  // Read rewards duration
  const { data: rewardsDurationData } = useReadContract({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'rewardsDuration',
  });

  // Read total supply
  const { data: totalSupplyData } = useReadContract({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'totalSupply',
  });

  // Calculate APR
  const calculateAPR = () => {
    if (!rewardRateData || !rewardsDurationData || !totalSupplyData) return '0';

    const rewardRate = Number(formatEther(rewardRateData as bigint));
    const rewardsDuration = Number(rewardsDurationData);
    const totalSupply = Number(formatEther(totalSupplyData as bigint));

    if (totalSupply === 0) return '0';

    // Calculate annual rewards
    const annualRewards = (rewardRate * 365 * 24 * 60 * 60) / rewardsDuration;
    
    // Calculate APR as (annual rewards / total supply) * 100
    const apr = (annualRewards / totalSupply) * 100;

    return apr.toFixed(2);
  };

  return {
    apr: calculateAPR(),
    isLoading: !rewardRateData || !rewardsDurationData || !totalSupplyData,
  };
}; 