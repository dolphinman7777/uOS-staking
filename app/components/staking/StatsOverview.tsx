'use client';

import React from 'react';
import { Card } from '../shared/Card';
import { useStakingRewards } from '@/hooks/contracts/useStakingRewards';
import { useStakingAPR } from '@/hooks/contracts/useStakingAPR';

export const StatsOverview = () => {
  const { totalLPInStaking, earned } = useStakingRewards();
  const { apr, isLoading: isLoadingAPR } = useStakingAPR();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
      <div className="bg-[#e5e5e5] rounded-2xl p-4 md:p-6 noise">
        <h3 className="text-sm md:text-base font-medium text-[#64748b] mb-2">Total LP Tokens Staked</h3>
        <p className="text-2xl md:text-4xl font-semibold text-[#4a5568]">
          {Number(totalLPInStaking).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="bg-[#e5e5e5] rounded-2xl p-4 md:p-6 noise">
        <h3 className="text-sm md:text-base font-medium text-[#64748b] mb-2">Your Earned Rewards</h3>
        <p className="text-2xl md:text-4xl font-semibold text-[#4a5568]">
          {Number(earned).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="bg-[#e5e5e5] rounded-2xl p-4 md:p-6 noise">
        <h3 className="text-sm md:text-base font-medium text-[#64748b] mb-2">Current APR</h3>
        <p className="text-2xl md:text-4xl font-semibold text-[#4a5568]">
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