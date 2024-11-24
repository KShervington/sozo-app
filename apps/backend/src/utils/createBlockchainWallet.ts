import { Wallet } from 'ethers';

interface WalletDetails {
  walletAddress: string;
  privateKey: string;
  publicKey: string;
}

export default function createBlockchainWallet(): WalletDetails {
  // Generate a random wallet
  const wallet = Wallet.createRandom();

  // Extract details
  const privateKey = wallet.privateKey; // Use this securely
  const publicKey = wallet.publicKey;
  const walletAddress = wallet.address;

  return { walletAddress, privateKey, publicKey };
}
