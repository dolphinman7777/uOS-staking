'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACTS, STAKING_REWARDS_ABI } from '../../config/contracts';

export const useStakingRewards = () => {
  const { address } = useAccount();
  const [stakedBalance, setStakedBalance] = useState<string>('0');
  const [earnedRewards, setEarnedRewards] = useState<string>('0');
  const [totalStaked, setTotalStaked] = useState<string>('0');

  // Read contract data
  const { data: stakedBalanceData } = useContractRead({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'getStakedBalance',
    args: [address],
    watch: true,
  });

  const { data: earnedRewardsData } = useContractRead({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'getEarnedRewards',
    args: [address],
    watch: true,
  });

  const { data: totalStakedData } = useContractRead({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'totalSupply',
    watch: true,
  });

  // Write contract functions
  const { write: stake, data: stakeData } = useContractWrite({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'stake',
  });

  const { write: withdraw, data: withdrawData } = useContractWrite({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'withdraw',
  });

  const { write: getReward, data: getRewardData } = useContractWrite({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'getReward',
  });

  // Wait for transactions
  const { isLoading: isStaking } = useWaitForTransaction({
    hash: stakeData?.hash,
  });

  const { isLoading: isWithdrawing } = useWaitForTransaction({
    hash: withdrawData?.hash,
  });

  const { isLoading: isClaiming } = useWaitForTransaction({
    hash: getRewardData?.hash,
  });

  // Update state when data changes
  useEffect(() => {
    if (stakedBalanceData) {
      setStakedBalance(formatEther(stakedBalanceData));
    }
    if (earnedRewardsData) {
      setEarnedRewards(formatEther(earnedRewardsData));
    }
    if (totalStakedData) {
      setTotalStaked(formatEther(totalStakedData));
    }
  }, [stakedBalanceData, earnedRewardsData, totalStakedData]);

  // Transaction functions
  const handleStake = useCallback(
    (amount: string) => {
      if (!amount) return;
      stake({
        args: [parseEther(amount)],
      });
    },
    [stake]
  );

  const handleWithdraw = useCallback(
    (amount: string) => {
      if (!amount) return;
      withdraw({
        args: [parseEther(amount)],
      });
    },
    [withdraw]
  );

  const handleClaim = useCallback(() => {
    getReward();
  }, [getReward]);

  return {
    stakedBalance,
    earnedRewards,
    totalStaked,
    handleStake,
    handleWithdraw,
    handleClaim,
    isStaking,
    isWithdrawing,
    isClaiming,
  };
}; 