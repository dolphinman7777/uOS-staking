'use client';

/**
 * APR is intentionally fixed at 0% in the UI while new rewards are paused.
 * On-chain `rewardRate` may still be nonzero until `notifyRewardAmount` is updated.
 */
export const APR_DEPRECATION_NOTICE =
  'Deprecated: APR is fixed at 0% while new rewards are paused. The contract may still show a nonzero reward rate.';

export const useStakingAPR = () => {
  return {
    apr: 0,
    isLoading: false,
    isError: false,
  };
};
