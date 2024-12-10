const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const SozoNFT = await ethers.getContractFactory("SozoNFT");

  // Deploy the contract
  console.log("Deploying SozoNFT...");
  const sozoNFT = await SozoNFT.deploy();
  await sozoNFT.deployed();

  console.log("SozoNFT deployed to:", sozoNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
