'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`rounded-lg bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}; 