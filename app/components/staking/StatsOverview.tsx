'use client';

import React from 'react';
import { Card } from '../shared/Card';
import { useStakingRewards } from '@/hooks/contracts/useStakingRewards';
import { useStakingAPR } from '@/hooks/contracts/useStakingAPR';

export const StatsOverview = () => {
  const { totalStaked, earnedRewards } = useStakingRewards();
  const { apr, isLoading: isLoadingAPR } = useStakingAPR();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-[rgb(247,247,247)] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#6C5DD3]">Total LP Tokens Staked</h3>
        <p className="text-3xl font-bold text-[#6C5DD3] mt-2">
          {Number(totalStaked).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="bg-[rgb(247,247,247)] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#6C5DD3]">Your Earned Rewards</h3>
        <p className="text-3xl font-bold text-[#6C5DD3] mt-2">
          {Number(earnedRewards).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="bg-[rgb(247,247,247)] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#6C5DD3]">Current APR</h3>
        <p className="text-3xl font-bold text-[#6C5DD3] mt-2">
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