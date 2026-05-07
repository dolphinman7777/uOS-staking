'use client';

import { APR_DEPRECATION_NOTICE } from '@/hooks/contracts/useStakingAPR';
import { clsx } from 'clsx';

type Variant = 'onDark' | 'onLight';

const variantClass: Record<Variant, string> = {
  onDark:
    'border-amber-500/35 bg-amber-950/40 text-amber-100/95 [&_.apr-deprecation-label]:text-amber-200',
  onLight:
    'border-amber-600/45 bg-amber-50 text-amber-950 [&_.apr-deprecation-label]:text-amber-800',
};

export function AprDeprecationCallout({
  variant = 'onDark',
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <p
      role="note"
      className={clsx(
        'rounded-lg border px-3 py-2 text-xs leading-relaxed',
        variantClass[variant],
        className
      )}
    >
      <span className="apr-deprecation-label font-semibold">APR notice. </span>
      {APR_DEPRECATION_NOTICE}
    </p>
  );
}
