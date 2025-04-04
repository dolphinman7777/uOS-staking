const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("StakingRewards", function () {
  let stakingRewards;
  let stakingToken;
  let rewardsToken;
  let owner;
  let user1;
  let user2;
  let ownerAddress;
  let user1Address;
  let user2Address;

  beforeEach(async function () {
    // Get signers
    [owner, user1, user2] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    user1Address = await user1.getAddress();
    user2Address = await user2.getAddress();

    // Deploy mock tokens
    const MockToken = await ethers.getContractFactory("MockERC20");
    stakingToken = await MockToken.deploy("LP Token", "LP", ethers.parseEther("1000000"));
    rewardsToken = await MockToken.deploy("Reward Token", "RWD", ethers.parseEther("1000000"));

    // Deploy StakingRewards
    const StakingRewards = await ethers.getContractFactory("StakingRewards");
    stakingRewards = await StakingRewards.deploy(
      await stakingToken.getAddress(),
      await rewardsToken.getAddress()
    );

    // Transfer tokens to users
    await stakingToken.transfer(user1Address, ethers.parseEther("1000"));
    await stakingToken.transfer(user2Address, ethers.parseEther("1000"));
    await rewardsToken.transfer(ownerAddress, ethers.parseEther("10000"));
  });

  describe("Staking", function () {
    it("Should allow users to stake LP tokens", async function () {
      const stakeAmount = ethers.parseEther("100");
      
      // Approve staking
      await stakingToken.connect(user1).approve(await stakingRewards.getAddress(), stakeAmount);
      
      // Stake tokens
      await stakingRewards.connect(user1).stake(stakeAmount);
      
      // Check staked balance
      expect(await stakingRewards.balanceOf(user1Address)).to.equal(stakeAmount);
      expect(await stakingRewards.totalSupply()).to.equal(stakeAmount);
    });

    it("Should not allow staking zero amount", async function () {
      await stakingToken.connect(user1).approve(await stakingRewards.getAddress(), ethers.parseEther("100"));
      await expect(stakingRewards.connect(user1).stake(0)).to.be.revertedWith("Cannot stake 0");
    });
  });

  describe("Rewards", function () {
    it("Should distribute rewards correctly", async function () {
      const stakeAmount = ethers.parseEther("100");
      const rewardAmount = ethers.parseEther("1000");
      
      // Approve and stake
      await stakingToken.connect(user1).approve(await stakingRewards.getAddress(), stakeAmount);
      await stakingRewards.connect(user1).stake(stakeAmount);
      
      // Transfer rewards to the contract and notify
      await rewardsToken.transfer(await stakingRewards.getAddress(), rewardAmount);
      await stakingRewards.notifyRewardAmount(rewardAmount);
      
      // Advance time by 1 day
      await time.increase(86400);
      
      // Check earned rewards
      const earned = await stakingRewards.earned(user1Address);
      expect(earned).to.be.gt(0);
    });

    it("Should allow users to claim rewards", async function () {
      const stakeAmount = ethers.parseEther("100");
      const rewardAmount = ethers.parseEther("1000");
      
      // Approve and stake
      await stakingToken.connect(user1).approve(await stakingRewards.getAddress(), stakeAmount);
      await stakingRewards.connect(user1).stake(stakeAmount);
      
      // Transfer rewards to the contract and notify
      await rewardsToken.transfer(await stakingRewards.getAddress(), rewardAmount);
      await stakingRewards.notifyRewardAmount(rewardAmount);
      
      // Advance time by 1 day
      await time.increase(86400);
      
      // Get initial balance
      const initialBalance = await rewardsToken.balanceOf(user1Address);
      
      // Claim rewards
      await stakingRewards.connect(user1).getReward();
      
      // Check balance increased
      const finalBalance = await rewardsToken.balanceOf(user1Address);
      expect(finalBalance).to.be.gt(initialBalance);
    });
  });

  describe("Withdrawal", function () {
    it("Should allow users to withdraw staked tokens", async function () {
      const stakeAmount = ethers.parseEther("100");
      
      // Approve and stake
      await stakingToken.connect(user1).approve(await stakingRewards.getAddress(), stakeAmount);
      await stakingRewards.connect(user1).stake(stakeAmount);
      
      // Get initial balance
      const initialBalance = await stakingToken.balanceOf(user1Address);
      
      // Withdraw
      await stakingRewards.connect(user1).withdraw(stakeAmount);
      
      // Check balances
      expect(await stakingRewards.balanceOf(user1Address)).to.equal(0);
      expect(await stakingToken.balanceOf(user1Address)).to.equal(initialBalance + stakeAmount);
    });

    it("Should not allow withdrawing more than staked", async function () {
      const stakeAmount = ethers.parseEther("100");
      const withdrawAmount = ethers.parseEther("150");
      
      // Approve and stake
      await stakingToken.connect(user1).approve(await stakingRewards.getAddress(), stakeAmount);
      await stakingRewards.connect(user1).stake(stakeAmount);
      
      // Try to withdraw more than staked
      await expect(stakingRewards.connect(user1).withdraw(withdrawAmount)).to.be.reverted;
    });
  });
}); 