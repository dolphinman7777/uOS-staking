'use client';

import { useCallback } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACTS, ERC20_ABI, STAKING_REWARDS_ABI } from '../../config/contracts';

export const useStakingRewards = () => {
  const { address: connected_address } = useAccount();
  
  // 1. univ2.balanceOf(stakingrewards)
  const { data: totalLPInStaking } = useReadContract({
    address: CONTRACTS.LP_TOKEN,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [CONTRACTS.STAKING_REWARDS]
  });

  // Check allowance for approval status
  const { data: allowance } = useReadContract({
    address: CONTRACTS.LP_TOKEN,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: connected_address && CONTRACTS.STAKING_REWARDS ? [connected_address, CONTRACTS.STAKING_REWARDS] : undefined
  });

  // 2. stakingrewards.getReward(connected_address) - This is a write function, not needed here

  // 3. TBA
  // Implementation needed

  // 4. univ2.balanceOf(connected_address)
  const { data: lpBalance } = useReadContract({
    address: CONTRACTS.LP_TOKEN,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: connected_address ? [connected_address] : undefined
  });

  // 5. TBA
  // Implementation needed

  // 6. stakingrewards.balanceOf(connected_address)
  const { data: stakedBalance } = useReadContract({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'balanceOf',
    args: connected_address ? [connected_address] : undefined
  });

  // 7. stakingrewards.earned(connected_address)
  const { data: earned } = useReadContract({
    address: CONTRACTS.STAKING_REWARDS,
    abi: STAKING_REWARDS_ABI,
    functionName: 'earned',
    args: connected_address ? [connected_address] : undefined
  });

  // Write contract functions
  const { writeContract: writeUniv2, isPending: isApproving } = useWriteContract();
  const { writeContract: writeStakingRewards, isPending: isStakingTx } = useWriteContract();

  // 8. univ2.approve(stakingrewards_address, uint256.max)
  const handleApprove = useCallback(async () => {
    if (!CONTRACTS.STAKING_REWARDS) return;
    await writeUniv2({
      address: CONTRACTS.LP_TOKEN,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [CONTRACTS.STAKING_REWARDS, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')], // uint256.max
    });
  }, [writeUniv2]);

  // 8. (after approve) stakingrewards.stake(amount)
  const handleStake = useCallback(async (amount: string) => {
    await writeStakingRewards({
      address: CONTRACTS.STAKING_REWARDS,
      abi: STAKING_REWARDS_ABI,
      functionName: 'stake',
      args: [parseEther(amount)]
    });
  }, [writeStakingRewards]);

  // 9. stakingrewards.getReward()
  const handleGetReward = useCallback(async () => {
    await writeStakingRewards({
      address: CONTRACTS.STAKING_REWARDS,
      abi: STAKING_REWARDS_ABI,
      functionName: 'getReward',
      args: [] // Empty args array required
    });
  }, [writeStakingRewards]);

  // 10. stakingrewards.withdraw(amount)
  const handleWithdraw = useCallback(async (amount: string) => {
    await writeStakingRewards({
      address: CONTRACTS.STAKING_REWARDS,
      abi: STAKING_REWARDS_ABI,
      functionName: 'withdraw',
      args: [parseEther(amount)]
    });
  }, [writeStakingRewards]);

  return {
    // Read functions
    totalLPInStaking: totalLPInStaking ? formatEther(totalLPInStaking as bigint) : '0',
    lpBalance: lpBalance ? formatEther(lpBalance as bigint) : '0',
    stakedBalance: stakedBalance ? formatEther(stakedBalance as bigint) : '0',
    earned: earned ? formatEther(earned as bigint) : '0',
    
    // Write functions
    handleApprove,
    handleStake,
    handleGetReward,
    handleWithdraw,

    // Loading states
    isApproving,
    isStaking: isStakingTx,
    isWithdrawing: isStakingTx,
    isClaiming: isStakingTx,

    // Approval state
    isApproved: allowance ? (allowance as bigint) > BigInt(0) : false,
  };
}; 