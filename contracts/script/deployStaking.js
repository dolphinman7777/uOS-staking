const { ethers } = require("hardhat");

async function main() {
    // get network name from hardhat runtime environment
    const networkName = hre.network.name;
    console.log("Network:", networkName);

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    let stakingToken = "";
    let rewardsToken = "";

    if (networkName === "base") {
      stakingToken = ""; // UNI-V2
      rewardsToken = ""; // AIUS
    } else if (networkName === "sepolia") {
      stakingToken = "0x61bbA7C573248Cc3CcE194E9F48d8396f5A7A9A5"; // UNI-V2
      rewardsToken = "0xffC8B69CB5AdD5Ea25E371eB531D9727bCc27d9C"; // uOS
    }
  
    const StakingRewards = await ethers.getContractFactory("StakingRewards");
    const stakingRewards = await StakingRewards.deploy(rewardsToken, stakingToken);
    await stakingRewards.waitForDeployment();
    console.log("StakingRewards deployed to:", await stakingRewards.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });