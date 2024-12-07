import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SozoNFT contract...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance));

  if (balance === 0n) {
    console.error("Error: Deployer account has no balance");
    process.exit(1);
  }

  const SozoNFT = await ethers.getContractFactory("SozoNFT");
  
  try {
    console.log("Submitting deployment transaction...");
    const sozoNFT = await SozoNFT.deploy({
      gasLimit: 10000000,
      gasPrice: ethers.parseUnits("10", "gwei")
    });

    console.log("Transaction submitted, waiting for confirmation...");
    await sozoNFT.waitForDeployment();

    const contractAddress = await sozoNFT.getAddress();
    console.log("SozoNFT deployed to:", contractAddress);
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
