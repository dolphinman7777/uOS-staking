'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-white.svg"
            alt="uOS Finance Logo"
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </Link>
        <ConnectButton />
      </div>
    </header>
  );
} 