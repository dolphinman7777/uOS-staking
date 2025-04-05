'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '../shared/Card';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { useStakingRewards } from '@/hooks/contracts/useStakingRewards';
import { useTokenBalance } from '@/hooks/contracts/useTokenBalance';
import { CONTRACTS } from '@/config/contracts';
import { useAccount } from 'wagmi';
import { useToast } from '@/providers/ToastProvider';

export const StakeCard = () => {
  const [amount, setAmount] = useState('');
  const { address } = useAccount();
  const { showToast } = useToast();
  const { balance, refetch: refetchBalance } = useTokenBalance(CONTRACTS.LP_TOKEN);
  const { 
    handleStake, 
    isStaking, 
    isApproved, 
    handleApprove, 
    isApproving,
    refetch: refetchStaking
  } = useStakingRewards();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    try {
      await handleStake(amount);
      showToast('Successfully staked LP tokens', 'success');
      setAmount(''); // Reset amount after successful stake
      // Refetch all relevant data
      await Promise.all([
        refetchBalance(),
        refetchStaking()
      ]);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to stake LP tokens',
        'error'
      );
    }
  };

  const handleApproveClick = async () => {
    try {
      await handleApprove();
      showToast('Successfully approved LP tokens', 'success');
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to approve LP tokens',
        'error'
      );
    }
  };

  return (
    <div className="bg-[#e5e5e5] rounded-2xl p-4 md:p-8 noise">
      <h2 className="text-xl md:text-2xl font-semibold text-[#4a5568] mb-6 md:mb-8">Stake</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-[#d8d8d8] rounded-xl p-4 noise">
          <div className="text-2xl md:text-4xl font-semibold text-[#4a5568] mb-2">
            {Number(balance).toLocaleString()} 
          </div>
          <div className="text-sm text-[#64748b]">Wallet Balance</div>
          <div className="text-xs text-[#718096]">LP Token</div>
        </div>

        <div className="bg-[#d8d8d8] rounded-xl p-4 noise">
          <div className="text-2xl md:text-4xl font-semibold text-[#4a5568] mb-2">
            120
          </div>
          <div className="text-sm text-[#64748b]">Rewards Period</div>
          <div className="text-xs text-[#718096]">Days</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-[#d8d8d8] px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium text-[#4a5568]">
            LP Token
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount of LP Token to stake"
            className="w-full pl-20 md:pl-28 pr-16 md:pr-20 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a5568]/20 bg-[#d8d8d8] text-sm md:text-base"
          />
          <button
            type="button"
            onClick={() => setAmount(balance)}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-[#4a5568] text-white px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-medium"
          >
            max
          </button>
        </div>

        <div className="flex gap-4">
          {!isApproved ? (
            <Button
              type="button"
              onClick={handleApproveClick}
              disabled={!amount || isApproving || !address}
              className="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
            >
              {isApproving ? 'Approving...' : 'Approve LP Token'}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!amount || isStaking || Number(amount) <= 0 || Number(amount) > Number(balance)}
              className="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
            >
              {isStaking ? 'Staking...' : 'Stake LP Tokens'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}; 