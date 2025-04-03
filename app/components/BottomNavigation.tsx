"use client"

import Link from "next/link"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-0.5 md:gap-1 hover:text-gray-600 transition-colors bg-white/95 rounded-full shadow-lg px-3 py-1.5">
          Community
          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px] md:w-[240px]">
          {/* Social Media */}
          <DropdownMenuItem asChild>
            <Link
              href="https://x.com/Universal_O_S"
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
              Twitter/X
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://medium.com/@UniversalOperatingSystem/about"
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight className="w-4 h-4" />
              Medium
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://warpcast.com/universalos"
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight className="w-4 h-4" />
              Warpcast
            </Link>
          </DropdownMenuItem>

          {/* Community Platforms */}
          <DropdownMenuItem asChild>
            <Link
              href="https://discord.com/invite/8kRvPg9pRd"
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight className="w-4 h-4" />
              Discord
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://t.me/UniversalOperatingSystem"
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight className="w-4 h-4" />
              Telegram
            </Link>
          </DropdownMenuItem>

          {/* Trading */}
          <DropdownMenuItem asChild>
            <Link
              href="https://dexscreener.com/solana/7xhhhvbtzwqqnyqubkbmu8t6cjoqmguzcgd2xku2sdst"
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight className="w-4 h-4" />
              DexScreener
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-0.5 md:gap-1 hover:text-gray-600 transition-colors bg-white/95 rounded-full shadow-lg px-3 py-1.5">
          $uOS
          <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px] md:w-[240px]">
          <DropdownMenuItem asChild>
            <Link
              href="https://dexscreener.com/solana/7xhhhvbtzwqqnyqubkbmu8t6cjoqmguzcgd2xku2sdst"
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight className="w-4 h-4" />
              SOL
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="https://aerodrome.finance/swap?from=eth&to=0xbe8728795b935bf6e2a9253ce7a2ef6fa831f51e&chain0=8453&chain1=8453"
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight className="w-4 h-4" />
              BASE
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 