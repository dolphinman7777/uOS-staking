'use client';

import React from 'react';
import { Card } from '../shared/Card';
import { useStakingRewards } from '@/hooks/contracts/useStakingRewards';
import { useStakingAPR } from '@/hooks/contracts/useStakingAPR';

export const StatsOverview = () => {
  const { totalLPInStaking, earned } = useStakingRewards();
  const { apr, isLoading: isLoadingAPR } = useStakingAPR();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-[#e5e5e5] rounded-2xl p-6 noise">
        <h3 className="text-lg font-semibold text-[#7EB3FF]">Total LP Tokens Staked</h3>
        <p className="text-3xl font-bold text-[#7EB3FF] mt-2">
          {Number(totalLPInStaking).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="bg-[#e5e5e5] rounded-2xl p-6 noise">
        <h3 className="text-lg font-semibold text-[#7EB3FF]">Your Earned Rewards</h3>
        <p className="text-3xl font-bold text-[#7EB3FF] mt-2">
          {Number(earned).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="bg-[#e5e5e5] rounded-2xl p-6 noise">
        <h3 className="text-lg font-semibold text-[#7EB3FF]">Current APR</h3>
        <p className="text-3xl font-bold text-[#7EB3FF] mt-2">
          {isLoadingAPR ? (
            <span className="text-gray-400">Loading...</span>
          ) : (
            `${Number(apr).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}%`
          )}
        </p>
      </div>
    </div>
  );
}; 