'use client';

import React from 'react';
import { Card } from '../shared/Card';
import { useStakingRewards } from '@/hooks/contracts/useStakingRewards';
import { useStakingAPR } from '@/hooks/contracts/useStakingAPR';
import Image from 'next/image';

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
        <div className="flex items-center justify-between">
          <p className="text-2xl md:text-4xl font-semibold text-[#4a5568]">
            {Number(earned).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <Image src="/uos-green.png" alt="uOS token" width={24} height={24} className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>

      <div className="bg-[#e5e5e5] rounded-2xl p-4 md:p-6 noise">
        <h3 className="text-sm md:text-base font-medium text-[#64748b] mb-2">Current APR</h3>
        <div className="flex items-center justify-between">
          <p className="text-2xl md:text-4xl font-semibold text-[#4a5568] truncate">
            {isLoadingAPR ? (
              <span className="text-gray-400">Loading...</span>
            ) : (
              `${Number(apr).toLocaleString(undefined, {
                maximumFractionDigits: 0,
                notation: "compact",
                compactDisplay: "short"
              })}%`
            )}
          </p>
          <Image src="/uos-green.png" alt="uOS token" width={24} height={24} className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>
    </div>
  );
}; 