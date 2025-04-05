'use client';

import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { useStakingRewards } from '@/hooks/contracts/useStakingRewards';
import { useToast } from '@/providers/ToastProvider';

export const UnstakeCard = () => {
  const [amount, setAmount] = useState('');
  const { showToast } = useToast();
  const { 
    stakedBalance, 
    earned,
    handleWithdraw, 
    handleGetReward,
    isWithdrawing,
    isClaiming,
    refetch: refetchStaking
  } = useStakingRewards();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    try {
      await handleWithdraw(amount);
      showToast('Successfully unstaked LP tokens', 'success');
      setAmount(''); // Reset amount after successful unstake
      await refetchStaking(); // Refetch all staking data
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to unstake LP tokens',
        'error'
      );
    }
  };

  const handleClaimRewards = async () => {
    try {
      await handleGetReward();
      showToast('Successfully claimed rewards', 'success');
      await refetchStaking(); // Refetch all staking data
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : 'Failed to claim rewards',
        'error'
      );
    }
  };

  return (
    <div className="bg-[#e5e5e5] rounded-2xl p-8 noise">
      <h2 className="text-2xl font-semibold text-[#4a5568] mb-8">Unstake</h2>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#d8d8d8] rounded-xl p-4 noise">
          <div className="text-4xl font-semibold text-[#4a5568] mb-2">
            {Number(stakedBalance).toLocaleString()}
          </div>
          <div className="text-sm text-[#64748b]">Staked</div>
          <div className="text-xs text-[#718096]">LP Token</div>
        </div>

        <div className="bg-[#d8d8d8] rounded-xl p-4 noise">
          <div className="text-4xl font-semibold text-[#4a5568] mb-2">
            {Number(earned).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-sm text-[#64748b]">Claimable Rewards</div>
          <div className="text-xs text-[#718096]">LP Token</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#d8d8d8] px-4 py-2 rounded-lg text-sm font-medium text-[#4a5568]">
            LP Token
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount of LP Token to unstake"
            className="w-full pl-28 pr-20 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9e9e9e]/20 bg-[#d8d8d8]"
          />
          <button
            type="button"
            onClick={() => setAmount(stakedBalance)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#9e9e9e] text-white px-3 py-1 rounded-lg text-sm font-medium"
          >
            max
          </button>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={handleClaimRewards}
            disabled={!earned || isClaiming}
            className="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isClaiming ? 'Claiming...' : 'Claim Rewards'}
          </Button>
          <Button
            type="submit"
            disabled={!amount || isWithdrawing || Number(amount) <= 0 || Number(amount) > Number(stakedBalance)}
            className="flex-1 bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isWithdrawing ? 'Unstaking...' : 'Unstake LP Tokens'}
          </Button>
        </div>
      </form>
    </div>
  );
}; 