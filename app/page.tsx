'use client';

import React from 'react';
import { StatsOverview } from './components/staking/StatsOverview';
import { StakeCard } from './components/staking/StakeCard';
import { UnstakeCard } from './components/staking/UnstakeCard';
import { TypewriterEffect } from './components/TypewriterEffect';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4 md:px-8 pb-40 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="h-screen flex flex-col justify-center">
          <h1 className="text-5xl font-normal text-white mb-4">uOS Aerodrome V2 LP Staking</h1>
          <p className="text-xl text-gray-400">Stake uOS/ETH liquidity tokens, earn <span className="bg-gradient-to-r from-green-700 via-green-300 to-green-700 text-transparent bg-clip-text font-semibold animate-pulse">$uOS</span> rewards</p>
          <p className="text-sm font-mono text-gray-500 mt-8 mb-8">
            <TypewriterEffect 
              text="—a new age of decentralized finance is born." 
              delay={40} 
            />
          </p>
          
          <Link 
            href="https://aerodrome.finance/deposit?token0=0x4200000000000000000000000000000000000006&token1=0xbE8728795b935bf6E2a9253Ce7a2Ef6fA831f51E&type=-1&chain=8453&factory=0x420DD381b31aEf6683db6B902084cB0FFECe40Da"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-50 border border-green-500 text-green-800 font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center w-fit mb-8 hover:bg-green-100"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Liquidity
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
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