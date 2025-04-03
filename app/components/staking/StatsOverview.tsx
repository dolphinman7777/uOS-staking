'use client';

import React from 'react';
import { Card } from '../shared/Card';
import { useStakingRewards } from '@/hooks/contracts/useStakingRewards';

export const StatsOverview = () => {
  const { totalStaked, earnedRewards } = useStakingRewards();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900">Total LP Tokens Staked</h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {Number(totalStaked).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900">Your Earned Rewards</h3>
          <p className="text-3xl font-bold text-primary mt-2">
            {Number(earnedRewards).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </Card>
    </div>
  );
}; 