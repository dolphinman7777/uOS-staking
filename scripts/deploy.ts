import hre from "hardhat";

async function main() {
  console.log("Deploying StakingRewards contract...");

  // Get the contract factory
  const StakingRewards = await hre.ethers.getContractFactory("StakingRewards");

  // Get the token addresses from environment variables or use placeholder addresses
  const stakingTokenAddress = process.env.LP_TOKEN_ADDRESS || "0x..."; // uOS-WETH LP token
  const rewardsTokenAddress = process.env.UOS_TOKEN_ADDRESS || "0x..."; // uOS token

  console.log(`Staking Token (LP): ${stakingTokenAddress}`);
  console.log(`Rewards Token (uOS): ${rewardsTokenAddress}`);

  // Deploy the contract
  const stakingRewards = await StakingRewards.deploy(
    stakingTokenAddress,
    rewardsTokenAddress
  );

  await stakingRewards.waitForDeployment();

  const stakingRewardsAddress = await stakingRewards.getAddress();
  console.log(`StakingRewards deployed to: ${stakingRewardsAddress}`);

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await stakingRewards.deploymentTransaction()?.wait(5);

  console.log("Deployment complete!");
  console.log("Contract addresses:");
  console.log(`- StakingRewards: ${stakingRewardsAddress}`);
  console.log(`- Staking Token (LP): ${stakingTokenAddress}`);
  console.log(`- Rewards Token (uOS): ${rewardsTokenAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 