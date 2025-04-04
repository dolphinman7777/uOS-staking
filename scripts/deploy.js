// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts for local testing...");

  // Get the contract factories
  const UOS = await hre.ethers.getContractFactory("UOS");
  const StakingRewards = await hre.ethers.getContractFactory("StakingRewards");

  // Deploy UOS token
  const uosToken = await UOS.deploy();
  await uosToken.waitForDeployment();
  const uosTokenAddress = await uosToken.getAddress();
  console.log(`UOS token deployed to: ${uosTokenAddress}`);

  // For testing purposes, we'll use UOS as both the rewards token and staking token
  // In a real deployment, the staking token would be an LP token (e.g., UOS-WETH pair)
  const stakingRewards = await StakingRewards.deploy(uosTokenAddress, uosTokenAddress);
  await stakingRewards.waitForDeployment();
  const stakingRewardsAddress = await stakingRewards.getAddress();
  console.log(`StakingRewards deployed to: ${stakingRewardsAddress}`);

  // Transfer some UOS tokens to the StakingRewards contract for rewards
  const rewardAmount = hre.ethers.parseEther("100000"); // 100,000 UOS for rewards
  await uosToken.transfer(stakingRewardsAddress, rewardAmount);
  console.log(`Transferred ${hre.ethers.formatEther(rewardAmount)} UOS to StakingRewards contract for rewards`);

  // Start the rewards program
  await stakingRewards.notifyRewardAmount(rewardAmount);
  console.log("Rewards program started");

  console.log("\nContract addresses for .env file:");
  console.log(`NEXT_PUBLIC_UOS_TOKEN_ADDRESS=${uosTokenAddress}`);
  console.log(`NEXT_PUBLIC_LP_TOKEN_ADDRESS=${uosTokenAddress}`); // For testing, using UOS as LP token
  console.log(`NEXT_PUBLIC_STAKING_REWARDS_ADDRESS=${stakingRewardsAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 