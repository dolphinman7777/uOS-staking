import { run } from "hardhat";

async function main() {
  const stakingRewardsAddress = process.env.STAKING_REWARDS_ADDRESS;
  const stakingTokenAddress = process.env.LP_TOKEN_ADDRESS || "0x...";
  const rewardsTokenAddress = process.env.UOS_TOKEN_ADDRESS || "0x...";

  if (!stakingRewardsAddress) {
    throw new Error("STAKING_REWARDS_ADDRESS environment variable is required");
  }

  console.log(`Verifying StakingRewards contract at ${stakingRewardsAddress}...`);

  try {
    await run("verify:verify", {
      address: stakingRewardsAddress,
      constructorArguments: [stakingTokenAddress, rewardsTokenAddress],
    });
    console.log("Verification successful!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 