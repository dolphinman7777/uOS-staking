'use client';

import React from 'react';
import { StatsOverview } from './components/staking/StatsOverview';
import { StakeCard } from './components/staking/StakeCard';
import { UnstakeCard } from './components/staking/UnstakeCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4 md:px-8 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="h-screen flex flex-col justify-center">
          <h1 className="text-5xl font-normal text-white mb-4">uOS Aerodrome V2 LP Staking</h1>
          <p className="text-xl text-gray-400">Stake uOS and ETH, earn uOS rewards.</p>
          <p className="text-sm font-mono text-gray-500 mt-8">—a new age of decentralized finance is born.</p>
        </div>

        <div className="space-y-16">
          <StatsOverview />
          
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <StakeCard />
            <UnstakeCard />
          </div>
        </div>
      </div>
    </main>
  );
} 