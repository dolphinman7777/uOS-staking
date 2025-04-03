'use client';

import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { useStakingRewards } from '@/hooks/contracts/useStakingRewards';
import { useTokenBalance } from '@/hooks/contracts/useTokenBalance';
import { CONTRACTS } from '@/config/contracts';

export const StakeCard = () => {
  const [amount, setAmount] = useState('');
  const { balance } = useTokenBalance(CONTRACTS.LP_TOKEN);
  const { handleStake, isStaking } = useStakingRewards();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    handleStake(amount);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stake LP Tokens</h3>
        
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to stake"
          className="mb-4"
        />

        <div className="text-sm text-text-muted">
          Available: {Number(balance).toLocaleString()} LP
        </div>

        <Button
          type="submit"
          disabled={!amount || isStaking || Number(amount) <= 0 || Number(amount) > Number(balance)}
          className="w-full"
        >
          {isStaking ? 'Staking...' : 'Stake LP Tokens'}
        </Button>
      </form>
    </Card>
  );
}; 