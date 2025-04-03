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
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Unstake LP Tokens</h3>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to unstake"
            className="mb-4"
          />

          <div className="text-sm text-gray-600 mb-4">
            Your staked balance: {Number(stakedBalance).toLocaleString()} LP
          </div>

          <Button
            type="submit"
            disabled={!amount || isWithdrawing || Number(amount) <= 0 || Number(amount) > Number(stakedBalance)}
            className="w-full mb-4"
          >
            {isWithdrawing ? 'Unstaking...' : 'Unstake LP Tokens'}
          </Button>
        </form>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-900">Claimable Rewards</span>
            <span className="text-primary font-semibold">
              {Number(earnedRewards).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <Button
            onClick={handleClaim}
            disabled={!earnedRewards || isClaiming}
            className="w-full"
          >
            {isClaiming ? 'Claiming...' : 'Claim Rewards'}
          </Button>
        </div>
      </div>
    </Card>
  );
}; 