'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACTS, STAKING_REWARDS_ABI } from '../../config/contracts';
import { useTokenAllowance } from './useTokenAllowance';

export const useStakingRewards = () => {
  const { address } = useAccount();
  const [stakedBalance, setStakedBalance] = useState<string>('0');
  const [earnedRewards, setEarnedRewards] = useState<string>('0');
  const [totalStaked, setTotalStaked] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);

  // Read contract data
  const { data: stakedBalanceData } = useReadContract({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: earnedRewardsData } = useReadContract({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'earned',
    args: address ? [address] : undefined,
  });

  const { data: totalStakedData } = useReadContract({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'totalSupply',
  });

  // Write contract functions
  const { writeContract: stake, isPending: isStaking } = useWriteContract();
  const { writeContract: withdraw, isPending: isWithdrawing } = useWriteContract();
  const { writeContract: getReward, isPending: isClaiming } = useWriteContract();

  // LP Token approval
  const { allowance, approve, isApproving } = useTokenAllowance(
    CONTRACTS.LP_TOKEN,
    CONTRACTS.STAKING_REWARDS
  );

  // Watch for events
  useWatchContractEvent({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    eventName: 'Staked',
    onLogs: () => {
      // Refresh data
      setIsLoading(true);
    },
  });

  useWatchContractEvent({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    eventName: 'Withdrawn',
    onLogs: () => {
      // Refresh data
      setIsLoading(true);
    },
  });

  useWatchContractEvent({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    eventName: 'RewardPaid',
    onLogs: () => {
      // Refresh data
      setIsLoading(true);
    },
  });

  // Update state when data changes
  useEffect(() => {
    if (stakedBalanceData) {
      setStakedBalance(formatEther(stakedBalanceData as bigint));
    }
    if (earnedRewardsData) {
      setEarnedRewards(formatEther(earnedRewardsData as bigint));
    }
    if (totalStakedData) {
      setTotalStaked(formatEther(totalStakedData as bigint));
    }
    setIsLoading(false);
  }, [stakedBalanceData, earnedRewardsData, totalStakedData]);

  // Transaction functions
  const handleStake = useCallback(
    async (amount: string) => {
      if (!amount) return;
      await stake({
        address: CONTRACTS.STAKING_REWARDS,
        abi: STAKING_REWARDS_ABI,
        functionName: 'stake',
        args: [parseEther(amount)],
      });
    },
    [stake]
  );

  const handleWithdraw = useCallback(
    async (amount: string) => {
      if (!amount) return;
      await withdraw({
        address: CONTRACTS.STAKING_REWARDS,
        abi: STAKING_REWARDS_ABI,
        functionName: 'withdraw',
        args: [parseEther(amount)],
      });
    },
    [withdraw]
  );

  const handleClaim = useCallback(async () => {
    await getReward({
      address: CONTRACTS.STAKING_REWARDS,
      abi: STAKING_REWARDS_ABI,
      functionName: 'getReward',
    });
  }, [getReward]);

  const handleApprove = useCallback(async () => {
    await approve();
  }, [approve]);

  return {
    stakedBalance,
    earnedRewards,
    totalStaked,
    handleStake,
    handleWithdraw,
    handleClaim,
    handleApprove,
    isStaking,
    isWithdrawing,
    isClaiming,
    isApproving,
    isApproved: allowance > BigInt(0),
    isLoading,
  };
}; 