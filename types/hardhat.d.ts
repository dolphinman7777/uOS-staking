import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "ethers";

declare module "hardhat/types" {
  interface HardhatRuntimeEnvironment {
    ethers: typeof ethers;
  }
} 