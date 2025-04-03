'use client';

import React from 'react';
import { ConnectButton } from './components/shared/ConnectButton';
import { StatsOverview } from './components/staking/StatsOverview';
import { StakeCard } from './components/staking/StakeCard';
import { UnstakeCard } from './components/staking/UnstakeCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text">uOS LP Staking</h1>
          <ConnectButton />
        </div>

        <div className="space-y-8">
          <StatsOverview />
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <StakeCard />
            <UnstakeCard />
          </div>
        </div>
      </div>
    </main>
  );
} 