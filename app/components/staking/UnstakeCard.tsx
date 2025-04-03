'use client';

import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { useStakingRewards } from '@/hooks/contracts/useStakingRewards';

export const UnstakeCard = () => {
  const [amount, setAmount] = useState('');
  const { 
    stakedBalance, 
    earnedRewards,
    handleWithdraw, 
    handleClaim,
    isWithdrawing,
    isClaiming 
  } = useStakingRewards();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    handleWithdraw(amount);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-[#6C5DD3] mb-8">Unstake</h2>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-[#F7F5FF] rounded-xl p-4">
          <div className="text-4xl font-semibold text-[#6C5DD3] mb-2">
            {Number(stakedBalance).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Staked</div>
          <div className="text-xs text-gray-500">LP Token</div>
        </div>

        <div className="bg-[#F7F5FF] rounded-xl p-4">
          <div className="text-4xl font-semibold text-[#6C5DD3] mb-2">
            {Number(earnedRewards).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-sm text-gray-600">Claimable Rewards</div>
          <div className="text-xs text-gray-500">LP Token</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#F7F5FF] px-4 py-2 rounded-lg text-sm font-medium">
            LP Token
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount of LP Token to unstake"
            className="w-full pl-28 pr-20 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]/20"
          />
          <button
            type="button"
            onClick={() => setAmount(stakedBalance)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#6C5DD3] text-white px-3 py-1 rounded-lg text-sm font-medium"
          >
            max
          </button>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleClaim}
            disabled={!earnedRewards || isClaiming}
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